const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { Employee } = require("../models/Employee");
const { json } = require("body-parser");

router.get("/", async (req, res) => {
  try {
    var employees = await Employee.find({});
    res.send(employees);
  } catch (err) {
    console.log("Error in retrieving employees: " + err);
    res.status(500).send("Error in retrieving employees");
  }
});

router.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send("No record was found with the given id: " + req.params.id);

  try {
    var employee = await Employee.findById(req.params.id);

    if (!employee) {
      res.send("Error: Employee with the given id doesn't exist");
    } else {
      res.send(employee);
    }
  } catch (err) {
    console.log("Error ");
  }
});

router.post("/", async (req, res) => {
  try {
    var newEmployee = new Employee({
      name: req.body.name,
      position: req.body.position,
      office: req.body.office,
      salary: req.body.salary,
    });
    var result = await newEmployee.save();
    res.send(result);
  } catch (err) {
    console.log("Error in saving a new record " + err);
    req.status(500).send("Error in saving a new record");
  }
});

router.put("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send("No record was found with the given id: " + req.params.id);

  var updatedEmployee = {
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  };

  try {
    var updatedEmp = await Employee.findByIdAndUpdate(
      req.params.id,
      updatedEmployee,
      { new: true }
    );
    if (!updatedEmp) {
      return res.status(400).send("Employee not found");
    }
    res.send(updatedEmp);
    console.log("Employee Updated !");
  } catch (err) {
    console.log("Error cannot update the entity" + err);
    res.status(500).send("Error updating employee");
  }
});

router.delete("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(500)
      .send("No record was found with the given id: " + req.params.id);

  try {
    var deletedEmployee = await Employee.findByIdAndRemove(req.params.id);
    console.log("Employee deleted successfully!");
    res.send(
      "Employee deleted successfully" + "\n" + getEmployee(deletedEmployee)
    );
  } catch (err) {
    console.log("Error employee can't be deleted" + err);
  }
});

function getEmployee(employee) {
  var employeeDetails = null;

  employeeDetails =
    "name: " +
    employee.name +
    "\nposition: " +
    employee.position +
    "\noffice: " +
    employee.office +
    "\nsalary: " +
    employee.salary;
  return employeeDetails.toJson();
}

module.exports = router;
