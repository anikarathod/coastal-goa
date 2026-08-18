import dns from "node:dns";

// Force Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = new Admin({
    name: "Admin",
    email: "info.coastalgoa@gmail.com",
    password: hashedPassword,
    role: "super-admin",
  });

  await admin.save();

  console.log("✅ Admin created successfully");

  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}