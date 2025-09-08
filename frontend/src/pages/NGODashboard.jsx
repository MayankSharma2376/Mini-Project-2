import React, { useState, useEffect } from 'react'
import {
  Users,
  Calendar,
  TrendingUp,
  MapPin,
  MessageSquare,
  RefreshCw,
  Plus,
  X,
  Save,
  Clock,
  Phone,
  Mail,
  Eye,
  Edit,
  UserCheck,
  Heart,
  Award,
  Target,
  Activity,
  BarChart3
} from 'lucide-react'
import { ngoAPI } from '../services/api'
import { toast } from 'react-toastify'

const NGODashboard = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCreateEventModal, setShowCreateEventModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard') // dashboard, events, volunteers

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

  // NGO Events State (limited to NGO-created events)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Community Garden Project',
      description: 'Create sustainable community gardens in urban areas',
      location: 'Green Valley Community Center',
      date: '2025-09-20',
      capacity: 30,
      registered: 15,
      status: 'active',
      category: 'Environmental',
      createdBy: 'Green Earth NGO'
    },
    {
      id: 2,
      title: 'Recycling Awareness Workshop',
      description: 'Educational workshop on proper recycling practices',
      location: 'Community Library',
      date: '2025-09-25',
      capacity: 25,
      registered: 18,
      status: 'active',
      category: 'Education',
      createdBy: 'Green Earth NGO'
    },
    {
      id: 3,
      title: 'River Cleanup Drive',
      description: 'Clean the local river and restore its natural beauty',
      location: 'Riverside Park',
      date: '2025-09-30',
      capacity: 50,
      registered: 35,
      status: 'active',
      category: 'Environmental',
      createdBy: 'Green Earth NGO'
    }
  ])

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    capacity: '',
    category: 'Environmental'
  })

  // Volunteer Management State (volunteers registered for NGO events)
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      phone: '+1 234-567-8901',
      skills: ['Environmental Advocacy', 'Event Planning'],
      registeredEvents: ['Community Garden Project', 'River Cleanup Drive'],
      totalHours: 25,
      status: 'active',
      joinDate: '2024-08-15'
    },
    {
      id: 2,
      name: 'Robert Chen',
      email: 'robert.chen@email.com',
      phone: '+1 234-567-8902',
      skills: ['Education', 'Public Speaking'],
      registeredEvents: ['Recycling Awareness Workshop'],
      totalHours: 12,
      status: 'active',
      joinDate: '2024-09-01'
    },
    {
      id: 3,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 234-567-8903',
      skills: ['Community Outreach', 'Social Media'],
      registeredEvents: ['Community Garden Project', 'Recycling Awareness Workshop'],
      totalHours: 18,
      status: 'active',
      joinDate: '2024-07-20'
    }
  ])

  // NGO Dashboard Stats
  const [stats, setStats] = useState([
    {
      title: 'Active Events',
      value: '3',
      change: '+2',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Volunteers',
      value: '68',
      change: '+12',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Total Impact Hours',
      value: '340',
      change: '+45',
      icon: Clock,
      color: 'bg-purple-500'
    },
    {
      title: 'Events Completed',
      value: '15',
      change: '+3',
      icon: Award,
      color: 'bg-orange-500'
    }
  ])

  // Create new event
  const handleCreateEvent = async () => {
    if (!newEvent.title || !newEvent.description || !newEvent.location || 
        !newEvent.date || !newEvent.capacity) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      // In real app, this would be an API call
      // const response = await ngoAPI.createEvent(newEvent)
      
      const eventToAdd = {
        id: events.length + 1,
        ...newEvent,
        capacity: parseInt(newEvent.capacity),
        registered: 0,
        status: 'active',
        createdBy: 'Green Earth NGO' // This would come from user context
      }
      
      setEvents([...events, eventToAdd])
      setNewEvent({
        title: '',
        description: '',
        location: '',
        date: '',
        capacity: '',
        category: 'Environmental'
      })
      setShowCreateEventModal(false)
      toast.success('Event created successfully!')
    } catch (error) {
      toast.error('Failed to create event')
      console.error('Error creating event:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle event status update
  const updateEventStatus = async (eventId, newStatus) => {
    try {
      setLoading(true)
      // In real app: await ngoAPI.updateEvent(eventId, { status: newStatus })
      
      setEvents(events.map(event => 
        event.id === eventId ? { ...event, status: newStatus } : event
      ))
      toast.success(`Event ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`)
    } catch (error) {
      toast.error('Failed to update event status')
    } finally {
      setLoading(false)
    }
  }

  // Load data on component mount
  useEffect(() => {
    // In real app, load NGO data from API
    // loadNGODashboardData()
  }, [])

  const renderDashboardTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change} this month</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowCreateEventModal(true)}
            className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5 text-blue-600 mr-3" />
            <span className="text-blue-800 font-medium">Create New Event</span>
          </button>
          <button
            onClick={() => setActiveTab('volunteers')}
            className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
          >
            <Users className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-green-800 font-medium">Manage Volunteers</span>
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
          >
            <Calendar className="w-5 h-5 text-purple-600 mr-3" />
            <span className="text-purple-800 font-medium">View All Events</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <UserCheck className="w-5 h-5 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-800">New volunteer registered for River Cleanup Drive</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-800">Recycling Workshop event updated</p>
              <p className="text-xs text-gray-500">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Heart className="w-5 h-5 text-red-500 mr-3" />
            <div>
              <p className="text-sm text-gray-800">Community Garden Project received positive feedback</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEventsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Events</h2>
        <button
          onClick={() => setShowCreateEventModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Event
        </button>
      </div>

      <div className="grid gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.status === 'active' ? 'bg-green-100 text-green-800' :
                    event.status === 'full' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{event.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {event.registered}/{event.capacity} registered
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateEventStatus(event.id, event.status === 'active' ? 'inactive' : 'active')}
                  className={`p-2 rounded-lg ${
                    event.status === 'active' 
                      ? 'text-orange-600 hover:bg-orange-50' 
                      : 'text-green-600 hover:bg-green-50'
                  }`}
                  title={event.status === 'active' ? 'Deactivate Event' : 'Activate Event'}
                >
                  {event.status === 'active' ? <X className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                </button>
                <button
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(event.registered / event.capacity) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderVolunteersTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Registered Volunteers</h2>
      
      <div className="grid gap-4">
        {volunteers.map((volunteer) => (
          <div key={volunteer.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{volunteer.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    volunteer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {volunteer.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {volunteer.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {volunteer.phone}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {volunteer.totalHours} volunteer hours
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {new Date(volunteer.joinDate).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {volunteer.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Registered Events:</p>
                  <div className="flex flex-wrap gap-2">
                    {volunteer.registeredEvents.map((event, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  title="Contact Volunteer"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Create Event Modal
  const CreateEventModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-90vh overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Create New Event</h3>
            <button
              onClick={() => setShowCreateEventModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter event title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the event"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Event location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity *
              </label>
              <input
                type="number"
                value={newEvent.capacity}
                onChange={(e) => setNewEvent({...newEvent, capacity: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Maximum participants"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={newEvent.category}
                onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Environmental">Environmental</option>
                <option value="Education">Education</option>
                <option value="Community">Community</option>
                <option value="Health">Health</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowCreateEventModal(false)}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateEvent}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                  NGO Dashboard
                </h1>
                <p className="text-gray-500 text-sm">Event & Volunteer Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.location.reload()}
                disabled={loading}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={() => setShowCreateEventModal(true)}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create Event</span>
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
              { id: 'events', label: 'My Events', icon: Calendar, hideOnMobile: false },
              { id: 'volunteers', label: 'Volunteers', icon: Users, hideOnMobile: false }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors flex-shrink-0 focus:outline-none  ${
                  activeTab === tab.id
                    ? 'text-green-700 bg-green-50 border border-green-200'
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
        {activeTab === 'dashboard' && renderDashboardTab()}
        {activeTab === 'events' && renderEventsTab()}
        {activeTab === 'volunteers' && renderVolunteersTab()}
      </div>

      {/* Modals */}
      {showCreateEventModal && <CreateEventModal />}
    </div>
  )
}

export default NGODashboard
