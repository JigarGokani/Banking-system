import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BankerSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/banker/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User registered successfully');
      } else {
        const errorData = await response.json();
        console.error('Error registering user:', errorData);
      }
      navigate("/banker/login")
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen" style={{
      backgroundImage: 'url("https://i0.wp.com/www.itsdevelopers.in/wp-content/uploads/2017/11/web-designer-kottayam-background.jpg?ssl=1")',
      backgroundSize: 'cover', 
    }}>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Banker Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 w-full mt-1"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 w-full mt-4">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankerSignup;
