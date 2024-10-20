import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    validate: {
      validator: function(v) {
        // Password must contain at least one number and one letter
        return /\d/.test(v) && /[a-zA-Z]/.test(v);
      },
      message: 'Password must contain at least one number and one letter'
    }
  }
}, {
  timestamps: true,
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords entered by the user and the actual password
userSchema.methods.comparePassword = async function(inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

export const User = mongoose.model('User', userSchema);