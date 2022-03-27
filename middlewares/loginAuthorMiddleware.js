
module.exports = {
    validateInputFormLogin: (req, res, next) =>{
        var err ={}, data = req.body ;
        if (data.accountName == '') {
            err.errName = 'Tên đăng nhập không được để trống';
        }
        if (data.pass == '') {
            err.errPass = 'Mật khẩu không được để trống';
        }
        if (err == {}) {
            res.render('client/login',{
                title: 'Đăng nhập',
                err: err,
                values: {
                    name: data.accountName,
                    pass: data.pass,
                }
            });
            return;
        }
        next();
    },
    checkLogin: (req, res, next) =>{
        if (req.session.author) {
            res.redirect('back');
            return;
        }
        next();
    },
    requireLogin: (req, res, next) =>{
        if (req.session.author) {
            next();
            return;
        }
        res.redirect('/login');
    }
}