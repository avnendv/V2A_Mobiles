const express = require('express');
const router = express.Router();

const HomeController = require('../../controllers/api/HomeController');
const BranchController = require('../../controllers/api/BranchController');
const PhoneController = require('../../controllers/api/PhoneController');
const BlogController = require('../../controllers/api/BlogController');
const UserController = require('../../controllers/api/UserController');
const CartController = require('../../controllers/api/CartController');

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
router.get('/user/detail', UserController.detail);
router.post('/user/store', UserController.store);
router.put('/user/update', UserController.update);
//Cart
router.get('/cart/view', CartController.get);
router.put('/cart/update', CartController.update);
router.delete('/cart/delete', CartController.delete);
router.delete('/cart/destroy', CartController.destroy);
module.exports = router;
