import express from "express";

import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* Public */
router.get("/", getSettings);

/* Admin */
router.put(
  "/",
  authMiddleware,
  updateSettings
);

export default router;