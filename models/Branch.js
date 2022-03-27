const db = require('../config/db');
const conn = db.getConnection();

module.exports = {
    find: () => {
        return new Promise((reslove, reject) => {
            const sql = 'SELECT * FROM branches';
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                reslove(result);
            })
        })
    },
    store: (data) => {
        return new Promise((reslove, reject) => {
            const sql = 'INSERT INTO branches SET ?';
            conn.query(sql, {name: data.branch_name}, (err,result) => {
                if (err) {
                    reject(err);
                }
                reslove(result);
            })
        })
    },
    update: (data) => {
        return new Promise((reslove, reject) => {
            const sql = 'UPDATE branches SET name = ? WHERE id = ?';
            conn.query(sql, [data.branch_name, data.branch_id], (err, result) => {
                if (err) {
                    reject(err);
                }
                reslove(result);
            })
        })
    },
    destroy: (branch_id) => {
        return new Promise((reslove,reject) => {
            conn.beginTransaction((err) => {
                if (err) reject(err);
                const sql = 'DELETE FROM branches WHERE id = ?';
                const sqlPhone = 'DELETE FROM phones WHERE branch_id = ?';
                conn.query(sql, [branch_id], (err,result) => {
                    if (err) {
                        return connection.rollback(function() {
                            reject(err);
                        });
                    }
                })
                conn.query(sqlPhone, [branch_id], (err,result) => {
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