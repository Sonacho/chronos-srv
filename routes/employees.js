const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee"); // Import your Mongoose model

// Create a new employee
router.post("/", async (req, res) => {
  try {
    const { name, timestamp } = req.body;
    const employee = new Employee({ name, timestamp });
    const savedEmployee = await employee.save();
    res.json(savedEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/", async (req, res) => {
  try {
    const newOrderEmployees = req.body;
    newOrderEmployees.forEach(async (e) => {
      await Employee.findByIdAndUpdate(e._id, e);
    });
    res.json("Succesfully patched");
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employeeData = await Employee.find().sort({ position: "asc" }); // Use a different variable name
    console.log(employeeData);
    res.json(employeeData);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// // Get a specific employee by ID
// router.get("/employees/:id", async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);
//     if (!employee) {
//       return res.status(404).json({ error: "Employee not found" });
//     }
//     res.json(employee);
//   } catch (error) {
//     console.error("Error fetching employee:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// Update an employee by ID
// router.put("/employees/:id", async (req, res) => {
//   try {
//     const updatedEmployee = await Employee.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedEmployee) {
//       return res.status(404).json({ error: "Employee not found" });
//     }
//     res.json(updatedEmployee);
//   } catch (error) {
//     console.error("Error updating employee:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// Delete an employee by ID
// router.delete("/employees/:id", async (req, res) => {
//   try {
//     const deletedEmployee = await Employee.findByIdAndRemove(req.params.id);
//     if (!deletedEmployee) {
//       return res.status(404).json({ error: "Employee not found" });
//     }
//     res.json(deletedEmployee);
//   } catch (error) {
//     console.error("Error deleting employee:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = router;
