//@ desc GET goals
//@ route GET /api/goals
//@acces Private

const getGoals = (req, res) => {
  res.status(200).json({ message: "get goal" });
};

//@ desc put goals
//@ route put /api/goals/:ID
//@acces Private

const putGoals = (req, res) => {
  res.status(200).json({ message: `update goal nr ${req.params.id}` });
};

//@ desc POST goals
//@ route POST /api/goals
//@acces Private

const postGoals = (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ message: "Please add text filed" });
  }
  res.status(200).json({ message: "set goal" });
};

//@ desc Delete goals
//@ route delete /api/goals/:ID
//@acces Private

const deleteGoal = (req, res) => {
  res.status(200).json({ message: `deleted goal nr ${req.params.id}` });
};

module.exports = { getGoals, putGoals, postGoals, deleteGoal };
