const Course = require("../models/coursesModel");

const getSpecificCourse = async (req, res) => {
  try {
    const { courseId } = req.query;
    const specificCourse = await Course.find({ id: courseId });
    res.send(specificCourse);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getFilteredCourses = async (req, res) => {
  try {
    const searchInput = req.query.q;
    const result = await Course.find({
      $or: [
        { name: { $regex: new RegExp(searchInput, "i") } },
        { duration: { $regex: new RegExp(searchInput, "i") } },
        { instructor: { $regex: new RegExp(searchInput, "i") } },
        { location: { $regex: new RegExp(searchInput, "i") } },
        // Add more fields as needed
      ],
    });
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { getSpecificCourse, getFilteredCourses };
