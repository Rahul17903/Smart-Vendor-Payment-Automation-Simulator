import { useState, useContext } from "react";
import { login as loginApi } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginApi(form);
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="border p-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="bg-blue-600 text-white py-2 rounded">Login</button>
        </form>
        <p className="mt-3 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 underline">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
