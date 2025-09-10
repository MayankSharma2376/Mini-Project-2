// routes/ngo.routes.js
const express = require('express');
const router = express.Router();

const {
  getDashboardStats,
  getRecentActivities,
  getMyEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventRegistrations,
  reviewApplication, // Kept from 'main' branch
  getMyVolunteers,
  getVolunteerDetails,
  sendMessageToVolunteer,
  getEventReport,
  getVolunteerReport
} = require('../controllers/ngo.controller');

// Middleware to check if user is NGO (you'll need to implement authentication middleware)
const requireNGO = (req, res, next) => {
  // Mock authentication - in real app, verify JWT and check role
  // For now, just set mock user data
  req.user = {
    id: '64f123456789abcdef123456', // Mock NGO user ID
    role: 'ngo', // Fixed: lowercase 'ngo'
    name: 'Green Earth NGO'
  };
  
  // Temporarily disable role check for testing (kept from 'main' branch)
  // if (req.user.role !== 'ngo') {
  //   return res.status(403).json({
  //     success: false,
  //     message: 'Access denied. NGO role required.'
  //   });
  // }
  
  next();
};

// Apply NGO role check to all routes
router.use(requireNGO);

// Test route to verify server is working (kept from 'main' branch)
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'NGO routes working', user: req.user });
});

// Dashboard routes
router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/activities', getRecentActivities);

// Event management routes
router.get('/events', getMyEvents);
router.post('/events', createEvent);
router.put('/events/:eventId', updateEvent);
router.delete('/events/:eventId', deleteEvent);
router.get('/events/:eventId/registrations', getEventRegistrations);
// Added the review application route from the 'main' branch
router.post('/events/:eventId/registrations/:registrationId/review', reviewApplication);

// Volunteer management routes
router.get('/volunteers', getMyVolunteers);
router.get('/volunteers/:volunteerId', getVolunteerDetails);
router.post('/volunteers/:volunteerId/message', sendMessageToVolunteer);

// Reports routes
router.get('/reports/event/:eventId', getEventReport);
router.get('/reports/volunteers', getVolunteerReport);

module.exports = router;