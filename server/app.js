import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

/* ===========================================
   Middleware
=========================================== */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

/* ===========================================
   API Routes
=========================================== */

app.use("/api/auth", authRoutes);

app.use("/api/packages", packageRoutes);

app.use("/api/services", serviceRoutes);

app.use("/api/gallery", galleryRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/hotels", hotelRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/settings", settingsRoutes);

/* ===========================================
   Root
=========================================== */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Coastal Goa API is running 🚀",
  });
});

/* ===========================================
   404 Handler
=========================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

/* ===========================================
   Global Error Handler
=========================================== */

app.use(errorMiddleware);

export default app;