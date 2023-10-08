const mongoose = require("mongoose");
const Employee = require("../models/employee");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MONGODB"))
  .catch((err) => console.log(err));

const seedData = [
  { name: "Nathan", position: 1 },
  { name: "Eric", position: 2 },
  { name: "John", position: 3 },
  { name: "Doug", position: 4 },
  { name: "Johny", position: 5 },
  { name: "Red", position: 6 },
  { name: "Jose", position: 7 },
  { name: "Ivan", position: 8 },
];

const seedDB = async () => {
  await Employee.deleteMany({});
  await Employee.insertMany(seedData);
};

seedDB().then(() => {
  mongoose.connection.close();
});
