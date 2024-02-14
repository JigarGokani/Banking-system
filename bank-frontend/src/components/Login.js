import { useState } from 'react';
import {useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data)

      if (data.success) {
        localStorage.setItem('token', data.token);

        navigate(`/${data.userId}/transactions`);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mx-auto"  style={{
      backgroundImage: 'url("https://img.freepik.com/free-vector/abstract-geometric-wireframe-background_52683-59421.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707782400&semt=ais")',
      backgroundSize: 'cover', 
    }}>
      <form className="max-w-md p-8 bg-white shadow-md rounded-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-semibold mb-6">Customer Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
