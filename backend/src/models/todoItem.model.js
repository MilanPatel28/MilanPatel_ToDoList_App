import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [1, 'Title cannot be empty'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for improved query performance
todoSchema.index({ user: 1, completed: 1 });
todoSchema.index({ user: 1, createdAt: -1 });

// Virtual for truncated description
todoSchema.virtual('shortDescription').get(function() {
  if (this.description) {
    return this.description.length > 50 
      ? `${this.description.substring(0, 50)}...` 
      : this.description;
  }
  return '';
});

// Static method to get todos for a specific user
todoSchema.statics.findByUser = function(userId) {
  return this.find({ user: userId }).sort({ createdAt: -1 });
};

// Static method to get completed todos for a specific user
todoSchema.statics.findCompletedByUser = function(userId) {
  return this.find({ user: userId, completed: true }).sort({ createdAt: -1 });
};

// Instance method to toggle completion status
todoSchema.methods.toggleComplete = async function() {
  this.completed = !this.completed;
  return this.save();
};

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;