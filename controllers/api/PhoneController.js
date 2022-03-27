const Phone = require('../../models/Phone');
const response = require('../../requests/response');

module.exports.get = (req, res, next) => {
    Phone.find(req.body)
    .then(phones => {
        return res.json(response.createResponse(phones));
    })
    .catch(error => {
        return res.json(response.createError(error));
    })
}
module.exports.detail = (req, res, next) => {
    Phone.findById(req.body.phone_id)
    .then(phone => {
        return res.json(response.createResponse(phone));
    })
    .catch(error => {
        return res.json(response.createError(error));
    })
}
