const branch = require('../models/Branch');

module.exports.branches = async (req, res, next) => {
    const branches = await branch.find();
    res.locals.branches = branches;
    next();
}
module.exports.userType = async (req, res, next) => {
    res.locals.userType = ['user', 'admin', 'moderator'];
    next();
}
