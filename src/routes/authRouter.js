const express = require("express");
const { signUpValidation } = require("../helper/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    signUpValidation(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 3600000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({
      message: "Data added to database successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(401).json({ message: "Error: " + error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId }).select(
      "-createdAt -updatedAt"
    );
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const checkPassword = await user.validatePassword(password);
    if (!checkPassword) {
      throw new Error("Invalid Credentials");
    }
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 3600000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({
      message: "Login Successfully",
      data: user,
    });
  } catch (error) {
    res.status(401).json({ message: "Error: " + error.message });
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ message: "Logout successfully" });
});

module.exports = authRouter;
