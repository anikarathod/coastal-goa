import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const AddPackage = () => {
  const navigate = useNavigate();
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

  const [coverImage, setCoverImage] =
    useState(null);

  const [galleryImages, setGalleryImages] =
    useState([]);

  const [highlights, setHighlights] = useState([
    "",
  ]);

  const [inclusions, setInclusions] = useState([
    "",
  ]);

  const [exclusions, setExclusions] = useState([
    "",
  ]);
const [sections, setSections] = useState([
  {
    title: "",
    content: "",
  },
]);
  const [itinerary, setItinerary] = useState([
    {
      day: "Day 1",
      title: "",
      description: "",
    },
  ]);

const [extraDetails, setExtraDetails] = useState([
  {
    title: "",
    description: "",
  },
]);
  // ==========================================
  // BASIC FORM
  // ==========================================

  const handleChange = (e) => {
  const {
    name,
    value,
    checked,
    type,
  } = e.target;

  if (name === "title") {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""),
    }));
    return;
  }

  setForm((prev) => ({
    ...prev,
    [name]:
      type === "checkbox"
        ? checked
        : value,
  }));
};

  // ==========================================
  // ARRAY HELPERS
  // ==========================================

  const updateArrayItem = (
    setter,
    array,
    index,
    value
  ) => {
    const updated = [...array];
    updated[index] = value;
    setter(updated);
  };

  const addArrayItem = (setter, array) => {
    setter([...array, ""]);
  };

  const removeArrayItem = (
    setter,
    array,
    index
  ) => {
    setter(
      array.filter(
        (_, i) => i !== index
      )
    );
  };

  // ==========================================
  // ITINERARY
  // ==========================================

  const updateItinerary = (
    index,
    field,
    value
  ) => {
    const updated = [...itinerary];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setItinerary(updated);
  };

  const addItinerary = () => {
    setItinerary([
      ...itinerary,
      {
        day: `Day ${itinerary.length + 1}`,
        title: "",
        description: "",
      },
    ]);
  };

  const removeItinerary = (index) => {
    setItinerary(
      itinerary.filter(
        (_, i) => i !== index
      )
    );
  };
 // ==========================================
// CUSTOM SECTIONS
// ==========================================

const addSection = () => {
  setSections([
    ...sections,
    {
      title: "",
      content: "",
    },
  ]);
};

const removeSection = (index) => {
  setSections(
    sections.filter((_, i) => i !== index)
  );
};

const updateSectionTitle = (
  index,
  value
) => {
  const updated = [...sections];

  updated[index].title = value;

  setSections(updated);
};

