const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController.js");
const protect = require("../middleware/authMiddleware.js");

router.get("/me", protect, getMe);
router.post("/", registerUser);
router.post("/login", loginUser);

module.exports = router;
