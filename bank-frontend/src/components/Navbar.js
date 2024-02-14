import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Banking App
        </Link>

        <div className="flex space-x-4">
          <Link to="/login" className="text-white">
            Customer Login
          </Link>
          <Link to="/signup" className="text-white">
            Customer Signup
          </Link>
          <Link to="/banker/login" className="text-white">
            Banker Login
          </Link>
          <Link to="/banker/signup" className="text-white">
            Banker Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
