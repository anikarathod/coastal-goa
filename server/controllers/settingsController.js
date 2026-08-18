import Settings from "../models/Settings.js";

/* ===========================================
   Get Website Settings
=========================================== */

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({
        websiteName: "Coastal Goa",
      });
    }

    res.status(200).json({
      success: true,
      settings,
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
   Update Website Settings
=========================================== */

export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings(req.body);
      await settings.save();
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }

    res.status(200).json({
      success: true,
      message: "Website settings updated successfully.",
      settings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};