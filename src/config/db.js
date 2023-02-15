const mongoose = require("mongoose");

const mongoConnectionUrl =
  process.env.MONGODB_CONNECTION_URL || "mongodb://127.0.0.1:27017/test";

module.exports = () => {
  mongoose
    .connect(mongoConnectionUrl)
    .then(() => {
      console.log("Mongodb connected....");
    })
    .catch((err) => console.log(err.message));

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db...");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected...");
  });
};
