const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();
const port = process.env.PORT || 4000;

const uri = process.env.DB_PATH;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected");
});

const app = express();
app.use(helmet());

//Routes
const users = require("./routes/users");
const blogs = require("./routes/blogs");
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/users", users);
app.use("/blogs", blogs);

// Catch 404 Errors and send them to Error handler
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  // Response to client
  res.status(status).json({
    error: {
      message: error.message,
      code: 500,
    },
  });
  // Response to ourself
  console.error(err);
});

// Start the server
app.listen(port, () =>
  console.log(`Listening to port http://localhost:${port}`)
);
