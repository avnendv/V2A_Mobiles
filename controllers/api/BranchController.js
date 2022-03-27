const Branch = require('../../models/Branch');
const response = require('../../requests/response');

module.exports.get = (req, res, next) => {
    Branch.find(req.query)
    .then(branches => {
        return res.json(response.createResponse(branches));
    })
    .catch(error => {
        return res.json(response.createError(error));
    })
}
