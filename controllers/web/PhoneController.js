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
    Phone.store(req.body)
    .then(() => {
        res.redirect('back');
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
    Phone.update(req.body, req.params.phone_id)
    .then(() => {
        res.redirect('back');
    })
    .catch(next);
}
module.exports.destroy = (req, res, next) => {
    Phone.destroy(req.params.phone_id)
    .then(() => {
        res.redirect('back');
    })
    .catch(next);
}
