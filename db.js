const mongoose = require("mongoose");

var mongooseConnect = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/CrudDB");
    console.log("Successfully connected to database");
  } catch (err) {
    console.log("Error in connecting to database ", err);
  }
};

mongooseConnect();

module.exports = mongoose;
