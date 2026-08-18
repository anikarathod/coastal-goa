import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    websiteName: {
      type: String,
      default: "Coastal Goa",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    businessHours: {
      type: String,
      default: "",
    },

    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    youtube: {
      type: String,
      default: "",
    },

    googleMaps: {
      type: String,
      default: "",
    },

    latitude: {
  type: String,
  default: "",
},

longitude: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Settings", settingsSchema);