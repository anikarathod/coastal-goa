import Service from "../models/Service.js";
import slugify from "slugify";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

/* ===========================================
   Get All Services
=========================================== */

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
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
   Get Featured Services
=========================================== */

export const getFeaturedServices = async (req, res) => {
  try {
    const services = await Service.find({
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      services,
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
   Get Single Service
=========================================== */

export const getService = async (req, res) => {
  try {
    let service = await Service.findOne({
      slug: req.params.slug,
    });

    if (!service) {
      service = await Service.findById(req.params.slug);
    }

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    res.status(200).json({
      success: true,
      service,
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
   Create Service
=========================================== */

export const createService = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    data.slug = slugify(data.title, {
      lower: true,
      strict: true,
    });

    console.log("========== CREATE SERVICE ==========");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    if (req.file) {
      console.log("Uploading to Cloudinary...");

      const uploaded = await uploadToCloudinary(
        req.file,
        "coastal-goa/services"
      );

      console.log("Cloudinary Response:", uploaded);

      // IMPORTANT
      data.image = uploaded.secure_url;
    } else {
      console.log("❌ No file received");
    }

    console.log("Final Data:", data);

    const service = await Service.create(data);

    res.status(201).json({
      success: true,
      message: "Service created successfully.",
      service,
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
   Update Service
=========================================== */

export const updateService = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    const data = {
      ...req.body,
    };

    if (data.title) {
      data.slug = slugify(data.title, {
        lower: true,
        strict: true,
      });
    }

    if (req.file) {
      const uploaded = await uploadToCloudinary(
        req.file,
        "coastal-goa/services"
      );

      data.image = uploaded.secure_url;
    }

    service = await Service.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Service updated successfully.",
      service,
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
   Delete Service
=========================================== */

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};