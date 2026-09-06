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
startingPrice: {
  type: Number,
  default: 0,
},

contactNumber: {
  type: String,
  default: "",
},

whatsappNumber: {
  type: String,
  default: "",
},

amenities: [
  {
    type: String,
  },
],

features: [
  {
    type: String,
  },
],

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