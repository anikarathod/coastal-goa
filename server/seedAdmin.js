import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash(
      "admin123",
      10
    );

    await Admin.deleteMany({});

    await Admin.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "super-admin",
      isActive: true,
    });

    console.log("✅ Admin Created");
    console.log("Email: admin@gmail.com");
    console.log("Password: admin123");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();