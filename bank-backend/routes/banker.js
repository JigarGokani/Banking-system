const express = require('express');
const router = express.Router();
const BankController = require('../controllers/BankController');
const authMiddleware = require('../middlewares/authMiddleware');

// Banker SignUp
router.post('/signup', BankController.signUp);

// Banker Login
router.post('/login', BankController.login);

// Banker Logout
router.post('/logout', BankController.logout);

// Get All Customer Accounts
router.get('/accounts',  BankController.getAllAccounts);

// Get Transaction History for a Specific User
router.get('/transactions/:userId', BankController.getTransactionHistory);


module.exports = router;
