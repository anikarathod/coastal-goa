import Hotel from "../models/Hotel.js";
import slugify from "slugify";

/* ===========================================
   Get All Hotels
=========================================== */

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: hotels.length,
      hotels,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ===========================================
   Get Featured Hotels
=========================================== */

export const getFeaturedHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find()
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({ success: true, hotels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ===========================================
   Get Single Hotel
=========================================== */

export const getHotel = async (req, res) => {
  try {
    let hotel = await Hotel.findOne({ slug: req.params.slug });

    if (!hotel) {
      hotel = await Hotel.findById(req.params.slug);
    }

    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found." });
    }

    res.status(200).json({ success: true, hotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ===========================================
   Helpers
=========================================== */

const parseJsonFields = (body, data) => {
  const fields = [
    "amenities",
    "highlights",
    "roomTypes",
    "sections",
    "extraDetails",
  ];

  for (const field of fields) {
    if (body[field] === undefined) continue;

    if (typeof body[field] === "string") {
      try {
        data[field] = JSON.parse(body[field]);
      } catch (err) {
        console.warn(`Failed to parse ${field}:`, err.message);
      }
    } else {
      data[field] = body[field];
    }
  }
};

// Multer + CloudinaryStorage already uploaded the files,
// so `file.path` is the final HTTPS URL.
const collectHotelImages = (files, data) => {
  if (files?.coverImage?.[0]?.path) {
    data.image = files.coverImage[0].path;
  }

  if (files?.galleryImages?.length) {
    data.images = files.galleryImages
      .map((file) => file.path)
      .filter(Boolean);
  }
};

/* ===========================================
   Create Hotel
=========================================== */

export const createHotel = async (req, res) => {
  try {
    const data = { ...req.body };

    if (!data.name) {
      return res
        .status(400)
        .json({ success: false, message: "Hotel name is required." });
    }

    data.slug = slugify(data.name, { lower: true, strict: true });

    // Booleans
    if (req.body.featured !== undefined) {
      data.featured =
        req.body.featured === "true" || req.body.featured === true;
    }
    if (req.body.isActive !== undefined) {
      data.isActive =
        req.body.isActive === "true" || req.body.isActive === true;
    }

    // Numbers
    if (req.body.pricePerNight !== undefined) {
      data.pricePerNight =
        req.body.pricePerNight === ""
          ? 0
          : Number(req.body.pricePerNight);
    }
    if (req.body.rating !== undefined) {
      data.rating =
        req.body.rating === "" ? 0 : Number(req.body.rating);
    }

    parseJsonFields(req.body, data);
    collectHotelImages(req.files, data);

    const hotel = await Hotel.create(data);

    res.status(201).json({
      success: true,
      message: "Hotel created successfully.",
      hotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================================
   Update Hotel
=========================================== */

export const updateHotel = async (req, res) => {
  try {
    let hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found." });
    }

    const data = { ...req.body };

    if (data.name) {
      data.slug = slugify(data.name, { lower: true, strict: true });
    }

    // Booleans
    if (req.body.featured !== undefined) {
      data.featured =
        req.body.featured === "true" || req.body.featured === true;
    }
    if (req.body.isActive !== undefined) {
      data.isActive =
        req.body.isActive === "true" || req.body.isActive === true;
    }

    // Numbers
    if (req.body.pricePerNight !== undefined) {
      data.pricePerNight =
        req.body.pricePerNight === ""
          ? 0
          : Number(req.body.pricePerNight);
    }
    if (req.body.rating !== undefined) {
      data.rating =
        req.body.rating === "" ? 0 : Number(req.body.rating);
    }

    parseJsonFields(req.body, data);

    // Capture new files (Multer already uploaded them)
    const newFiles = {};
    collectHotelImages(req.files, newFiles);

    if (newFiles.image) {
      data.image = newFiles.image;
    }

    // Merge new gallery images with existing ones
    if (newFiles.images?.length) {
      data.images = [...(hotel.images || []), ...newFiles.images];
    }

    hotel = await Hotel.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Hotel updated successfully.",
      hotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================================
   Delete Hotel
=========================================== */

export const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found." });
    }

    res.status(200).json({
      success: true,
      message: "Hotel deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};