import { useState } from "react";

const GalleryForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [category, setCategory] =
    useState("");
  const [location, setLocation] =
    useState("Goa");
  const [file, setFile] = useState(null);

  const submit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", title);
    data.append("description", description);
    data.append("category", category);
    data.append("location", location);

    if (file) {
      data.append("file", file);
    }

    onSubmit(data);
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-xl bg-white p-6 shadow"
    >
      <h2 className="text-2xl font-bold">
        Upload Gallery Item
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="w-full rounded-lg border p-3"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        className="w-full rounded-lg border p-3"
        rows={4}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="w-full rounded-lg border p-3"
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) =>
          setLocation(e.target.value)
        }
        className="w-full rounded-lg border p-3"
      />

      <input
        type="file"
        accept="image/*,video/*,.pdf"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
        className="w-full rounded-lg border p-3"
        required
      />

      <button
        type="submit"
        className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"
      >
        Upload File
      </button>
    </form>
  );
};

export default GalleryForm;