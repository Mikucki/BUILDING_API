const express = require("express");
const router = express.Router();
const {
  getGoals,
  putGoals,
  postGoals,
  deleteGoal,
} = require("../controllers/goalController.js");
const protect = require("../middleware/authMiddleware.js");

router.get("/", protect, getGoals);

router.post("/", protect, postGoals);

router.put("/:id", protect, putGoals);

router.delete("/:id", protect, deleteGoal);

module.exports = router;
