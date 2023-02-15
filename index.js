//Internal Lib Import
const app = require("./app");
const PORT = process.env.PORT || 8080;

//Import Database Confiq
const connectDB = require("./src/config/db");

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  //connection database
  connectDB();
});
