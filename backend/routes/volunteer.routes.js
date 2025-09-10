// routes/volunteer.routes.js
const express = require('express');
const router = express.Router();
const {
  getAllOpportunities,
  getOpportunityById,
  applyForOpportunity,
  getMyApplications,
  withdrawApplication,
  getDashboardStats
} = require('../controllers/volunteer.controller');

// Middleware to check if user is volunteer or authenticated user
const requireVolunteer = (req, res, next) => {
  // Mock authentication - in real app, verify JWT and check role
  // For now, just set mock user data
  req.user = {
    id: '64f123456789abcdef123457', // Mock volunteer user ID
    role: 'volunteer',
    name: 'John Volunteer'
  };
  
  next();
};

// Apply authentication middleware to all routes
router.use(requireVolunteer);

// Dashboard route
router.get('/dashboard-stats', getDashboardStats);

// Opportunity routes
router.get('/opportunities', getAllOpportunities);
router.get('/opportunities/:opportunityId', getOpportunityById);
router.post('/opportunities/:opportunityId/apply', applyForOpportunity);

// Application management routes
router.get('/applications', getMyApplications);
router.put('/applications/:applicationId/withdraw', withdrawApplication);

module.exports = router;
