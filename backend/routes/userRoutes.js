const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController.js");
const protect = require("../middleware/authMiddleware.js");

router.get("/me", protect, getUser);
router.post("/", registerUser);
router.post("/login", loginUser);

module.exports = router;
