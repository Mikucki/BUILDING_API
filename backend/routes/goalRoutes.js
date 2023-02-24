const express = require("express");
const router = express.Router();
const {
  getGoals,
  putGoals,
  postGoals,
  deleteGoal,
} = require("../controllers/goalController.js");

router.get("/", getGoals);

router.post("/", postGoals);

router.put("/:id", putGoals);

router.delete("/:id", deleteGoal);

module.exports = router;
