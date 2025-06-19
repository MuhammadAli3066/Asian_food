import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../Redux/authSlice";
import { Link } from "react-router-dom";

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
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.data.status === "success") {
          const user = result.data.user;
          const token = result.data.token;

          localStorage.setItem("token", token);
          dispatch(loginSuccess({ user, email, token }));
          navigate("/home");
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
        setError("An error occurred. Please Register yourself.");
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
        <p className="text-lg mt-4">
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
          <p className="font-bold mb-6 text-center text-white">
            Let's sign you in quickly
          </p>
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
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
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-purple-700 rounded-md focus:outline-none focus:border-purple-300 bg-purple-800 text-white transition duration-200 ease-in-out"
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
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-red-500 rounded-md focus:outline-none focus:border-red-300 bg-purple-800 text-white transition duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-md text-lg font-semibold hover:bg-purple-600 focus:bg-purple-800 transition duration-300 ease-in-out mb-4"
          >
            Login
          </button>
          <div className="text-center mb-4">
            <Link
              href="#"
              className="text-purple-400 hover:text-purple-500 transition duration-200 ease-in-out"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-center">
            <p className="text-gray-200 mb-2">Don't have an account?</p>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-purple-400 font-medium hover:text-purple-500 transition duration-200 ease-in-out"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
