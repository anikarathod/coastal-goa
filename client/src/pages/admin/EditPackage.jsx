import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
  title: "",
  shortDescription: "",
  description: "",
  location: "",
  duration: "",
  category: "",
  price: "",
  discountPrice: "",
  coverImage: "",
  images: "",
  highlights: "",
  inclusions: "",
  exclusions: "",
  featured: false,
  isActive: true,
});

  useEffect(() => {
    fetchPackage();
  }, []);

const fetchPackage = async () => {
  try {
    const res = await api.get(`/packages/id/${id}`);

    const pkg = res.data.package;

    setForm({
      title: pkg.title || "",
      shortDescription: pkg.shortDescription || "",
      description: pkg.description || "",
      location: pkg.location || "",
      duration: pkg.duration || "",
      category: pkg.category || "",
      price: pkg.price || "",
      discountPrice: pkg.discountPrice || "",
      coverImage: pkg.coverImage || "",
      images: pkg.images?.join("\n") || "",
      highlights: pkg.highlights?.join("\n") || "",
      inclusions: pkg.inclusions?.join("\n") || "",
      exclusions: pkg.exclusions?.join("\n") || "",
      featured: pkg.featured || false,
      isActive: pkg.isActive ?? true,
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
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await api.put(`/packages/id/${id}`, {
      ...form,

      images: form.images
        .split("\n")
        .filter(Boolean),

      highlights: form.highlights
        .split("\n")
        .filter(Boolean),

      inclusions: form.inclusions
        .split("\n")
        .filter(Boolean),

      exclusions: form.exclusions
        .split("\n")
        .filter(Boolean),
    });

    alert("Package updated successfully!");
    navigate("/admin/packages");
  } catch (err) {
    console.error(err);

    alert(
      err.response?.data?.message ||
      "Failed to update package."
    );
  }
};

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
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
            className="w-full rounded-lg border p-3"
            required
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
        {/* Short Description */}
<div className="md:col-span-2">
  <label className="mb-2 block font-medium">
    Short Description
  </label>

  <textarea
    rows={3}
    name="shortDescription"
    value={form.shortDescription}
    onChange={handleChange}
    className="w-full rounded-lg border p-3"
  />
</div>

{/* Discount Price */}
<div>
  <label className="mb-2 block font-medium">
    Discount Price
  </label>

  <input
    type="number"
    name="discountPrice"
    value={form.discountPrice}
    onChange={handleChange}
    className="w-full rounded-lg border p-3"
  />
</div>

{/* Cover Image */}
<div>
  <label className="mb-2 block font-medium">
    Cover Image URL
  </label>

  <input
    name="coverImage"
    value={form.coverImage}
    onChange={handleChange}
    className="w-full rounded-lg border p-3"
  />
</div>

{/* Gallery Images */}
<div className="md:col-span-2">
  <label className="mb-2 block font-medium">
    Gallery Images (One URL Per Line)
  </label>

  <textarea
    rows={5}
    name="images"
    value={form.images}
    onChange={handleChange}
    className="w-full rounded-lg border p-3"
  />
</div>

{/* Highlights */}
<div className="md:col-span-2">
  <label className="mb-2 block font-medium">
    Highlights (One Per Line)
  </label>

  <textarea
    rows={5}
    name="highlights"
    value={form.highlights}
    onChange={handleChange}
    className="w-full rounded-lg border p-3"
  />
</div>

{/* Inclusions */}
<div>
  <label className="mb-2 block font-medium">
    Inclusions
  </label>

  <textarea
    rows={6}
    name="inclusions"
    value={form.inclusions}
    onChange={handleChange}
    className="w-full rounded-lg border p-3"
  />
</div>

{/* Exclusions */}
<div>
  <label className="mb-2 block font-medium">
    Exclusions
  </label>

  <textarea
    rows={6}
    name="exclusions"
    value={form.exclusions}
    onChange={handleChange}
    className="w-full rounded-lg border p-3"
  />
</div>

        <div className="flex gap-6 md:col-span-2">
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
            className="rounded-lg bg-cyan-600 px-8 py-3 text-white hover:bg-cyan-700"
          >
            Update Package
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/packages")}
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