// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');

router.get('/:userId/transactions', AccountController.getUserTransactions);
router.post('/:userId/deposit', AccountController.deposit);
router.post('/:userId/withdraw', AccountController.withdraw);
router.post('/:userId/createAccount', AccountController.createAccount); 
router.get('/:userId/balance', AccountController.fetchBalance);


module.exports = router;
