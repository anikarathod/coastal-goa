import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [coverImage, setCoverImage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    category: "",
    price: "",
    featured: false,
    isActive: true,
    coverImage: "",
  });

  useEffect(() => {
    fetchPackage();
  }, []);

  const fetchPackage = async () => {
    try {
      const res = await api.get(`/packages/${id}`);

      const pkg = res.data.package;

      setForm({
        title: pkg.title || "",
        description: pkg.description || "",
        location: pkg.location || "",
        duration: pkg.duration || "",
        category: pkg.category || "",
        price: pkg.price || "",
        featured: pkg.featured || false,
        isActive: pkg.isActive ?? true,
        coverImage: pkg.coverImage || "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load package.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("duration", form.duration);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("featured", form.featured);
      formData.append("isActive", form.isActive);

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      await api.put(`/packages/${id}`, formData);

      alert("Package updated successfully.");

      navigate("/admin/packages");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to update package."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow">

      <h1 className="mb-8 text-3xl font-bold">
        Edit Package
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 md:grid-cols-2"
      >

        <div>
          <label className="mb-2 block font-medium">
            Package Title
          </label>

          <input
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
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Location
          </label>

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Duration
          </label>

          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            New Cover Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setCoverImage(e.target.files[0])
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        {form.coverImage && (
          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">
              Current Image
            </label>

            <img
              src={form.coverImage}
              alt="Package"
              className="h-40 rounded-lg object-cover"
            />
          </div>
        )}

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={6}
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="flex gap-8 md:col-span-2">

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            Featured
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            Active
          </label>

        </div>

        <div className="md:col-span-2 flex gap-4">

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-cyan-600 px-8 py-3 text-white"
          >
            {saving
              ? "Updating..."
              : "Update Package"}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/admin/packages")
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

export default EditPackage;