import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
        console.log(result);
        setSuccessMessage("You have successfully registered!");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          "An error occurred during registration. Please try again."
        );
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full transition-transform transform hover:scale-105 duration-300 ease-in-out"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Register
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
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="ENTER NAME"
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border-2 border-purple-300 rounded-md focus:outline-none focus:border-purple-600 transition duration-200 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="ENTER EMAIL"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border-2 border-purple-300 rounded-md focus:outline-none focus:border-purple-600 transition duration-200 ease-in-out"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-700 mb-2"
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
            className="w-full px-4 py-2 border-2 border-red-300 rounded-md focus:outline-none focus:border-red-600 transition duration-200 ease-in-out"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-purple-700 focus:bg-purple-800 transition duration-300 ease-in-out mb-4"
        >
          Register
        </button>
        <div className="text-center">
          <p className="text-gray-700 mb-2">Already have an account?</p>
          <Link
            to="/login"
            className="text-purple-600 font-medium hover:text-purple-800 transition duration-200 ease-in-out"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
