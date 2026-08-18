import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    featured: false,
    isActive: true,
    image: "",
  });

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const res = await api.get(`/services/${id}`);

      const service = res.data.service;

      setForm({
        title: service.title || "",
        description: service.description || "",
        category: service.category || "",
        price: service.price || "",
        featured: service.featured || false,
        isActive: service.isActive ?? true,
        image: service.image || "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load service.");
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
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("featured", form.featured);
      formData.append("isActive", form.isActive);

      if (image) {
        formData.append("image", image);
      }

      await api.put(`/services/${id}`, formData);

      alert("Service updated successfully.");

      navigate("/admin/services");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to update service."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow">

      <h1 className="mb-8 text-3xl font-bold">
        Edit Service
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 md:grid-cols-2"
      >

        <div>
          <label className="mb-2 block font-medium">
            Service Title
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
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Replace Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        {form.image && (
          <div className="md:col-span-2">

            <label className="mb-2 block font-medium">
              Current Image
            </label>

            <img
              src={form.image}
              alt="Service"
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
            required
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
            className="rounded-lg bg-cyan-600 px-8 py-3 text-white hover:bg-cyan-700"
          >
            {saving ? "Updating..." : "Update Service"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/services")}
            className="rounded-lg border px-8 py-3"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
};

export default EditService;