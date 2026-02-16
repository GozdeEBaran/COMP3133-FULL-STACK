require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const DB_NAME = process.env.DB_NAME || "lab4_users_database";
const DB_USER_NAME = process.env.DB_USER_NAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const CLUSTER_ID = process.env.DB_CLUSTER_ID || "";

const DB_CONNECTION = `mongodb+srv://${DB_USER_NAME}:${encodeURIComponent(
  DB_PASSWORD
)}@cluster0.${CLUSTER_ID}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

async function connectToMongoDB() {
  try {
    await mongoose.connect(DB_CONNECTION);
    console.log("✅ Connected to MongoDB successfully!");
    console.log(`📦 Database: ${DB_NAME}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.log("\n💡 Troubleshooting tips:");
    console.log("1. Check your .env file has correct credentials");
    console.log("2. Verify your IP address is whitelisted in MongoDB Atlas");
    console.log("3. Ensure your cluster is active");
    process.exit(1);
  }
}

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "👥 Lab 04 - Users Database API with Mongoose Validation",
    status: "running",
    endpoints: {
      "POST /users": "Create a new user (with validation)",
      "GET /users": "Get all users",
      "GET /users/:id": "Get user by ID",
      "DELETE /users/:id": "Delete user by ID",
    },
    validations: {
      username: "Min 4 chars, Max 100 chars",
      email: "Valid and unique email",
      city: "Only alphabets and spaces",
      website: "Valid URL (http:// or https://)",
      zipcode: "Format: DDDDD-DDDD (e.g., 12345-1234)",
      phone: "Format: D-DDD-DDD-DDDD (e.g., 1-123-123-1234)",
    },
  });
});

// Routes
app.use("/", userRoutes);

// Start server
app.listen(PORT, async () => {
  console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}/\n`);
  await connectToMongoDB();
});
