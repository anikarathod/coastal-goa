import { useState } from "react";

const PackageForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    duration: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-lg bg-white p-6 shadow"
    >
      <input
        name="title"
        placeholder="Package Name"
        onChange={handleChange}
        className="w-full rounded border p-3"
      />

      <input
        name="price"
        placeholder="Price"
        type="number"
        onChange={handleChange}
        className="w-full rounded border p-3"
      />

      <input
        name="duration"
        placeholder="Duration"
        onChange={handleChange}
        className="w-full rounded border p-3"
      />

      <input
        name="location"
        placeholder="Location"
        onChange={handleChange}
        className="w-full rounded border p-3"
      />

      <button className="rounded bg-cyan-600 px-5 py-3 text-white">
        Save Package
      </button>
    </form>
  );
};

export default PackageForm;