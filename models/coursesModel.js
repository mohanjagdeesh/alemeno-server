const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  enrollmentStatus: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  prerequisites: {
    type: Array,
    required: true,
  },
  syllabus: {
    type: Array,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
