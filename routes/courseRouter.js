const express = require("express");
const {
  getSpecificCourse,
  getFilteredCourses,
} = require("../controller/courseController");
const coursesRouter = express.Router();

coursesRouter.get("/", getSpecificCourse);

coursesRouter.get("/search", getFilteredCourses);

module.exports = coursesRouter;
