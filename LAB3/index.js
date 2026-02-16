require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const restaurantRouter = require("./routes/RestaurantRoutes.js");
const SERVER_PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json()); // Make sure it comes back as json

// MongoDB connection - Update these in .env or replace below
const user = process.env.DB_USER_NAME || "eskigozdee_db_user";
const pass = encodeURIComponent(process.env.DB_PASSWORD || "Test12345Mongo"); // URL encode password
const clusterId = process.env.DB_CLUSTER_ID || "03sjblv";
const dbName = process.env.DB_NAME || "Lab3-restaurant_database";

const DB_CONNECTION = `mongodb+srv://${user}:${pass}@cluster0.${clusterId}.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

async function connectToMongoDB(connectionString = DB_CONNECTION) {
  await mongoose.connect(connectionString);
}

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "🍽️ Welcome to Lab3 Restaurant Database API",
    status: "running",
    endpoints: {
      "GET /restaurants": "Get all restaurants",
      "GET /restaurants/cuisine/:cuisine":
        "Get restaurants by cuisine (e.g., /restaurants/cuisine/Japanese)",
      "GET /restaurants?sortBy=ASC":
        "Get restaurants sorted by restaurant_id (ASC or DESC)",
      "GET /restaurants/Delicatessen":
        "Get Delicatessen restaurants (excluding Brooklyn)",
      "POST /restaurant": "Create a new restaurant",
      "PATCH /restaurant/:id": "Update restaurant by ID",
      "DELETE /restaurant/:id": "Delete restaurant by ID",
    },
  });
});

app.use(restaurantRouter);

app.listen(SERVER_PORT, async () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
  console.log(`Attempting to connect to MongoDB...`);
  console.log(`Database: ${dbName}`);
  console.log(`User: ${user}`);
  console.log(`Cluster: cluster0.${clusterId}.mongodb.net`);

  try {
    await connectToMongoDB(DB_CONNECTION);
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    console.log("\n💡 Troubleshooting tips:");
    console.log(
      "1. Make sure you clicked 'Create Database User' in MongoDB Atlas"
    );
    console.log("2. Verify your IP address is whitelisted in Network Access");
    console.log("3. Wait 1-2 minutes after creating the user");
  }
});
