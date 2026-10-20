import express from "express";
import {
  getPlaces,
  getFeaturedPlaces,
  getPlace,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/placeController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; // 👈 This is your Cloudinary setup!

const router = express.Router();

/* Public */
router.get("/featured", getFeaturedPlaces);
router.get("/", getPlaces);
router.get("/id/:id", getPlaceById);
router.get("/:slug", getPlace);

/* Admin */
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 20 },
  ]),
  createPlace
);

router.put(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 20 },
  ]),
  updatePlace
);

router.delete("/:id", authMiddleware, deletePlace);

export default router;