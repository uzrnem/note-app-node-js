const mongoose = require("mongoose");

// Create Schema
const NoteSchema = mongoose.Schema({
  content: String,
  isCompleted: Boolean,
  user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
});

let Note = mongoose.model('note', NoteSchema);
module.exports = Note
