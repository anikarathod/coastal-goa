import express from "express";

import {
  getDashboard,
  getAdmins,
  createAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* Dashboard */
router.get(
  "/dashboard",
  authMiddleware,
  getDashboard
);

/* Admins */
router.get(
  "/",
  authMiddleware,
  getAdmins
);

router.post(
  "/",
  authMiddleware,
  createAdmin
);

router.delete(
  "/:id",
  authMiddleware,
  deleteAdmin
);

export default router;