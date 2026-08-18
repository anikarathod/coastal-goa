import { useState } from "react";

const ServiceForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
  });

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4 rounded-lg bg-white p-6 shadow"
    >
      <input
        name="title"
        placeholder="Service Name"
        onChange={handleChange}
        className="w-full rounded border p-3"
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
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
        Save Service
      </button>
    </form>
  );
};

export default ServiceForm;