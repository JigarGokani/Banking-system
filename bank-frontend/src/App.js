import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import TransactionsPage from './pages/Transaction';
import Navbar from './components/Navbar';
import BankerSignup from './components/BankerSignup';
import BankerLogin from './components/BankerLogin';
import TransactionHistory from './components/TransactionHistory';
import AccountsPage from './pages/AccountsPage';
import Home from './pages/Home';



function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/banker/signup" element={<BankerSignup />} />
          <Route path="/banker/login" element={<BankerLogin />} />
          <Route path="/banker/accounts" element={<AccountsPage />} />
          <Route path="/banker/transactions/:userId" element={<TransactionHistory />} />

          <Route path="/:userId/transactions" element={<TransactionsPage />} />

        </Routes>
    </Router>
  );
}

export default App;
