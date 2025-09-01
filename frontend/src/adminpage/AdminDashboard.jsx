import React, { useEffect, useState } from "react";
import Api from "../components/Api";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const adminId = localStorage.getItem("adminId");
        const { data } = await Api.get(`/admin/profile/${adminId}`);
        setAdmin(data.admin);
      } catch (err) {
        console.error(
          "Admin profile fetch error:",
          err.response?.data || err.message
        );
      }
    };
    fetchAdminProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {admin ? (
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
        </>
      ) : (
        <p>Loading admin profile...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
