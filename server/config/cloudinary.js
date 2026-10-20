import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// ── Fail fast if env vars are missing ──────────────────────────────
const required = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  throw new Error(
    `❌ Missing Cloudinary env vars: ${missing.join(", ")}. ` +
      `Set them in Railway → Variables and in your local .env`
  );
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // always return https:// URLs
});

// ── Optional: verify config once at startup (dev only) ────────────
if (process.env.NODE_ENV !== "production") {
  console.log("✅ Cloudinary configured:", {
    cloud: process.env.CLOUDINARY_CLOUD_NAME,
    key:   process.env.CLOUDINARY_API_KEY?.slice(0, 6) + "...",
    secret: process.env.CLOUDINARY_API_SECRET ? "loaded" : "MISSING",
  });
}

// ── Reusable Multer uploader ───────────────────────────────────────
// Usage:
//   const upload = makeUploader("coastal-goa/packages");
//   router.post("/", upload.single("coverImage"), handler)
export const makeUploader = (folder = "coastal-goa") =>
  multer({
    storage: new CloudinaryStorage({
      cloudinary,
      params: {
        folder,
        allowed_formats: ["jpg", "jpeg", "png", "webp", "gif", "avif"],
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
    }),
    limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
    fileFilter: (_req, file, cb) => {
      if (!/^image\//.test(file.mimetype)) {
        return cb(new Error("Only image files are allowed"), false);
      }
      cb(null, true);
    },
  });

export { cloudinary };
export default cloudinary;