const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const employeeRoute = require("./routes/employees");
const cors = require("cors");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MONGODB"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with the actual origin of your frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Include the HTTP methods you need
  })
);



app.use("/employee", employeeRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
