const express = require("express");
const restaurantModel = require("../models/Restaurant");
const app = express();

// 4. GET all restaurants - Return all restaurant details (all columns)
// http://localhost:3000/restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const { sortBy } = req.query;

    // 6. If sortBy query parameter exists, return sorted results with selected columns
    if (sortBy) {
      const sortOrder = sortBy.toUpperCase() === "DESC" ? -1 : 1;
      const restaurants = await restaurantModel
        .find({})
        .select("_id cuisines name city restaurant_id")
        .sort({ restaurant_id: sortOrder });
      return res.status(200).send(restaurants);
    }

    // Default: Return all restaurants with all columns
    const restaurants = await restaurantModel.find({});
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// 5. GET restaurants by cuisine - Return all restaurant details by cuisine (all columns)
// http://localhost:3000/restaurants/cuisine/Japanese
// http://localhost:3000/restaurants/cuisine/Bakery
// http://localhost:3000/restaurants/cuisine/Italian
app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  try {
    const { cuisine } = req.params;
    const restaurants = await restaurantModel.find({ cuisines: cuisine });

    if (restaurants.length === 0) {
      return res.status(404).send({
        status: false,
        message: `No restaurants found with cuisine: ${cuisine}`,
      });
    }

    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// 7. GET Delicatessen restaurants (NOT in Brooklyn)
// Return restaurants where cuisines = "Delicatessen" AND city != "Brooklyn"
// Selected columns: cuisines, name, city (exclude _id)
// Sorted by name in ascending order
// http://localhost:3000/restaurants/Delicatessen
app.get("/restaurants/Delicatessen", async (req, res) => {
  try {
    const restaurants = await restaurantModel
      .find({
        cuisines: { $eq: "Delicatessen" },
        city: { $ne: "Brooklyn" },
      })
      .select("cuisines name city -_id")
      .sort({ name: 1 });

    if (restaurants.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No Delicatessen restaurants found outside Brooklyn",
      });
    }

    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Create new restaurant (for testing/seeding data)
// http://localhost:3000/restaurant
app.post("/restaurant", async (req, res) => {
  try {
    const restaurant = new restaurantModel(req.body);
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update restaurant by ID
// http://localhost:3000/restaurant/:id
app.patch("/restaurant/:id", async (req, res) => {
  try {
    const restaurant = await restaurantModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).send({
        status: false,
        message: "Restaurant not found",
      });
    }

    res.send(restaurant);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete restaurant by ID
// http://localhost:3000/restaurant/:id
app.delete("/restaurant/:id", async (req, res) => {
  try {
    const restaurant = await restaurantModel.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return res.status(404).send({
        status: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "Restaurant deleted successfully",
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = app;
