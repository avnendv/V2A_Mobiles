const express = require('express');
const router = express.Router();

const select = require('../../widgets/selectList');

const AuthController = require('../../controllers/web/AuthController');
const DashboardController = require('../../controllers/web/DashboardController');
const BranchController = require('../../controllers/web/BranchController');
const PhoneController = require('../../controllers/web/PhoneController');
const UserController = require('../../controllers/web/UserController');
const BlogController = require('../../controllers/web/BlogController');

//Auth
router.get('/signin', AuthController.signIn);
router.post('/login', AuthController.login);
//Dashboard
router.get('/dashboard', DashboardController.index);
// Branch
router.get('/branch', select.branches, BranchController.index);
router.post('/branch/create', BranchController.store);
router.patch('/branch/edit/:branch_id', BranchController.update);
router.delete('/branch/delete/:branch_id', BranchController.destroy);
// Phone
router.get('/phone', select.branches, PhoneController.index);
router.get('/phone/create', select.branches, PhoneController.create);
router.post('/phone/create', PhoneController.store);
router.get('/phone/edit/:phone_id', select.branches, PhoneController.edit);
router.put('/phone/edit/:phone_id', PhoneController.update);
router.delete('/phone/delete/:phone_id', PhoneController.destroy);
// User
router.get('/user', select.userType, UserController.index);
router.get('/user/create', select.userType, UserController.create);
router.post('/user/create', UserController.store);
router.get('/user/edit/:user_id', select.userType, UserController.edit);
router.put('/user/edit/:user_id', UserController.update);
router.delete('/user/delete/:user_id', UserController.destroy);
// Blog
router.get('/blog', BlogController.index);
router.get('/blog/create', BlogController.create);
router.post('/blog/create', BlogController.store);
router.get('/blog/edit/:id', BlogController.edit);
router.put('/blog/edit/:id', BlogController.update);
router.delete('/blog/delete/:id', BlogController.destroy);
module.exports = router;
