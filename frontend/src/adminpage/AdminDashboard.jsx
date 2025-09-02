import React, { useEffect, useState } from "react";
import Api from "../components/Api";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [student, setStudent] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const adminId = localStorage.getItem("adminId");
        const { data } = await Api.get(`/admin/profile/${adminId}`);
        setAdmin(data.admin);
        console.log(data.admin);

        // fetch all books
        const bookRes = await Api.get(`/admin/allbooks`);
        console.log(bookRes.data.books);
        setBooks(bookRes.data.books || []);

        // fetch all students
        const studentRes = await Api.get(`/admin/students`);
        console.log(studentRes.data.students);
        setStudent(studentRes.data.students || []);
      } catch (err) {
        console.error(
          "Admin profile fetch error:",
          err.response?.data || err.message
        );
      }
    };
    fetchAdminProfile();
  }, []);

  // Delete Student
  const handleDeleteStudent = async (id) => {
    try {
      await Api.delete(`/admin/deletestudent/${id}`);
      setStudent(student.filter((s) => s._id !== id));
      alert("Student deleted ");
    } catch (err) {
      console.error("Delete student error:", err.response?.data || err.message);
      alert("Failed to delete student");
    }
  };

  // Delete Book
  const handleDeleteBook = async (id) => {
    try {
      await Api.delete(`/admin/deletebooks/${id}`);
      setBooks(books.filter((b) => b._id !== id));
      alert("Book deleted ");
    } catch (err) {
      console.error("Delete book error:", err.response?.data || err.message);
      alert("Failed to delete book ");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {admin ? (
        <>
          {/* Profile Header */}
          <div className="bg-white shadow rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src=""
                alt="avatar"
                className="w-30 h-30 rounded-full bg-red-200"
              />
              <div>
                <h2 className="text-2xl font-bold">{admin.name}</h2>
                <p className="text-gray-600">{admin.email}</p>
              </div>
            </div>
          </div>

          {/* Admin Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white shadow rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">
                Personal Information
              </h3>
              <p>
                <b>Name:</b> {admin.name}
              </p>
              <p>
                <b>Email:</b> {admin.email}
              </p>
              <p>
                <b>Department:</b> {admin.department || "N/A"}
              </p>
            </div>
            <div className="bg-white shadow rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Courses Taken</h3>
              <p>
                <b>Courses:</b> {admin.courseTaken || "N/A"}
              </p>
              <p>
                <b>Admin ID:</b> {admin.id}
              </p>
            </div>
          </div>

          {/* Students List */}
          <div className="bg-white shadow rounded-2xl p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">All Students</h3>
            {student.length > 0 ? (
              <ul className="space-y-2">
                {student.map((s) => (
                  <li
                    key={s._id}
                    className="flex justify-between items-center border p-2 rounded">
                    <span>
                      {s.name} - {s.email}
                    </span>
                    <button
                      onClick={() => handleDeleteStudent(s._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No students found.</p>
            )}
          </div>

          {/* Books List */}
          <div className="bg-white shadow rounded-2xl p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">All Books</h3>
            {books.length > 0 ? (
              <ul className="space-y-2">
                {books.map((b) => (
                  <li
                    key={b._id}
                    className="flex justify-between items-center border p-2 rounded">
                    <span>
                      {b.bookname} - {b.author}
                    </span>
                    <button
                      onClick={() => handleDeleteBook(b._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No books found.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading admin profile...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
