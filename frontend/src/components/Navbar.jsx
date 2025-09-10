import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SearchIcon, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';


const Navbar = () => {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Show success message
    toast.success('Logged out successfully!');

    // Redirect to login page and replace current history entry
    navigate('/login', { replace: true });

    // Clear browser history to prevent back navigation to protected routes
    window.history.replaceState(null, '', '/login');

    // Close dropdown
    setShowProfileDropdown(false);
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleNotificationClick = () => {
    // Navigate to notifications page based on user role
    const userRole = user.role || 'volunteer'; // Default to volunteer if no role
    if (userRole === 'admin') {
      navigate('/admin/notifications');
    } else if (userRole === 'ngo') {
      navigate('/ngo/notifications');
    } else {
      navigate('/volunteer/notifications');
    }
  };
  
  return (
    <>
      <nav className='fixed top-0 left-0 right-0 h-16 z-[100] bg-[#344e41] w-full'>
        <div className='flex justify-between items-center h-full px-6'>
          {/* left panel - logo */}
          <div className='flex items-center'>
            <img src="./recycle.svg" alt="WasteZero Logo" className="size-11 rounded-full" />
            <span className="ml-2 text-xl hidden md:block font-semibold text-white">WasteZero</span>
          </div>

          {/* center - navigation items */}
          {/* <div className='flex space-x-6'>
            {["Dashboard", "Opportunities", "Schedule Pickup", "Message", "My Profile"].map((key, index) => {
              return (
                <p key={index} className='p-2 text-[#dad7cd] hover:text-white cursor-pointer transition-colors duration-200 hidden lg:flex'>{key}</p>
              )
            })}
          </div> */}

          {/* right panel - search and avatar */}
          <div className='flex items-center gap-5'>
            <div className='flex items-center border border-gray-300 rounded-full px-3 py-1 bg-white focus-within:ring-2 focus-within:ring-gray-300 focus-within:ring-opacity-50 transition-all duration-200'>
              <SearchIcon className='text-gray-400 size-5 mr-2 flex-shrink-0' />
              <input type="text" placeholder="Search opportunities..." className="outline-none bg-transparent flex-1 text-gray-700 placeholder-gray-400" />
            </div>
            <div>
              <button 
                onClick={handleNotificationClick}
                className="p-2 hover:bg-[#588157] rounded-lg transition-colors duration-200"
              >
                <Bell className='text-white size-5' />
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className='relative z-50' ref={dropdownRef}>
              <div
                className='flex items-center gap-2 cursor-pointer hover:bg-[#588157] rounded-lg p-2 transition-colors duration-200'
                onClick={handleProfileClick}
              >
                <div className='size-8 bg-[#dad7cd] opacity-70 hover:opacity-100 rounded-full flex items-center justify-center'>
                  <User className='w-4 h-4 text-[#344e41]' />
                </div>
                <span className='text-white text-sm font-medium hidden md:block'>
                  {user.name || 'User'}
                </span>
                <ChevronDown className='w-4 h-4 text-white hidden md:block' />
              </div>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'>
                  <div className='px-4 py-2 border-b border-gray-100'>
                    <p className='text-sm font-medium text-gray-900'>{user.name || 'User'}</p>
                    <p className='text-sm text-gray-500'>{user.email || 'user@example.com'}</p>
                    <span className='inline-block px-2 py-1 mt-1 text-xs bg-green-100 text-green-800 rounded-full'>
                      {user.role || 'User'}
                    </span>
                  </div>

                  <button
                    className='w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200'
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <User className='w-4 h-4' />
                    My Profile
                  </button>

                  <button
                    className='w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200'
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <Settings className='w-4 h-4' />
                    Settings
                  </button>

                  <hr className='my-1' />

                  <button
                    className='w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200'
                    onClick={handleLogout}
                  >
                    <LogOut className='w-4 h-4' />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;