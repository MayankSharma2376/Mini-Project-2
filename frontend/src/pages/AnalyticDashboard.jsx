import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Leaf, Trash2, Users, Award, TreePine, Recycle, MapPin, Clock, Calendar, Target, TrendingUp, Sparkles, BarChart3, Activity, Eye, RefreshCw, PieChart as PieChartIcon } from 'lucide-react';
import { ngoAPI, adminAPI, volunteerAPI } from '../services/api';
import { toast } from 'react-toastify';

const WasteZeroAnalytics = ({ userRole = 'volunteer', userId = null }) => {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState('overview'); // overview, user-detail

  // Load analytics data based on user role
  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      let response;
      
      console.log('🔄 Loading analytics for user role:', userRole, 'Time range:', timeRange);
      
      if (userRole === 'admin') {
        response = await adminAPI.getAnalytics(timeRange);
      } else if (userRole === 'ngo') {
        console.log('📞 Calling NGO analytics API...');
        response = await ngoAPI.getAnalytics(timeRange);
      } else if (userRole === 'volunteer') {
        // For volunteer, we'll show their personal analytics
        response = await volunteerAPI.getAnalytics();
      }
      
      console.log('📊 Analytics API response:', response); // Debug log
      
      if (response && response.success && response.data) {
        console.log('✅ Setting real analytics data:');
        console.log('📊 Overview:', response.data.overview);
        console.log('📈 Monthly data:', response.data.monthlyData?.length, 'entries');
        console.log('🏷️ Activity types:', response.data.activityTypeData?.length, 'categories');
        console.log('👥 Top volunteers:', response.data.topVolunteers?.length, 'volunteers');
        setAnalyticsData(response.data);
      } else {
        console.log('⚠️ Analytics response not successful or no data, using fallback data');
        console.log('Response details:', { 
          hasResponse: !!response, 
          success: response?.success, 
          hasData: !!response?.data 
        });
        // Provide fallback data for testing when no real data exists
        setAnalyticsData(generateFallbackData());
      }
    } catch (error) {
      console.error('❌ Error loading analytics:', error);
      console.log('🔧 Using fallback data due to error');
      // Provide fallback data when API fails
      setAnalyticsData(generateFallbackData());
    } finally {
      setLoading(false);
    }
  };

  // Generate fallback data for testing when no real data exists
  const generateFallbackData = () => {
    const currentDate = new Date();
    const monthlyData = [];
    
    // Generate 12 months of sample data
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      monthlyData.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        events: Math.floor(Math.random() * 5) + 1, // Events created per month
        applications: Math.floor(Math.random() * 8) + 2, // Applications per month for volunteers
        accepted: Math.floor(Math.random() * 5) + 1, // Accepted applications for volunteers
        volunteers: Math.floor(Math.random() * 15) + 3,
        waste: Math.floor(Math.random() * 200) + 50,
        hours: Math.floor(Math.random() * 80) + 20
      });
    }

    const activityTypeData = [
      { name: 'Environmental', value: 45, count: 18 },
      { name: 'Community', value: 25, count: 10 },
      { name: 'Education', value: 20, count: 8 },
      { name: 'Health', value: 10, count: 4 }
    ];

    const overview = {
      totalVolunteers: 12,
      totalEvents: 8,
      totalVolunteerHours: 180,
      wasteCollected: 240,
      treesPlanted: 15,
      co2Saved: 120,
      totalApplications: 40,
      acceptedApplications: 28,
      pendingApplications: 8,
      rejectedApplications: 4
    };

    const topVolunteers = [
      { id: 1, name: 'Alice Johnson', eventsParticipated: 5, totalHours: 25 },
      { id: 2, name: 'Bob Smith', eventsParticipated: 4, totalHours: 20 },
      { id: 3, name: 'Carol Davis', eventsParticipated: 3, totalHours: 18 }
    ];

    const recentActivities = [
      { id: 1, event: 'Community Garden Project', status: 'accepted', date: new Date(), location: 'Green Valley' },
      { id: 2, event: 'River Cleanup Drive', status: 'pending', date: new Date(), location: 'Riverside Park' },
      { id: 3, event: 'Recycling Workshop', status: 'accepted', date: new Date(), location: 'Community Center' }
    ];

    return {
      overview,
      monthlyData,
      activityTypeData,
      topVolunteers,
      recentActivities
    };
  };

  // Load specific user analytics
  const loadUserAnalytics = async (targetUserId, targetUserRole) => {
    try {
      setLoading(true);
      let response;
      
      if (targetUserRole === 'ngo') {
        response = await adminAPI.getNGOAnalytics(targetUserId, timeRange);
      } else {
        response = await adminAPI.getVolunteerAnalytics(targetUserId);
      }
      
      if (response.success) {
        setSelectedUser(response.data);
        setViewMode('user-detail');
      } else {
        toast.error('Failed to load user analytics');
      }
    } catch (error) {
      console.error('Error loading user analytics:', error);
      toast.error('Failed to load user analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange, userRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="text-gray-600 font-medium">Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Analytics Data</h3>
          <p className="text-gray-500 mb-4">Unable to load analytics data</p>
          <button
            onClick={loadAnalyticsData}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render user detail view
  if (viewMode === 'user-detail' && selectedUser) {
    return (
      <div className="space-y-6">
        {/* Back Button and Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setViewMode('overview')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedUser.volunteer ? selectedUser.volunteer.name : selectedUser.ngo.name} Analytics
              </h1>
              <p className="text-gray-500 text-sm">Detailed performance metrics</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">Impact Score</p>
            <p className="text-green-600 text-sm">{selectedUser.stats.impactScore || 'N/A'}</p>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-800">{selectedUser.stats.totalApplications || selectedUser.stats.totalEvents}</p>
                <p className="text-xs text-gray-600 font-medium">{selectedUser.volunteer ? 'APPLICATIONS' : 'EVENTS'}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-800" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-800">{selectedUser.stats.hoursVolunteered || selectedUser.stats.totalVolunteerHours}</p>
                <p className="text-xs text-gray-600 font-medium">HOURS</p>
              </div>
              <Clock className="h-8 w-8 text-green-800" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-800">{selectedUser.stats.wasteCollected}kg</p>
                <p className="text-xs text-gray-600 font-medium">WASTE COLLECTED</p>
              </div>
              <Trash2 className="h-8 w-8 text-green-800" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-800">{selectedUser.stats.treesPlanted}</p>
                <p className="text-xs text-gray-600 font-medium">TREES PLANTED</p>
              </div>
              <TreePine className="h-8 w-8 text-green-800" />
            </div>
          </div>
        </div>

        {/* Charts and Details */}
        <div className="grid grid-cols-2 gap-6">
          {/* Monthly Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={selectedUser.monthlyActivity || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey={selectedUser.volunteer ? "applications" : "events"} 
                  stroke="#166534" 
                  fill="#166534" 
                  fillOpacity={0.3} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activities</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {(selectedUser.recentApplications || []).map((activity, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{activity.event}</p>
                      <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      activity.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  {activity.location && (
                    <div className="flex items-center text-xs text-gray-600 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{activity.location}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { 
    overview = {}, 
    monthlyData = [], 
    activityTypeData = [], 
    recentActivities = [], 
    topVolunteers = [], 
    userGrowthData = [], 
    eventActivityData = [], 
    topNGOs = [], 
    categoryDistribution = [] 
  } = analyticsData || {};

  // Debug logging
  console.log('🔍 Analytics data received:', analyticsData);
  console.log('📊 Monthly data:', monthlyData, 'Length:', monthlyData?.length);
  console.log('🏷️ Activity type data:', activityTypeData, 'Length:', activityTypeData?.length);
  console.log('👤 User role:', userRole);
  console.log('📈 Chart data validation:', {
    monthlyDataValid: Array.isArray(monthlyData) && monthlyData.length > 0,
    activityDataValid: Array.isArray(activityTypeData) && activityTypeData.length > 0
  });

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end">
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-white border border-gray-300 text-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="week">7 DAYS</option>
          <option value="month">1 MONTH</option>
          <option value="quarter">3 MONTHS</option>
          <option value="year">1 YEAR</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-800">
                {userRole === 'admin' ? (overview.totalUsers || 0) : 
                 userRole === 'ngo' ? (overview.totalVolunteers || 0) : 
                 (overview.totalApplications || 0)}
              </p>
              <p className="text-xs text-gray-600 font-medium">
                {userRole === 'admin' ? 'TOTAL USERS' : 
                 userRole === 'ngo' ? 'VOLUNTEERS' : 
                 'APPLICATIONS'}
              </p>
            </div>
            <Users className="h-8 w-8 text-green-800" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-800">
                {userRole === 'admin' ? (overview.totalEvents || 0) : 
                 (overview.totalVolunteerHours || 0)}
              </p>
              <p className="text-xs text-gray-600 font-medium">
                {userRole === 'admin' ? 'TOTAL EVENTS' : 'VOLUNTEER HOURS'}
              </p>
            </div>
            <Clock className="h-8 w-8 text-green-800" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-800">{overview.wasteCollected || 0}kg</p>
              <p className="text-xs text-gray-600 font-medium">WASTE COLLECTED</p>
            </div>
            <Trash2 className="h-8 w-8 text-green-800" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-800">{overview.treesPlanted || 0}</p>
              <p className="text-xs text-gray-600 font-medium">TREES PLANTED</p>
            </div>
            <TreePine className="h-8 w-8 text-green-800" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Monthly Impact Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {userRole === 'admin' ? 'Platform Growth' : 
             userRole === 'ngo' ? 'Events Created This Year' : 'My Applications Over Time'}
          </h3>
          {(monthlyData && monthlyData.length > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip 
                  formatter={(value, name) => [
                    value, 
                    userRole === 'admin' ? 'Users' : 
                    userRole === 'ngo' ? 'Events Created' : 'Applications'
                  ]}
                />
                <Bar 
                  dataKey={userRole === 'admin' ? 'users' : userRole === 'ngo' ? 'events' : 'applications'} 
                  fill="#166534" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>{userRole === 'volunteer' ? 'No applications yet' : 'No events created yet'}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {userRole === 'volunteer' ? 'Apply to events to see your activity chart' : 'Create your first event to see the chart'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Activity Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {userRole === 'admin' ? 'Event Categories' : 
             userRole === 'ngo' ? 'My Event Categories' : 'Event Categories I Participate In'}
          </h3>
          {(activityTypeData && activityTypeData.length > 0) ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={activityTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  dataKey="value"
                  // label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {activityTypeData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`hsl(${(index * 137.5) % 360}, 70%, 40%)`}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, `${name}`]} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-gray-500">
              <div className="text-center">
                <PieChartIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>{userRole === 'volunteer' ? 'No event participation yet' : 'No event categories yet'}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {userRole === 'volunteer' ? 'Join events to see your activity breakdown' : 'Create events with categories to see the breakdown'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {userRole === 'admin' ? 'Top NGOs' : 
             userRole === 'ngo' ? 'Top Volunteers' : 'NGOs I\'ve Worked With'}
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {userRole === 'volunteer' ? 
              // Show NGOs worked with for volunteers (from backend data)
              (analyticsData?.ngosWorkedWith && analyticsData.ngosWorkedWith.length > 0) ? 
                analyticsData.ngosWorkedWith.slice(0, 5).map((ngo, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{ngo.name || 'Unknown NGO'}</p>
                        <p className="text-xs text-gray-500">Partner NGO</p>
                      </div>
                    </div>
                  </div>
                )) :
                // Show message if no NGO partnerships yet
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-gray-500 text-sm">No NGO partnerships yet</p>
                  <p className="text-xs text-gray-400">Apply to events to work with NGOs</p>
                </div>
              :
              // Show top volunteers for NGO (from backend data)
              (analyticsData?.topVolunteers && analyticsData.topVolunteers.length > 0) ?
                analyticsData.topVolunteers.slice(0, 5).map((volunteer, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => userRole === 'admin' && loadUserAnalytics(volunteer.id || volunteer._id, 'volunteer')}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {volunteer.name || 'Unknown Volunteer'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {volunteer.eventsParticipated || 0} events participated
                        </p>
                      </div>
                      {userRole === 'admin' && (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                )) :
                // Show message if no volunteers yet for NGO
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-gray-500 text-sm">No volunteers yet</p>
                  <p className="text-xs text-gray-400">Create events to attract volunteers</p>
                </div>
            }
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {userRole === 'volunteer' ? 'My Recent Applications' : 'Recent Activities'}
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {userRole === 'volunteer' ? 
              // Show volunteer's own applications
              (analyticsData?.recentActivities || []).map((activity, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{activity.event}</p>
                      <p className="text-xs text-gray-500">{new Date(activity.appliedDate).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      activity.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  {activity.location && (
                    <div className="flex items-center text-xs text-gray-600 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{activity.location}</span>
                    </div>
                  )}
                </div>
              )) :
              // Original logic for admin/ngo - show NGO's events for NGO role
              (recentActivities || []).map((activity, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{activity.event || activity.name}</p>
                      <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                      {activity.eventDate && (
                        <p className="text-xs text-blue-600">Event Date: {new Date(activity.eventDate).toLocaleDateString()}</p>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      activity.status === 'accepted' || activity.status === 'completed' || activity.status === 'active' ? 'bg-green-100 text-green-800' :
                      activity.status === 'pending' || activity.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                      activity.status === 'cancelled' || activity.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  {activity.location && (
                    <div className="flex items-center text-xs text-gray-600 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{activity.location}</span>
                    </div>
                  )}
                  {activity.category && userRole === 'ngo' && (
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span className="bg-gray-100 px-2 py-1 rounded-full">{activity.category}</span>
                    </div>
                  )}
                </div>
              ))
            }
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Environmental Impact</h3>
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trash2 className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Waste Collected</span>
                </div>
                <span className="text-lg font-bold text-green-600">{overview.wasteCollected || 0}kg</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TreePine className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Trees Planted</span>
                </div>
                <span className="text-lg font-bold text-green-600">{overview.treesPlanted || 0}</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">CO₂ Saved</span>
                </div>
                <span className="text-lg font-bold text-green-600">{overview.co2Saved || 0}kg</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Volunteer Hours</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{overview.totalVolunteerHours || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteZeroAnalytics;