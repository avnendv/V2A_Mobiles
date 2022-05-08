const {validationResult} = require('express-validator');
const { hanldeErrors } = require('../../helper/helper');

const Branch = require('../../models/Branch');

module.exports.index = (req, res, next) => {
    res.render('admin/branch/index');
}
module.exports.store = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('admin/branch/index', { 
            errors: hanldeErrors(errors.array()),
            old: req.body
        });
    }
    Branch.store(req.body)
    .then(() => {
        res.redirect('/admin/branch');
    })
    .catch(next);
}
module.exports.update = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('admin/branch/index', { 
            errors: hanldeErrors(errors.array()),
            old: req.body
        });
    }
    Branch.update({branch_name: req.body.branch_name, branch_id: req.params.branch_id})
    .then(() => {
        res.redirect('/admin/branch');
    })
    .catch(next);
}
module.exports.destroy = (req, res, next) => {
    Branch.destroy(req.params.branch_id)
    .then(() => {
        res.redirect('/admin/branch');
    })
    .catch(next);
}
