const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  mydate: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Posts = mongoose.model('posts', PostsSchema);
