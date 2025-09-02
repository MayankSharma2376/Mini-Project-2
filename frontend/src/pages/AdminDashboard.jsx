import React, { useState, useEffect } from 'react'
import {
  Users,
  Recycle,
  Calendar,
  BarChart3,
  TrendingUp,
  MapPin,
  MessageSquare,
  Settings,
  RefreshCw,
  Plus,
  X,
  Save,
  Leaf,
  Truck,
  Package,
  Clock,
  Phone,
  Mail,
  Eye,
  Edit,
  UserCheck,
  Navigation
} from 'lucide-react'
import { adminAPI } from '../services/api'

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard') // dashboard, pickups, agents

  // Check if mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024 // lg breakpoint
      setIsMobile(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      title: 'Electronics Recycling Drive',
      description: 'Collect old electronics for proper recycling',
      location: 'Downtown Community Center',
      date: '2025-09-15',
      capacity: 50,
      registered: 23,
      status: 'active',
      category: 'Electronics'
    },
    {
      id: 2,
      title: 'Beach Cleanup Initiative',
      description: 'Help clean up the coastline and protect marine life',
      location: 'Sunset Beach',
      date: '2025-09-22',
      capacity: 100,
      registered: 78,
      status: 'active',
      category: 'Environmental'
    },
    {
      id: 3,
      title: 'Paper Recycling Workshop',
      description: 'Learn about paper recycling and create recycled paper crafts',
      location: 'Green Library',
      date: '2025-09-08',
      capacity: 30,
      registered: 30,
      status: 'full',
      category: 'Education'
    }
  ])

  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    capacity: '',
    category: 'Environmental'
  })

  // Pickup Management State
  const [pickups, setPickups] = useState([
    {
      id: 1,
      customer: 'John Smith',
      address: '123 Main St, Downtown',
      wasteType: 'Recyclable Materials',
      estimatedWeight: '25 kg',
      scheduledDate: '2025-09-05',
      status: 'pending',
      agent: 'Mike Johnson',
      contactNumber: '+1 234-567-8901',
      notes: 'Large amount of cardboard and plastic bottles'
    },
    {
      id: 2,
      customer: 'Sarah Wilson',
      address: '456 Oak Ave, Suburbs',
      wasteType: 'Electronic Waste',
      estimatedWeight: '15 kg',
      scheduledDate: '2025-09-06',
      status: 'in-progress',
      agent: 'David Brown',
      contactNumber: '+1 234-567-8902',
      notes: 'Old computer equipment and cables'
    },
    {
      id: 3,
      customer: 'Bob Martinez',
      address: '789 Pine St, City Center',
      wasteType: 'Organic Waste',
      estimatedWeight: '40 kg',
      scheduledDate: '2025-09-04',
      status: 'completed',
      agent: 'Lisa Anderson',
      contactNumber: '+1 234-567-8903',
      notes: 'Composting materials from restaurant'
    }
  ])

  // Agent Management State
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Mike Johnson',
      phone: '+1 234-567-9001',
      email: 'mike.johnson@wastezero.com',
      vehicleNumber: 'WZ-001',
      status: 'active',
      assignedPickups: 5,
      completedToday: 3,
      location: 'Downtown Area',
      rating: 4.8,
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'David Brown',
      phone: '+1 234-567-9002',
      email: 'david.brown@wastezero.com',
      vehicleNumber: 'WZ-002',
      status: 'active',
      assignedPickups: 3,
      completedToday: 1,
      location: 'Suburbs',
      rating: 4.6,
      joinDate: '2024-02-20'
    },
    {
      id: 3,
      name: 'Lisa Anderson',
      phone: '+1 234-567-9003',
      email: 'lisa.anderson@wastezero.com',
      vehicleNumber: 'WZ-003',
      status: 'off-duty',
      assignedPickups: 4,
      completedToday: 4,
      location: 'City Center',
      rating: 4.9,
      joinDate: '2023-11-10'
    }
  ])

  // Mock data - in real app, this would come from API
  const [stats, setStats] = useState([
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Waste Collected',
      value: '18.5 tons',
      change: '+8%',
      icon: Recycle,
      color: 'bg-green-500'
    },
    {
      title: 'Scheduled Pickups',
      value: '147',
      change: '+23%',
      icon: Calendar,
      color: 'bg-orange-500'
    },
    {
      title: 'Active Drivers',
      value: '42',
      change: '+5%',
      icon: MapPin,
      color: 'bg-purple-500'
    }
  ])

  const [recentActivities, setRecentActivities] = useState([
    { user: 'John Doe', action: 'Scheduled pickup', time: '2 hours ago', location: 'Downtown' },
    { user: 'Jane Smith', action: 'Completed recycling', time: '3 hours ago', location: 'Suburbs' },
    { user: 'Mike Johnson', action: 'Registered account', time: '5 hours ago', location: 'City Center' },
    { user: 'Sarah Wilson', action: 'Updated profile', time: '1 day ago', location: 'North District' },
  ])

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // const statsData = await adminAPI.getDashboardStats()
      // const activitiesData = await adminAPI.getRecentActivities()
      // setStats(statsData)
      // setRecentActivities(activitiesData)

      console.log('Dashboard data loaded successfully')
    } catch (err) {
      setError('Failed to load dashboard data')
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Export report function
  const handleExportReport = async () => {
    try {
      setLoading(true)
      // const reportData = await adminAPI.exportReport('dashboard', 'pdf')
      // Handle download logic here
      console.log('Report export initiated')
      alert('Report export feature will be implemented with backend!')
    } catch (err) {
      console.error('Error exporting report:', err)
      alert('Failed to export report')
    } finally {
      setLoading(false)
    }
  }

  // Create opportunity function
  const handleCreateOpportunity = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      
      // Validate form
      if (!newOpportunity.title || !newOpportunity.description || !newOpportunity.location || !newOpportunity.date || !newOpportunity.capacity) {
        alert('Please fill in all required fields')
        return
      }

      // Create new opportunity object
      const opportunity = {
        id: opportunities.length + 1,
        ...newOpportunity,
        capacity: parseInt(newOpportunity.capacity),
        registered: 0,
        status: 'active'
      }

      // Add to opportunities list
      setOpportunities(prev => [opportunity, ...prev])
      
      // Reset form
      setNewOpportunity({
        title: '',
        description: '',
        location: '',
        date: '',
        capacity: '',
        category: 'Environmental'
      })
      
      // Close modal
      setShowCreateModal(false)
      
      // In real app, would call API:
      // await adminAPI.createOpportunity(opportunity)
      
      console.log('Opportunity created:', opportunity)
      alert('Opportunity created successfully!')
      
    } catch (err) {
      console.error('Error creating opportunity:', err)
      alert('Failed to create opportunity')
    } finally {
      setLoading(false)
    }
  }

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setNewOpportunity(prev => ({
      ...prev,
      [field]: value
    }))
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-[#344e41] text-white px-4 py-2 rounded-lg hover:bg-[#588157] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                  WasteZero Admin
                </h1>
                <p className="text-gray-500 text-sm">Environmental Impact Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={fetchDashboardData}
                disabled={loading}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={handleExportReport}
                disabled={loading}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 py-3">
            {[
              { id: 'dashboard', label: 'Overview', icon: BarChart3, hideOnMobile: false },
              { id: 'pickups', label: 'Pickups', icon: Package, hideOnMobile: false },
              { id: 'agents', label: 'Agents', icon: Truck, hideOnMobile: false }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors flex-shrink-0 focus:outline-none  ${
                  activeTab === tab.id
                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-sm text-emerald-600 font-medium">{stat.change}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-emerald-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Opportunities Section */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Environmental Opportunities</h2>
                    <p className="text-gray-600 text-sm">Create and manage community eco-initiatives</p>
                  </div>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Create Opportunity</span>
                    <span className="sm:hidden">Create</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {opportunities.map((opportunity) => (
                  <div key={opportunity.id} className="group border border-gray-200 rounded-xl p-4 lg:p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 bg-white/50">
                    <div className="flex items-start justify-between mb-3 lg:mb-4">
                      <div className="flex items-center space-x-2 lg:space-x-3">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-[#588157] to-[#a3b18a] rounded-lg lg:rounded-xl flex items-center justify-center">
                          <Leaf className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                        </div>
                        <span className={`px-2 lg:px-3 py-1 text-xs font-semibold rounded-full ${
                          opportunity.status === 'active' ? 'bg-green-100 text-green-700 border border-green-200' :
                          opportunity.status === 'full' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                          'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}>
                          {opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 lg:px-3 py-1 rounded-full border">
                        {opportunity.category}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-[#344e41] transition-colors text-sm lg:text-base">{opportunity.title}</h3>
                    <p className="text-xs lg:text-sm text-gray-600 mb-3 lg:mb-4 line-clamp-2 leading-relaxed">{opportunity.description}</p>
                    
                    <div className="space-y-2 lg:space-y-3">
                      <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-600">
                        <MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-[#588157]" />
                        <span className="truncate">{opportunity.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-600">
                        <Calendar className="w-3 h-3 lg:w-4 lg:h-4 text-[#588157]" />
                        <span>{new Date(opportunity.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-600">
                          <Users className="w-3 h-3 lg:w-4 lg:h-4 text-[#588157]" />
                          <span>{opportunity.registered}/{opportunity.capacity}</span>
                        </div>
                        <div className="w-16 lg:w-20 bg-gray-200 rounded-full h-1.5 lg:h-2">
                          <div 
                            className="bg-gradient-to-r from-[#588157] to-[#a3b18a] h-1.5 lg:h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min((opportunity.registered / opportunity.capacity) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activities */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Recent Activities</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-emerald-600 font-semibold text-sm">
                            {activity.user.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.user}</p>
                          <p className="text-sm text-gray-600">{activity.action} in {activity.location}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{activity.time}</span>
                    </div>
                  ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Users, label: 'Manage Users', color: 'bg-blue-600' },
                      { icon: Calendar, label: 'Schedule Pickups', color: 'bg-emerald-600' },
                      { icon: BarChart3, label: 'View Reports', color: 'bg-purple-600' },
                      { icon: MessageSquare, label: 'Messages', color: 'bg-orange-600' }
                    ].map((action, index) => (
                      <button 
                        key={index}
                        className={`p-4 ${action.color} hover:opacity-90 text-white rounded-lg transition-all flex flex-col items-center space-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                      >
                        <action.icon className="w-6 h-6" />
                        <span className="text-sm font-medium text-center">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <h3 className="text-lg font-bold text-gray-900">Waste Collection Trends</h3>
                  <div className="flex space-x-2">
                    {['Week', 'Month', 'Year'].map((period, index) => (
                      <button 
                        key={period}
                        className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                          index === 0 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-emerald-600" />
                    </div>
                    <p className="text-gray-600 font-medium">Chart visualization will be implemented here</p>
                    <p className="text-sm text-gray-500 mt-1">Integration with Chart.js or Recharts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pickup Management Tab Content */}
        {activeTab === 'pickups' && (
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Pickup Management
                </h2>
                <p className="text-gray-600 text-sm">Monitor and manage waste pickup requests efficiently</p>
              </div>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Schedule Pickup</span>
                <span className="sm:hidden">Schedule</span>
              </button>
            </div>

            {/* Pickup Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: Clock, 
                  label: 'Pending', 
                  value: pickups.filter(p => p.status === 'pending').length, 
                  color: 'bg-orange-100',
                  iconColor: 'text-orange-600'
                },
                { 
                  icon: Truck, 
                  label: 'In Progress', 
                  value: pickups.filter(p => p.status === 'in-progress').length, 
                  color: 'bg-blue-100',
                  iconColor: 'text-blue-600'
                },
                { 
                  icon: UserCheck, 
                  label: 'Completed', 
                  value: pickups.filter(p => p.status === 'completed').length, 
                  color: 'bg-green-100',
                  iconColor: 'text-green-600'
                },
                { 
                  icon: Package, 
                  label: 'Total Weight', 
                  value: '80 kg', 
                  color: 'bg-purple-100',
                  iconColor: 'text-purple-600'
                }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pickup Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <h3 className="text-lg font-bold text-gray-900">Recent Pickups</h3>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="text" 
                      placeholder="Search pickups..." 
                      className="flex-1 lg:flex-none lg:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm focus:outline-none"
                    />
                    <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Mobile Card View */}
              <div className="lg:hidden divide-y divide-gray-200">
                {pickups.map((pickup) => (
                  <div key={pickup.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-emerald-600 font-semibold text-sm">
                            {pickup.customer.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{pickup.customer}</div>
                          <div className="text-xs text-gray-500">{pickup.contactNumber}</div>
                        </div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full border ${
                        pickup.status === 'pending' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                        pickup.status === 'in-progress' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                        pickup.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' :
                        'bg-gray-100 text-gray-700 border-gray-200'
                      }`}>
                        {pickup.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <span className="text-gray-900 truncate">{pickup.address}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600">{pickup.wasteType}</span>
                          <span className="font-semibold text-gray-900">{pickup.estimatedWeight}</span>
                        </div>
                        <span className="text-gray-600">
                          {new Date(pickup.scheduledDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">Agent: {pickup.agent}</div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        View Details
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      {['Customer', 'Location', 'Waste Type', 'Weight', 'Date', 'Agent', 'Status', 'Actions'].map(header => (
                        <th key={header} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pickups.map((pickup) => (
                      <tr key={pickup.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                              <span className="text-emerald-600 font-semibold text-sm">
                                {pickup.customer.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{pickup.customer}</div>
                              <div className="text-xs text-gray-500">{pickup.contactNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm text-gray-900 max-w-xs truncate">{pickup.address}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                            {pickup.wasteType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{pickup.estimatedWeight}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(pickup.scheduledDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{pickup.agent}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full border ${
                            pickup.status === 'pending' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                            pickup.status === 'in-progress' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                            pickup.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' :
                            'bg-gray-100 text-gray-700 border-gray-200'
                          }`}>
                            {pickup.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Agent Management Tab Content */}
        {activeTab === 'agents' && (
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Agent Management
                </h2>
                <p className="text-gray-600 text-sm">Manage pickup agents and their performance</p>
              </div>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Agent</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>

            {/* Agent Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: Users, 
                  label: 'Total Agents', 
                  value: agents.length, 
                  color: 'bg-blue-100',
                  iconColor: 'text-blue-600'
                },
                { 
                  icon: UserCheck, 
                  label: 'Active', 
                  value: agents.filter(a => a.status === 'active').length, 
                  color: 'bg-green-100',
                  iconColor: 'text-green-600'
                },
                { 
                  icon: Clock, 
                  label: 'Off Duty', 
                  value: agents.filter(a => a.status === 'off-duty').length, 
                  color: 'bg-orange-100',
                  iconColor: 'text-orange-600'
                },
                { 
                  icon: Package, 
                  label: 'Avg Rating', 
                  value: '4.8⭐', 
                  color: 'bg-purple-100',
                  iconColor: 'text-purple-600'
                }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Agent Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <div key={agent.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <span className="text-emerald-600 font-bold text-xl">
                            {agent.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                          agent.status === 'active' ? 'bg-green-500' :
                          agent.status === 'off-duty' ? 'bg-gray-400' :
                          'bg-red-500'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          agent.status === 'active' ? 'bg-green-100 text-green-700' :
                          agent.status === 'off-duty' ? 'bg-gray-100 text-gray-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {agent.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Phone, label: agent.phone, color: 'text-blue-600' },
                      { icon: Mail, label: agent.email, color: 'text-green-600' },
                      { icon: Truck, label: agent.vehicleNumber, color: 'text-purple-600' },
                      { icon: Navigation, label: agent.location, color: 'text-orange-600' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        <span className="text-sm font-medium text-gray-900 truncate">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-emerald-600">{agent.assignedPickups}</div>
                      <div className="text-xs text-gray-600">Assigned</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-emerald-600">{agent.completedToday}</div>
                      <div className="text-xs text-gray-600">Completed</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < Math.floor(agent.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-bold text-gray-900">{agent.rating}</span>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">
                      Since {new Date(agent.joinDate).getFullYear()}
                    </span>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      View Details
                    </button>
                    <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Create Opportunity Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-200/50">
            <div className="bg-gradient-to-r from-[#344e41] to-[#588157] px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Create New Opportunity</h3>
                    <p className="text-white/80 text-sm">Build a new environmental initiative</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors focus:outline-none focus:ring-0"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div className="p-8 overflow-y-auto scrollbar-hide max-h-[calc(90vh-120px)]">
              <form onSubmit={handleCreateOpportunity} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Opportunity Title *
                    </label>
                    <input
                      type="text"
                      value={newOpportunity.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#588157] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none"
                      placeholder="Enter an engaging title for your opportunity"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Description *
                    </label>
                    <textarea
                      value={newOpportunity.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#588157] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none focus:outline-none"
                      placeholder="Describe the environmental impact and activities involved"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Category *
                    </label>
                    <select
                      value={newOpportunity.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#588157] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none"
                    >
                      <option value="Environmental">🌱 Environmental</option>
                      <option value="Electronics">💻 Electronics</option>
                      <option value="Education">📚 Education</option>
                      <option value="Community">🤝 Community</option>
                      <option value="Recycling">♻️ Recycling</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={newOpportunity.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#588157] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none"
                      placeholder="Where will this take place?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      value={newOpportunity.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#588157] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Maximum Participants *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={newOpportunity.capacity}
                      onChange={(e) => handleInputChange('capacity', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#588157] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="How many people can join?"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#344e41] to-[#588157] text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2 font-semibold"
                  >
                    {loading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Create Opportunity</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard