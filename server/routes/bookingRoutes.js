import express from "express";

const router = express.Router();

// Get all bookings
router.get("/", (req, res) => {
  res.json({
    success: true,
    bookings: [],
  });
});

// Create booking
router.post("/", (req, res) => {
  res.json({
    success: true,
    message: "Booking created successfully",
  });
});

export default router;