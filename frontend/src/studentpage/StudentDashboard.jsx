import React, { useEffect, useState } from "react";
import Api from "../components/Api";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    bookname: "",
    author: "",
    description: "",
  });

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const studentId = localStorage.getItem("studentId");

        // Fetch student profile
        const { data } = await Api.get(`/students/profile/${studentId}`);
        setStudent(data.study);

        // Fetch all books and filter by studentId
        const booksRes = await Api.get(`/books/allbooks`);
        const myBooks = booksRes.data.allBooks.filter(
          (book) => book.userId === studentId
        );
        setBooks(myBooks);
      } catch (err) {
        console.error(
          "Profile fetch error:",
          err.response?.data || err.message
        );
      }
    };

    fetchStudentProfile();
  }, []);

  const handleChange = (e) =>
    setNewBook({ ...newBook, [e.target.name]: e.target.value });

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Api.post(`/books/materials`, {
        ...newBook,
        userId: localStorage.getItem("studentId"),
      });
      setBooks([...books, data.newBook]);
      setNewBook({ bookname: "", author: "", description: "" });
    } catch (err) {
      console.error("Add book error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {student ? (
        <>
          {/* Profile Header */}
          <div className="bg-white shadow rounded-2xl p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/80"
                alt="avatar"
                className="w-20 h-20 rounded-full"
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
                <b>Semester:</b> {student.semester || "N/A"}
              </p>
              <p>
                <b>Student ID:</b> {student.id}
              </p>
            </div>
          </div>

          {/* Books Section */}
          <div className="bg-white shadow rounded-2xl p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">My Books</h3>
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
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={newBook.author}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newBook.description}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 md:col-span-2"
              />
              <button
                type="submit"
                className="w-full md:col-span-2 bg-yellow-400 py-3 rounded-full font-semibold hover:bg-yellow-500">
                Add Book
              </button>
            </form>
          </div>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default StudentDashboard;
