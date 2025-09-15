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
      <Link to='/'><h1 className="font-bold text-lg">💰 Smart Vendor Payment</h1></Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Link to="/" className="hover:underline">Dashboard</Link>
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
            <Link to="/" className="bg-blue-600 rounded px-3 py-1 hover:bg-blue-700 ">Login</Link>
            <Link to="/signup" className="bg-green-600 rounded px-3 py-1 hover:bg-green-700 ">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
