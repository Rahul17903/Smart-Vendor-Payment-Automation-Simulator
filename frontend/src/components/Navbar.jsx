import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="font-bold text-lg">💰 Smart Vendor Payment</h1>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/upload" className="hover:underline">Upload</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
