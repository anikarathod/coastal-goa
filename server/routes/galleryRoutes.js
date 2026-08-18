import express from "express";

import {
  getGallery,
  getFeaturedGallery,
  getGalleryItem,
  createGallery,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* ===========================================
   Public Routes
=========================================== */

// Get all gallery items
router.get("/", getGallery);

// Get featured gallery items
router.get("/featured", getFeaturedGallery);

// Get single gallery item
router.get("/:id", getGalleryItem);

/* ===========================================
   Admin Routes
=========================================== */

// Create gallery item
router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  createGallery
);

// Update gallery item
router.put(
  "/:id",
  authMiddleware,
  upload.single("file"),
  updateGallery
);

// Delete gallery item
router.delete(
  "/:id",
  authMiddleware,
  deleteGallery
);

export default router;