const Phone = require('../../models/Phone');
const response = require('../../requests/response');

module.exports.get = (req, res, next) => {
    Phone.find(req.query)
    .then(phones => {
        return res.json(response.createResponse(phones));
    })
    .catch(error => {
        return res.json(response.createError());
    })
}
module.exports.detail = (req, res, next) => {
    Phone.findBySlug(req.params.slug)
    .then(phone => {
        if (phone[0].id) {
            let setView = phone[0].view;
            Phone.update({view: ++setView}, phone[0].id)
            .then((phoneUpdate) => {
                return res.json(response.createResponse({...phone[0], view: setView}));
            })
            .catch(error => {
                return res.json(response.createError(error));        
            })
        }
    })
    .catch(error => {
        return res.json(response.createError());
    })
}
