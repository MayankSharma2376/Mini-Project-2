import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authAPI } from '../services/api';

// Loading Spinner Component
const LoadingSpinner = () => (
  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const EyeIcon = ({ onClick }) => (
  <svg onClick={onClick} className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
);

const EyeOffIcon = ({ onClick }) => (
  <svg onClick={onClick} className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .946-3.112 3.586-5.545 6.89-6.334M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18"></path></svg>
);

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Set the correct tab based on URL
  useEffect(() => {
    if (location.pathname === '/register') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location.pathname]);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Registration form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'volunteer',
    skills: [],
    location: '',
    bio: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSkillsChange = (e) => {
    const { value, checked } = e.target;
    setRegisterData(prev => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter(skill => skill !== value)
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await authAPI.login({
        email: loginData.email,
        password: loginData.password
      });

      // Store user data in localStorage first
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      toast.success('Login successful! Redirecting...');

      // Redirect immediately based on user role
      if (response.user?.role === 'admin') {
        navigate('/admin', { replace: true });
      } else if (response.user?.role === 'volunteer') {
        navigate('/volunteer', { replace: true });
      } else {
        navigate('/', { replace: true });
      }

    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 
        error.message || 
        'Login failed. Please check your credentials.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await authAPI.register({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        role: registerData.role,
        skills: registerData.skills,
        location: registerData.location,
        bio: registerData.bio
      });

      // Store user data in localStorage first
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      toast.success('Registration successful! Welcome to WasteZero!');

      // Redirect immediately after successful registration
      if (response.user?.role === 'admin') {
        navigate('/admin', { replace: true });
      } else if (response.user?.role === 'volunteer') {
        navigate('/volunteer', { replace: true });
      } else {
        navigate('/', { replace: true });
      }

    } catch (error) {
      console.error('Registration error:', error);
      setError(
        error.response?.data?.message || 
        error.message || 
        'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Panel: Branding and Features */}
      <div 
        className="w-full lg:w-1/2 bg-cover bg-center relative max-h-screen overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(34, 139, 34, 0.85) 0%, rgba(0, 100, 0, 0.75) 50%, rgba(0, 0, 0, 0.6) 100%), url("./Waste.jpg")',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-800/60 via-green-900/40 to-black/70"></div>
        <div className="relative z-10 px-6 lg:px-10 py-8 text-white h-full flex flex-col justify-between min-h-screen max-h-screen overflow-y-auto">
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <img src="./recycle.svg" alt="WasteZero Logo" className="w-6 h-6" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent tracking-tight">
              WasteZero
            </h1>
          </div>

          {/* Main Content Container */}
          <div className="flex-1 flex flex-col justify-center space-y-6">
            {/* Slogan and Description */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Join the{' '}
                <span className="text-green-300">Recycling</span>
                <br />
                Revolution
              </h2>
              <p className="text-gray-100 text-base lg:text-lg leading-relaxed max-w-sm font-light">
                Connect with a community dedicated to environmental change. Schedule pickups, track your impact, and help build a sustainable future.
              </p>
            </div>

            {/* Feature Cards Section */}
            <div className="grid grid-cols-1 gap-3 max-w-sm">
              {/* Feature Card 1 */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img src="./calendar.png" alt="calendar" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base leading-tight">Schedule Pickups</h3>
                    <p className="text-xs text-gray-200 font-light">Easy waste collection scheduling</p>
                  </div>
                </div>
              </div>
              
              {/* Feature Card 2 */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img src="./search.png" alt="search" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base leading-tight">Track Impact</h3>
                    <p className="text-xs text-gray-200 font-light">Monitor your environmental contribution</p>
                  </div>
                </div>
              </div>
              
              {/* Feature Card 3 */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img src="./hands.png" alt="hands" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base leading-tight">Volunteer</h3>
                    <p className="text-xs text-gray-200 font-light">Join community recycling initiatives</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="pt-6 border-t border-white/20">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-xl font-bold text-green-300">50K+</div>
                <div className="text-xs text-gray-300 font-light">Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-300">1M+</div>
                <div className="text-xs text-gray-300 font-light">Pickups</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-300">500+</div>
                <div className="text-xs text-gray-300 font-light">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Login/Registration Form */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex flex-col max-h-screen">
        {/* Fixed Header with Tabs */}
        <div className="flex-shrink-0 p-4 lg:p-6 pb-2 bg-gray-50 border-b border-gray-200">
          {/* Login/Register Toggle */}
          <div className="flex bg-gray-200 rounded-lg p-1 w-full max-w-sm mx-auto">
            <button 
              onClick={() => {
                setIsLogin(true);
                navigate('/login');
              }}
              className={`w-1/2 p-2 rounded-md font-semibold transition-all ${
                isLogin 
                  ? 'bg-white shadow-md text-[#4f685b] font-bold' 
                  : 'text-gray-600'
              }`}
            >
              Login
            </button>
            <button 
              onClick={() => {
                setIsLogin(false);
                navigate('/register');
              }}
              className={`w-1/2 p-2 rounded-md font-semibold transition-all ${
                !isLogin 
                  ? 'bg-white shadow-md text-[#4f685b] font-bold' 
                  : 'text-gray-600'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-6 scrollbar-hide">
          <div className="max-w-lg mx-auto w-full py-4">

          {/* Form Header */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Welcome back!' : 'Create a new account'}
            </h2>
            <p className="text-gray-500">
              {isLogin 
                ? 'Sign in to your WasteZero account' 
                : 'Fill in your details to join WasteZero'
              }
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          {/* Login Form */}
          {isLogin ? (
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Your email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#588157] focus:outline-none text-black placeholder-gray-500"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Your password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#588157] focus:outline-none text-black placeholder-gray-500 password-input"
                  autoComplete="current-password"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pt-6">
                  {showPassword ? <EyeOffIcon onClick={() => setShowPassword(false)} /> : <EyeIcon onClick={() => setShowPassword(true)} />}
                </div>
              </div>

              <div className="text-right">
                <button 
                  type="button" 
                  onClick={() => navigate('/forgot-password')}
                  className="text-sm text-[#588157] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#588157] text-white rounded-lg font-bold hover:bg-[#4f685b] focus:ring-2 focus:ring-[#588157] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading && <LoadingSpinner />}
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          ) : (
            /* Registration Form */
            <form className="space-y-3 pb-6" onSubmit={handleRegisterSubmit}>
              {/* Full Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    placeholder="Your full name"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#588157] focus:outline-none text-black placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    placeholder="Your email"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#588157] focus:outline-none text-black placeholder-gray-500"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={registerData.location}
                  onChange={handleRegisterChange}
                  placeholder="Your location"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#588157] focus:outline-none text-black placeholder-gray-500"
                  required
                />
              </div>

              {/* Password and Confirm Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    placeholder="Create a password"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#588157] focus:outline-none text-black placeholder-gray-500 password-input"
                    autoComplete="new-password"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pt-6">
                    {showPassword ? <EyeOffIcon onClick={() => setShowPassword(false)} /> : <EyeIcon onClick={() => setShowPassword(true)} />}
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    placeholder="Confirm your password"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#588157] focus:outline-none text-black placeholder-gray-500 password-input"
                    autoComplete="new-password"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pt-6">
                    {showConfirmPassword ? <EyeOffIcon onClick={() => setShowConfirmPassword(false)} /> : <EyeIcon onClick={() => setShowConfirmPassword(true)} />}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 !mt-1">*Password must be at least 6 characters long</p>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                <select
                  name="role"
                  value={registerData.role}
                  onChange={handleRegisterChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#588157] focus:outline-none appearance-none text-black"
                  required
                >
                  <option value="volunteer">Volunteer</option>
                  <option value="admin">Admin</option>
                  <option value="ngo">NGO</option>
                </select>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Skills & Interests</label>
                <div className="grid grid-cols-2 gap-2 max-h-20 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50 scrollbar-hide">
                  {['Waste Collection', 'Recycling Education', 'Community Organizing', 'Environmental Advocacy', 'Data Management', 'Social Media'].map((skill) => (
                    <label key={skill} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={skill}
                        checked={registerData.skills.includes(skill)}
                        onChange={handleSkillsChange}
                        className="form-checkbox text-[#588157] focus:ring-[#588157] w-3 h-3"
                      />
                      <span className="text-xs text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={registerData.bio}
                  onChange={handleRegisterChange}
                  placeholder="Tell us about yourself and your environmental interests..."
                  rows="2"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#588157] focus:outline-none text-black placeholder-gray-500 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#588157] text-white rounded-lg font-bold hover:bg-[#4f685b] focus:ring-2 focus:ring-[#588157] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading && <LoadingSpinner />}
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}