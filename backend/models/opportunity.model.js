// models/opportunity.model.js
const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  category: {
    type: String,
    required: true,
    enum: ['environmental', 'education', 'community', 'health', 'technology', 'electronics', 'recycling']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed', 'cancelled'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requiredSkills: [{
    type: String
  }],
  duration: {
    type: String, // e.g., "2 hours", "Half day", "Full day"
    required: true
  },
  applicationDeadline: {
    type: Date
  },
  // Track registered participants count
  registeredCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Virtual for checking if opportunity is full
opportunitySchema.virtual('isFull').get(function() {
  return this.registeredCount >= this.capacity;
});

// Virtual for calculating spots remaining
opportunitySchema.virtual('spotsRemaining').get(function() {
  return Math.max(0, this.capacity - this.registeredCount);
});

// Index for efficient queries
opportunitySchema.index({ createdBy: 1, status: 1 });
opportunitySchema.index({ date: 1, status: 1 });
opportunitySchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Opportunity', opportunitySchema);
