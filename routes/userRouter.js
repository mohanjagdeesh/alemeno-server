const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createUser,
  checkUser,
  getUsers,
  updateUserDetails,
  getUser,
} = require("../controller/userController");
const userRouter = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "profilePics");
//   },
//   filename: (req, file, cb) => {
//     const fileExtension = path.extname(file.originalname);
//     cb(null, `${Date.now()}${fileExtension}`);
//   },
// });

// const upload = multer({ storage: storage });
userRouter.post("/", createUser);

userRouter.post("/authenticate", checkUser);

userRouter.get("/", getUsers);

userRouter.put("/:id", updateUserDetails);

userRouter.get("/:id", getUser);

module.exports = userRouter;
