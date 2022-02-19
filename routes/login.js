const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.send("Please fill all the required details");

  const user = await User.findOne({ email });
  if (!user) return res.send("User not registerd");

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (!matchedPassword) return res.send("Wrong password");

  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });

  user.token = token;

  res.send(user);
});

module.exports = router;
