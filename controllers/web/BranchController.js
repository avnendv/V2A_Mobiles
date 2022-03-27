const Branch = require('../../models/Branch');

module.exports.index = (req, res, next) => {
    res.render('admin/branch/index');
}
module.exports.store = (req, res, next) => {
    Branch.store(req.body)
    .then(() => {
        res.redirect('back');
    })
    .catch(next);
}
module.exports.update = (req, res, next) => {
    Branch.update({branch_name: req.body.branch_name, branch_id: req.params.branch_id})
    .then(() => {
        res.redirect('back');
    })
    .catch(next);
}
module.exports.destroy = (req, res, next) => {
    Branch.destroy(req.params.branch_id)
    .then(() => {
        res.redirect('back');
    })
    .catch(next);
}
