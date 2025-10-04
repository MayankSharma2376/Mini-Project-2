import React, { useEffect,useState } from 'react';
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
import MyProfile from './pages/MyProfile';
import { NotificationProvider } from './contexts/NotificationContext';
import { BlockedUserProvider, useBlockedUser } from './contexts/BlockedUserContext';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { setGlobalBlockedUserHandler } from './services/api';
import BlockedUserScreen from './components/BlockedUserScreen';
import AttendanceManager from './pages/AttendanceManager';
import NotFoundPage from './pages/NotFoundPage';
import SettingsPage from './pages/SettingsPage';

// Inner App component that uses BlockedUserContext
const AppContent = () => {
  const { isBlocked, blockInfo, user, handleBlockedUser, clearBlockedState } = useBlockedUser();

  useEffect(() => {
    // Set the global blocked user handler for API interceptor
    setGlobalBlockedUserHandler(handleBlockedUser);
    console.log('🔗 Global blocked user handler set');
    
    // Only clear blocked state on initial mount, not on unmount
    // This prevents clearing when user navigates between routes
  }, [handleBlockedUser]); // Removed clearBlockedState from dependencies

  // Debug the blocked user state
  console.log('🔍 App state check:', { isBlocked, blockInfo, user });

  // If user is blocked, show blocked screen (with fallback check)
  const shouldShowBlockedScreen = isBlocked || localStorage.getItem('user_blocked_state') === 'true';
  
  if (shouldShowBlockedScreen) {
    console.log('🚫 RENDERING BlockedUserScreen:', { 
      isBlocked, 
      blockInfo, 
      user, 
      fallbackTriggered: !isBlocked 
    });
    return <BlockedUserScreen blockInfo={blockInfo} user={user} />;
  }

  // Normal app content
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/forgot-password" element={<Forgot_Password />} />
        <Route path="/otp" element={<Forgot_Password />} />
        <Route path="/not-found" element={<NotFoundPage/>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="message" element={<MessagePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="attendance" element={<AttendanceManager />} /> 
          <Route path="settings" element={<SettingsPage/>} />
        </Route>

        {/* Volunteer Routes */}
        <Route path="/volunteer" element={<VolunteerLayout />}>
          <Route index element={<VolunteerDashboard />} />
          <Route path="dashboard" element={<VolunteerDashboard />} />
          <Route path="message" element={<MessagePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="settings" element={<SettingsPage/>} />
        </Route>

        {/* NGO Routes */}
        <Route path="/ngo" element={<NGOLayout />}>
          <Route index element={<NGODashboard />} />
          <Route path="dashboard" element={<NGODashboard />} />
          <Route path="message" element={<MessagePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="settings" element={<SettingsPage/>} />
        </Route>

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
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
  );
};

function App() {
  return (
    <ThemeProvider>
    <UserProvider>
      <NotificationProvider>
        <BlockedUserProvider>
          <Router>
            <AppContent />
          </Router>
        </BlockedUserProvider>
      </NotificationProvider>
    </UserProvider>
    </ThemeProvider>
  )
}

// Admin Layout Component with Navbar and Sidebar
const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
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