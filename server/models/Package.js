import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    // ==============================
    // BASIC INFORMATION
    // ==============================

    title: {
      type: String,
      required: [true, "Package title is required"],
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    category: {
      type: String,
      default: "Tour",
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    duration: {
      type: String,
      default: "",
      trim: true,
    },

    groupSize: {
      type: String,
      default: "",
      trim: true,
    },

    // ==============================
    // PRICING
    // ==============================

    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ==============================
    // IMAGES
    // ==============================

    coverImage: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],
// ==============================
// PACKAGE CONTENT
// ==============================

highlights: [
  {
    type: String,
    trim: true,
  },
],

inclusions: [
  {
    type: String,
    trim: true,
  },
],

exclusions: [
  {
    type: String,
    trim: true,
  },
],

extraDetails: [
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
],

sections: [
  {
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
  },
],

// ==============================
// ITINERARY
// ==============================

itinerary: [
  {
    day: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },
  },
],
    // ==============================
    // LOCATION MAP
    // ==============================

    latitude: {
      type: Number,
      default: null,
    },

    longitude: {
      type: Number,
      default: null,
    },

    // ==============================
    // PACKAGE FEATURES
    // ==============================

    pickupIncluded: {
      type: Boolean,
      default: false,
    },

    mealIncluded: {
      type: Boolean,
      default: false,
    },

    guideIncluded: {
      type: Boolean,
      default: false,
    },

    hotelIncluded: {
      type: Boolean,
      default: false,
    },

    // ==============================
    // SETTINGS
    // ==============================

    featured: {
      type: Boolean,
      default: false,
    },

    popular: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // ==============================
    // REVIEWS
    // ==============================

    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },

    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Package", packageSchema);