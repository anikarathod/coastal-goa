import Gallery from "../models/Gallery.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

/* ===========================================
   Get All Gallery Items
=========================================== */
export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: gallery.length,
      gallery,
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
   Get Featured Gallery Items
=========================================== */
export const getFeaturedGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({
      isActive: true,
      featured: true,
    })
      .sort({ createdAt: -1 })
      .limit(8);

    res.status(200).json({
      success: true,
      gallery,
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
   Get Single Gallery Item
=========================================== */
export const getGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(
      req.params.id
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.status(200).json({
      success: true,
      item,
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
   Create Gallery Item
=========================================== */
export const createGallery = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    if (req.file) {
      const mime = req.file.mimetype;

      let fileType = "image";

      if (mime.startsWith("video")) {
        fileType = "video";
      }

      const uploaded =
        await uploadToCloudinary(
          req.file,
          "coastal-goa/gallery"
        );

      data.fileUrl = uploaded.secure_url;
      data.fileType = fileType;

      if (fileType === "image") {
        data.image = uploaded.secure_url;
      }
    }

    const gallery = await Gallery.create(data);

    res.status(201).json({
      success: true,
      message:
        "Gallery item uploaded successfully",
      gallery,
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
   Update Gallery Item
=========================================== */
export const updateGallery = async (
  req,
  res
) => {
  try {
    let gallery = await Gallery.findById(
      req.params.id
    );

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message:
          "Gallery item not found",
      });
    }

    const data = {
      ...req.body,
    };

    if (req.file) {
      const mime = req.file.mimetype;

      let fileType = "image";

      if (mime.startsWith("video")) {
        fileType = "video";
      }

      const uploaded =
        await uploadToCloudinary(
          req.file,
          "coastal-goa/gallery"
        );

      data.fileUrl = uploaded.secure_url;
      data.fileType = fileType;

      if (fileType === "image") {
        data.image = uploaded.secure_url;
      }
    }

    gallery =
      await Gallery.findByIdAndUpdate(
        req.params.id,
        data,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message:
        "Gallery updated successfully",
      gallery,
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
   Delete Gallery Item
=========================================== */
export const deleteGallery = async (
  req,
  res
) => {
  try {
    const gallery = await Gallery.findById(
      req.params.id
    );

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message:
          "Gallery item not found",
      });
    }

    await Gallery.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Gallery item deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};