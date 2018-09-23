'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ActSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  kindnessRating: {
    type: Number,
    required: true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: false, required: [false, 'No user id found'] },
});

ActSchema.methods.serialize = function () {
  return {
    id: this._id,
    title: this.title,
    date: this.date,
    location: this.location,
    description: this.description,
    kindnessRating: this.kindnessRating
  };
};

const Act = mongoose.model('Act', ActSchema);

module.exports = { Act };
