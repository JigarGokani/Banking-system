const mongoose = require('mongoose');

const bankerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['banker'], required: true, default: 'banker' },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

});


const Banker = mongoose.model('Banker', bankerSchema);


module.exports = Banker;
