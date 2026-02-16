const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    restaurant_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cuisines: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      building: String,
      street: String,
      zipcode: String,
    },
    borough: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;
