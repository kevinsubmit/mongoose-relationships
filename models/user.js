// reference引用型需要这个user.js，嵌套型embedding不需要

import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

export default User;
