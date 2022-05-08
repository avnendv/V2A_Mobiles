const {check} = require('express-validator');

const validateBranch = () => {
    return [ 
        check('branch_name', 'Tên thương hiệu không được để trống').not().isEmpty(),
        check('branch_name').trim(),
    ]; 
};

const validate = {
    validateBranch: validateBranch,
};

module.exports = {validate};