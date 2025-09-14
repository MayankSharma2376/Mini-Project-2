// controllers/ngo.controller.js
const User = require('../models/user.model');
const Opportunity = require('../models/opportunity.model');
const Application = require('../models/application.model');
const { createApplicationStatusNotification, createNewEventNotification } = require('./notification.controller');

// Get NGO Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    console.log('getDashboardStats called'); // Debug log
    const ngoId = req.user.id;
    
    // Get real stats from database
    const [activeEvents, completedEvents, totalVolunteers, totalApplications] = await Promise.all([
      Opportunity.countDocuments({ createdBy: ngoId, status: 'active' }),
      Opportunity.countDocuments({ createdBy: ngoId, status: 'completed' }),
      Application.distinct('volunteerId', { 
        status: 'accepted',
        opportunityId: { $in: await Opportunity.find({ createdBy: ngoId }).select('_id') }
      }).then(volunteers => volunteers.length),
      Application.countDocuments({
        opportunityId: { $in: await Opportunity.find({ createdBy: ngoId }).select('_id') },
        status: 'accepted'
      })
    ]);

    // Calculate total impact hours (assuming 4 hours per volunteer per event)
    const totalImpactHours = totalApplications * 4;

    const stats = {
      activeEvents,
      totalVolunteers,
      totalImpactHours,
      totalHours: totalImpactHours, // Frontend looks for both
      eventsCompleted: completedEvents,
      completedEvents
    };

    console.log('Returning stats:', stats); // Debug log

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching NGO dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
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
    console.log('getMyEvents called'); // Debug log
    const ngoId = req.user.id;
    
    // Query database for actual events created by this NGO
    const opportunities = await Opportunity.find({ createdBy: ngoId })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email profileImage');

    // Format events for frontend compatibility
    const formattedEvents = opportunities.map(opp => ({
      id: opp._id,
      _id: opp._id,
      title: opp.title,
      description: opp.description,
      location: opp.location,
      date: opp.date,
      capacity: opp.capacity,
      registered: opp.registeredCount || 0,
      status: opp.status,
      category: opp.category,
      duration: opp.duration,
      requiredSkills: opp.requiredSkills || [],
      applicationDeadline: opp.applicationDeadline,
      imageUrl: opp.image,
      createdBy: opp.createdBy?.name || 'Unknown NGO',
      createdAt: opp.createdAt,
      updatedAt: opp.updatedAt
    }));

    console.log('Returning real events:', formattedEvents.length); // Debug log

    res.json({
      success: true,
      data: formattedEvents
    });
  } catch (error) {
    console.error('Error fetching NGO events:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events',
      error: error.message
    });
  }
};

// Create New Event
const createEvent = async (req, res) => {
  try {
    console.log('Creating event with data:', req.body); // Debug log
    console.log('User data:', req.user); // Debug log
    const { title, description, location, date, capacity, category, duration, requiredSkills, applicationDeadline, image } = req.body;
    const ngoId = req.user._id || req.user.id; // Handle both _id and id

    // Validation - Fixed to match frontend fields
    if (!title || !description || !location || !date || !capacity) {
      console.log('Validation failed, missing fields:', { title: !!title, description: !!description, location: !!location, date: !!date, capacity: !!capacity });
      return res.status(400).json({
        success: false,
        message: 'All required fields (title, description, location, date, capacity) must be provided'
      });
    }

    if (new Date(date) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Event date cannot be in the past'
      });
    }

    if (capacity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Capacity must be at least 1'
      });
    }

    // Handle image data properly - convert to string if it's an object
    let imageData = null;
    if (image) {
      if (typeof image === 'string' && image.trim()) {
        // Valid base64 string
        imageData = image.trim();
      } else if (typeof image === 'object') {
        // Handle object formats that might contain the image data
        if (image.imagePreview && typeof image.imagePreview === 'string') {
          imageData = image.imagePreview;
        } else if (image.data && typeof image.data === 'string') {
          imageData = image.data;
        } else if (image.src && typeof image.src === 'string') {
          imageData = image.src;
        } else {
          console.log('Invalid image object format, ignoring:', Object.keys(image));
          imageData = null;
        }
      } else {
        console.log('Invalid image format, expected string but got:', typeof image);
        imageData = null;
      }
    }

    // Create new opportunity in database
    const newOpportunity = new Opportunity({
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      date: new Date(date),
      capacity: parseInt(capacity),
      category: category || 'environmental',
      duration: duration || '4 hours', // Default duration if not provided
      requiredSkills: requiredSkills || [],
      applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
      image: imageData, // Store processed image data
      createdBy: ngoId,
      registeredCount: 0,
      status: 'active'
    });

    const savedOpportunity = await newOpportunity.save();
    await savedOpportunity.populate('createdBy', 'name email');

    console.log('Event saved to database:', savedOpportunity._id); // Debug log

    // Create notifications for all volunteers about the new event
    try {
      await createNewEventNotification({
        eventId: savedOpportunity._id,
        eventTitle: savedOpportunity.title,
        ngoName: savedOpportunity.createdBy.name,
        ngoId: ngoId,
        location: savedOpportunity.location,
        date: savedOpportunity.date
      });
      console.log('New event notifications created successfully');
    } catch (notificationError) {
      console.error('Error creating new event notifications:', notificationError);
      // Don't fail the event creation if notifications fail
    }

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: savedOpportunity
    });
  } catch (error) {
    console.error('Error creating event:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: Object.keys(error.errors).map(key => ({
          field: key,
          message: error.errors[key].message
        }))
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error.message
    });
  }
};

