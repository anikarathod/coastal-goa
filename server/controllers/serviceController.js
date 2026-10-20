import Service from "../models/Service.js";
import slugify from "slugify";

/* ===========================================
   Get All Services
=========================================== */

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================================
   Get Featured Services
=========================================== */

export const getFeaturedServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================================
   Get Single Service
=========================================== */

export const getService = async (req, res) => {
  try {
    let service = await Service.findOne({ slug: req.params.slug });

    if (!service) {
      service = await Service.findById(req.params.slug);
    }

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found." });
    }

    res.status(200).json({ success: true, service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================================
   Helpers
=========================================== */

// Safely parse JSON string fields (arrays/objects submitted via FormData)
const parseJsonFields = (body, data) => {
  const fields = ["features", "amenities", "highlights", "inclusions", "exclusions", "sections", "extraDetails"];

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

// Multer + CloudinaryStorage already uploaded the files.
// `file.path` = the final HTTPS URL. Just collect them.
const collectServiceImages = (files, data) => {
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
   Create Service
=========================================== */

export const createService = async (req, res) => {
  try {
    const data = { ...req.body };

    // Booleans
    if (req.body.isActive !== undefined) {
      data.isActive =
        req.body.isActive === "true" || req.body.isActive === true;
    }
    if (req.body.featured !== undefined) {
      data.featured =
        req.body.featured === "true" || req.body.featured === true;
    }

    // Numbers
    if (req.body.price !== undefined) {
      data.price =
        req.body.price === "" ? 0 : Number(req.body.price);
    }
    if (req.body.discountPrice !== undefined) {
      data.discountPrice =
        req.body.discountPrice === ""
          ? 0
          : Number(req.body.discountPrice);
    }

    // Slug
    if (!data.title) {
      return res
        .status(400)
        .json({ success: false, message: "Service title is required." });
    }
    data.slug = slugify(data.title, { lower: true, strict: true });

    // JSON fields
    parseJsonFields(req.body, data);

    // Cloudinary URLs from Multer
    collectServiceImages(req.files, data);

    const service = await Service.create(data);

    res.status(201).json({
      success: true,
      message: "Service created successfully.",
      service,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================================
   Update Service
=========================================== */

export const updateService = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found." });
    }

    const data = { ...req.body };

    // Slug
    if (data.title) {
      data.slug = slugify(data.title, { lower: true, strict: true });
    }

    // Booleans
    if (req.body.isActive !== undefined) {
      data.isActive =
        req.body.isActive === "true" || req.body.isActive === true;
    }
    if (req.body.featured !== undefined) {
      data.featured =
        req.body.featured === "true" || req.body.featured === true;
    }

    // Numbers
    if (req.body.price !== undefined) {
      data.price =
        req.body.price === "" ? 0 : Number(req.body.price);
    }
    if (req.body.discountPrice !== undefined) {
      data.discountPrice =
        req.body.discountPrice === ""
          ? 0
          : Number(req.body.discountPrice);
    }

    // JSON fields
    parseJsonFields(req.body, data);

    // Capture new files into a separate object, then merge
    const newFiles = {};
    collectServiceImages(req.files, newFiles);

    if (newFiles.image) {
      data.image = newFiles.image;
    }

    if (newFiles.images?.length) {
      data.images = [...(service.images || []), ...newFiles.images];
    }

    service = await Service.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Service updated successfully.",
      service,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===========================================
   Delete Service
=========================================== */

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found." });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};