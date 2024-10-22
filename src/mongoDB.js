const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://jaisaravana812:J7YUkcf3lKZdw1dm@cluster0.qumho.mongodb.net/"
  )
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.log("failed");
  });

const logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const LogInCollection = new mongoose.model("LogInCollection", logInSchema);

module.exports = LogInCollection;
