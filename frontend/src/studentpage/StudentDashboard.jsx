import React, { useEffect, useState } from "react";
import Api from "../components/Api";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newBook, setNewBook] = useState({
    bookname: "",
    author: "",
    description: "",
  });

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const studentId = localStorage.getItem("studentId");
        if (!studentId) {
          setError("No student ID found. Please log in again.");
          return;
        }

        // Fetch student profile
        const { data } = await Api.get(`/students/profile/${studentId}`);
        console.log(data);
        setStudent(data.stud);
        console.log("Student data:", data.stud);

        // Fetch all books and filter by studentId
        const booksRes = await Api.get(`/books/allbooks`);
        console.log("All books response:", booksRes.data);

        const myBooks = booksRes.data.allBooks.filter(
          (book) => book.userID == data.stud.id
        );
        console.log("Filtered books:", myBooks);

        localStorage.setItem("studentid", JSON.stringify(data.stud));
        setBooks(myBooks);
      } catch (err) {
        console.error(
          "Profile fetch error:",
          err.response?.data || err.message
        );
        setError("Failed to load profile data");
      }
    };

    fetchStudentProfile();
  }, []);

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const studentId = localStorage.getItem("studentId");
      if (!studentId) {
        setError("Student ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      console.log("Adding book with data:", {
        ...newBook,
        userID: studentId,
      });

      const { data } = await Api.post(`/books/materials`, {
        ...newBook,
        userID: studentId,
      });

      console.log("Add book response:", data);
      // Update the books list with the new book
      setBooks([...books, data.newBooks]);

      // Reset the form
      setNewBook({ bookname: "", author: "", description: "" });

      console.log("Book added successfully!");
    } catch (err) {
      console.error("Add book error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Failed to add book. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {student ? (
        <>
          {/* Profile Header */}
          <div className="bg-white shadow rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src=""
                alt="avatar"
                className="w-30 h-30 rounded-full bg-red-200 items-center"
              />
              <div>
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <p className="text-gray-600">{student.email}</p>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white shadow rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">
                Personal Information
              </h3>
              <p>
                <b>Name:</b> {student.name}
              </p>
              <p>
                <b>Email:</b> {student.email}
              </p>
              <p>
                <b>Faculty:</b> {student.faculty || "N/A"}
              </p>
            </div>
            <div className="bg-white shadow rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Academic Details</h3>
              <p>
                <b>Course:</b> {student.course || "N/A"}
              </p>
              <p>
                <b>Level:</b> {student.level || "N/A"}
              </p>
              <p>
                <b>Semester:</b> {student.semester || "N/A"}
              </p>
              <p>
                <b>Student ID:</b> {student.id}
              </p>
            </div>
          </div>

          {/* Books Section */}
          <div className="bg-white shadow rounded-2xl p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">
              My Books ({books.length})
            </h3>
            {books.length > 0 ? (
              <ul className="space-y-3">
                {books.map((book) => (
                  <li
                    key={book._id}
                    className="border p-3 rounded-lg shadow-sm">
                    <b>{book.bookname}</b> by {book.author}
                    <p className="text-sm text-gray-600">{book.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No books added yet.</p>
            )}
          </div>

          {/* Add Book Form */}
          <div className="bg-white shadow rounded-2xl p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Add a Book</h3>
            <form
              onSubmit={handleAddBook}
              className="space-y-4 grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="bookname"
                placeholder="Book Name"
                value={newBook.bookname}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={newBook.author}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newBook.description}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 md:col-span-2 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full md:col-span-2 bg-yellow-400 py-3 rounded-full font-semibold hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? "Adding Book..." : "Add Book"}
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg">Loading profile...</p>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
