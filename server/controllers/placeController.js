import Place from "../models/Place.js";
import slugify from "slugify";

const ALLOWED_TYPES = ["hotel", "guesthouse", "restaurant", "shop"];

/* ===========================================
   Helpers
=========================================== */

const parseJsonFields = (body, data) => {
  const fields = [
    "cuisine",
    "amenities",
    "specialities",
    "highlights",
    "sections",
  ];

  for (const field of fields) {
    if (body[field] === undefined) continue;

    if (typeof body[field] === "string") {
      try {
        data[field] = JSON.parse(body[field]);
      } catch (err) {
        // If it's a comma-separated string, split it
        data[field] = body[field]
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    } else {
      data[field] = body[field];
    }
  }

  if (body.extraDetails !== undefined) {
    if (typeof body.extraDetails === "string") {
      try {
        data.extraDetails = JSON.parse(body.extraDetails);
      } catch {
        data.extraDetails = {};
      }
    } else {
      data.extraDetails = body.extraDetails;
    }
  }
};

// Multer + CloudinaryStorage already uploaded the files
const collectImages = (files, data) => {
  if (files?.coverImage?.[0]?.path) {
    data.image = files.coverImage[0].path;
  }

  if (files?.galleryImages?.length) {
    data.images = files.galleryImages.map((f) => f.path).filter(Boolean);
  }
};

/* ===========================================
   Get all places (optionally filtered by ?type=)
=========================================== */

export const getPlaces = async (req, res) => {
  try {
    const filter = { isActive: true };

    if (req.query.type && ALLOWED_TYPES.includes(req.query.type)) {
      filter.type = req.query.type;
    }

    const places = await Place.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: places.length,
      places,
    });
  } catch (error) {
    console.error("Get Places Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================================
   Get featured places (by type or all)
=========================================== */

export const getFeaturedPlaces = async (req, res) => {
  try {
    const filter = { isActive: true, featured: true };

    if (req.query.type && ALLOWED_TYPES.includes(req.query.type)) {
      filter.type = req.query.type;
    }

    const places = await Place.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(req.query.limit) || 8);

    res.status(200).json({
      success: true,
      count: places.length,
      places,
    });
  } catch (error) {
    console.error("Get Featured Places Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================================
   Get single place by slug
=========================================== */

export const getPlace = async (req, res) => {
  try {
    const place = await Place.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!place) {
      return res
        .status(404)
        .json({ success: false, message: "Place not found." });
    }

    res.status(200).json({ success: true, place });
  } catch (error) {
    console.error("Get Place Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================================
   Get single place by ID (admin)
=========================================== */

export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res
        .status(404)
        .json({ success: false, message: "Place not found." });
    }

    res.status(200).json({ success: true, place });
  } catch (error) {
    console.error("Get Place By ID Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================================
   Create place
=========================================== */

export const createPlace = async (req, res) => {
  try {
    const data = { ...req.body };

    if (!data.name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required." });
    }

    if (!ALLOWED_TYPES.includes(data.type)) {
      return res.status(400).json({
        success: false,
        message: `Type must be one of: ${ALLOWED_TYPES.join(", ")}`,
      });
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
    if (req.body.rating !== undefined) {
      data.rating = req.body.rating === "" ? 0 : Number(req.body.rating);
    }
    if (req.body.pricePerNight !== undefined) {
      data.pricePerNight =
        req.body.pricePerNight === ""
          ? null
          : Number(req.body.pricePerNight);
    }
    if (req.body.latitude !== undefined) {
      data.latitude =
        req.body.latitude === "" ? null : Number(req.body.latitude);
    }
    if (req.body.longitude !== undefined) {
      data.longitude =
        req.body.longitude === "" ? null : Number(req.body.longitude);
    }

    parseJsonFields(req.body, data);
    collectImages(req.files, data);

    const place = await Place.create(data);

    res.status(201).json({
      success: true,
      message: "Place created successfully.",
      place,
    });
  } catch (error) {
    console.error("Create Place Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================================
   Update place
=========================================== */

export const updatePlace = async (req, res) => {
  try {
    let place = await Place.findById(req.params.id);

    if (!place) {
      return res
        .status(404)
        .json({ success: false, message: "Place not found." });
    }

    const data = { ...req.body };

    if (data.name) {
      data.slug = slugify(data.name, { lower: true, strict: true });
    }

    if (data.type && !ALLOWED_TYPES.includes(data.type)) {
      return res.status(400).json({
        success: false,
        message: `Type must be one of: ${ALLOWED_TYPES.join(", ")}`,
      });
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
    if (req.body.rating !== undefined) {
      data.rating = req.body.rating === "" ? 0 : Number(req.body.rating);
    }
    if (req.body.pricePerNight !== undefined) {
      data.pricePerNight =
        req.body.pricePerNight === ""
          ? null
          : Number(req.body.pricePerNight);
    }
    if (req.body.latitude !== undefined) {
      data.latitude =
        req.body.latitude === "" ? null : Number(req.body.latitude);
    }
    if (req.body.longitude !== undefined) {
      data.longitude =
        req.body.longitude === "" ? null : Number(req.body.longitude);
    }

    parseJsonFields(req.body, data);

    const newFiles = {};
    collectImages(req.files, newFiles);

    if (newFiles.image) data.image = newFiles.image;
    if (newFiles.images?.length) {
      data.images = [...(place.images || []), ...newFiles.images];
    }

    place = await Place.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Place updated successfully.",
      place,
    });
  } catch (error) {
    console.error("Update Place Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================================
   Delete place
=========================================== */

export const deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);

    if (!place) {
      return res
        .status(404)
        .json({ success: false, message: "Place not found." });
    }

    res.status(200).json({
      success: true,
      message: "Place deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Place Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};