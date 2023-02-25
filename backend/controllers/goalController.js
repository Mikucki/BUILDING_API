const asyncHendler = require("express-async-handler");
const Goal = require("../models/goalModel.js");
//@ desc GET goals
//@ route GET /api/goals
//@acces Private

const getGoals = asyncHendler(async (req, res) => {
  if (!req.body.text) {
    res.status(401);
    throw new Error("add a text field stupiddd ");
  }
  const goals = await Goal.find({
    user: req.user.id,
    text: req.user.id,
  });
  res.status(200).json(goals);
});

//@ desc put goals
//@ route put /api/goals/:ID
//@acces Private

const putGoals = asyncHendler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

//@ desc POST goals
//@ route POST /api/goals
//@acces Private

const postGoals = asyncHendler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("pease add a trext field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

//@ desc Delete goals
//@ route delete /api/goals/:ID
//@acces Private

const deleteGoal = asyncHendler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  await Goal.findByIdAndRemove(goal);

  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, putGoals, postGoals, deleteGoal };
