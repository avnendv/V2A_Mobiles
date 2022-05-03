const linkName = {
    HOME: {
        INDEX: '/',
        TOP: '/top',
        PHONE: '/phone',
    },
    REGISTER: '/dang-ki',
    LOGIN: '/dang-nhap',
    PHONE: {
        DETAIL_INDEX: '/dien-thoai',
        DETAIL: '/dien-thoai/:slug',
        BRANCH_INDEX: '/thuong-hieu',
        BRANCH: '/thuong-hieu/:slug',
    },
    BRANCH: '/branch',
    CART: '/gio-hang',
    ORDER: '/dat-hang',
    BLOG: {
        LIST_INDEX: '/blog',
        LIST: '/bai-viet',
        DETAIL_INDEX: '/blog/:slug',
        DETAIL: '/bai-viet/:slug',
    }
}

export default linkName;