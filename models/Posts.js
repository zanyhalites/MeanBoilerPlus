var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  description: String
  });

mongoose.model('Post', PostSchema);