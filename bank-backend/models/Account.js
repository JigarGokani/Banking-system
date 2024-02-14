const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 1000 },
  transactions: [
    {
      type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
      amount: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
