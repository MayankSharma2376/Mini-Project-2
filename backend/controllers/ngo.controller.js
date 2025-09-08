// controllers/ngo.controller.js
const User = require('../models/user.model');

// Get NGO Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    // In a real app, you'd calculate these stats from your database
    // For now, return mock data
    const stats = {
      activeEvents: 3,
      totalVolunteers: 68,
      totalImpactHours: 340,
      eventsCompleted: 15
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching NGO dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
};

// Get Recent Activities
const getRecentActivities = async (req, res) => {
  try {
    // Mock recent activities data
    const activities = [
      {
        id: 1,
        type: 'volunteer_registration',
        message: 'New volunteer registered for River Cleanup Drive',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        icon: 'user-check'
      },
      {
        id: 2,
        type: 'event_update',
        message: 'Recycling Workshop event updated',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        icon: 'calendar'
      },
      {
        id: 3,
        type: 'feedback',
        message: 'Community Garden Project received positive feedback',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        icon: 'heart'
      }
    ];

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent activities'
    });
  }
};

// Get NGO's Events
const getMyEvents = async (req, res) => {
  try {
    // In a real app, filter events by NGO ID
    const ngoId = req.user.id; // From auth middleware
    
    // Mock events data - in real app, query from database
    const events = [
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
        createdBy: ngoId
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
        createdBy: ngoId
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
        createdBy: ngoId
      }
    ];

    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Error fetching NGO events:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events'
    });
  }
};

// Create New Event
const createEvent = async (req, res) => {
  try {
    const { title, description, location, date, capacity, category } = req.body;
    const ngoId = req.user.id;

    // Validation
    if (!title || !description || !location || !date || !capacity) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (new Date(date) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Event date cannot be in the past'
      });
    }

    // In a real app, save to database
    // For now, return mock success response
    const newEvent = {
      id: Date.now(), // Mock ID
      title,
      description,
      location,
      date,
      capacity: parseInt(capacity),
      registered: 0,
      status: 'active',
      category: category || 'Environmental',
      createdBy: ngoId,
      createdAt: new Date()
    };

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: newEvent
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create event'
    });
  }
};

// Update Event
const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { title, description, location, date, capacity, category, status } = req.body;
    const ngoId = req.user.id;

    // In a real app, check if event belongs to this NGO and update in database
    // For now, return mock success response
    const updatedEvent = {
      id: eventId,
      title: title || 'Updated Event Title',
      description: description || 'Updated description',
      location: location || 'Updated location',
      date: date || '2025-09-25',
      capacity: capacity ? parseInt(capacity) : 30,
      status: status || 'active',
      category: category || 'Environmental',
      createdBy: ngoId,
      updatedAt: new Date()
    };

    res.json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update event'
    });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const ngoId = req.user.id;

    // In a real app, check if event belongs to this NGO and delete from database
    // For now, return mock success response
    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete event'
    });
  }
};

// Get Event Registrations
const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;
    const ngoId = req.user.id;

    // In a real app, fetch registrations for this specific event
    // Mock registrations data
    const registrations = [
      {
        id: 1,
        volunteer: {
          id: 1,
          name: 'Alice Johnson',
          email: 'alice.johnson@email.com',
          phone: '+1 234-567-8901'
        },
        registeredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'confirmed'
      },
      {
        id: 2,
        volunteer: {
          id: 2,
          name: 'Robert Chen',
          email: 'robert.chen@email.com',
          phone: '+1 234-567-8902'
        },
        registeredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'confirmed'
      }
    ];

    res.json({
      success: true,
      data: registrations
    });
  } catch (error) {
    console.error('Error fetching event registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event registrations'
    });
  }
};

// Get My Volunteers (volunteers registered for NGO's events)
const getMyVolunteers = async (req, res) => {
  try {
    const ngoId = req.user.id;

    // In a real app, fetch volunteers registered for this NGO's events
    // Mock volunteers data
    const volunteers = [
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
    ];

    res.json({
      success: true,
      data: volunteers
    });
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteers'
    });
  }
};

// Get Volunteer Details
const getVolunteerDetails = async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const ngoId = req.user.id;

    // In a real app, fetch volunteer details and verify access
    // Mock volunteer details
    const volunteer = {
      id: volunteerId,
      name: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      phone: '+1 234-567-8901',
      skills: ['Environmental Advocacy', 'Event Planning'],
      bio: 'Passionate about environmental conservation and community engagement.',
      location: 'Downtown City',
      registeredEvents: [
        {
          id: 1,
          title: 'Community Garden Project',
          status: 'upcoming',
          registeredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        },
        {
          id: 3,
          title: 'River Cleanup Drive',
          status: 'upcoming',
          registeredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        }
      ],
      totalHours: 25,
      status: 'active',
      joinDate: '2024-08-15'
    };

    res.json({
      success: true,
      data: volunteer
    });
  } catch (error) {
    console.error('Error fetching volunteer details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteer details'
    });
  }
};

// Send Message to Volunteer
const sendMessageToVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const { message } = req.body;
    const ngoId = req.user.id;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required'
      });
    }

    // In a real app, save message to database and/or send notification
    // For now, return mock success response
    res.json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error sending message to volunteer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
};

// Get Event Report
const getEventReport = async (req, res) => {
  try {
    const { eventId } = req.params;
    const ngoId = req.user.id;

    // In a real app, generate report from database
    // Mock report data
    const report = {
      eventId,
      eventTitle: 'Community Garden Project',
      totalRegistrations: 15,
      attendanceRate: '87%',
      volunteerHours: 45,
      impactMetrics: {
        plantsPlanted: 120,
        areasCovered: '500 sq ft',
        volunteersEngaged: 15
      },
      feedback: {
        averageRating: 4.8,
        totalResponses: 12,
        positiveComments: 10
      }
    };

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error generating event report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate event report'
    });
  }
};

// Get Volunteer Report
const getVolunteerReport = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    const ngoId = req.user.id;

    // In a real app, generate volunteer report from database
    // Mock report data
    const report = {
      period,
      totalVolunteers: 68,
      activeVolunteers: 45,
      newVolunteers: 12,
      totalHours: 340,
      averageHoursPerVolunteer: 7.6,
      topSkills: [
        { skill: 'Environmental Advocacy', count: 25 },
        { skill: 'Event Planning', count: 18 },
        { skill: 'Community Outreach', count: 15 }
      ],
      retentionRate: '78%'
    };

    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error generating volunteer report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate volunteer report'
    });
  }
};

module.exports = {
  getDashboardStats,
  getRecentActivities,
  getMyEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventRegistrations,
  getMyVolunteers,
  getVolunteerDetails,
  sendMessageToVolunteer,
  getEventReport,
  getVolunteerReport
};
