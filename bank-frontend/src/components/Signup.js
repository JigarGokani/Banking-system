import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("User registered successfully");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Error registering user:", errorData);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/abstract-geometric-wireframe-background_52683-59421.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707782400&semt=ais")',
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
