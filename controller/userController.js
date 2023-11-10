const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../cloudinary/cloudinary");

const createUser = async (req, res) => {
  try {
    const { email, password, name, profilePic } = req.body;

    const result = await cloudinary.uploader.upload(
      profilePic,
      {
        upload_preset: "unauthorised_upload",
        public_id: `${name}-avatar`,
        allowed_formats: ["jpg", "jpeg", "png"],
      },
      function (error, result) {
        if (error) {
          return error;
        } else {
          return result;
        }
      }
    );

    const userCheck = await User.find({ email });
    if (userCheck.length !== 0) {
      res
        .status(401)
        .json({ message: `User Already Existed With This ${email}` });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profilePicUrl: result?.secure_url,
      });
      const response = await newUser.save();
      res.send(response);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await User.find({});
    res.send(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const checkUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userList = await User.find({ email });
    if (userList.length !== 0) {
      const userDetails = userList[0];
      const isPasswordMatched = await bcrypt.compare(
        password,
        userDetails.password
      );
      if (isPasswordMatched) {
        const payLoad = {
          email,
          password,
        };
        const secretKey = process.env.JSON_SECRET_KEY;
        const token = jwt.sign(payLoad, secretKey);
        res.send({
          status: true,
          statusText: "User Loggedin Successfully",
          jwtToken: token,
          userDetails,
        });
      } else {
        res.send({ status: false, statusText: "Password Mismatched" });
      }
    } else {
      res.send({ status: false, statusText: "Email Mismatched" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    console.log(req.body);
    const { userId } = req.body;
    const newCourse = req.body;
    const user = await User.findById(userId);
    user.enrolledCourses.push(newCourse);
    const updateUser = await user.save();
    res.json(updateUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  createUser,
  getUser,
  checkUser,
  getUsers,
  updateUserDetails,
};
