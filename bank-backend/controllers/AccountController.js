// controllers/AccountController.js
const Account = require('../models/Account');


exports.createAccount = async (req, res) => {
  try {
    const { userId } = req.params;

    const existingAccount = await Account.findOne({ userId });

    if (existingAccount) {
      return res.status(400).json({ success: false, message: 'Account already exists for this user' });
    }

    // Create a new account
    const newAccount = new Account({
      userId,
      balance: 1000, 
      transactions: [],
    });

    await newAccount.save();

    return res.status(201).json({ success: true, message: 'Account created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId)
    
    const account = await Account.findOne({ userId });
    console.log(account)

    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    const formattedTransactions = account.transactions.map(transaction => ({
      userId,
      balance: account.balance,
      type: transaction.type,
      amount: transaction.amount,
      timestamp: transaction.timestamp,
    }));

    return res.status(200).json({ success: true, transactions: formattedTransactions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.deposit = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;

    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    account.balance += amount;
    account.transactions.push({ type: 'deposit', amount });

    await account.save();

    return res.status(200).json({ success: true, message: 'Deposit successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;

    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    if (amount > account.balance) {
      return res.status(400).json({ success: false, message: 'Insufficient Funds' });
    }

    account.balance -= amount;
    account.transactions.push({ type: 'withdrawal', amount });

    await account.save();

    return res.status(200).json({ success: true, message: 'Withdrawal successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
