
module.exports = {
    validateInputFormLogin: (req, res, next) =>{
        var err =[], data = req.body ;
        if (data.userName == '') {
            err.push('Tên đăng nhập không được để trống');
        }
        if (data.pass == '') {
            err.push('Mật khẩu không được để trống');
        }
        if (err.length > 0) {
            res.render('admin/login',{
                data: {
                    err: true,
                    errMess: err,
                },
                values: {
                    name: data.userName,
                    pass: data.pass,
                }
            });
            return;
        }
        next();
    },
    checkLogin: (req, res, next) =>{
        if (req.session.admin) {
            res.redirect('/admin');
            return;
        }
        next();
    },
    requireLogin: (req, res, next) =>{
        if (req.session.admin) {
            next();
            return;
        }
        res.redirect('/admin/login');
    }
}