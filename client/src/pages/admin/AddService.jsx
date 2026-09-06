import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const AddService = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [coverImage, setCoverImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const [form, setForm] = useState({
    title: "",
    category: "",

    shortDescription: "",
    description: "",

    location: "",
    startingPrice: "",
    rating: "",

    contactNumber: "",
    whatsappNumber: "",

    features: "",
    amenities: "",
    highlights: "",

    featured: false,
    isActive: true,
  });

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
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (coverImage) {
        formData.append(
          "coverImage",
          coverImage
        );
      }

      galleryImages.forEach((file) => {
        formData.append(
          "galleryImages",
          file
        );
      });

      await api.post(
        "/services",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert("Service Added");
      navigate("/admin/services");

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Failed to add service"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl rounded-xl bg-white p-8 shadow">

      <h1 className="mb-8 text-3xl font-bold">
        Add Service
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 md:grid-cols-2"
      >

        <input
          type="text"
          name="title"
          placeholder="Service Title"
          value={form.title}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="rounded-lg border p-3"
        >
          <option value="">
            Select Category
          </option>
          <option value="Hotel">
            Hotel
          </option>
          <option value="Villa">
            Villa
          </option>
          <option value="Guest House">
            Guest House
          </option>
          <option value="Taxi">
            Taxi
          </option>
          <option value="Cruise">
            Cruise
          </option>
          <option value="Bike Rental">
            Bike Rental
          </option>
          <option value="Car Rental">
            Car Rental
          </option>
          <option value="Other">
            Other
          </option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          type="number"
          name="startingPrice"
          placeholder="Starting Price"
          value={form.startingPrice}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          name="rating"
          placeholder="Rating"
          value={form.rating}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={form.contactNumber}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          name="whatsappNumber"
          placeholder="WhatsApp Number"
          value={form.whatsappNumber}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <div>
          <label className="mb-2 block">
            Cover Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setCoverImage(
                e.target.files[0]
              )
            }
          />
        </div>

        <div>
          <label className="mb-2 block">
            Gallery Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setGalleryImages(
                Array.from(
                  e.target.files
                )
              )
            }
          />
        </div>

        <div className="md:col-span-2">
          <textarea
            rows={3}
            name="shortDescription"
            placeholder="Short Description"
            value={
              form.shortDescription
            }
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="md:col-span-2">
          <textarea
            rows={6}
            name="description"
            placeholder="Full Description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label>
            Features
            (one per line)
          </label>

          <textarea
            rows={6}
            name="features"
            value={form.features}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label>
            Amenities
            (one per line)
          </label>

          <textarea
            rows={6}
            name="amenities"
            value={form.amenities}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="md:col-span-2">
          <label>
            Highlights
            (one per line)
          </label>

          <textarea
            rows={6}
            name="highlights"
            value={form.highlights}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="md:col-span-2 flex gap-6">

          <label>
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            Featured
          </label>

          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            Active
          </label>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-cyan-600 px-8 py-3 text-white"
        >
          {loading
            ? "Saving..."
            : "Save Service"}
        </button>

      </form>

    </div>
  );
};

export default AddService;