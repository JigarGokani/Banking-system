import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TransactionHistory = () => {
  const { userId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Authorization Token:', token);

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/banker/transactions/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (data.success) {
          setTransactions(data.transactions[0]?.transactions || []);
          console.log("transactions", data.transactions);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust the format as needed
  };

  return (
    <div className="container mx-auto mt-8 max-w-[1150px]">
      <h2 className="text-2xl font-semibold mb-4">Transaction History for User ID: {userId}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-slate-200">
              <th className="border p-2">Type</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td className="border p-2">{transaction.type}</td>
                <td className="border p-2">${transaction.amount}</td>
                <td className="border p-2">{formatTimestamp(transaction.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
