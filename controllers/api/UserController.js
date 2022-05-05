const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
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
        return res.json(response.createError());
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
        return res.json(response.createError());
    })
}
module.exports.login = (req, res, next) => {
    User.findByUser_name(req.body.user_name)
    .then(user => {
        if (user.length) {
            if (bcryptjs.compareSync(req.body.password, user[0].password)) {
                const token = jwt.sign({
                    "user_id": user[0].id,
                    "user_name": user[0].user_name,
                }, process.env.SECRET);
                return res.json(response.createResponse({user: user[0], token}));
            } else {
                return res.json(response.createError({error: "Đăng nhập thất bại. Đã có lỗi xảy ra!"}));
            }
        } else {
            return res.json(response.createError({error: "Đăng nhập thất bại. Đã có lỗi xảy ra!"}));
        }
    })
}
module.exports.check = (req, res, next) => {
    const token = jwt.verify(req.body.token, process.env.SECRET);
    try {
        if (token) {
            return res.json(response.createResponse());
        }
    } catch (error) {
        return res.json(response.createError());
    }
}