import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setErrorMessage("Password must be more than 6 characters.");
      return;
    }

    setErrorMessage("");

    axios
      .post(`${import.meta.env.VITE_API_URL}/register`, { name, email, password })
      .then((result) => {
        setSuccessMessage("You have successfully registered!");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        setErrorMessage(
          "An error occurred during registration. Please try again."
        );
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-gradient-to-tr from-purple-950 to-black text-white">
      {/* Left Grid */}
      <div className="flex flex-col justify-center items-center p-8">
        <div className="flex flex-row items-center text-center space-x-4">
          <img
            src="logo.jpeg" // Replace with your logo path
            alt="Logo"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">Mood Conexus</h1>
          </div>
        </div>
        <br />
        <br />
        <p className="text-lg">
          Log in to access your account and explore more features.
        </p>
      </div>

      {/* Right Grid */}
      <div className="flex justify-center items-center p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-purple-950 rounded-lg shadow-lg p-8 max-w-md w-full"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Mood Conexus
          </h2>

          {successMessage && (
            <div className="bg-green-500 text-white p-3 rounded mb-4 text-center">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
              {errorMessage}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-200 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-purple-700 rounded-md focus:outline-none focus:border-purple-300 bg-purple-800 text-white transition duration-200 ease-in-out"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-200 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border-2  border-purple-700 rounded-md focus:outline-none focus:border-purple-300 bg-purple-800 text-white transition duration-200 ease-in-out"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-200 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-red-600 rounded-md focus:outline-none focus:border-red-400 bg-purple-700 text-white transition duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-purple-700 focus:bg-purple-800 transition duration-300 ease-in-out mb-4"
          >
            Register
          </button>
          <div className="text-center">
            <p className="text-gray-200 mb-2">Already have an account?</p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-purple-400 font-medium hover:text-purple-500 transition duration-200 ease-in-out"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
