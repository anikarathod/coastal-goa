import Package from "../models/Package.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";
import slugify from "slugify";

// ==========================================
// GET ALL PACKAGES
// ==========================================

export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find({
      isActive: true,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: packages.length,
      packages,
    });
  } catch (error) {
    console.error("Get Packages Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET FEATURED PACKAGES
// ==========================================

export const getFeaturedPackages = async (req, res) => {
  try {
    const packages = await Package.find({
      isActive: true,
      featured: true,
    })
      .sort({
        createdAt: -1,
      })
      .limit(6);

    res.status(200).json({
      success: true,
      packages,
    });
  } catch (error) {
    console.error("Featured Packages Error:", error);

    res.status(500).json({
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

    res.status(200).json({
      success: true,
      package: packageItem,
    });
  } catch (error) {
    console.error("Get Package Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
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

    const data = {
      ...req.body,
    };

    // --------------------------------------
    // Convert boolean values
    // --------------------------------------

    data.featured =
      req.body.featured === "true" ||
      req.body.featured === true;

    data.isActive =
      req.body.isActive !== "false" &&
      req.body.isActive !== false;

    // --------------------------------------
    // Convert numbers
    // --------------------------------------

    if (req.body.price !== undefined) {
      data.price = Number(req.body.price);
    }

    if (req.body.discountPrice !== undefined) {
      data.discountPrice =
        Number(req.body.discountPrice) || 0;
    }

    if (req.body.latitude) {
      data.latitude = Number(req.body.latitude);
    }

    if (req.body.longitude) {
      data.longitude = Number(req.body.longitude);
    }

    // --------------------------------------
    // Generate slug
    // --------------------------------------

    data.slug = slugify(data.title, {
      lower: true,
      strict: true,
    });

    // --------------------------------------
    // Parse arrays
    // --------------------------------------

    if (req.body.highlights) {
      data.highlights = JSON.parse(req.body.highlights);
    }

    if (req.body.inclusions) {
      data.inclusions = JSON.parse(req.body.inclusions);
    }

    if (req.body.exclusions) {
      data.exclusions = JSON.parse(req.body.exclusions);
    }

    if (req.body.itinerary) {
      data.itinerary = JSON.parse(req.body.itinerary);
    }

    // --------------------------------------
    // Cover image
    // --------------------------------------

    if (
      req.files &&
      req.files.coverImage &&
      req.files.coverImage[0]
    ) {
      const image = await uploadToCloudinary(
        req.files.coverImage[0],
        "coastal-goa/packages"
      );

      data.coverImage = image.secure_url;
    }

    // --------------------------------------
    // Gallery images
    // --------------------------------------

    if (
      req.files &&
      req.files.images &&
      req.files.images.length
    ) {
      const uploadedImages = [];

      for (const file of req.files.images) {
        const image = await uploadToCloudinary(
          file,
          "coastal-goa/packages"
        );

        uploadedImages.push(image.secure_url);
      }

      data.images = uploadedImages;
    }

    // --------------------------------------
    // Create
    // --------------------------------------

    const newPackage = await Package.create(data);

    res.status(201).json({
      success: true,
      message: "Package created successfully.",
      package: newPackage,
    });
  } catch (error) {
    console.error("Create Package Error:", error);

    res.status(500).json({
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
    let packageItem = await Package.findById(
      req.params.id
    );

    if (!packageItem) {
      return res.status(404).json({
        success: false,
        message: "Package not found.",
      });
    }

    const data = {
      ...req.body,
    };

    // --------------------------------------
    // Slug
    // --------------------------------------

    if (data.title) {
      data.slug = slugify(data.title, {
        lower: true,
        strict: true,
      });
    }

    // --------------------------------------
    // Boolean
    // --------------------------------------

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

    // --------------------------------------
    // Numbers
    // --------------------------------------

    if (req.body.price !== undefined) {
      data.price = Number(req.body.price);
    }

    if (req.body.discountPrice !== undefined) {
      data.discountPrice =
        Number(req.body.discountPrice) || 0;
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

    // --------------------------------------
    // Arrays
    // --------------------------------------

    if (req.body.highlights) {
      data.highlights = JSON.parse(
        req.body.highlights
      );
    }

    if (req.body.inclusions) {
      data.inclusions = JSON.parse(
        req.body.inclusions
      );
    }

    if (req.body.exclusions) {
      data.exclusions = JSON.parse(
        req.body.exclusions
      );
    }

    if (req.body.itinerary) {
      data.itinerary = JSON.parse(
        req.body.itinerary
      );
    }

    // --------------------------------------
    // New cover image
    // --------------------------------------

    if (
      req.files &&
      req.files.coverImage &&
      req.files.coverImage[0]
    ) {
      const image = await uploadToCloudinary(
        req.files.coverImage[0],
        "coastal-goa/packages"
      );

      data.coverImage = image.secure_url;
    }

    // --------------------------------------
    // New gallery images
    // --------------------------------------

    if (
      req.files &&
      req.files.images &&
      req.files.images.length
    ) {
      const uploadedImages = [];

      for (const file of req.files.images) {
        const image = await uploadToCloudinary(
          file,
          "coastal-goa/packages"
        );

        uploadedImages.push(image.secure_url);
      }

      // Add new images to existing gallery
      data.images = [
        ...(packageItem.images || []),
        ...uploadedImages,
      ];
    }

    // --------------------------------------
    // Update
    // --------------------------------------

    packageItem =
      await Package.findByIdAndUpdate(
        req.params.id,
        data,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Package updated successfully.",
      package: packageItem,
    });
  } catch (error) {
    console.error("Update Package Error:", error);

    res.status(500).json({
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
    const packageItem = await Package.findById(
      req.params.id
    );

    if (!packageItem) {
      return res.status(404).json({
        success: false,
        message: "Package not found.",
      });
    }

    await Package.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Package deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Package Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};