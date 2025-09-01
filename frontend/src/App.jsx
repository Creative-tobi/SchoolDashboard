import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import StudentRegister from './studentpage/StudentRegister'
import StudentLogin from './studentpage/StudentLogin'
import StudentDashboard from './studentpage/StudentDashboard'
import AdminRegister from './adminpage/AdminRegister'
import AdminLogin from './adminpage/AdminLogin'
import AdminDashboard from './adminpage/AdminDashboard'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/student/register" element={<StudentRegister />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />

          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/" element={<StudentLogin />} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App
