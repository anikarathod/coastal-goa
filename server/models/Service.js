import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    shortDescription: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "General",
    },

    location: {
      type: String,
      default: "Goa",
    },

    duration: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    // Changed from coverImage → image
    image: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],

    highlights: [
      {
        type: String,
      },
    ],

    inclusions: [
      {
        type: String,
      },
    ],

    exclusions: [
      {
        type: String,
      },
    ],

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

export default mongoose.model("Service", serviceSchema);