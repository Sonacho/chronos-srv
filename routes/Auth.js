const router = require("express").Router();
const Admin = require("../models/Admin");
// Library to hash password to keep it private even if the database is breached
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(15); // 10 is default, increasing password security if >
    const hashPass = await bcrypt.hash(req.body.password, salt);
    const newAdmin = new Admin({
      userName: req.body.username,
      password: hashPass,
    });

    const admin = await newAdmin.save();
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({ userName: req.body.username });
    if (!admin) {
      return res.status(400).json("Wrong credentials.");
    }

    const validated = await bcrypt.compare(req.body.password, admin.password);
    // Removes password from the response.
    const { password, ...others } = admin._doc;
    if (!validated) {
      return res.status(400).json("Wrong credentials.");
    }

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
