import express from "express";

import {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  markAsRead,
} from "../controllers/contactController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===========================================
   Public Routes
=========================================== */

// Send Contact Message
router.post("/", createContact);

/* ===========================================
   Admin Routes
=========================================== */

// Get All Contact Messages
router.get(
  "/",
  authMiddleware,
  getContacts
);

// Get Single Contact Message
router.get(
  "/:id",
  authMiddleware,
  getContact
);

// Mark Message as Read
router.put(
  "/:id/read",
  authMiddleware,
  markAsRead
);

// Delete Message
router.delete(
  "/:id",
  authMiddleware,
  deleteContact
);

export default router;