// Update Event
const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { title, description, location, date, capacity, category, status, duration, requiredSkills, applicationDeadline } = req.body;
    const ngoId = req.user.id;

    // Find and verify ownership
    const opportunity = await Opportunity.findOne({ _id: eventId, createdBy: ngoId });
    
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found or you do not have permission to update it'
      });
    }

    // Update fields if provided
    if (title) opportunity.title = title.trim();
    if (description) opportunity.description = description.trim();
    if (location) opportunity.location = location.trim();
    if (date) {
      if (new Date(date) < new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Event date cannot be in the past'
        });
      }
      opportunity.date = new Date(date);
    }
    if (capacity) {
      const newCapacity = parseInt(capacity);
      if (newCapacity < opportunity.registeredCount) {
        return res.status(400).json({
          success: false,
          message: `Cannot reduce capacity below current registrations (${opportunity.registeredCount})`
        });
      }
      opportunity.capacity = newCapacity;
    }
    if (category) opportunity.category = category;
    if (status) opportunity.status = status;
    if (duration) opportunity.duration = duration.trim();
    if (requiredSkills !== undefined) opportunity.requiredSkills = requiredSkills;
    if (applicationDeadline !== undefined) {
      opportunity.applicationDeadline = applicationDeadline ? new Date(applicationDeadline) : null;
    }

    const updatedOpportunity = await opportunity.save();
    await updatedOpportunity.populate('createdBy', 'name email');

    res.json({
      success: true,
      message: 'Opportunity updated successfully',
      data: updatedOpportunity
    });
  } catch (error) {
    console.error('Error updating event:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update opportunity'
    });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const ngoId = req.user.id;

    // Find and verify ownership
    const opportunity = await Opportunity.findOne({ _id: eventId, createdBy: ngoId });
    
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Event not found or you do not have permission to delete it'
      });
    }

    // Delete associated applications first
    await Application.deleteMany({ opportunityId: eventId });
    
    // Delete the opportunity
    await Opportunity.findByIdAndDelete(eventId);

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

    // Verify opportunity belongs to this NGO
    const opportunity = await Opportunity.findOne({ _id: eventId, createdBy: ngoId });
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found or you do not have permission to view it'
      });
    }

    // Fetch applications for this opportunity
    const applications = await Application.find({ opportunityId: eventId })
      .populate('volunteerId', 'name email phone skills location bio')
      .sort({ appliedAt: -1 });

    // Format applications for frontend
    const formattedApplications = applications.map(app => ({
      id: app._id,
      _id: app._id,
      eventId: app.opportunityId,
      volunteerName: app.volunteerId?.name || 'Unknown Volunteer',
      email: app.volunteerId?.email || 'No email provided',
      phone: app.volunteerId?.phone || 'No phone provided',
      status: app.status,
      appliedAt: app.appliedAt,
      experience: app.volunteerId?.experience || 'Not specified',
      skills: app.volunteerId?.skills || [],
      message: app.applicationMessage || 'No message provided',
      location: app.volunteerId?.location || 'Not specified',
      bio: app.volunteerId?.bio || 'No bio available'
    }));

    res.json({
      success: true,
      data: formattedApplications
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

    // Get all opportunities created by this NGO
    const myOpportunities = await Opportunity.find({ createdBy: ngoId }).select('_id title');
    const opportunityIds = myOpportunities.map(opp => opp._id);

    // Find all accepted applications for NGO's opportunities
    const acceptedApplications = await Application.find({ 
      opportunityId: { $in: opportunityIds }, 
      status: 'accepted' 
    })
    .populate('volunteerId', 'name email phone skills location bio createdAt')
    .populate('opportunityId', 'title')
    .sort({ appliedAt: -1 });

    // Group applications by volunteer to get unique volunteers with their registered events
    const volunteerMap = new Map();
    
    acceptedApplications.forEach(app => {
      const volunteerId = app.volunteerId._id.toString();
      
      if (!volunteerMap.has(volunteerId)) {
        volunteerMap.set(volunteerId, {
          id: volunteerId,
          name: app.volunteerId.name,
          email: app.volunteerId.email,
          phone: app.volunteerId.phone || 'Not provided',
          skills: app.volunteerId.skills || [],
          location: app.volunteerId.location || 'Not specified',
          bio: app.volunteerId.bio || '',
          registeredEvents: [],
          totalHours: 0, // This could be calculated based on event duration
          status: 'active',
          joinDate: app.volunteerId.createdAt || new Date()
        });
      }
      
      const volunteer = volunteerMap.get(volunteerId);
      volunteer.registeredEvents.push(app.opportunityId.title);
      volunteer.totalHours += 4; // Assuming 4 hours per event, adjust as needed
    });

    const volunteers = Array.from(volunteerMap.values());

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

// Review Application
const reviewApplication = async (req, res) => {
  try {
    const { eventId, registrationId } = req.params;
    const { status, reviewNote } = req.body;
    const ngoId = req.user.id;

    // Validate status
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be "accepted" or "rejected"'
      });
    }

    // Find the application
    const application = await Application.findById(registrationId)
      .populate('opportunityId')
      .populate('volunteerId');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if the opportunity belongs to the NGO
    if (application.opportunityId.createdBy.toString() !== ngoId) {
      return res.status(403).json({
        success: false,
        message: 'You can only review applications for your own opportunities'
      });
    }

    // Store previous status for registration count updates
    const previousStatus = application.status;

    // Update application status
    application.status = status;
    application.reviewMessage = reviewNote;
    application.reviewedAt = new Date();
    application.reviewedBy = ngoId;

    await application.save();

    // Update opportunity registration count based on status change
    if (status === 'accepted' && previousStatus !== 'accepted') {
      // New acceptance - increment count
      await Opportunity.findByIdAndUpdate(eventId, {
        $inc: { registeredCount: 1 }
      });
    } else if (previousStatus === 'accepted' && status === 'rejected') {
      // Previously accepted, now rejected - decrement count
      await Opportunity.findByIdAndUpdate(eventId, {
        $inc: { registeredCount: -1 }
      });
    }

    console.log(`Application ${registrationId} ${status} for event ${eventId} (previous: ${previousStatus})`);

    // Create notification for volunteer about application status change
    try {
      const ngoUser = await User.findById(ngoId).select('name');
      await createApplicationStatusNotification({
        volunteerId: application.volunteerId._id,
        ngoId: ngoId,
        eventId: application.opportunityId._id,
        applicationId: application._id,
        status: status,
        eventTitle: application.opportunityId.title,
        ngoName: ngoUser.name
      });
    } catch (notificationError) {
      console.error('Failed to create application status notification:', notificationError);
      // Don't fail the review if notification fails
    }

    res.json({
      success: true,
      message: `Application ${status} successfully`,
      data: application
    });
  } catch (error) {
    console.error('Error reviewing application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to review application'
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
  reviewApplication,
  getMyVolunteers,
  getVolunteerDetails,
  sendMessageToVolunteer,
  getEventReport,
  getVolunteerReport
};