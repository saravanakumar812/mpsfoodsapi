const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");

// mongoose.connect(
//   "mongodb+srv://jaisaravana812:7PckG06q5Qt0iX4R@cluster0.rwjxtfs.mongodb.net/"
// );
const uri =
  "mongodb+srv://jaisaravana812:J7YUkcf3lKZdw1dm@cluster0.qumho.mongodb.net/";
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose
  .connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
mongoose.Promise = global.Promise;
// app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header(
    "Access-Control-Allow-Origin",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    req.header("Access-Control-Allow-Origin", "PUT,PATCH,POST,DELETE,GET");
    return req.status(200).json({});
  }
  next();
});

app.use("/signup", signupRoutes);
app.use("/login", loginRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
