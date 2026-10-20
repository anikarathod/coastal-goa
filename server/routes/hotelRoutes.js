// routes/hotelRoutes.js
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
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* Public */
router.get("/featured", getFeaturedHotels);
router.get("/", getHotels);
router.get("/:slug", getHotel);

/* Admin */
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 20 },
  ]),
  createHotel
);

router.put(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 20 },
  ]),
  updateHotel
);

router.delete("/:id", authMiddleware, deleteHotel);

export default router;