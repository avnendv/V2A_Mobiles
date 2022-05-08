const urlSlug = require('url-slug');

const db = require('../config/db');
const conn = db.getConnection();

module.exports = {
    find: () => {
        return new Promise((reslove, reject) => {
            const sql = 'SELECT * FROM branches';
            conn.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return reslove(result);
            })
        })
    },
    store: (data) => {
        return new Promise((reslove, reject) => {
            const slug = urlSlug.convert(data.branch_name);
            const sql = 'INSERT INTO branches SET ?';
            conn.query(sql, {name: data.branch_name, slug: slug, created_at: new Date(), updated_at: new Date()}, (err,result) => {
                if (err) {
                    return reject(err);
                }
                return reslove(result);
            })
        })
    },
    update: (data) => {
        return new Promise((reslove, reject) => {
            const slug = urlSlug.convert(data.branch_name);
            const sql = 'UPDATE branches SET ? WHERE id = ?';
            conn.query(sql, [{name: data.branch_name, slug, created_at: new Date(), updated_at: new Date()}, data.branch_id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return reslove(result);
            })
        })
    },
    destroy: (branch_id) => {
        return new Promise((reslove,reject) => {
            conn.beginTransaction((err) => {
                if (err) return reject(err);
                const sql = 'DELETE FROM branches WHERE id = ?';
                const sqlPhone = 'DELETE FROM phones WHERE branch_id = ?';
                conn.query(sql, [branch_id], (err,result) => {
                    if (err) {
                        return conn.rollback(function() {
                            return reject(err);
                        });
                    }
                });
                conn.query(sqlPhone, [branch_id], (err,result) => {
                    if (err) {
                        return conn.rollback(function() {
                            return reject(err);
                        });
                    }
                });
                conn.commit(function(errs) {
                    if (errs) {
                        return conn.rollback(function() {
                            return reject(errs);
                        });
                    }
                    return reslove('success');
                });
            })
        })
    },
}