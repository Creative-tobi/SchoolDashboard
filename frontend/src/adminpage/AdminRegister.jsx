import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "../components/Api";

const AdminRegister = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    courseTaken: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("/admin/register", data);
      console.log("Admin registration:", res.data);

      if (res.data.token) localStorage.setItem("token", res.data.token);
      if (res.data.user?._id)
        localStorage.setItem("adminId", res.data.user._id);

      alert("Admin registered successfully!");
      navigate("/admin/login");
    } catch (error) {
      console.error(
        "Admin register error:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Admin Register</h1>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={data.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
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
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={data.department}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="courseTaken"
          placeholder="Course Taken"
          value={data.courseTaken}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 p-2 rounded hover:bg-yellow-500">
          Register
        </button>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-yellow-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminRegister;
