import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/authSlice";

const Navigation = ({ theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Set different color schemes based on the theme
  const navStyles = {
    purple: "bg-purple-950 text-white",
    blue: "bg-blue-950 text-white",
    grey: "bg-gray-950 text-white",
    pink: "bg-pink-950 text-white",
  };

  return (
    <nav className={`${navStyles[theme]} p-4 shadow-lg`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Navigation Links Section */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <div className="bg-purple-500 rounded-full p-2 mr-3">
              <img
                src="logo.jpeg" // Replace with your logo path
                alt="Logo"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <Link to="/home" className="text-2xl font-semibold text-white">
              Mood Conexus
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/home"
              className="hover:text-purple-300 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-purple-300 transition duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-purple-300 transition duration-300"
            >
              Contact
            </Link>
            <Link
              to="/favorites"
              className="hover:text-purple-300 transition duration-300"
            >
              My Favorites
            </Link>
          </div>
        </div>

        {/* Authentication Links */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="text-white font-bold">Welcome, {user.name}</div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-purple-400 bg-white border border-purple-500 px-5 py-2 rounded-lg font-bold hover:text-white hover:bg-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                aria-label="Login"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-purple-400 bg-white border border-purple-500 px-5 py-2 rounded-lg font-bold hover:text-white hover:bg-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                aria-label="Register"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
