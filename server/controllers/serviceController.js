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

    if (req.body.features) {
      data.features = JSON.parse(req.body.features);
    }

    if (req.body.amenities) {
      data.amenities = JSON.parse(req.body.amenities);
    }

    if (req.body.highlights) {
      data.highlights = JSON.parse(req.body.highlights);
    }

    const galleryUrls = [];

    if (req.files?.coverImage?.[0]) {
      const uploadedCover =
        await uploadToCloudinary(
          req.files.coverImage[0],
          "coastal-goa/services"
        );

      data.image = uploadedCover.secure_url;
    }

    if (req.files?.galleryImages?.length) {
      for (const file of req.files.galleryImages) {
        const uploaded =
          await uploadToCloudinary(
            file,
            "coastal-goa/services"
          );

        galleryUrls.push(
          uploaded.secure_url
        );
      }

      data.images = galleryUrls;
    }

    const service =
      await Service.create(data);

    res.status(201).json({
      success: true,
      message:
        "Service created successfully.",
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
    if (req.body.features) {
  data.features = JSON.parse(req.body.features);
}

if (req.body.amenities) {
  data.amenities = JSON.parse(req.body.amenities);
}

if (req.body.highlights) {
  data.highlights = JSON.parse(req.body.highlights);
}
    if (data.title) {
      data.slug = slugify(data.title, {
        lower: true,
        strict: true,
      });
    }

   const galleryUrls = [];

if (req.files?.coverImage?.[0]) {
  const uploadedCover = await uploadToCloudinary(
    req.files.coverImage[0],
    "coastal-goa/services"
  );

  data.image = uploadedCover.secure_url;
}

if (req.files?.galleryImages?.length) {
  for (const file of req.files.galleryImages) {
    const uploaded = await uploadToCloudinary(
      file,
      "coastal-goa/services"
    );

    galleryUrls.push(uploaded.secure_url);
  }

  data.images = galleryUrls;
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