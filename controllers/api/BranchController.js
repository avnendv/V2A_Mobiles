const Branch = require('../../models/Branch');
const Phone = require('../../models/Phone');
const response = require('../../requests/response');

module.exports.get = (req, res, next) => {
    Branch.find(req.query)
    .then(branches => {
        return res.json(response.createResponse(branches));
    })
    .catch(error => {
        return res.json(response.createError());
    })
}
module.exports.listPhone = (req, res, next) => {
    Phone.find({...req.query, branch_slug: req.params.slug})
    .then(phones => {
        return res.json(response.createResponse({
            phones,
            branch_name: phones?.listPhone[0]?.branch_name,
        }));
    })
    .catch(error => {
        return res.json(response.createError());
    })
}
