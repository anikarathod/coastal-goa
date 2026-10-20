import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    // Core identity
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["hotel", "guesthouse", "restaurant", "shop"],
      index: true,
    },

    // Presentation
    description: { type: String, default: "" },
    shortDescription: { type: String, default: "" },

    // Images (Cloudinary URLs)
    image: { type: String, default: "" },      // cover image
    images: { type: [String], default: [] },   // gallery

    // Location
    location: { type: String, default: "" },
    address: { type: String, default: "" },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    mapLink: { type: String, default: "" },

    // Contact
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    website: { type: String, default: "" },

    // Type-specific
    cuisine: { type: [String], default: [] },         // restaurants
    amenities: { type: [String], default: [] },       // hotels/guesthouses
    specialities: { type: [String], default: [] },    // shops
    priceRange: { type: String, default: "" },        // "₹", "₹₹", "₹₹₹"
    pricePerNight: { type: Number, default: null },   // hotels/guesthouses
    rating: { type: Number, default: 0, min: 0, max: 5 },
    openingHours: { type: String, default: "" },

    // Flags
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    // Extras
    highlights: { type: [String], default: [] },
    sections: { type: Array, default: [] },
    extraDetails: { type: Object, default: {} },
  },
  { timestamps: true }
);

// One place per slug, and a compound index for fast filtering
placeSchema.index({ type: 1, isActive: 1, createdAt: -1 });

// 👇 THIS IS THE CRITICAL LINE THAT FIXES THE ERROR
export default mongoose.model("Place", placeSchema);