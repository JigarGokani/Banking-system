import React, { useState, useEffect } from "react";
import TransactionPopup from "../components/TransactionPopup";
import { useNavigate, useParams } from "react-router-dom";

const TransactionsPage = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const userId = useParams().userId;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    if (storedBalance) {
      setTransactions([{ balance: parseFloat(storedBalance) }]);
    } else {
      fetchBalance();
    }

    fetchOrCreateAccount();
    fetchTransactions();
  }, [userId]);

  const fetchOrCreateAccount = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/accounts/${userId}/createAccount`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Account created or already exists for user:", userId);
        fetchBalance();
      } else {
        console.error(
          "Error creating or fetching account:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error creating or fetching account:", error);
    }
  };

  const fetchBalance = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/accounts/${userId}/balance`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("balance", data.balance);
          setTransactions([{ balance: data.balance }]);
        } else {
          console.error("Error retrieving balance:", data.message);
        }
      })
      .catch((error) => console.error("Fetch balance error:", error))
      .finally(() => setLoading(false));
  };

  const handleDeposit = async (amount) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/accounts/${userId}/deposit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        }
      );

      if (response.ok) {
        fetchTransactions();
      } else {
        console.error("Deposit failed:", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithdraw = async (amount) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/accounts/${userId}/withdraw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        }
      );

      if (response.ok) {
        fetchTransactions();
      } else {
        console.error("Withdrawal failed:", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTransactions = () => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/accounts/${userId}/transactions`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTransactions(data.transactions || []);
        } else {
          console.error("Error retrieving transactions:", data.message);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/logout`, {
        method: 'POST',
      });

      if (response.ok) {
        setLoggedIn(false);
        navigate("/login");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };   



  const handlePopupClose = () => {
    fetchTransactions();
    setShowPopup(false);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust the format as needed
  };

  return (
    <div className="container mt-8 mx-auto max-w-[1150px]">
      <h2 className="text-2xl font-semibold mb-4">Transactions Page</h2>

      {transactions?.length > 0 && transactions[0]?.balance !== undefined && (
        <p>Current Balance: ${transactions[0].balance}</p>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-4">
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="table-auto w-full bg-white">
              <thead>
                <tr className="bg-slate-200">
                  <th className="border px-4 py-2">User ID</th>
                  <th className="border px-4 py-2">Balance</th>
                  <th className="border px-4 py-2">Transaction Type</th>
                  <th className="border px-4 py-2">Amount</th>
                  <th className="border px-4 py-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((transaction, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{userId}</td>
                    <td className="border px-4 py-2">{transaction.balance}</td>
                    <td className="border px-4 py-2">{transaction.type}</td>
                    <td className="border px-4 py-2">{transaction.amount}</td>
                    <td className="border px-4 py-2">{formatTimestamp(transaction.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setShowPopup(true)}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-all"
            >
              Deposit
            </button>
            <button
              onClick={() => setShowPopup(true)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all"
            >
              Withdraw
            </button>
            <button
              onClick={handleLogout}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {showPopup && (
        <TransactionPopup
          onClose={handlePopupClose}
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
          balance={transactions[0]?.balance}
        />
      )}
    </div>
  );
};

export default TransactionsPage;
