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

        const response = await fetch(`http://localhost:8080/api/banker/transactions/${userId}`, {
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

  console.log("Full transactions array:", transactions);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Transaction History for User ID: {userId}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
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
                <td className="border p-2">{transaction.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
