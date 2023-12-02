const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("./db.js");

var app = express();
app.use(bodyParser.json());

var employeesController = require("./controllers/employeeController.js");
app.listen(3000, () => console.log("Server started at port: 3000"));

app.use("/employees", employeesController);
