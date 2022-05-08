const express = require('express');
const router = express.Router();

const select = require('../../widgets/selectList');

const AuthController = require('../../controllers/web/AuthController');
const DashboardController = require('../../controllers/web/DashboardController');
const BranchController = require('../../controllers/web/BranchController');
const PhoneController = require('../../controllers/web/PhoneController');
const UserController = require('../../controllers/web/UserController');
const OrderController = require('../../controllers/web/OrderController');
const BlogController = require('../../controllers/web/BlogController');

const validatePhone = require('../../requests/Phones').validate;
const validateBranch = require('../../requests/Branch').validate;
const validateBlog = require('../../requests/Blog').validate;

//Auth
router.get('/login', require('../../middlewares/loginAdminMiddleware').checkLogin, AuthController.signIn);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
//Dashboard
router.get('/dashboard', DashboardController.index);
// Branch
router.get('/branch', select.branches, BranchController.index);
router.post('/branch/create',select.branches, validateBranch.validateBranch(), BranchController.store);
router.patch('/branch/edit/:branch_id', select.branches, validateBranch.validateBranch(), BranchController.update);
router.delete('/branch/delete/:branch_id', BranchController.destroy);
// Phone
router.get('/phone', select.branches, PhoneController.index);
router.get('/phone/create', select.branches, PhoneController.create);
router.post('/phone/create', select.branches, validatePhone.validatePhone(), PhoneController.store);
router.get('/phone/edit/:phone_id', select.branches, PhoneController.edit);
router.put('/phone/edit/:phone_id', select.branches, validatePhone.validatePhone(), PhoneController.update);
router.delete('/phone/delete/:phone_id', PhoneController.destroy);
// User
router.get('/user', select.userType, UserController.index);
router.get('/user/create', select.userType, UserController.create);
router.post('/user/create', UserController.store);
router.get('/user/edit/:user_id', select.userType, UserController.edit);
router.put('/user/edit/:user_id', UserController.update);
router.delete('/user/delete/:user_id', UserController.destroy);
//Order
router.get('/order', OrderController.index);
router.get('/order/view/:id', OrderController.detail);
router.put('/order/update', OrderController.update);
// Blog
router.get('/blog', BlogController.index);
router.get('/blog/create', BlogController.create);
router.post('/blog/create',validateBlog.validateBlog(), BlogController.store);
router.get('/blog/edit/:id', BlogController.edit);
router.put('/blog/edit/:id',validateBlog.validateBlog(), BlogController.update);
router.delete('/blog/delete/:id', BlogController.destroy);
module.exports = router;
