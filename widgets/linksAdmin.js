module.exports = (req, res, next) => {
    const active = req._parsedUrl.pathname.split('/')[2];
    if (active === '' || typeof active === 'undefined') {
        res.redirect('/admin/dashboard');
    }   
    res.locals.linksAdmin = [
        {
            link: '/admin/dashboard',
            name: 'Trung tâm điều khiển',
            icon: 'bi bi-grid-fill',
            active: (active === '' || active === 'dashboard') ? 'active' : '',
            linkItem: {
                status: false,
            }
        },
        {
            link: '/admin/branch',
            name: 'Quản lí thương hiệu',
            icon: 'bi bi-collection-fill',
            active: active === 'branch' ? 'active' : '',
            linkItem: {
                status: false,
            }
        },
        {
            link: '/admin/phone',
            name: 'Quản lí điện thoại',
            icon: 'bi bi-phone-fill',
            active: active === 'phone' ? 'active' : '',
            linkItem: {
                status: false,
            }
        },
        {
            link: '/admin/user',
            name: 'Quản lí tài khoản',
            icon: 'bi bi-person',
            active: active === 'user' ? 'active' : '',
            linkItem: {
                status: false,
            }
        },
        {
            link: '/admin/order',
            name: 'Quản lí đơn hàng',
            icon: 'bi bi-cart2',
            active: active === 'order' ? 'active' : '',
            linkItem: {
                status: false,
            }
        },
        {
            link: '/admin/blog',
            name: 'Quản lí blog',
            icon: 'bi bi-book',
            active: active === 'blog' ? 'active' : '',
            linkItem: {
                status: false,
            }
        },
    ];
    next();
}