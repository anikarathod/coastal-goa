import Package from "../models/Package.js";
import slugify from "slugify";

// ==========================================
// GET ALL ACTIVE PACKAGES
// ==========================================

export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find({
      isActive: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: packages.length,
      packages,
    });
  } catch (error) {
    console.error("Get Packages Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET HOMEPAGE PACKAGES
// Latest 6 active packages
// ==========================================

export const getFeaturedPackages = async (req, res) => {
  try {
    const packages = await Package.find({
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .limit(6);

    return res.status(200).json({
      success: true,
      count: packages.length,
      packages,
    });
  } catch (error) {
    console.error("Get Featured Packages Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET SINGLE PACKAGE BY SLUG
// ==========================================

export const getPackage = async (req, res) => {
  try {
    const packageItem = await Package.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!packageItem) {
      return res.status(404).json({
        success: false,
        message: "Package not found.",
      });
    }

    return res.status(200).json({
      success: true,
      package: packageItem,
    });
  } catch (error) {
    console.error("Get Package Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET SINGLE PACKAGE BY ID
// ==========================================

export const getPackageById = async (req, res) => {
  try {
    const packageItem = await Package.findById(req.params.id);

    if (!packageItem) {
      return res.status(404).json({
        success: false,
        message: "Package not found.",
      });
    }

    return res.status(200).json({
      success: true,
      package: packageItem,
    });
  } catch (error) {
    console.error("Get Package By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// HELPER: PARSE JSON FIELDS
// ==========================================

const parseJsonFields = (body, data) => {
  const fields = [
    "highlights",
    "inclusions",
    "exclusions",
    "itinerary",
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
        // leave it as-is (skip), don't crash the request
      }
    } else {
      data[field] = body[field];
    }
  }
};

// ==========================================
// HELPER: COLLECT IMAGES
// Multer (CloudinaryStorage) already uploaded the files,
// so `file.path` is the final HTTPS URL. Nothing else to do.
// ==========================================

const collectPackageImages = (files, data) => {
  if (files?.coverImage?.[0]?.path) {
    data.coverImage = files.coverImage[0].path;
  }

  if (files?.images?.length) {
    data.images = files.images
      .map((file) => file.path)
      .filter(Boolean);
  }
};

// ==========================================
// CREATE PACKAGE
// ==========================================

export const createPackage = async (req, res) => {
  try {
    console.log("========== CREATE PACKAGE ==========");
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    const data = { ...req.body };

    // Convert boolean fields
    data.featured =
      req.body.featured === "true" || req.body.featured === true;

    data.isActive =
      req.body.isActive !== "false" && req.body.isActive !== false;

    // Convert numeric fields
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

    if (req.body.latitude !== undefined) {
      data.latitude =
        req.body.latitude === "" ? null : Number(req.body.latitude);
    }

    if (req.body.longitude !== undefined) {
      data.longitude =
        req.body.longitude === "" ? null : Number(req.body.longitude);
    }

    // Generate slug
    if (!data.title) {
      return res.status(400).json({
        success: false,
        message: "Package title is required.",
      });
    }

    data.slug = slugify(data.title, {
      lower: true,
      strict: true,
    });

    // Parse JSON fields
    parseJsonFields(req.body, data);

    // Attach Cloudinary URLs (Multer already uploaded them)
    collectPackageImages(req.files, data);

    // Save package
    const newPackage = await Package.create(data);

    return res.status(201).json({
      success: true,
      message: "Package created successfully.",
      package: newPackage,
    });
  } catch (error) {
    console.error("Create Package Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE PACKAGE
// ==========================================

export const updatePackage = async (req, res) => {
  try {
    let packageItem = await Package.findById(req.params.id);

    if (!packageItem) {
      return res.status(404).json({
        success: false,
        message: "Package not found.",
      });
    }

    const data = { ...req.body };

    // Update slug when title changes
    if (data.title) {
      data.slug = slugify(data.title, {
        lower: true,
        strict: true,
      });
    }

    // Convert boolean fields
    if (req.body.featured !== undefined) {
      data.featured =
        req.body.featured === "true" || req.body.featured === true;
    }

    if (req.body.isActive !== undefined) {
      data.isActive =
        req.body.isActive === "true" || req.body.isActive === true;
    }

    // Convert numeric fields
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

    if (req.body.latitude !== undefined) {
      data.latitude =
        req.body.latitude === "" ? null : Number(req.body.latitude);
    }

    if (req.body.longitude !== undefined) {
      data.longitude =
        req.body.longitude === "" ? null : Number(req.body.longitude);
    }

    // Parse JSON fields
    parseJsonFields(req.body, data);

    // Capture newly uploaded images (Multer + Cloudinary already handled them)
    const newFiles = {};
    collectPackageImages(req.files, newFiles);

    if (newFiles.coverImage) {
      data.coverImage = newFiles.coverImage;
    }

    // Merge new gallery images with existing ones
    if (newFiles.images?.length) {
      data.images = [
        ...(packageItem.images || []),
        ...newFiles.images,
      ];
    }

    packageItem = await Package.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Package updated successfully.",
      package: packageItem,
    });
  } catch (error) {
    console.error("Update Package Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE PACKAGE
// ==========================================

export const deletePackage = async (req, res) => {
  try {
    const packageItem = await Package.findById(req.params.id);

    if (!packageItem) {
      return res.status(404).json({
        success: false,
        message: "Package not found.",
      });
    }

    await Package.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Package deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Package Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};