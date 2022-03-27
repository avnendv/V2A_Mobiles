const express = require('express');
const router = express.Router();

const BranchController = require('../../controllers/api/BranchController');
const PhoneController = require('../../controllers/api/PhoneController');
const UserController = require('../../controllers/api/UserController');
const CartController = require('../../controllers/api/CartController');

//Branch
router.get('/branch', BranchController.get);
//Phone
router.get('/phone', PhoneController.get);
router.get('/phone/detail', PhoneController.detail);
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
