
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const ADMIN_PACKAGES_URL = "/pearlrathod/packages";

const AddPackage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    category: "Tour",
    location: "",
    duration: "",
    price: "",
    discountPrice: "",
    latitude: "",
    longitude: "",
    featured: false,
    isActive: true,
  });

  const [coverImage, setCoverImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [highlights, setHighlights] = useState([""]);
  const [inclusions, setInclusions] = useState([""]);
  const [exclusions, setExclusions] = useState([""]);

  const [sections, setSections] = useState([
    { title: "", content: "" },
  ]);

  const [itinerary, setItinerary] = useState([
    { day: "Day 1", title: "", description: "" },
  ]);

  const [extraDetails, setExtraDetails] = useState([
    { title: "", description: "" },
  ]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: value
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateArrayItem = (setter, array, index, value) => {
    setter(array.map((item, i) => (i === index ? value : item)));
  };

  const addArrayItem = (setter, array) => {
    setter([...array, ""]);
  };

  const removeArrayItem = (setter, array, index) => {
    setter(array.filter((_, i) => i !== index));
  };

  const updateItinerary = (index, field, value) => {
    setItinerary((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addItinerary = () => {
    setItinerary((prev) => [
      ...prev,
      {
        day: `Day ${prev.length + 1}`,
        title: "",
        description: "",
      },
    ]);
  };

  const removeItinerary = (index) => {
    setItinerary((prev) => prev.filter((_, i) => i !== index));
  };

  const addSection = () => {
    setSections((prev) => [...prev, { title: "", content: "" }]);
  };

  const removeSection = (index) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSection = (index, field, value) => {
    setSections((prev) =>
      prev.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      )
    );
  };

  const updateExtraDetail = (index, field, value) => {
    setExtraDetails((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addExtraDetail = () => {
    setExtraDetails((prev) => [
      ...prev,
      { title: "", description: "" },
    ]);
  };

  const removeExtraDetail = (index) => {
    setExtraDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage) {
      alert("Please select a cover image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append(
        "highlights",
        JSON.stringify(highlights.filter((item) => item.trim()))
      );

      formData.append(
        "inclusions",
        JSON.stringify(inclusions.filter((item) => item.trim()))
      );

      formData.append(
        "exclusions",
        JSON.stringify(exclusions.filter((item) => item.trim()))
      );

      formData.append(
        "itinerary",
        JSON.stringify(
          itinerary.filter(
            (item) => item.title.trim() || item.description.trim()
          )
        )
      );

      formData.append(
        "sections",
        JSON.stringify(
          sections.filter((item) => item.title.trim() || item.content.trim())
        )
      );

      formData.append(
        "extraDetails",
        JSON.stringify(
          extraDetails.filter(
            (item) => item.title.trim() || item.description.trim()
          )
        )
      );

      formData.append("coverImage", coverImage);

      galleryImages.forEach((image) => {
        formData.append("images", image);
      });

      await api.post("/packages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Package added successfully!");
      navigate(ADMIN_PACKAGES_URL);
    } catch (error) {
      console.error("Add Package Error:", error);

      alert(
        error.response?.data?.message || "Failed to add package."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full min-w-0 rounded-lg border border-gray-300 p-3 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100";

  const labelClass = "mb-2 block text-sm font-medium text-gray-700";

  const sectionClass = "rounded-2xl bg-white p-5 shadow-sm sm:p-8";

  const buttonClass =
    "rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700";

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Add Tour Package
        </h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Add all information visitors will see on the package details page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10">
        {/* Basic information */}
        <section className={sectionClass}>
          <h2 className="mb-6 text-xl font-bold sm:text-2xl">
            Basic Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Package Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="North Goa Sightseeing"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Sightseeing"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Location *</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="North Goa"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Duration</label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="1 Day"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-5">
            <label className={labelClass}>Short Description</label>
            <input
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              placeholder="Explore the best places in North Goa."
              className={inputClass}
            />
          </div>

          <div className="mt-5">
            <label className={labelClass}>Full Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Write the complete package description..."
              className={inputClass}
            />
          </div>
        </section>

        {/* Pricing */}
        <section className={sectionClass}>
          <h2 className="mb-6 text-xl font-bold sm:text-2xl">Pricing</h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Original Price *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                placeholder="1500"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Discount Price</label>
              <input
                type="number"
                name="discountPrice"
                value={form.discountPrice}
                onChange={handleChange}
                min="0"
                placeholder="1299"
                className={inputClass}
              />
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Leave Discount Price empty if no discount applies.
          </p>
        </section>

        {/* Custom sections */}
        <section className={sectionClass}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold sm:text-2xl">
              Custom Package Sections
            </h2>
            <button type="button" onClick={addSection} className={buttonClass}>
              + Add Section
            </button>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="mb-5 rounded-xl border p-4">
              <div className="mb-3 flex flex-wrap gap-3">
                <input
                  value={section.title}
                  onChange={(e) =>
                    updateSection(index, "title", e.target.value)
                  }
                  placeholder="Section Title"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="rounded-lg bg-red-100 px-4 py-2 text-red-600"
                >
                  Delete
                </button>
              </div>

              <textarea
                rows={5}
                value={section.content}
                onChange={(e) =>
                  updateSection(index, "content", e.target.value)
                }
                placeholder="Package details, pick-up information, terms and conditions..."
                className={inputClass}
              />
            </div>
          ))}
        </section>

        {/* Images */}
        <section className={sectionClass}>
          <h2 className="mb-6 text-xl font-bold sm:text-2xl">
            Package Images
          </h2>

          <div className="mb-6">
            <label className={labelClass}>Cover Image *</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              className={inputClass}
            />
            {coverImage && (
              <p className="mt-2 break-all text-sm text-green-600">
                Selected: {coverImage.name}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Gallery Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setGalleryImages(Array.from(e.target.files || []))
              }
              className={inputClass}
            />
            {galleryImages.length > 0 && (
              <p className="mt-2 text-sm text-green-600">
                {galleryImages.length} images selected
              </p>
            )}
          </div>
        </section>

        {/* Highlights */}
        <section className={sectionClass}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold sm:text-2xl">Highlights</h2>
            <button
              type="button"
              onClick={() => addArrayItem(setHighlights, highlights)}
              className={buttonClass}
            >
              + Add
            </button>
          </div>

          {highlights.map((item, index) => (
            <div key={index} className="mb-3 flex gap-2">
              <input
                value={item}
                onChange={(e) =>
                  updateArrayItem(
                    setHighlights,
                    highlights,
                    index,
                    e.target.value
                  )
                }
                placeholder="Fort Aguada"
                className={inputClass}
              />
              {highlights.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeArrayItem(setHighlights, highlights, index)
                  }
                  className="rounded-lg bg-red-100 px-3 text-red-600"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Itinerary */}
        <section className={sectionClass}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold sm:text-2xl">Itinerary</h2>
            <button type="button" onClick={addItinerary} className={buttonClass}>
              + Add Day
            </button>
          </div>

          {itinerary.map((item, index) => (
            <div key={index} className="mb-5 rounded-xl border p-4 sm:p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <input
                  value={item.day}
                  onChange={(e) =>
                    updateItinerary(index, "day", e.target.value)
                  }
                  placeholder="Day 1"
                  className={inputClass}
                />
                <input
                  value={item.title}
                  onChange={(e) =>
                    updateItinerary(index, "title", e.target.value)
                  }
                  placeholder="North Goa Sightseeing"
                  className={`${inputClass} md:col-span-2`}
                />
              </div>

              <textarea
                value={item.description}
                onChange={(e) =>
                  updateItinerary(index, "description", e.target.value)
                }
                rows={4}
                placeholder="Hotel pickup → Fort Aguada → Candolim Beach..."
                className={`${inputClass} mt-4`}
              />

              {itinerary.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItinerary(index)}
                  className="mt-3 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-600"
                >
                  Remove Day
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Inclusions and exclusions */}
        <section className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "What's Included",
              items: inclusions,
              setter: setInclusions,
              placeholder: "Hotel pickup",
            },
            {
              title: "What's Not Included",
              items: exclusions,
              setter: setExclusions,
              placeholder: "Personal expenses",
            },
          ].map(({ title, items, setter, placeholder }) => (
            <section key={title} className={sectionClass}>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold">{title}</h2>
                <button
                  type="button"
                  onClick={() => addArrayItem(setter, items)}
                  className={buttonClass}
                >
                  + Add
                </button>
              </div>

              {items.map((item, index) => (
                <div key={index} className="mb-3 flex gap-2">
                  <input
                    value={item}
                    onChange={(e) =>
                      updateArrayItem(setter, items, index, e.target.value)
                    }
                    placeholder={placeholder}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(setter, items, index)}
                    className="rounded-lg px-2 text-xl text-red-500"
                    aria-label={`Remove item ${index + 1}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </section>
          ))}
        </section>

        {/* Extra details */}
        <section className={sectionClass}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold sm:text-2xl">Extra Details</h2>
            <button
              type="button"
              onClick={addExtraDetail}
              className={buttonClass}
            >
              + Add Detail
            </button>
          </div>

          {extraDetails.map((item, index) => (
            <div key={index} className="mb-5 rounded-xl border p-4">
              <div className="mb-3 flex flex-wrap gap-3">
                <input
                  value={item.title}
                  onChange={(e) =>
                    updateExtraDetail(index, "title", e.target.value)
                  }
                  placeholder="Detail title"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => removeExtraDetail(index)}
                  className="rounded-lg bg-red-100 px-4 py-2 text-red-600"
                >
                  Delete
                </button>
              </div>
              <textarea
                value={item.description}
                onChange={(e) =>
                  updateExtraDetail(index, "description", e.target.value)
                }
                rows={3}
                placeholder="Write additional information..."
                className={inputClass}
              />
            </div>
          ))}
        </section>

        {/* Map */}
        <section className={sectionClass}>
          <h2 className="mb-6 text-xl font-bold sm:text-2xl">Map Location</h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Latitude</label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="15.4909"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Longitude</label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="73.8278"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Settings */}
        <section className={sectionClass}>
          <h2 className="mb-5 text-xl font-bold sm:text-2xl">
            Package Settings
          </h2>

          <div className="flex flex-wrap gap-6">
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
        </section>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700 disabled:opacity-50 sm:px-8"
          >
            {loading ? "Saving..." : "Save Package"}
          </button>

          <button
            type="button"
            onClick={() => navigate(ADMIN_PACKAGES_URL)}
            className="rounded-lg border px-6 py-3 hover:bg-gray-100 sm:px-8"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
