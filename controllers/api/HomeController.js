const Phone = require('../../models/Phone');
const response = require('../../requests/response');
const constants = require('../../config/constants');

module.exports.viewTop = (req, res, next) => {
    Promise.all([
        Phone.getTop(constants.VIEW_HOME, 'view'),
        Phone.getTop(constants.VIEW_HOME, 'ratting'),
        Phone.getTop(constants.VIEW_HOME, 'phones.updated_at')])
    .then(([phoneView, phoneRate, phoneNew]) => {
        return res.json(response.createResponse({
            phoneView, phoneRate, phoneNew
        }));
    })
    .catch(error => {
        return res.json(response.createError());
    })
}