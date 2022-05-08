const linkName = {
    HOME: {
        INDEX: '/',
        TOP: '/top',
        PHONE: '/phone',
    },
    REGISTER: '/register',
    LOGIN: '/login',
    CHECK_LOGIN: '/check',
    PHONE: {
        DETAIL_INDEX: '/dien-thoai',
        DETAIL: '/dien-thoai/:slug',
        BRANCH_INDEX: '/thuong-hieu',
        BRANCH: '/thuong-hieu/:slug',
    },
    BRANCH: '/branch',
    CART: '/gio-hang',
    ORDER: '/dat-hang',
    ORDER_INDEX: '/order',
    ORDER_RETURN: '/dat-hang/ket-qua',
    ORDER_RETURN_INDEX: '/order/return',
    ORDER_CHECK: '/don-hang/kiem-tra',
    ORDER_CHECK_INDEX: '/order/check',
    SELF_ORDER: '/don-hang/thong-tin',
    SELF_ORDER_INDEX: '/order/info',
    USER_INFO: '/cap-nhat-thong-tin',
    USER_INFO_INDEX: '/user/update',
    USER_DETAIL_INDEX: '/user/detail',
    ABOUT: 'gioi-thieu',
    BLOG: {
        LIST_INDEX: '/blog',
        LIST: '/bai-viet',
        DETAIL_INDEX: '/blog/:slug',
        DETAIL: '/bai-viet/:slug',
    }
}

export default linkName;