const db = require('../config/db');
const conn = db.getConnection();

module.exports = {
    find: (query, phone_id) => {
        let totalPage = 0;
        // per page
        const perPage = 10;
        // page number
        const page = query?.page ?? 1;
        // calculate offset
        const offset = ((!isNaN(page) && page || 1) - 1) * perPage;
        return new Promise((reslove, reject) => {
            let sql = `SELECT rate.id, rate.ratting, rate.comment, rate.updated_at, users.full_name FROM rate LEFT JOIN users ON rate.user_id = users.id WHERE rate.phone_id = ${phone_id}`;
            sql += ' GROUP BY rate.id, rate.ratting, rate.comment, rate.updated_at, users.full_name ORDER BY rate.updated_at DESC';
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
                return reslove({listRate: [...result], page, totalPage});
            })
        })
    },
    store: (data) => {
        return new Promise((reslove, reject) => {
            const sql = 'INSERT INTO rate SET ?';
            conn.query(sql, {...data, created_at: new Date(), updated_at: new Date()}, (err,result) => {
                if (err) {
                    return reject(err);
                }
                return reslove(result);
            })
        })
    },
}
