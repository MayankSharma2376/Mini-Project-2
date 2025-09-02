import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { 
  LayoutDashboard, 
  Leaf, 
  Calendar, 
  MessageCircle, 
  User, 
  Settings,
  LogOut,
  HelpCircle
} from 'lucide-react'

const Side = () => {
  const navigate = useNavigate();

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
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Leaf, label: 'Eco Opportunities', active: false },
    { icon: Calendar, label: 'Pickup Schedule', active: false },
    { icon: MessageCircle, label: 'Messages', active: false },
    { icon: User, label: 'My Profile', active: false },
    { icon: Settings, label: 'Settings', active: false },
    { icon: HelpCircle, label: 'Help & Support', active: false },
  ]

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 w-64 h-screen bg-[#344e41] border-r border-[#588157] shadow-lg flex-col z-30">

      {/* Spacer for navbar */}
      <div className="h-16 bg-[#344e41]"></div>
      
      {/* Navigation Menu */}
      <nav className="p-4 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <li key={index}>
                <p
                  href="#"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group cursor-pointer ${
                    item.active
                      ? 'bg-[#588157] text-white shadow-md'
                      : 'text-[#dad7cd] hover:bg-[#588157] hover:text-white'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </p>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout Button - Fixed at bottom */}
      <div className="p-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-all duration-200 group cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Side