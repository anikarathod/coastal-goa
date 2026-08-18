import express from "express";

import {
  getHotels,
  getFeaturedHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/hotelController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===========================================
   Public Routes
=========================================== */

// Get All Hotels
router.get("/", getHotels);

// Get Featured Hotels
router.get("/featured", getFeaturedHotels);

// Get Single Hotel
router.get("/:slug", getHotel);

/* ===========================================
   Admin Routes
=========================================== */

// Create Hotel
router.post(
  "/",
  authMiddleware,
  createHotel
);

// Update Hotel
router.put(
  "/:id",
  authMiddleware,
  updateHotel
);

// Delete Hotel
router.delete(
  "/:id",
  authMiddleware,
  deleteHotel
);

export default router;