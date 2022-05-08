const {check} = require('express-validator');

const validateBlog = () => {
    return [ 
        check('title', 'Tiêu đề bài viết phải ít nhất 10 kí tự').isLength({ min: 10 }),
        check('title', 'Tiêu đề bài viết không được để trống').not().isEmpty(),
        check('title').trim(),
        check('content', 'Nội dung bài viết không được để trống').not().isEmpty(),
        check('content').trim(),
    ]; 
};

const validate = {
    validateBlog: validateBlog,
};

module.exports = {validate};