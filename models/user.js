// models/User.js
import mongoose from 'mongoose';

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,  // Trims whitespace from the name
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],  // Enum to restrict values
    required: true,
  },
  specialization: {
    type: String,
    required: true,
    trim: true,  // Trims whitespace from the specialization field
  },
  description: {
    type: String,
    required: true,
      
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt timestamps
});

// Create a Mongoose model for the schema
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
