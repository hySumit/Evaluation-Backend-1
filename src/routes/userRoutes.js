const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../model/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(400).send("User already exist");
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: "error hasing password",
            err,
          });
        }
        try {
          const newUser = new userModel({ username, email, password: hash });
          await newUser.save();

          return res.status(201).send("User Registerd Successfully");
        } catch (error) {
          res.status(500).send("Error registering the user");
        }
      });
    }
  } catch (error) {
    res.status(500).send("Error while finding the user");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const accessToken = jwt.sign(
            {
              userID: user.id,
              username: user.username,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1hr" }
          );

          const refreshToken = jwt.sign(
            {
              userID: user.id,
              username: user.username,
            },
            process.env.SECRET_KEY,
            { expiresIn: "5hr" }
          );
          res.status(201).json({
            message: "User logged in successfully",
            accesstoken: accessToken,
            refreshtoken: refreshToken,
          });
        } else {
          return res.status(404).send("Invalid Credentials");
        }
      });
    } else {
      res.status(400).send("User not found please register first");
    }
  } catch (error) {
    return res.status(500).send("Error While log in");
  }
});

module.exports = userRouter;
