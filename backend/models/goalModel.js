const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      require: [true, "please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);
const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
