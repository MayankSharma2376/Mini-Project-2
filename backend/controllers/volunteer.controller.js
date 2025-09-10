// controllers/volunteer.controller.js
const User = require('../models/user.model');
const Opportunity = require('../models/opportunity.model');
const Application = require('../models/application.model');

// Get all available opportunities
const getAllOpportunities = async (req, res) => {
  try {
    console.log('getAllOpportunities called'); // Debug log
    
    // Query parameters for filtering
    const { category, location, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = { status: 'active' };
    if (category && category !== 'all') {
      query.category = category;
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Fetch opportunities from database
    const opportunities = await Opportunity.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const totalOpportunities = await Opportunity.countDocuments(query);

    console.log('Returning real opportunities:', opportunities.length);

    res.json({
      success: true,
      data: opportunities,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalOpportunities / parseInt(limit)),
        totalItems: totalOpportunities,
        hasNext: skip + opportunities.length < totalOpportunities,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch opportunities',
      error: error.message
    });
  }
};

// Get single opportunity details
const getOpportunityById = async (req, res) => {
  try {
    const { opportunityId } = req.params;
    
    const opportunity = await Opportunity.findById(opportunityId)
      .populate('createdBy', 'name email location');

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    res.json({
      success: true,
      data: opportunity
    });
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch opportunity details'
    });
  }
};

// Apply for opportunity
const applyForOpportunity = async (req, res) => {
  try {
    const { opportunityId } = req.params;
    const { applicationMessage } = req.body;
    const volunteerId = req.user.id;

    // Check if opportunity exists and is active
    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    if (opportunity.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This opportunity is no longer accepting applications'
      });
    }

    // Check if opportunity is full
    if (opportunity.registeredCount >= opportunity.capacity) {
      return res.status(400).json({
        success: false,
        message: 'This opportunity is already at full capacity'
      });
    }

    // Check if application deadline has passed
    if (opportunity.applicationDeadline && new Date() > opportunity.applicationDeadline) {
      return res.status(400).json({
        success: false,
        message: 'Application deadline has passed'
      });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      opportunityId,
      volunteerId
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this opportunity',
        applicationStatus: existingApplication.status
      });
    }

    // Create new application
    const newApplication = new Application({
      opportunityId,
      volunteerId,
      applicationMessage: applicationMessage || '',
      status: 'pending'
    });

    await newApplication.save();
    await newApplication.populate('opportunityId', 'title date location');
    await newApplication.populate('volunteerId', 'name email');

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: newApplication
    });
  } catch (error) {
    console.error('Error applying for opportunity:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this opportunity'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to submit application'
    });
  }
};

// Get user's applications
const getMyApplications = async (req, res) => {
  try {
    console.log('getMyApplications called'); // Debug log
    
    const volunteerId = req.user.id;
    const { status, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = { volunteerId };
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get applications from database
    const applications = await Application.find(query)
      .populate({
        path: 'opportunityId',
        populate: {
          path: 'createdBy',
          select: 'name email'
        }
      })
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const totalApplications = await Application.countDocuments(query);

    console.log('Returning real applications:', applications.length);

    res.json({
      success: true,
      data: applications,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalApplications / parseInt(limit)),
        totalItems: totalApplications,
        hasNext: skip + applications.length < totalApplications,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message
    });
  }
};

// Withdraw application
const withdrawApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const volunteerId = req.user.id;

    const application = await Application.findOne({
      _id: applicationId,
      volunteerId
    }).populate('opportunityId');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (application.status === 'withdrawn') {
      return res.status(400).json({
        success: false,
        message: 'Application is already withdrawn'
      });
    }

    // If application was accepted, decrement the registered count
    if (application.status === 'accepted') {
      await Opportunity.findByIdAndUpdate(application.opportunityId._id, {
        $inc: { registeredCount: -1 }
      });
    }

    application.status = 'withdrawn';
    await application.save();

    res.json({
      success: true,
      message: 'Application withdrawn successfully',
      data: application
    });
  } catch (error) {
    console.error('Error withdrawing application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to withdraw application'
    });
  }
};

// Get volunteer dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    console.log('getDashboardStats called for volunteer'); // Debug log
    
    const volunteerId = req.user.id;

    // Get real stats from database
    const [totalApplications, pendingApplications, acceptedApplications, rejectedApplications] = await Promise.all([
      Application.countDocuments({ volunteerId }),
      Application.countDocuments({ volunteerId, status: 'pending' }),
      Application.countDocuments({ volunteerId, status: 'accepted' }),
      Application.countDocuments({ volunteerId, status: 'rejected' })
    ]);

    // Get upcoming events (accepted applications for future events)
    const upcomingEvents = await Application.countDocuments({
      volunteerId,
      status: 'accepted'
    }).populate({
      path: 'opportunityId',
      match: { date: { $gte: new Date() } }
    });

    // Calculate total hours volunteered (assuming 4 hours per accepted application)
    const totalHoursVolunteered = acceptedApplications * 4;

    // Get recent activity
    const recentApplications = await Application.find({ volunteerId })
      .populate('opportunityId', 'title')
      .sort({ appliedAt: -1 })
      .limit(5);

    const recentActivity = recentApplications.map(app => ({
      type: app.status === 'pending' ? 'application_submitted' : 
            app.status === 'accepted' ? 'application_accepted' : 'application_rejected',
      message: `${app.status === 'pending' ? 'Applied for' : 
                 app.status === 'accepted' ? 'Application accepted for' : 
                 'Application rejected for'} ${app.opportunityId?.title || 'Unknown Event'}`,
      date: app.appliedAt
    }));

    const stats = {
      totalApplications,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
      upcomingEvents: upcomingEvents || 0,
      totalHoursVolunteered,
      applications: {
        total: totalApplications,
        pending: pendingApplications,
        accepted: acceptedApplications,
        rejected: rejectedApplications
      },
      recentActivity
    };

    console.log('Returning volunteer stats:', stats);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching volunteer dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
};

module.exports = {
  getAllOpportunities,
  getOpportunityById,
  applyForOpportunity,
  getMyApplications,
  withdrawApplication,
  getDashboardStats
};
