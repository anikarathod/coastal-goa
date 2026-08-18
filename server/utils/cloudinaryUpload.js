import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadToCloudinary = (
  file,
  folder = "coastal-goa"
) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(
        new Error("No file provided")
      );
    }

    // Only Images & Videos
    const isVideo =
      file.mimetype.startsWith("video/");

    const resourceType = isVideo
      ? "video"
      : "image";

    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        }
      );

    streamifier
      .createReadStream(file.buffer)
      .pipe(uploadStream);
  });
};

export default uploadToCloudinary;