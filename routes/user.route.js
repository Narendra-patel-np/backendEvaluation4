const express = require("express");
const { UserModel } = require("../model/users.model");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { name, email, age, gender, city, is_married, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(200).send({ msg: err.message });
      } else {
        const user = new UserModel({
          name,
          email,
          age,
          city,
          gender,
          is_married,
          password: hash,
        });
        await user.save();
        res.status(200).send({
          msg: "new User is registered successfully",
          newuser: req.body,
        });
      }
    });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ course: "NEM111" }, "evaluation");
        res.status(200).send({ msg: "Login Successfull", token: token });
      } else {
        res.status(200).send({ err: "Wrong credentials" });
      }
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
module.exports = {
  userRouter,
};
