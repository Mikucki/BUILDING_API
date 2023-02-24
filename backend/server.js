const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const goals = require("./routes/goalRoutes");
const errorHandler = require("./middleware/errorMiddleware.js");
const connectDB = require("./config/db.js");
const colors = require("colors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goals);

connectDB();
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
