// server/models/AnalyticsEvent.js
import mongoose from "mongoose";

const analyticsEventSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      required: true,
      enum: [
        "page_view",
        "package_view",
        "service_view",
        "book_click",
        "whatsapp_click",
        "search",
        "filter_apply",
      ],
      index: true,
    },

    // Where the event happened
    page: { type: String, index: true },

    // Related entities (optional)
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      index: true,
    },
    packageTitle: String,
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      index: true,
    },
    serviceTitle: String,

    // Extra info per event (e.g., { price: 2500, query: "dudhsagar" })
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Session & user info
    sessionId: { type: String, index: true },
    userAgent: String,
    referrer: String,
    ip: String,

    // Lightweight geo (optional — see note below)
    country: String,
    city: String,
  },
  { timestamps: true }
);

// TTL: auto-delete events older than 90 days (optional, saves DB space)
analyticsEventSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 90 }
);

export default mongoose.model("AnalyticsEvent", analyticsEventSchema);