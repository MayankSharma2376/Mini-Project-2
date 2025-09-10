import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Updated to point to backend server
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  verifyUser: async (data) => {
    const response = await api.post('/auth/verify-user', data);
    return response.data;
  },  

  // 🔹 Forgot Password Flow
  sendOtp: async (email) => {
    const response = await api.post('/auth/send-otp', { email });
    return response.data;
  },

  verifyOtp: async (email, otp) => {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
  },

  resetPassword: async (email, password) => {
    const response = await api.post('/auth/reset-password', { email, password });
    return response.data;
  },
};

// Admin API endpoints
export const adminAPI = {
  // Dashboard data
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  },

  getRecentActivities: async () => {
    const response = await api.get('/admin/dashboard/activities');
    return response.data;
  },

  // User management
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  getUserById: async (userId) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  updateUser: async (userId, userData) => {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  // Pickup management
  getAllPickups: async () => {
    const response = await api.get('/admin/pickups');
    return response.data;
  },

  createPickup: async (pickupData) => {
    const response = await api.post('/admin/pickups', pickupData);
    return response.data;
  },

  updatePickup: async (pickupId, pickupData) => {
    const response = await api.put(`/admin/pickups/${pickupId}`, pickupData);
    return response.data;
  },

  // Opportunity management
  getAllOpportunities: async () => {
    const response = await api.get('/admin/opportunities');
    return response.data;
  },

  createOpportunity: async (opportunityData) => {
    const response = await api.post('/admin/opportunities', opportunityData);
    return response.data;
  },

  updateOpportunity: async (opportunityId, opportunityData) => {
    const response = await api.put(`/admin/opportunities/${opportunityId}`, opportunityData);
    return response.data;
  },

  deleteOpportunity: async (opportunityId) => {
    const response = await api.delete(`/admin/opportunities/${opportunityId}`);
    return response.data;
  },

  getOpportunityRegistrations: async (opportunityId) => {
    const response = await api.get(`/admin/opportunities/${opportunityId}/registrations`);
    return response.data;
  },

  // Reports and analytics
  getWasteCollectionReport: async (period = 'month') => {
    const response = await api.get(`/admin/reports/waste-collection?period=${period}`);
    return response.data;
  },

  getUserGrowthReport: async (period = 'month') => {
    const response = await api.get(`/admin/reports/user-growth?period=${period}`);
    return response.data;
  },

  exportReport: async (reportType, format = 'pdf') => {
    const response = await api.get(`/admin/reports/export?type=${reportType}&format=${format}`, {
      responseType: 'blob'
    });
    return response.data;
  },
};

// Message API endpoints
export const messageAPI = {
  fetchAllUsers: async () => {
    const response = await api.get('/users'); 
    return response.data;
  },

  fetchMessages: async (otherUserId) => {
    const response = await api.get(`/messages/${otherUserId}`);
    return response.data;
  },

  postMessage: async (receiverId, message) => {
    const response = await api.post(`/messages/send/${receiverId}`, { message });
    return response.data;
  },
};

// NGO API endpoints
export const ngoAPI = {
  // Dashboard data
  getDashboardStats: async () => {
    const response = await api.get('/ngo/dashboard/stats');
    return response.data;
  },

  getRecentActivities: async () => {
    const response = await api.get('/ngo/dashboard/activities');
    return response.data;
  },

  // Event management (NGO can only manage their own events)
  getMyEvents: async () => {
    const response = await api.get('/ngo/events');
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post('/ngo/events', eventData);
    return response.data;
  },

  updateEvent: async (eventId, eventData) => {
    const response = await api.put(`/ngo/events/${eventId}`, eventData);
    return response.data;
  },

  deleteEvent: async (eventId) => {
    const response = await api.delete(`/ngo/events/${eventId}`);
    return response.data;
  },

  getEventRegistrations: async (eventId) => {
    const response = await api.get(`/ngo/events/${eventId}/registrations`);
    return response.data;
  },

  // Review applications
  reviewApplication: async (eventId, registrationId, reviewData) => {
    const response = await api.post(`/ngo/events/${eventId}/registrations/${registrationId}/review`, reviewData);
    return response.data;
  },

  // Volunteer management (volunteers registered for NGO events)
  getMyVolunteers: async () => {
    const response = await api.get('/ngo/volunteers');
    return response.data;
  },

  getVolunteerDetails: async (volunteerId) => {
    const response = await api.get(`/ngo/volunteers/${volunteerId}`);
    return response.data;
  },

  // Communication
  sendMessageToVolunteer: async (volunteerId, message) => {
    const response = await api.post(`/ngo/volunteers/${volunteerId}/message`, { message });
    return response.data;
  },

  // Reports (limited scope)
  getEventReport: async (eventId) => {
    const response = await api.get(`/ngo/reports/event/${eventId}`);
    return response.data;
  },

  getVolunteerReport: async (period = 'month') => {
    const response = await api.get(`/ngo/reports/volunteers?period=${period}`);
    return response.data;
  },
};

// Volunteer API endpoints
export const volunteerAPI = {
  // Dashboard data
  getDashboardStats: async () => {
    const response = await api.get('/volunteer/dashboard-stats');
    return response.data;
  },

  // Opportunity browsing
  getAllOpportunities: async (params = {}) => {
    const response = await api.get('/volunteer/opportunities', { params });
    return response.data;
  },

  getOpportunityDetails: async (opportunityId) => {
    const response = await api.get(`/volunteer/opportunities/${opportunityId}`);
    return response.data;
  },

  getRecommendedOpportunities: async () => {
    const response = await api.get('/volunteer/opportunities/recommended');
    return response.data;
  },

  // Application management
  applyForOpportunity: async (opportunityId, applicationData = {}) => {
    const response = await api.post(`/volunteer/opportunities/${opportunityId}/apply`, applicationData);
    return response.data;
  },

  getMyApplications: async () => {
    const response = await api.get('/volunteer/applications');
    return response.data;
  },

  withdrawApplication: async (applicationId) => {
    const response = await api.delete(`/volunteer/applications/${applicationId}`);
    return response.data;
  },

  // Profile and notifications
  updateProfile: async (profileData) => {
    const response = await api.put('/volunteer/profile', profileData);
    return response.data;
  },

  getNotifications: async () => {
    const response = await api.get('/volunteer/notifications');
    return response.data;
  },
};

// --- Interceptors for Logging (from main branch) ---
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default api;