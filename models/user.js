// models/user.js

import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

export default User;