const updateSectionContent = (
  index,
  value
) => {
  const updated = [...sections];

  updated[index].content = value;

  setSections(updated);
};
  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      // Basic fields
      Object.entries(form).forEach(
        ([key, value]) => {
          formData.append(
            key,
            value
          );
        }
      );

      // Arrays
      formData.append(
        "highlights",
        JSON.stringify(
          highlights.filter(
            (item) => item.trim()
          )
        )
      );

      formData.append(
        "inclusions",
        JSON.stringify(
          inclusions.filter(
            (item) => item.trim()
          )
        )
      );

      formData.append(
        "exclusions",
        JSON.stringify(
          exclusions.filter(
            (item) => item.trim()
          )
        )
      );

      formData.append(
        "itinerary",
        JSON.stringify(
          itinerary.filter(
            (item) =>
              item.title.trim() ||
              item.description.trim()
          )
        )
      );
     formData.append(
  "extraDetails",
  JSON.stringify(extraDetails)
);
formData.append(
  "sections",
  JSON.stringify(sections)
);
      // Cover
      if (coverImage) {
        formData.append(
          "coverImage",
          coverImage
        );
      }

      // Gallery
      galleryImages.forEach(
        (image) => {
          formData.append(
            "images",
            image
          );
        }
      );

      await api.post(
        "/packages",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Package added successfully!"
      );

      navigate(
        "/admin/packages"
      );
    } catch (error) {
      console.error(
        "Add Package Error:",
        error
      );

      alert(
        error.response?.data
          ?.message ||
          "Failed to add package."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Add Tour Package
        </h1>

        <p className="mt-2 text-gray-500">
          Add all information that visitors
          will see on the package details page.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-10"
      >

        {/* ================================= */}
        {/* BASIC INFORMATION */}
        {/* ================================= */}

        <section className="rounded-2xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Basic Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-medium">
                Package Title *
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="North Goa Sightseeing"
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
                placeholder="Sightseeing"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Location *
              </label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="North Goa"
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
                placeholder="1 Day"
                className="w-full rounded-lg border p-3"
              />
            </div>

          </div>

          <div className="mt-6">

            <label className="mb-2 block font-medium">
              Short Description
            </label>

            <input
              name="shortDescription"
              value={
                form.shortDescription
              }
              onChange={handleChange}
              placeholder="Explore the best places in North Goa."
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div className="mt-6">

            <label className="mb-2 block font-medium">
              Full Description *
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={7}
              placeholder="Write the complete package description..."
              className="w-full rounded-lg border p-3"
            />

          </div>

        </section>

        {/* ================================= */}
        {/* PRICING */}
        {/* ================================= */}

        <section className="rounded-2xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Pricing
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-medium">
                Original Price *
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                placeholder="1500"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Discount Price
              </label>

              <input
                type="number"
                name="discountPrice"
                value={
                  form.discountPrice
                }
                onChange={handleChange}
                min="0"
                placeholder="1299"
                className="w-full rounded-lg border p-3"
              />
            </div>

          </div>

          <p className="mt-4 text-sm text-gray-500">
            If you don't want a discount,
            leave Discount Price empty.
          </p>

        </section>
                <section className="rounded-2xl bg-white p-8 shadow">

  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-2xl font-bold">
      Custom Package Sections
    </h2>

    <button
      type="button"
      onClick={addSection}
      className="rounded-lg bg-cyan-600 px-4 py-2 text-white"
    >
      + Add Section
    </button>

  </div>

  {sections.map((section, index) => (

  <div
    key={index}
    className="mb-8 rounded-xl border p-5"
  >

    <div className="mb-4 flex gap-3">

      <input
        type="text"
        placeholder="Section Title"
        value={section.title}
        onChange={(e) =>
          updateSectionTitle(
            index,
            e.target.value
          )
        }
        className="flex-1 rounded-lg border p-3"
      />

      <button
        type="button"
        onClick={() =>
          removeSection(index)
        }
        className="rounded-lg bg-red-500 px-4 text-white"
      >
        Delete
      </button>

    </div>

    <textarea
      rows={8}
      placeholder="Write anything here...
Package details
Pick-up Information
Terms & Conditions
Food Menu
Important Notes"
      value={section.content}
      onChange={(e) =>
        updateSectionContent(
          index,
          e.target.value
        )
      }
      className="w-full rounded-lg border p-3"
    />

  </div>

))}
</section>
        {/* ================================= */}
        {/* IMAGES */}
        {/* ================================= */}

        <section className="rounded-2xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Package Images
          </h2>

          {/* Cover */}

          <div className="mb-8">

            <label className="mb-2 block font-medium">
              Cover Image *
            </label>

            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) =>
                setCoverImage(
                  e.target.files?.[0] ||
                    null
                )
              }
              className="w-full rounded-lg border p-3"
            />

            {coverImage && (
              <p className="mt-2 text-sm text-green-600">
                Selected:{" "}
                {coverImage.name}
              </p>
            )}

          </div>

          {/* Gallery */}

          <div>

            <label className="mb-2 block font-medium">
              Gallery Images
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setGalleryImages(
                  Array.from(
                    e.target.files || []
                  )
                )
              }
              className="w-full rounded-lg border p-3"
            />

            {galleryImages.length >
              0 && (
              <p className="mt-2 text-sm text-green-600">
                {
                  galleryImages.length
                }{" "}
                images selected
              </p>
            )}

          </div>

        </section>

        {/* ================================= */}
        {/* HIGHLIGHTS */}
        {/* ================================= */}

        <section className="rounded-2xl bg-white p-8 shadow">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Highlights
            </h2>

            <button
              type="button"
              onClick={() =>
                addArrayItem(
                  setHighlights,
                  highlights
                )
              }
              className="rounded-lg bg-cyan-600 px-4 py-2 text-white"
            >
              + Add
            </button>

          </div>

          <div className="space-y-3">

            {highlights.map(
              (item, index) => (
                <div
                  key={index}
                  className="flex gap-3"
                >

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
                    className="flex-1 rounded-lg border p-3"
                  />

                  {highlights.length >
                    1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItem(
                          setHighlights,
                          highlights,
                          index
                        )
                      }
                      className="rounded-lg bg-red-100 px-4 text-red-600"
                    >
                      Remove
                    </button>
                  )}

                </div>
              )
            )}

          </div>

        </section>

        {/* ================================= */}
        {/* ITINERARY */}
        {/* ================================= */}

        <section className="rounded-2xl bg-white p-8 shadow">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Itinerary
            </h2>

            <button
              type="button"
              onClick={addItinerary}
              className="rounded-lg bg-cyan-600 px-4 py-2 text-white"
            >
              + Add Day
            </button>

          </div>

          <div className="space-y-6">

            {itinerary.map(
              (item, index) => (
                <div
                  key={index}
                  className="rounded-xl border p-6"
                >

                  <div className="grid gap-4 md:grid-cols-3">

                    <input
                      value={item.day}
                      onChange={(e) =>
                        updateItinerary(
                          index,
                          "day",
                          e.target.value
                        )
                      }
                      placeholder="Day 1"
                      className="rounded-lg border p-3"
                    />

                    <input
                      value={item.title}
                      onChange={(e) =>
                        updateItinerary(
                          index,
                          "title",
                          e.target.value
                        )
                      }
                      placeholder="North Goa Sightseeing"
                      className="rounded-lg border p-3 md:col-span-2"
                    />

                  </div>

                  <textarea
                    value={
                      item.description
                    }
                    onChange={(e) =>
                      updateItinerary(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    rows={4}
                    placeholder="Hotel pickup → Fort Aguada → Candolim Beach → Baga Beach..."
                    className="mt-4 w-full rounded-lg border p-3"
                  />

                  {itinerary.length >
                    1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeItinerary(
                          index
                        )
                      }
                      className="mt-4 rounded-lg bg-red-100 px-4 py-2 text-red-600"
                    >
                      Remove Day
                    </button>
                  )}

                </div>
              )
            )}

          </div>

        </section>

        {/* ================================= */}
        {/* INCLUDED / EXCLUDED */}
        {/* ================================= */}

        <section className="grid gap-8 md:grid-cols-2">

          {/* Inclusions */}

          <div className="rounded-2xl bg-white p-8 shadow">

            <div className="mb-6 flex justify-between">

              <h2 className="text-2xl font-bold">
                What's Included
              </h2>

              <button
                type="button"
                onClick={() =>
                  addArrayItem(
                    setInclusions,
                    inclusions
                  )
                }
                className="text-cyan-600"
              >
                + Add
              </button>

            </div>

            {inclusions.map(
              (item, index) => (
                <div
                  key={index}
                  className="mb-3 flex gap-2"
                >

                  <input
                    value={item}
                    onChange={(e) =>
                      updateArrayItem(
                        setInclusions,
                        inclusions,
                        index,
                        e.target.value
                      )
                    }
                    placeholder="Hotel pickup"
                    className="flex-1 rounded-lg border p-3"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeArrayItem(
                        setInclusions,
                        inclusions,
                        index
                      )
                    }
                    className="text-red-500"
                  >
                    ×
                  </button>

                </div>
              )
            )}

          </div>

          {/* Exclusions */}

          <div className="rounded-2xl bg-white p-8 shadow">

            <div className="mb-6 flex justify-between">

              <h2 className="text-2xl font-bold">
                What's Not Included
              </h2>

              <button
                type="button"
                onClick={() =>
                  addArrayItem(
                    setExclusions,
                    exclusions
                  )
                }
                className="text-cyan-600"
              >
                + Add
              </button>

            </div>

            {exclusions.map(
              (item, index) => (
                <div
                  key={index}
                  className="mb-3 flex gap-2"
                >

                  <input
                    value={item}
                    onChange={(e) =>
                      updateArrayItem(
                        setExclusions,
                        exclusions,
                        index,
                        e.target.value
                      )
                    }
                    placeholder="Personal expenses"
                    className="flex-1 rounded-lg border p-3"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeArrayItem(
                        setExclusions,
                        exclusions,
                        index
                      )
                    }
                    className="text-red-500"
                  >
                    ×
                  </button>

                </div>
              )
            )}

          </div>

        </section>

        {/* ================================= */}
        {/* MAP */}
        {/* ================================= */}

        <section className="rounded-2xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Map Location
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-medium">
                Latitude
              </label>

              <input
                type="number"
                step="any"
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="15.4909"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Longitude
              </label>

              <input
                type="number"
                step="any"
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="73.8278"
                className="w-full rounded-lg border p-3"
              />
            </div>

          </div>

        </section>

        {/* ================================= */}
        {/* SETTINGS */}
        {/* ================================= */}

        <section className="rounded-2xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Package Settings
          </h2>

          <div className="flex gap-8">

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={
                  form.featured
                }
                onChange={handleChange}
              />

              Featured
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={
                  form.isActive
                }
                onChange={handleChange}
              />

              Active
            </label>

          </div>

        </section>

        {/* ================================= */}
        {/* BUTTONS */}
        {/* ================================= */}

        <div className="flex gap-4">

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-cyan-600 px-8 py-3 font-semibold text-white hover:bg-cyan-700 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Save Package"}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/packages"
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

export default AddPackage;