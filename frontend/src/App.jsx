import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import AuthPage from './pages/AuthPage'
import AdminDashboard from './pages/AdminDashboard'
import VolunteerDashboard from './pages/VolunteerDashboard'
import NGODashboard from './pages/NGODashboard'
import NotificationsPage from './pages/NotificationsPage'
import AppFooter from './components/AppFooter';
import Navbar from './components/Navbar';
import Sidebar from './components/Side';
import Forgot_Password from './pages/Forgot_Password';
import Homepage from './pages/Homepage';
import MessagePage from './pages/MessagePage';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/forgot-password" element={<Forgot_Password />} />
          <Route path="/otp" element={<Forgot_Password />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="message" element={<MessagePage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>

          {/* Volunteer Routes */}
          <Route path="/volunteer" element={<VolunteerLayout />}>
            <Route index element={<VolunteerDashboard />} />
            <Route path="dashboard" element={<VolunteerDashboard />} />
            <Route path="message" element={<MessagePage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>

          {/* NGO Routes */}
          <Route path="/ngo" element={<NGOLayout />}>
            <Route index element={<NGODashboard />} />
            <Route path="dashboard" element={<NGODashboard />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  )
}

// Admin Layout Component with Navbar and Sidebar
const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />
      <Sidebar />
      {/* Main content area with left margin to account for sidebar on desktop only */}
      <div className="lg:ml-64">
        <Outlet />
        <AppFooter />
      </div>
    </div>
  )
}

const VolunteerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />
      <Sidebar />
      {/* Main content area with left margin to account for sidebar on desktop only */}
      <div className="lg:ml-64">
        <Outlet />
        <AppFooter />
      </div>
    </div>
  )
}

const NGOLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />
      <Sidebar />
      {/* Main content area with left margin to account for sidebar on desktop only */}
      <div className="lg:ml-64">
        <Outlet />
        <AppFooter />
      </div>
    </div>
  )
}

export default App