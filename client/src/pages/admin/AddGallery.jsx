import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const AddGallery = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "Goa",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("location", form.location);
      formData.append("featured", form.featured);

      formData.append("file", file);

      await api.post("/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Media uploaded successfully!");

      navigate("/admin/gallery");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to upload media."
      );
    } finally {
      setLoading(false);
    }
  };

  const previewUrl = file
    ? URL.createObjectURL(file)
    : null;

  return (
    <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow">

      <h1 className="mb-8 text-3xl font-bold">
        Upload Gallery Media
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 md:grid-cols-2"
      >

        <div>
          <label className="mb-2 block font-medium">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Beach, Cruise, Adventure..."
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Select File
          </label>

          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Preview */}

        {file && (
          <div className="md:col-span-2">

            <label className="mb-3 block font-medium">
              Preview
            </label>

            {file.type.startsWith("image/") && (
              <img
                src={previewUrl}
                alt="preview"
                className="h-72 rounded-lg border object-cover"
              />
            )}

            {file.type.startsWith("video/") && (
              <video
                controls
                className="h-72 rounded-lg border"
              >
                <source
                  src={previewUrl}
                  type={file.type}
                />
              </video>
            )}

          </div>
        )}

        <div className="md:col-span-2">

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />

            Featured Media

          </label>

        </div>

        <div className="flex gap-4 md:col-span-2">

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-cyan-600 px-8 py-3 text-white hover:bg-cyan-700"
          >
            {loading
              ? "Uploading..."
              : "Upload Media"}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/admin/gallery")
            }
            className="rounded-lg border px-8 py-3"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
};

export default AddGallery;