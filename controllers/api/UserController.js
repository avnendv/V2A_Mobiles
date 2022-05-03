const User = require('../../models/User');
const response = require('../../requests/response');

module.exports.detail = (req, res, next) => {
    User.findById(req.body.user_id)
    .then(user => {
        return res.json(response.createResponse(user));
    })
    .catch(error => {
        return res.json(response.createError(error));
    })
}
module.exports.store = (req, res, next) => {
    const data = {
        user_name: req.body.user_name,
        password: req.body.password,
        full_name: req.body.full_name,
        birthdate: req.body.birthdate,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
    }
    User.store(data)
    .then(user => {
        return res.json(response.createResponse(user));
    })
    .catch(error => {
        return res.json(response.createError(error));
    })
}
module.exports.update = (req, res, next) => {
    const data = {
        user_name: req.body.user_name,
        password: req.body.password,
        full_name: req.body.full_name,
        birthdate: req.body.birthdate,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
    }
    // Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);
    User.update(data, req.body.user_id)
    .then(user => {
        return res.json(response.createResponse(user));
    })
    .catch(error => {
        return res.json(response.createError(error));
    })
}
