const mongoose = require("mongoose");
const DB_Connection = mongoose.connection;

const url = "mongodb://localhost:27017/academydb";
const opts = { useNewUrlParser: true };

mongoose.set('useCreateIndex', true);
mongoose.connect(url, opts);

DB_Connection.once("open", function() {
  console.log("Successfully connected to MongoDB");
});

DB_Connection.on("error", console.error.bind(console, "Connection error: "));