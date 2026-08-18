import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const EditGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    featured: false,
    fileUrl: "",
    fileType: "image",
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await api.get(`/gallery/${id}`);

      const gallery =
        res.data.item || res.data.image;

      setForm({
        title: gallery.title || "",
        description:
          gallery.description || "",
        category: gallery.category || "",
        location: gallery.location || "",
        featured:
          gallery.featured || false,
        fileUrl:
          gallery.fileUrl ||
          gallery.image ||
          "",
        fileType:
          gallery.fileType || "image",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load gallery item.");
    }
  };

  const handleChange = (e) => {
    const {
      name,
      value,
      checked,
      type,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "title",
        form.title
      );

      formData.append(
        "description",
        form.description
      );

      formData.append(
        "category",
        form.category
      );

      formData.append(
        "location",
        form.location
      );

      formData.append(
        "featured",
        form.featured
      );

      if (file) {
        formData.append(
          "file",
          file
        );
      }

      await api.put(
        `/gallery/${id}`,
        formData
      );

      alert(
        "Gallery updated successfully!"
      );

      navigate("/admin/gallery");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to update gallery."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Gallery Item
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 md:grid-cols-2"
      >
        {/* Title */}

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

        {/* Category */}

        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Location */}

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

        {/* File Upload */}

        <div>
          <label className="mb-2 block font-medium">
            Replace File
          </label>

          <input
            type="file"
            accept="image/*,video/*,.pdf"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Description */}

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Current File */}

        {form.fileUrl && (
          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">
              Current File
            </label>

            {form.fileType ===
              "image" && (
              <img
                src={form.fileUrl}
                alt={form.title}
                className="h-64 rounded-lg border object-cover"
              />
            )}

            {form.fileType ===
              "video" && (
              <video
                controls
                className="h-64 rounded-lg border"
              >
                <source
                  src={form.fileUrl}
                />
              </video>
            )}

            {form.fileType ===
              "pdf" && (
              <a
                href={form.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-red-500 px-4 py-2 text-white"
              >
                View PDF
              </a>
            )}
          </div>
        )}

        {/* Featured */}

        <div className="md:col-span-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={
                form.featured
              }
              onChange={
                handleChange
              }
            />

            Featured Item
          </label>
        </div>

        {/* Buttons */}

        <div className="flex gap-4 md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-cyan-600 px-8 py-3 text-white hover:bg-cyan-700"
          >
            {loading
              ? "Updating..."
              : "Update Gallery"}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/gallery"
              )
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

export default EditGallery;