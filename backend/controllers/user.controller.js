const User = require("../models/user.model");
const Opportunity = require('../models/opportunity.model');
const Application = require('../models/application.model');

const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const loggedInUser = req.user;

        let allowedRoles = [];
        
        // Define role-based communication rules
        if (loggedInUser.role === 'ngo') {
            // NGOs can communicate with volunteers and admins
            allowedRoles = ['volunteer', 'admin'];
        } else if (loggedInUser.role === 'volunteer') {
            // Volunteers can communicate with NGOs and admins
            allowedRoles = ['ngo', 'admin'];
        } else if (loggedInUser.role === 'admin') {
            // Admins can communicate with everyone
            allowedRoles = ['volunteer', 'ngo', 'admin'];
        }

        // Find users with allowed roles, excluding the logged-in user
        const allUsers = await User.find({ 
            _id: { $ne: loggedInUserId },
            role: { $in: allowedRoles }
        }).select("-password");

        res.status(200).json(allUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Admin Analytics Functions

// Get Overall Platform Analytics
const getAdminAnalytics = async (req, res) => {
  try {
    const { timeRange = 'month' } = req.query;

    // Calculate date range
    const now = new Date();
    let startDate;
    
    switch (timeRange) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'quarter':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default: // month
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get all platform data
    const [
      totalUsers,
      totalNGOs,
      totalVolunteers,
      totalEvents,
      activeEvents,
      completedEvents,
      totalApplications,
      acceptedApplications,
      pendingApplications,
      rejectedApplications
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'ngo' }),
      User.countDocuments({ role: 'volunteer' }),
      Opportunity.countDocuments(),
      Opportunity.countDocuments({ status: 'active' }),
      Opportunity.countDocuments({ status: 'completed' }),
      Application.countDocuments({ createdAt: { $gte: startDate } }),
      Application.countDocuments({ status: 'accepted', createdAt: { $gte: startDate } }),
      Application.countDocuments({ status: 'pending', createdAt: { $gte: startDate } }),
      Application.countDocuments({ status: 'rejected', createdAt: { $gte: startDate } })
    ]);

    // Calculate environmental impact
    const totalVolunteerHours = acceptedApplications * 4;
    const wasteCollected = acceptedApplications * 15;
    const treesPlanted = Math.floor(acceptedApplications * 0.8);
    const co2Saved = Math.floor(wasteCollected * 0.5);

    // Monthly user growth
    const userGrowthData = [];
    const currentDate = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0, 23, 59, 59);
      
      const [newUsers, newNGOs, newVolunteers] = await Promise.all([
        User.countDocuments({ createdAt: { $gte: monthStart, $lte: monthEnd } }),
        User.countDocuments({ role: 'ngo', createdAt: { $gte: monthStart, $lte: monthEnd } }),
        User.countDocuments({ role: 'volunteer', createdAt: { $gte: monthStart, $lte: monthEnd } })
      ]);
      
      userGrowthData.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short' }),
        users: newUsers,
        ngos: newNGOs,
        volunteers: newVolunteers
      });
    }

    // Event activity data
    const eventActivityData = [];
    
    for (let i = 11; i >= 0; i--) {
      const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0, 23, 59, 59);
      
      const [eventsCreated, applications] = await Promise.all([
        Opportunity.countDocuments({ createdAt: { $gte: monthStart, $lte: monthEnd } }),
        Application.countDocuments({ createdAt: { $gte: monthStart, $lte: monthEnd } })
      ]);
      
      eventActivityData.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short' }),
        events: eventsCreated,
        applications: applications
      });
    }

    // NGO performance data
    const topNGOs = await Opportunity.aggregate([
      {
        $lookup: {
          from: 'applications',
          localField: '_id',
          foreignField: 'opportunityId',
          as: 'applications'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'ngoDetails'
        }
      },
      {
        $group: {
          _id: '$createdBy',
          ngoName: { $first: { $arrayElemAt: ['$ngoDetails.fullName', 0] } },
          totalEvents: { $sum: 1 },
          totalApplications: { $sum: { $size: '$applications' } },
          acceptedApplications: {
            $sum: {
              $size: {
                $filter: {
                  input: '$applications',
                  cond: { $eq: ['$$this.status', 'accepted'] }
                }
              }
            }
          }
        }
      },
      { $sort: { totalEvents: -1 } },
      { $limit: 5 }
    ]);

    // Category distribution
    const categoryData = await Opportunity.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const categoryDistribution = categoryData.map(cat => ({
      name: cat._id || 'Other',
      value: cat.count,
      percentage: Math.round((cat.count / totalEvents) * 100) || 0
    }));

    // Recent platform activities
    const recentApplications = await Application.find()
      .populate('volunteerId', 'fullName email')
      .populate('opportunityId', 'title category')
      .sort({ createdAt: -1 })
      .limit(10);

    const recentActivities = recentApplications.map(app => ({
      id: app._id,
      type: 'Application',
      user: app.volunteerId?.fullName || 'Unknown',
      event: app.opportunityId?.title || 'Unknown Event',
      category: app.opportunityId?.category || 'Other',
      status: app.status,
      date: app.createdAt
    }));

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalNGOs,
          totalVolunteers,
          totalEvents,
          activeEvents,
          completedEvents,
          totalApplications,
          acceptedApplications,
          pendingApplications,
          rejectedApplications,
          totalVolunteerHours,
          wasteCollected,
          treesPlanted,
          co2Saved
        },
        userGrowthData,
        eventActivityData,
        topNGOs,
        categoryDistribution,
        recentActivities,
        timeRange
      }
    });
  } catch (error) {
    console.error('Error fetching admin analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin analytics'
    });
  }
};

