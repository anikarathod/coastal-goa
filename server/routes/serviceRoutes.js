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

router.get("/featured", getFeaturedServices);

router.get("/", getServices);

router.get("/:slug", getService);

/* ===========================================
   Admin Routes
=========================================== */

router.post(
  "/",
  authMiddleware,
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "galleryImages",
      maxCount: 20,
    },
  ]),
  createService
);

router.put(
  "/:id",
  authMiddleware,
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "galleryImages",
      maxCount: 20,
    },
  ]),
  updateService
);

router.delete(
  "/:id",
  authMiddleware,
  deleteService
);

export default router;