const User = require('../../models/User');

module.exports.index = (req, res, next) => {
    User.find(req.query)
    .then(users => {
        res.render('admin/user/index', {users: users, query: req.query });
    })
    .catch(next);
}
module.exports.create = (req, res, next) => {
    res.render('admin/user/create');
}
module.exports.store = (req, res, next) => {
    User.store(req.body)
    .then(() => {
        res.redirect('back');
    })
    .catch(next);
}
module.exports.edit = (req, res, next) => {
    User.findById(req.params.user_id)
    .then(user => {
        res.render('admin/user/edit', { user: user })
    })
    .catch(next);
}
module.exports.update = (req, res, next) => {
    User.update(req.body, req.params.user_id)
    .then(() => {
        res.redirect('back');
    })
    .catch(next);
}
module.exports.destroy = (req, res, next) => {
    User.destroy(req.params.user_id)
    .then(() => {
        res.redirect('back');
    })
    .catch(next);
}
