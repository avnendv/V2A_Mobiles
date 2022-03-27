const db = require('../config/db');
const conn = db.getConnection();

module.exports = {
    find: (query) => {
        let totalPage = 0;
        // per page
        const perPage = 15;
        // page number
        const page = query.page ?? 1;
        // calculate offset
        const offset = ((!isNaN(page) && page || 1) - 1) * perPage;
        return new Promise((reslove, reject) => {
            let sql = 'SELECT * FROM phones WHERE 1 = 1';
            if (query.phone_id && query.phone_id != '') {
                sql += ' AND `id` = '+ conn.escape(parseInt(query.phone_id));
            }
            if (query.phone_name && query.phone_name != '') {
                sql += ' AND `phone_name` LIKE "%' + query.phone_name + '%"';
            }
            if (query.branch_id && query.branch_id != '') {
                sql += ' AND `branch_id` = '+ conn.escape(parseInt(query.branch_id));
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
            sql += ` limit ${perPage} OFFSET ${offset}`;
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                reslove({listPhone: [...result], page, totalPage});
            })
        })
    },
    findById: (phone_id) => {
        return new Promise((reslove, reject) => {
            const sql = 'SELECT * FROM phones WHERE id = ?';
            conn.query(sql, [phone_id], (err, result) => {
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
            const sql = 'INSERT INTO phones SET ?';
            conn.query(sql, data, (err,result) => {
                if (err) {
                    reject(err);
                }
                reslove(result);
            })
        })
    },
    update: (data, phone_id) => {
        return new Promise((reslove, reject) => {
            const sql = 'UPDATE phones SET ? WHERE id = ?';
            conn.query(sql, [{...data, updated_at: new Date()}, phone_id], (err, result) => {
                if (err) {
                    reject(err);
                }
                reslove(result);
            })
        })
    },
    destroy: (phone_id) => {
        return new Promise((reslove,reject) => {
            const sql = 'DELETE FROM phones WHERE id = ?';
            conn.query(sql, [phone_id], (err,result) => {
                if (err) {
                    return connection.rollback(function() {
                        reject(err);
                    });
                }
                reslove('success');
            })
        })
    }
}
