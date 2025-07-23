// routes/doctors.js
const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

//Add Doctor
router.post("/", async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    const doctor = new Doctor({
      name,
      address,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    const saved = await doctor.save();
    console.log("✅ Saved doctor:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving doctor:", err);
    res.status(500).json({ error: "Failed to save doctor" });
  }
});


// Search nearby
router.get("/search", async (req, res) => {
  const { lat, lng, distance = 5000 } = req.query;
  const doctors = await Doctor.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
        $maxDistance: parseInt(distance),
      },
    },
  });
  res.json(doctors);
});

module.exports = router;
