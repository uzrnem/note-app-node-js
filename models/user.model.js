const mongoose = require("mongoose");

// Create Schema
const UserSchema = mongoose.Schema({
  email: String,
  password: String
}, {
  timestamps: true
});

var User = mongoose.model('user', UserSchema);
module.exports = User;
