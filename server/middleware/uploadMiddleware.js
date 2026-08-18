import multer from "multer";

// Store files in memory
const storage = multer.memoryStorage();

// Allow Images + Videos + PDFs
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    // Images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",

    // Videos
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/webm",

    // PDFs
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only images, videos and PDF files are allowed."
      ),
      false
    );
  }
};

// Multer config
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
  fileFilter,
});

export default upload;