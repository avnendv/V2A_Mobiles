const Rate = require('../../models/Rate');
const response = require('../../requests/response');
const helper = require('../../helper/helper');

module.exports.get = (req, res, next) => {
    Rate.find({}, req.query.phone_id)
    .then(rates => {
        return res.json(response.createResponse(rates));
    })
    .catch(error => {
        return res.json(response.createError(error));
    })
}

module.exports.store = (req, res, next) => {
    const data = {
        ratting: req.body.ratting,
        comment: req.body.comment,
        phone_id: req.body.phone_id,
    }
    if (req.body.user_id) {
        data.user_id = req.body.user_id;
    }
    Rate.store(data)
    .then(rs => {
        return res.json(response.createResponse());
    })
    .catch(error => {
        return res.json(response.createError());
    })
}
