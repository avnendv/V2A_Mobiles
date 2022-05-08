const {check} = require('express-validator');

const validatePhone = () => {
    return [ 
        check('name', 'Tên điện thoại phải ít nhất 10 kí tự').isLength({ min: 10 }),
        check('name', 'Tên điện thoại không được để trống').not().isEmpty(),
        check('name').trim(),
        check('branch_id', 'Thương hiệu không được để trống').not().isEmpty(),
        check('branch_id').trim(),
        check('price', 'Giá không được để trống').not().isEmpty(),
        check('price').trim(),
        check('color', 'Màu sắc không được để trống').not().isEmpty(),
        check('color').trim(),
        check('spec_screen_size', 'Kích thước màn hình không được để trống').not().isEmpty(),
        check('spec_screen_size').trim(),
        check('spec_his_camera', 'Độ phân giải camera sau không được để trống').not().isEmpty(),
        check('spec_his_camera').trim(),
        check('spec_font_camera', 'Độ phân giải camera trước không được để trống').not().isEmpty(),
        check('spec_font_camera').trim(),
        check('spec_chip', 'CPU không được để trống').not().isEmpty(),
        check('spec_chip').trim(),
        check('spec_ram', 'Bộ nhớ RAM không được để trống').not().isEmpty(),
        check('spec_ram').trim(),
        check('spec_rom', 'Bộ nhớ ROM không được để trống').not().isEmpty(),
        check('spec_rom').trim(),
        check('spec_sim', 'Hỗ trợ sim không được để trống').not().isEmpty(),
        check('spec_sim').trim(),
        check('spec_pin', 'Dung lượng pin không được để trống').not().isEmpty(),
        check('spec_pin').trim(),
        check('spec_security', 'Công nghệ bảo mật không được để trống').not().isEmpty(),
        check('spec_security').trim(),
        check('detail', 'Chi tiết điện thoại không được để trống').not().isEmpty(),
        check('detail').trim(),
    ]; 
};

const validate = {
    validatePhone: validatePhone,
};

module.exports = {validate};