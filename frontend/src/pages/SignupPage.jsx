import { useState } from "react";
import { signup as signupApi } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const SignupPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupApi(form);
      alert("Signup successful, please login!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Signup</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            className="border p-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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
          <button className="bg-green-600 text-white py-2 rounded">Signup</button>
        </form>
        <p className="mt-3 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignupPage;
