import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "../components/Api";

const StudentRegister = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    faculty: "",
    course: "",
    level: "",
    semester: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("/students/register", data);
      console.log("Student registration:", res.data);

      if (res.data.token) localStorage.setItem("token", res.data.token);
      if (res.data.user?._id)
        localStorage.setItem("studentId", res.data.user._id);

      alert("Student registered successfully!");
      navigate("/student/login");
    } catch (error) {
      console.error(
        "Student register error:",
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
        <h1 className="text-2xl font-bold text-center">Student Register</h1>
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
          name="faculty"
          placeholder="Faculty"
          value={data.faculty}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="level"
          placeholder="Level"
          value={data.level}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={data.course}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="semester"
          placeholder="Semester"
          value={data.semester}
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
          <Link to="/student/login" className="text-yellow-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default StudentRegister;
