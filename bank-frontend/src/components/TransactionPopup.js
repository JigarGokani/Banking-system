import React, { useState } from 'react';

const TransactionPopup = ({ onClose, onDeposit, onWithdraw, balance }) => {
  const [amount, setAmount] = useState('');

  const handleTransaction = (type) => {
    if (type === 'Deposit') {
      onDeposit(parseFloat(amount));
    } else if (type === 'Withdraw') {
      onWithdraw(parseFloat(amount));
    }
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Transaction Popup</h2>
        <p>Available Balance: ${balance}</p>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="mt-2 p-2 w-full border rounded-md"
        />

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => handleTransaction('Deposit')}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-all"
          >
            Deposit
          </button>
          <button
            onClick={() => handleTransaction('Withdraw')}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all"
          >
            Withdraw
          </button>
        </div>

        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default TransactionPopup;
