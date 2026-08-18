import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("Using URI:", process.env.MONGO_URI);

try {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log("✅ Connected!");
  console.log(conn.connection.host);

  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}