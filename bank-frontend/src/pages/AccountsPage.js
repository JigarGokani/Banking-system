import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/banker/accounts`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setAccounts(data.accounts);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div className="container mx-auto mt-8 max-w-[1150px]">
      <h2 className="text-2xl font-semibold mb-4">All Customer Accounts</h2>
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded">
        <thead>
          <tr className="bg-slate-200">
            <th className="border border-gray-300 p-3">User ID</th>
            <th className="border border-gray-300 p-3">Email</th>
            <th className="border border-gray-300 p-3">Balance</th>
            <th className="border border-gray-300 p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account._id}>
              <td className="border border-gray-300 p-3">{account.userId._id}</td>
              <td className="border border-gray-300 p-3">{account.userId.email}</td>
              <td className="border border-gray-300 p-3">${account.balance}</td>
              <td className="border border-gray-300 p-3">
                <Link to={`/banker/transactions/${account.userId._id}`} className="text-blue-500 hover:underline">
                  View Transactions
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsPage;
