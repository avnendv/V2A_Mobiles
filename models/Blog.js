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
            let sql = 'SELECT blog.id, blog.title, blog.image, blog.view, blog.slug, blog.updated_at, users.full_name FROM blog JOIN users ON blog.user_id = users.id WHERE 1 = 1';
            if (query.id && query.id != '') {
                sql += ' AND blog.id = '+ conn.escape(parseInt(query.id));
            }
            if (user_id && query.user_id != '') {
                sql += ' AND blog.user_id = '+ conn.escape(parseInt(user_id));
            }
            if (query.title && query.title != '') {
                sql += ' AND blog.title LIKE "%' + query.title + '%"';
            }
            sql += ' GROUP BY blog.id, blog.title, blog.image, blog.view, blog.slug, blog.updated_at, users.full_name ORDER BY blog.updated_at DESC';
            conn.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
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
                    return reject(err);
                }
                return reslove({listBlog: [...result], page, totalPage});
            })
        })
    },
    findById: (id) => {
        return new Promise((reslove, reject) => {
            const sql = 'SELECT * FROM blog WHERE id = ?';
            conn.query(sql, [id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                // if (!result.length) {
                //     reject('Danh sách trống!');
                // }
                return reslove(result);
            })
        })
    },
    findBySlug: (slug) => {
        return new Promise((reslove, reject) => {
            let sql = 'SELECT blog.id, blog.title, blog.image, blog.view, blog.slug, blog.updated_at, blog.content, users.full_name FROM blog JOIN users ON blog.user_id = users.id WHERE blog.slug = ?';
            sql += ' GROUP BY blog.id, blog.title, blog.image, blog.view, blog.slug, blog.updated_at, blog.content, users.full_name';
            conn.query(sql, [slug], (err, result) => {
                if (err) {
                    console.log(err)
                    return reject(err);
                }
                // if (!result.length) {
                //     reject('Danh sách trống!');
                // }
                return reslove(result);
            })
        })
    },
    store: (data) => {
        return new Promise((reslove, reject) => {
            const sql = 'INSERT INTO blog SET ?';
            conn.query(sql, {...data, created_at: new Date(), updated_at: new Date()}, (err,result) => {
                if (err) {
                    return reject(err);
                }
                return reslove(result);
            })
        })
    },
    update: (data, id, user_id) => {
        return new Promise((reslove, reject) => {
            const sql = 'UPDATE blog SET ? WHERE id = ? AND `user_id` = ?';
            conn.query(sql, [{...data, updated_at: new Date()}, id, user_id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return reslove(result);
            })
        })
    },
    updateView: (view, id) => {
        return new Promise((reslove, reject) => {
            const sql = 'UPDATE blog SET ? WHERE id = ?';
            conn.query(sql, [{view: view}, id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return reslove(result);
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
                            return reject(err);
                        });
                    }
                    return reslove('success');
                })
            } else {
                const sql = 'DELETE FROM blog WHERE id = ? AND user_id = ?';
                conn.query(sql, [id, user_id], (err,result) => {
                    if (err) {
                        return connection.rollback(function() {
                            return reject(err);
                        });
                    }
                    return reslove('success');
                })
            }
        })
    }
}
