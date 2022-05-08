const {validationResult} = require('express-validator');
const { hanldeErrors } = require('../../helper/helper');

const Phone = require('../../models/Phone');

module.exports.index = (req, res, next) => {
    Phone.find(req.query)
    .then(phones => {
        res.render('admin/phone/index', {phones: phones, query: req.query });
    })
    .catch(next);
}
module.exports.create = (req, res, next) => {
    res.render('admin/phone/create');
}
module.exports.store = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('admin/phone/create', { 
            errors: hanldeErrors(errors.array()),
            old: req.body
        });
    }
    Phone.store(req.body)
    .then(() => {
        res.redirect('/admin/phone');
    })
    .catch(next);
}
module.exports.edit = (req, res, next) => {
    Phone.findById(req.params.phone_id)
    .then(phone => {
        res.render('admin/phone/edit', { phone: phone })
    })
    .catch(next);
}
module.exports.update = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('admin/phone/edit', { 
            errors: hanldeErrors(errors.array()),
            old: {...req.body, id: req.params.phone_id},
            phone: [{...req.body, id: req.params.phone_id}],
        });
    }
    Phone.update(req.body, req.params.phone_id)
    .then(() => {
        res.redirect('/admin/phone');
    })
    .catch(next);
}
module.exports.destroy = (req, res, next) => {
    Phone.destroy(req.params.phone_id)
    .then(() => {
        res.redirect('/admin/phone');
    })
    .catch(next);
}
