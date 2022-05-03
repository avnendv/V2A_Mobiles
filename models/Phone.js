const urlSlug = require('url-slug');

const db = require('../config/db');
const conn = db.getConnection();

const constants = require('../config/constants');

module.exports = {
    find: (query, limit = constants.PER_PAGE, orderBy = 'phones.' + constants.DEFAULT_ORDER_BY, type = constants.DEFAULT_SOFT_TYPE) => {
        let totalPage = 0;
        // per page
        const perPage = query.is_search == 1 ? constants.SEARCH_DEFAULT_LENGTH : limit;
        // page number
        const page = query.page ?? 1;
        // calculate offset
        const offset = ((!isNaN(page) && page || 1) - 1) * perPage;
        return new Promise((reslove, reject) => {
            let sql = 'SELECT phones.id, phones.name, phones.price, phones.slug, phones.image, branches.slug AS branch_slug, branches.name AS branch_name FROM phones JOIN branches ON phones.branch_id = branches.id WHERE 1 = 1';
            if (query.phone_id && query.phone_id != '') {
                sql += ' AND phones.id = '+ conn.escape(parseInt(query.phone_id));
            }
            if (query.phone_name && query.phone_name != '') {
                sql += ' AND phones.name LIKE "%' + query.phone_name + '%"';
            }
            if (query.branch_id && query.branch_id != '') {
                sql += ' AND phones.branch_id = '+ conn.escape(parseInt(query.branch_id));
            }
            if (query.branch_slug && query.branch_slug != '') {
                sql += ' AND branches.slug LIKE "%' + query.branch_slug + '%"';
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
    findBySlug: (slug) => {
        return new Promise((reslove, reject) => {
            const sql = 'SELECT * FROM phones WHERE slug = ?';
            conn.query(sql, [slug], (err, result) => {
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
            const slug = urlSlug.convert(data.name);
            const sql = 'INSERT INTO phones SET ?';
            conn.query(sql, {...data, slug}, (err,result) => {
                if (err) {
                    reject(err);
                }
                reslove(result);
            })
        })
    },
    update: (data, phone_id) => {
        return new Promise((reslove, reject) => {
            if (data.name) {
                data.slug = urlSlug.convert(data.name);
            }
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
    },
    getTop: (limit = constants.PER_PAGE, order_by = constants.DEFAULT_ORDER_BY, type = constants.DEFAULT_SOFT_TYPE) => {
        const sql = `SELECT phones.id, phones.image, phones.name, phones.price, phones.slug, AVG(rate.ratting) AS ratting
            FROM phones LEFT JOIN rate ON phones.id = rate.phone_id 
            GROUP BY phones.id, phones.image, phones.name, phones.price, phones.slug
            ORDER BY ${order_by} ${type} LIMIT ${limit}`;
        return new Promise((reslove, reject) => {
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                reslove(result);
            })
        })
    }
}
