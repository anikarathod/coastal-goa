import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    fileUrl: {
  type: String,
  required: [true, "File is required"],
},

fileType: {
  type: String,
  enum: ["image", "video"],
  default: "image",
  required: true,
},
    category: {
      type: String,
      default: "Other",
      trim: true,
    },

    location: {
      type: String,
      default: "Goa",
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Gallery",
  gallerySchema
);