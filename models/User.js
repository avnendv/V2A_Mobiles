const bcryptjs = require('bcryptjs');
const db = require('../config/db');
const conn = db.getConnection();

module.exports = {
    find: (query, orderBy = 'updated_at', type = 'DESC') => {
        let totalPage = 0;
        // per page
        const perPage = 15;
        // page number
        const page = query.page ?? 1;
        // calculate offset
        const offset = ((!isNaN(page) && page || 1) - 1) * perPage;
        return new Promise((reslove, reject) => {
            let sql = 'SELECT * FROM users WHERE 1 = 1';
            if (query.user_id && query.user_id != '') {
                sql += ' AND `id` = '+ conn.escape(parseInt(query.user_id));
            }
            if (query.user_name && query.user_name != '') {
                sql += ' AND `user_name` LIKE "%'+ query.user_name + '%"';
            }
            if (query.full_name && query.full_name != '') {
                sql += ' AND `full_name` LIKE "%'+ query.full_name + '%"';
            }
            if (query.email && query.email != '') {
                sql += ' AND `email` LIKE "%'+ query.email +'%"';
            }
            if (query.user_type && query.user_type != '') {
                sql += ' AND `user_type` LIKE "%'+ query.user_type + '%"';
            }
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                // if (!result.length) {
                //     reject('Danh sách trống!');
                // }
                if (result.length > perPage) {
                    totalPage = Math.ceil(result.length/perPage);
                }
            });
            sql += ` ORDER BY ${orderBy} ${type} LIMIT ${perPage} OFFSET ${offset}`;
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                reslove({listUser: [...result], page, totalPage});
            })
        })
    },
    findById: (user_id) => {
        return new Promise((reslove, reject) => {
            const sql = 'SELECT * FROM users WHERE id = ?';
            conn.query(sql, [user_id], (err, result) => {
                if (err) {
                    reject(err);
                }
                // if (!result.length) {
                //     reject('Danh sách trống!');
                // }
                reslove(result);
            })
        })
    },
    findByUser_name: (user_name) => {
        return new Promise((reslove, reject) => {
            const sql = 'SELECT id, user_name, password, full_name, gender, birthdate, phone, email, address FROM users WHERE user_name = ?';
            conn.query(sql, [user_name], (err, result) => {
                if (err) {
                    reject(err);
                }
                // if (!result.length) {
                //     reject('Danh sách trống!');
                // }
                reslove(result);
            })
        })
    },
    store: (data) => {
        return new Promise((reslove, reject) => {
            if (data.password) {
                // Generate a salt
                const salt = bcryptjs.genSaltSync(10);
                // Generate a password hash (salt + hash)
                data.password = bcryptjs.hashSync(data.password, salt);
            }
            const sql = 'INSERT INTO users SET ?';
            // Re-assign password hashed
            conn.query(sql, {...data, created_at: new Date(), updated_at: new Date()}, (err,result) => {
                if (err) {
                    reject(err);
                }
                reslove(result);
            })
        })
    },
    update: (data, user_id) => {
        return new Promise((reslove, reject) => {
            if (data.password) {
                // Generate a salt
                const salt = bcryptjs.genSaltSync(10);
                // Generate a password hash (salt + hash)
                data.password = bcryptjs.hashSync(data.password, salt);
            }
            const sql = 'UPDATE users SET ? WHERE id = ?';
            conn.query(sql, [data, user_id], (err, result) => {
                if (err) {
                    reject(err);
                }
                reslove(result);
            })
        })
    },
    destroy: (user_id) => {
        return new Promise((reslove,reject) => {
            const sql = 'DELETE FROM users WHERE id = ?';
            conn.query(sql, [user_id], (err,result) => {
                if (err) {
                    reject(err);
                }
                reslove('success');
            })
        })
    }
}
