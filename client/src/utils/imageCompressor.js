// client/src/utils/imageCompressor.js

/**
 * Compress and resize an image file in the browser.
 * - Resizes to max width (never upscales)
 * - Converts to JPEG at the given quality
 * - Returns a new File object ready to upload
 *
 * Usage:
 *   const small = await compressImage(file);
 *   formData.append("image", small);
 */
export const compressImage = (file, maxWidth = 1600, quality = 0.8) =>
  new Promise((resolve, reject) => {
    // Non-images → pass through
    if (!file || !file.type?.startsWith("image/")) {
      return resolve(file);
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");

        let { width, height } = img;

        // Only downscale
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Compression failed"));
              return;
            }

            const compressed = new File(
              [blob],
              file.name.replace(/\.[^.]+$/, ".jpg"),
              { type: "image/jpeg", lastModified: Date.now() }
            );

            resolve(compressed);
          },
          "image/jpeg",
          quality
        );
      };

      img.onerror = reject;
      img.src = e.target.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

/**
 * Compress multiple images in parallel.
 */
export const compressImages = (files, maxWidth = 1600, quality = 0.8) =>
  Promise.all(
    Array.from(files).map((f) => compressImage(f, maxWidth, quality))
  );