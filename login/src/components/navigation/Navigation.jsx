import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Redux/authSlice";

const Navigation = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleOrder = () => {

  }

  return (
    <>
      <header className="bg-slate-900 text white shadow-md w-full z-10">
        <div className="container mx-auto flex justify-between items-center p-6">
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:underline hover:text-slate-500"
          >
            Asian Food
          </Link>
          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="text-white font-bold">Welcome, {user.name}</div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                  <Link
                    to='/display'
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                    aria-label="Logout"
                  >
                    My order
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-slate-800 bg-white border border-slate-400 px-5 py-2 rounded-lg font-bold hover:text-white hover:bg-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  aria-label="Login"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-slate-800 bg-white border border-slate-400 px-5 py-2 rounded-lg font-bold hover:text-white hover:bg-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  aria-label="Register"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navigation;
