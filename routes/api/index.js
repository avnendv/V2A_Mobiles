const express = require('express');
const router = express.Router();

const HomeController = require('../../controllers/api/HomeController');
const BranchController = require('../../controllers/api/BranchController');
const PhoneController = require('../../controllers/api/PhoneController');
const BlogController = require('../../controllers/api/BlogController');
const UserController = require('../../controllers/api/UserController');
const CartController = require('../../controllers/api/CartController');
const OrderController = require('../../controllers/api/OrderController');
const RateController = require('../../controllers/api/RateController');

//Home
router.get('/top', HomeController.viewTop);
//Branch
router.get('/branch', BranchController.get);
router.get('/branch/:slug', BranchController.listPhone);
//Phone
router.get('/phone', PhoneController.get);
router.get('/phone/:slug', PhoneController.detail);
//Blog
router.get('/blog', BlogController.get);
router.get('/blog/:slug', BlogController.detail);
//User
router.post('/login', UserController.login);
router.post('/register', UserController.store);
router.post('/check', UserController.check);
router.get('/user/detail', UserController.detail);
router.put('/user/update', UserController.update);
//Cart
router.get('/cart/view', CartController.get);
router.put('/cart/update', CartController.update);
router.delete('/cart/delete', CartController.delete);
router.delete('/cart/destroy', CartController.destroy);
//Order
router.post('/order', OrderController.createPaymentUrl);
router.get('/order/return', OrderController.createReturnUrl);
router.get('/order/check', OrderController.orderCheck);
router.get('/order/info', OrderController.orderSelf);
router.post('/order/cancel', OrderController.orderCancel);
//Ratting
router.get('/rate', RateController.get);
router.post('/rate/create', RateController.store);
module.exports = router;
