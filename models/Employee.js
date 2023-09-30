const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    position: {
      type: Number,
      required: true
    }

  },
  { timestamps: true }
);

const employee = mongoose.model("employee", employeeSchema);

module.exports = employee;
