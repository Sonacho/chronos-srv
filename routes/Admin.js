const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin"); // Import your Mongoose model

// Create a new admin
router.post("/", async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all admins
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific admin by ID
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an admin by ID
router.patch("/:id", async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an admin by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndRemove(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(204).send(); // No content upon successful deletion
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
