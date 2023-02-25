const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHendler = require("express-async-handler");
const User = require("../models/userModel.js");
const e = require("express");
//@desc Regitser new User
//@ROUTE POST /api/users
// @access Public

const registerUser = asyncHendler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("pleasa add all fields");
  }

  //see if user exist if no create a user :D
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User with that email already exists");
  }

  //hash the password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create a user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});
//@desc Regitser new User
//@ROUTE POST /api/users/login
// @access Public

const loginUser = asyncHendler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  //check for user email

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});
//@desc Regitser new User
//@ROUTE GET /api/users
// @access PRIVATE

const getUser = asyncHendler(async (req, res) => {
  const { name, _id, email, password } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
    password,
  });
});

//Generate a token JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser, getUser };
