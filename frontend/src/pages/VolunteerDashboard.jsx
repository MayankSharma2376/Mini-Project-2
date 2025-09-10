import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  Star,
  Bell,
  Award,
  Activity,
  Heart,
  TrendingUp
} from 'lucide-react';
import { toast } from 'react-toastify';
import StatCard from '../components/StatCard';
import OpportunityCard from '../components/OpportunityCard';
import RecentNotifications from '../components/RecentNotifications';
import UpcomingPickups from '../components/UpcomingPickups';
import { volunteerAPI } from '../services/api';

export default function VolunteerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    acceptedApplications: 0,
    totalHoursVolunteered: 0,
    upcomingEvents: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Load dashboard data
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      console.log('Loading volunteer dashboard data...');
      
      const [statsResponse, opportunitiesResponse, applicationsResponse] = await Promise.all([
        volunteerAPI.getDashboardStats(),
        volunteerAPI.getAllOpportunities(),
        volunteerAPI.getMyApplications()
      ]);

      console.log('Stats response:', statsResponse);
      console.log('Opportunities response:', opportunitiesResponse);
      console.log('Applications response:', applicationsResponse);

      // Extract data from API responses
      const statsData = statsResponse.data || statsResponse;
      const opportunitiesData = opportunitiesResponse.data || opportunitiesResponse;
      const applicationsData = applicationsResponse.data || applicationsResponse;

      console.log('Processed stats:', statsData);
      console.log('Processed opportunities:', opportunitiesData);
      console.log('Processed applications:', applicationsData);

      setStats({
        totalApplications: statsData.totalApplications || 0,
        acceptedApplications: statsData.acceptedApplications || 0,
        totalHoursVolunteered: statsData.totalHoursVolunteered || 0,
        upcomingEvents: statsData.upcomingEvents || 0
      });
      setOpportunities(opportunitiesData);
      setApplications(applicationsData);
      
      console.log('Volunteer dashboard data loaded successfully');
    } catch (error) {
      console.error('Error loading volunteer dashboard data:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(`Failed to load dashboard data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyForOpportunity = async (opportunityId) => {
    try {
      await volunteerAPI.applyForOpportunity(opportunityId);
      toast.success('Application submitted successfully!');
      loadDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error applying for opportunity:', error);
      toast.error(error.response?.data?.message || 'Failed to apply for opportunity');
    }
  };

  const handleWithdrawApplication = async (applicationId) => {
    try {
      await volunteerAPI.withdrawApplication(applicationId);
      toast.success('Application withdrawn successfully');
      loadDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error withdrawing application:', error);
      toast.error('Failed to withdraw application');
    }
  };

  // Filter opportunities based on search and category
  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || opportunity.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const renderDashboardTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          stat={{
            icon: Activity,
            label: 'Total Applications',
            value: stats.totalApplications,
            change: '+12%',
            color: 'blue'
          }}
        />
        <StatCard
          stat={{
            icon: CheckCircle,
            label: 'Accepted',
            value: stats.acceptedApplications,
            change: '+8%',
            color: 'green'
          }}
        />
        <StatCard
          stat={{
            icon: Clock,
            label: 'Hours Volunteered',
            value: stats.totalHoursVolunteered,
            change: '+15%',
            color: 'purple'
          }}
        />
        <StatCard
          stat={{
            icon: Calendar,
            label: 'Upcoming Events',
            value: stats.upcomingEvents,
            change: '+5%',
            color: 'orange'
          }}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveTab('opportunities')}
            className="p-4 text-left border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <Search className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-900">Browse Opportunities</h3>
            <p className="text-sm text-gray-500">Find new volunteer opportunities</p>
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className="p-4 text-left border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Bell className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900">My Applications</h3>
            <p className="text-sm text-gray-500">Track your applications</p>
          </button>
          <button className="p-4 text-left border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <Award className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-gray-900">View Profile</h3>
            <p className="text-sm text-gray-500">Update your information</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingPickups />
        <RecentNotifications />
      </div>
    </div>
  );

  const renderOpportunitiesTab = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="environmental">Environmental</option>
              <option value="education">Education</option>
              <option value="healthcare">Healthcare</option>
              <option value="community">Community</option>
              <option value="disaster-relief">Disaster Relief</option>
            </select>
          </div>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map(opportunity => (
          <div key={opportunity._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{opportunity.description}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                opportunity.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {opportunity.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                {opportunity.location}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(opportunity.date).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                {opportunity.registeredCount}/{opportunity.capacity} volunteers
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {opportunity.category}
              </span>
              <button
                onClick={() => handleApplyForOpportunity(opportunity._id)}
                disabled={opportunity.isFull || loading}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {opportunity.isFull ? 'Full' : 'Apply'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );

  const renderApplicationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">My Applications</h2>
        </div>

        <div className="p-6">
          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map(application => (
                <div key={application._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{application.opportunity?.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{application.opportunity?.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(application.opportunity?.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {application.opportunity?.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Applied {new Date(application.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>

                      {application.status === 'pending' && (
                        <button
                          onClick={() => handleWithdrawApplication(application._id)}
                          className="px-3 py-1 text-xs font-medium text-red-600 hover:text-red-800"
                        >
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>

                  {application.reviewNote && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Review Note:</span> {application.reviewNote}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-500 mb-4">Start applying for opportunities to see them here.</p>
              <button
                onClick={() => setActiveTab('opportunities')}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
              >
                Browse Opportunities
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex items-center justify-center w-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <main className="p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Volunteer Dashboard</h1>
              <p className="mt-1 text-gray-600">Welcome back! Ready to make a difference?</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <div className="flex items-center space-x-1 bg-white rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('opportunities')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'opportunities'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Opportunities
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'applications'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  My Applications
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'dashboard' && renderDashboardTab()}
          {activeTab === 'opportunities' && renderOpportunitiesTab()}
          {activeTab === 'applications' && renderApplicationsTab()}
        </main>
      </div>
    </div>
  );
}
