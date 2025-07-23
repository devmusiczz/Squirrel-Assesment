// models/Doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  address: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
  },
});

doctorSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Doctors", doctorSchema);
