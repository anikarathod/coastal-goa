import express from "express";

import {
  getServices,
  getFeaturedServices,
  getService,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* ===========================================
   Public Routes
=========================================== */

// Featured Services
router.get("/featured", getFeaturedServices);

// All Services
router.get("/", getServices);

// Single Service (Slug)
router.get("/:slug", getService);

/* ===========================================
   Admin Routes
=========================================== */

// Create Service
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createService
);

// Update Service
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateService
);

// Delete Service
router.delete(
  "/:id",
  authMiddleware,
  deleteService
);

export default router;