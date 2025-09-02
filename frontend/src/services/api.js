import axios from 'axios';
const api = axios.create({
  baseURL: '/api', 
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
