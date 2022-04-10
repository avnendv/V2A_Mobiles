const db = require('../config/db');
const conn = db.getConnection();

module.exports = {
    find: (query, user_id) => {
        let totalPage = 0;
        // per page
        const perPage = 15;
        // page number
        const page = query.page ?? 1;
        // calculate offset
        const offset = ((!isNaN(page) && page || 1) - 1) * perPage;
        return new Promise((reslove, reject) => {
            let sql = 'SELECT * FROM blog WHERE 1 = 1';
            if (query.id && query.id != '') {
                sql += ' AND `id` = '+ conn.escape(parseInt(query.id));
            }
            if (user_id && query.user_id != '') {
                sql += ' AND `user_id` = '+ conn.escape(parseInt(user_id));
            }
            if (query.title && query.title != '') {
                sql += ' AND `title` LIKE "%' + query.title + '%"';
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
                reslove({listBlog: [...result], page, totalPage});
            })
        })
    },
    findById: (id) => {
        return new Promise((reslove, reject) => {
            const sql = 'SELECT * FROM blog WHERE id = ?';
            conn.query(sql, [id], (err, result) => {
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
            const sql = 'INSERT INTO blog SET ?';
            conn.query(sql, data, (err,result) => {
                if (err) {
                    reject(err);
                }
                reslove(result);
            })
        })
    },
    update: (data, id, user_id) => {
        return new Promise((reslove, reject) => {
            const sql = 'UPDATE blog SET ? WHERE id = ? AND `user_id` = ?';
            conn.query(sql, [{...data, updated_at: new Date()}, id, user_id], (err, result) => {
                if (err) {
                    reject(err);
                }
                reslove(result);
            })
        })
    },
    destroy: (id, user_id, user_type) => {
        return new Promise((reslove,reject) => {
            if (user_type && user_type === 'moderator') {
                const sql = 'DELETE FROM blog WHERE id = ?';
                conn.query(sql, [id], (err,result) => {
                    if (err) {
                        return connection.rollback(function() {
                            reject(err);
                        });
                    }
                    reslove('success');
                })
            } else {
                const sql = 'DELETE FROM blog WHERE id = ? AND user_id = ?';
                conn.query(sql, [id, user_id], (err,result) => {
                    if (err) {
                        return connection.rollback(function() {
                            reject(err);
                        });
                    }
                    reslove('success');
                })
            }
        })
    }
}
