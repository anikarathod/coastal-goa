// server/server.js
// ⚠️ BACKEND FILE — must be pure Node.js. NO JSX. NO React.

import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log("🚀 Starting Alpha Waves Goa Server...");

    // Connect to MongoDB
    await connectDB();

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);
    process.exit(1);
  }
}

startServer();