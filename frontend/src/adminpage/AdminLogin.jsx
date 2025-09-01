import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "../components/Api";

const AdminLogin = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("/admin/login", data);
      console.log("Admin login:", res.data);

      if (res.data.token) localStorage.setItem("token", res.data.token);
      if (res.data.user?._id)
        localStorage.setItem("adminId", res.data.user._id);

      alert("Admin login successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(
        "Admin login error:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 p-2 rounded hover:bg-yellow-500">
          Login
        </button>
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/admin/register" className="text-yellow-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
