import Hotel from "../models/Hotel.js";
import slugify from "slugify";

/* ===========================================
   Get All Hotels
=========================================== */

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: hotels.length,
      hotels,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
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

    res.status(200).json({
      success: true,
      hotels,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ===========================================
   Get Single Hotel
=========================================== */

export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({
      slug: req.params.slug,
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found.",
      });
    }

    res.status(200).json({
      success: true,
      hotel,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ===========================================
   Create Hotel
=========================================== */

export const createHotel = async (req, res) => {
  try {
    const data = {
      ...req.body,
      slug: slugify(req.body.name, {
        lower: true,
        strict: true,
      }),
    };

    const hotel = await Hotel.create(data);

    res.status(201).json({
      success: true,
      message: "Hotel created successfully.",
      hotel,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ===========================================
   Update Hotel
=========================================== */

export const updateHotel = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    if (data.name) {
      data.slug = slugify(data.name, {
        lower: true,
        strict: true,
      });
    }

    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hotel updated successfully.",
      hotel,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ===========================================
   Delete Hotel
=========================================== */

export const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(
      req.params.id
    );

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hotel deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};