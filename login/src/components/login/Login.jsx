import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../Redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post(
        "http://localhost:3001/login",
        { email, password },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.data.status === "success") {
          const user = result.data.user;
          const token = result.data.token;

          console.log(token);
          console.log(`User Name: ${user.name}`);
          console.log(`User Email: ${user.email}`);

          localStorage.setItem("token", token);

          dispatch(loginSuccess({ user, email, token }));

          navigate("/");
        } else if (result.data.status === "error") {
          if (result.data.message === "Incorrect password") {
            setError("Incorrect password. Please try again.");
          } else if (result.data.message === "Record not exist") {
            setError("Your email is invalid. Please register or try again.");
          } else {
            setError("Login failed. Please check your credentials.");
          }
        }
      })
      .catch((err) => {
        console.error("Error during login request:", err);
        setError("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full transition-transform transform hover:scale-105 duration-300 ease-in-out"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border-2 border-red-300 rounded-md focus:outline-none focus:border-red-600 transition duration-200 ease-in-out"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-purple-700 focus:bg-purple-800 transition duration-300 ease-in-out mb-4"
        >
          Login
        </button>
        <div className="text-center mb-4">
          <a
            href="#"
            className="text-purple-600 hover:text-purple-800 transition duration-200 ease-in-out"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center">
          <p className="text-gray-700 mb-2">Don't have an account?</p>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-purple-600 font-medium hover:text-purple-800 transition duration-200 ease-in-out"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
