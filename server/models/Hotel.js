import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hotel name is required"],
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    shortDescription: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: [true, "Location is required"],
    },

    address: {
      type: String,
      default: "",
    },

    pricePerNight: {
      type: Number,
      required: true,
      default: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    coverImage: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],

    amenities: [
      {
        type: String,
      },
    ],

    roomTypes: [
      {
        name: String,
        price: Number,
        capacity: Number,
      },
    ],

    checkIn: {
      type: String,
      default: "12:00 PM",
    },

    checkOut: {
      type: String,
      default: "11:00 AM",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 5,
    },

    reviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Hotel", hotelSchema);