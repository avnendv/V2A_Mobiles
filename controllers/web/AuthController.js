const bcryptjs = require('bcryptjs');
const User = require('../../models/User');

module.exports.signIn = (req, res, next) => {
    res.render('admin/auth/login');
};
module.exports.login = (req, res, next) => {
    const {user_name, password} = req.body;
    const error = { error: 'Tên tài khoản, mật khẩu không chính xác' };
    User.find({user_name})
    .then(user => {
        if (user.listUser.length) {
            if (bcryptjs.compareSync(password, user.listUser[0].password)) {
                if (user.listUser[0].user_type === 'user') {
                    return res.render('admin/auth/login', error);        
                }
                return res.redirect('/admin/dashboard');
            }
            return res.render('admin/auth/login', error);
        }
        return res.render('admin/auth/login', error);
    })
};