// Get NGO Analytics for Admin
const getNGOAnalytics = async (req, res) => {
  try {
    const { ngoId } = req.params;
    const { timeRange = 'month' } = req.query;

    // Get NGO details
    const ngo = await User.findById(ngoId).select('fullName email createdAt bio role');
    
    if (!ngo || ngo.role !== 'ngo') {
      return res.status(404).json({
        success: false,
        message: 'NGO not found'
      });
    }

    // Calculate date range
    const now = new Date();
    let startDate;
    
    switch (timeRange) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'quarter':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default: // month
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get NGO's events and applications
    const ngoEvents = await Opportunity.find({ createdBy: ngoId });
    const eventIds = ngoEvents.map(event => event._id);
    
    const applications = await Application.find({
      opportunityId: { $in: eventIds },
      createdAt: { $gte: startDate }
    }).populate('volunteerId', 'fullName email')
      .populate('opportunityId', 'title category date');

    // Calculate statistics
    const totalEvents = ngoEvents.length;
    const activeEvents = ngoEvents.filter(event => event.status === 'active').length;
    const completedEvents = ngoEvents.filter(event => event.status === 'completed').length;
    const totalApplications = applications.length;
    const acceptedApplications = applications.filter(app => app.status === 'accepted').length;
    const pendingApplications = applications.filter(app => app.status === 'pending').length;
    const rejectedApplications = applications.filter(app => app.status === 'rejected').length;

    // Get unique volunteers
    const uniqueVolunteers = await Application.distinct('volunteerId', {
      opportunityId: { $in: eventIds },
      status: 'accepted'
    });

    const totalVolunteers = uniqueVolunteers.length;
    const totalVolunteerHours = acceptedApplications * 4;
    const wasteCollected = acceptedApplications * 15;
    const treesPlanted = Math.floor(acceptedApplications * 0.8);
    const co2Saved = Math.floor(wasteCollected * 0.5);

    res.json({
      success: true,
      data: {
        ngo: {
          id: ngo._id,
          name: ngo.fullName,
          email: ngo.email,
          joinDate: ngo.createdAt,
          bio: ngo.bio || 'No bio available'
        },
        stats: {
          totalEvents,
          activeEvents,
          completedEvents,
          totalApplications,
          acceptedApplications,
          pendingApplications,
          rejectedApplications,
          totalVolunteers,
          totalVolunteerHours,
          wasteCollected,
          treesPlanted,
          co2Saved
        },
        events: ngoEvents.slice(0, 10).map(event => ({
          id: event._id,
          title: event.title,
          date: event.date,
          category: event.category,
          status: event.status,
          capacity: event.capacity,
          location: event.location
        })),
        recentApplications: applications.slice(0, 10).map(app => ({
          id: app._id,
          volunteer: app.volunteerId?.fullName || 'Unknown',
          event: app.opportunityId?.title || 'Unknown Event',
          status: app.status,
          date: app.createdAt
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching NGO analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch NGO analytics'
    });
  }
};

// Get Volunteer Analytics for Admin
const getVolunteerAnalyticsForAdmin = async (req, res) => {
  try {
    const { volunteerId } = req.params;

    // Get volunteer details
    const volunteer = await User.findById(volunteerId)
      .select('fullName email createdAt skills location bio role');
    
    if (!volunteer || volunteer.role !== 'volunteer') {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }

    // Get volunteer's applications
    const applications = await Application.find({ volunteerId })
      .populate('opportunityId', 'title date category location createdBy')
      .sort({ createdAt: -1 });

    // Calculate statistics
    const totalApplications = applications.length;
    const acceptedApplications = applications.filter(app => app.status === 'accepted').length;
    const pendingApplications = applications.filter(app => app.status === 'pending').length;
    const rejectedApplications = applications.filter(app => app.status === 'rejected').length;
    const hoursVolunteered = acceptedApplications * 4;
    const wasteCollected = acceptedApplications * 15;
    const treesPlanted = Math.floor(acceptedApplications * 0.8);
    const co2Saved = Math.floor(wasteCollected * 0.5);

    // Calculate impact score
    const impactScore = (acceptedApplications * 50) + (hoursVolunteered * 10) + (wasteCollected * 2);

    // Get NGOs worked with
    const ngoIds = [...new Set(applications
      .filter(app => app.status === 'accepted')
      .map(app => app.opportunityId?.createdBy?.toString())
      .filter(Boolean))];
    
    const ngosWorkedWith = await User.find({
      _id: { $in: ngoIds }
    }).select('fullName email').limit(5);

    res.json({
      success: true,
      data: {
        volunteer: {
          id: volunteer._id,
          name: volunteer.fullName,
          email: volunteer.email,
          joinDate: volunteer.createdAt,
          skills: volunteer.skills || [],
          location: volunteer.location || 'Not specified',
          bio: volunteer.bio || 'No bio available'
        },
        stats: {
          totalApplications,
          acceptedApplications,
          pendingApplications,
          rejectedApplications,
          hoursVolunteered,
          wasteCollected,
          treesPlanted,
          co2Saved,
          impactScore
        },
        ngosWorkedWith,
        recentApplications: applications.slice(0, 10).map(app => ({
          id: app._id,
          event: app.opportunityId?.title || 'Unknown Event',
          date: app.opportunityId?.date || new Date(),
          status: app.status,
          location: app.opportunityId?.location || 'Unknown',
          appliedDate: app.createdAt
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching volunteer analytics for admin:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch volunteer analytics'
    });
  }
};

module.exports = {
    getUsersForSidebar,
    getAdminAnalytics,
    getNGOAnalytics,
    getVolunteerAnalyticsForAdmin,
};