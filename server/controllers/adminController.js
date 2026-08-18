import Package from "../models/Package.js";
import Service from "../models/Service.js";
import Gallery from "../models/Gallery.js";
import Booking from "../models/Booking.js";
import Contact from "../models/Contact.js";
import Admin from "../models/Admin.js";

/* ===========================================
   Dashboard Statistics
=========================================== */

export const getDashboard = async (req, res) => {
  try {
    const [
      packageCount,
      serviceCount,
      galleryCount,
      bookingCount,
      contactCount,
      adminCount,
      customerEmails,
      recentBookings,
      recentContacts,
    ] = await Promise.all([
      Package.countDocuments(),
      Service.countDocuments(),
      Gallery.countDocuments(),
      Booking.countDocuments(),
      Contact.countDocuments(),
      Admin.countDocuments(),
      Booking.distinct("email"),

      Booking.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name packageName status travelDate createdAt"),

      Contact.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name subject email createdAt"),
    ]);

    res.status(200).json({
      success: true,

      stats: {
        packages: packageCount,
        services: serviceCount,
        gallery: galleryCount,
        bookings: bookingCount,
        contacts: contactCount,
        admins: adminCount,
        customers: customerEmails.length,
      },

      recentBookings,
      recentContacts,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   Get All Admins
=========================================== */

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      admins,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   Create Admin
=========================================== */

export const createAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);

    res.status(201).json({
      success: true,
      message: "Admin created successfully.",
      admin,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   Delete Admin
=========================================== */

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    await Admin.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};