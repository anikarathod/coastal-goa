import express from "express";

import {
  getPackages,
  getPackage,
  getPackageById,
  getFeaturedPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "../controllers/packageController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ==========================================
// PUBLIC
// ==========================================

router.get("/featured", getFeaturedPackages);

router.get("/id/:id", getPackageById);

router.get("/", getPackages);

router.get("/:slug", getPackage);

// ==========================================
// ADMIN
// ==========================================

router.post(
  "/",
  authMiddleware,
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  createPackage
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
      name: "images",
      maxCount: 10,
    },
  ]),
  updatePackage
);

router.delete(
  "/:id",
  authMiddleware,
  deletePackage
);

export default router;