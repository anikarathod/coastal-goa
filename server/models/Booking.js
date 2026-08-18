import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      default: () =>
        `CB${Date.now()}${Math.floor(Math.random() * 1000)}`,
    },

    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },

    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },

    travelDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
    },

    adults: {
      type: Number,
      default: 1,
    },

    children: {
      type: Number,
      default: 0,
    },

    totalPersons: {
      type: Number,
      default: 1,
    },

    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed",
        "Refunded",
      ],
      default: "Pending",
    },

    bookingStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Cancelled",
        "Completed",
      ],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      default: "Cash",
    },

    specialRequest: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", bookingSchema);