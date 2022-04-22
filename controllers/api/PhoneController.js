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
        if (phone[0].id) {
            Phone.update({view: phone[0].view ++}, phone[0].id)
            .then((phoneUpdate) => {
                return res.json(response.createResponse(phoneUpdate));
            })
            .catch(error => {
                return res.json(response.createError(error));        
            })
        }
        return res.json(response.createResponse(phone));
    })
    .catch(error => {
        return res.json(response.createError(error));
    })
}
