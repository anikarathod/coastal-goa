import express from "express";

import {
  loginAdmin,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===========================================
   Admin Authentication
=========================================== */

// Login
router.post("/login", loginAdmin);

// Get Logged In Admin
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

// Update Admin Profile
router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

// Change Password
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

export default router;