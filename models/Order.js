const db = require('../config/db');
const conn = db.getConnection();

const constants = require('../config/constants');

module.exports = {
    find: (query, limit = constants.PER_PAGE, orderBy = constants.DEFAULT_ORDER_BY, type = constants.DEFAULT_SOFT_TYPE) => {
        let totalPage = 0;
        // per page
        const perPage = limit;
        // page number
        const page = query.page ?? 1;
        // calculate offset
        const offset = ((!isNaN(page) && page || 1) - 1) * perPage;
        return new Promise((reslove, reject) => {
            let sql = 'SELECT * FROM orders WHERE 1 = 1';
            if (query.id && query.id != '') {
                sql += ' AND id = '+ conn.escape(parseInt(query.id));
            }
            if (query.full_name && query.full_name != '') {
                sql += ' AND full_name LIKE "%' + query.full_name + '%"';
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
                reslove({listOrder: [...result], page, totalPage});
            })
        })
    },
    findById: (id) => {
        return new Promise((reslove, reject) => {
            const sql = 'SELECT * FROM orders WHERE id = ?';
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
            conn.beginTransaction((error) => {
                if (error) reject(error);
                const sql = 'INSERT INTO orders SET ?';
                const orders = data.orders;
                conn.query(sql, {...orders, created_at: new Date(), updated_at: new Date()}, (err,result) => {
                    if (err) {
                        return connection.rollback(function() {
                            reject(err);
                        })
                    }
                    const sqlDetail = 'INSERT INTO order_detail (order_id, phone_id, quantity) VALUES ?';
                    const values = [];
                    data.orderItems.forEach(element => {
                        values.push([result.insertId, ...element]);
                    });
                    conn.query(sqlDetail, [values], function (er, rs) {
                        if (er) {
                            return connection.rollback(function() {
                                reject(er);
                            });
                        }
                        reslove(result.insertId);
                    });
                })
            });
        })
    },
    update: (data, id) => {
        return new Promise((reslove, reject) => {
            const sql = 'UPDATE orders SET ? WHERE id = ?';
            conn.query(sql, [{...data, updated_at: new Date()}, id], (err, result) => {
                if (err) {
                    reject(err);
                }
                reslove(result);
            })
        })
    },
    destroy: (id) => {
        return new Promise((reslove,reject) => {
            conn.beginTransaction((err) => {
                if (err) reject(err);
                const sql = 'DELETE FROM orders WHERE id = ?';
                const sqlOrderDetail = 'DELETE FROM order_detail WHERE order_id = ?';
                conn.query(sql, [id], (err,result) => {
                    if (err) {
                        return connection.rollback(function() {
                            reject(err);
                        });
                    }
                })
                conn.query(sqlOrderDetail, [id], (err,result) => {
                    if (err) {
                        return connection.rollback(function() {
                            reject(err);
                        });
                    }
                })
                reslove('success');
            })
        })
    },
}
