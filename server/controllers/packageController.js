import Package from "../models/Package.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";
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
// Latest 6 active packages posted by admin
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
    if (body[field] !== undefined) {
      if (typeof body[field] === "string") {
        data[field] = JSON.parse(body[field]);
      } else {
        data[field] = body[field];
      }
    }
  }
};

// ==========================================
// HELPER: UPLOAD PACKAGE IMAGES
// ==========================================

const uploadPackageImages = async (files, data) => {
  if (files?.coverImage?.[0]) {
    const image = await uploadToCloudinary(
      files.coverImage[0],
      "coastal-goa/packages"
    );

    data.coverImage = image.secure_url;
  }

  if (files?.images?.length) {
    const uploadedImages = [];

    for (const file of files.images) {
      const image = await uploadToCloudinary(
        file,
        "coastal-goa/packages"
      );

      uploadedImages.push(image.secure_url);
    }

    data.images = uploadedImages;
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
      req.body.featured === "true" ||
      req.body.featured === true;

    data.isActive =
      req.body.isActive !== "false" &&
      req.body.isActive !== false;

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
        req.body.latitude === ""
          ? null
          : Number(req.body.latitude);
    }

    if (req.body.longitude !== undefined) {
      data.longitude =
        req.body.longitude === ""
          ? null
          : Number(req.body.longitude);
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

    // Upload images
    await uploadPackageImages(req.files, data);

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
        req.body.featured === "true" ||
        req.body.featured === true;
    }

    if (req.body.isActive !== undefined) {
      data.isActive =
        req.body.isActive === "true" ||
        req.body.isActive === true;
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
        req.body.latitude === ""
          ? null
          : Number(req.body.latitude);
    }

    if (req.body.longitude !== undefined) {
      data.longitude =
        req.body.longitude === ""
          ? null
          : Number(req.body.longitude);
    }

    // Parse JSON fields
    parseJsonFields(req.body, data);

    // Upload replacement cover image and/or new gallery images
    await uploadPackageImages(req.files, data);

    // Keep existing gallery images when no new images are uploaded
    if (req.files?.images?.length) {
      data.images = [
        ...(packageItem.images || []),
        ...(data.images || []),
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