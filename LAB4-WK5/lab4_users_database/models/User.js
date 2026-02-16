const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [4, "Username must be at least 4 characters long"],
      maxlength: [100, "Username cannot exceed 100 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          // RFC 5322 compliant email regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    address: {
      street: {
        type: String,
        required: [true, "Street is required"],
      },
      suite: {
        type: String,
        required: [true, "Suite is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
        validate: {
          validator: function (v) {
            // Only alphabets and spaces
            return /^[a-zA-Z\s]+$/.test(v);
          },
          message: (props) =>
            `${props.value} is not valid! City must contain only alphabets and spaces`,
        },
      },
      zipcode: {
        type: String,
        required: [true, "Zipcode is required"],
        validate: {
          validator: function (v) {
            // Format: DDDDD-DDDD (e.g., 12345-1234)
            return /^\d{5}-\d{4}$/.test(v);
          },
          message: (props) =>
            `${props.value} is not valid! Zipcode format must be DDDDD-DDDD (e.g., 12345-1234)`,
        },
      },
      geo: {
        lat: {
          type: String,
          required: [true, "Latitude is required"],
        },
        lng: {
          type: String,
          required: [true, "Longitude is required"],
        },
      },
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      validate: {
        validator: function (v) {
          // Format: D-DDD-DDD-DDDD (e.g., 1-123-123-1234)
          return /^\d-\d{3}-\d{3}-\d{4}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not valid! Phone format must be D-DDD-DDD-DDDD (e.g., 1-123-123-1234)`,
      },
    },
    website: {
      type: String,
      required: [true, "Website is required"],
      validate: {
        validator: function (v) {
          // Must start with http:// or https://
          return /^(https?):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
        },
        message: (props) =>
          `${props.value} is not valid! Website must be a valid URL starting with http:// or https://`,
      },
    },
    company: {
      name: {
        type: String,
        required: [true, "Company name is required"],
      },
      catchPhrase: {
        type: String,
        required: [true, "Company catchPhrase is required"],
      },
      bs: {
        type: String,
        required: [true, "Company bs is required"],
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
