import { useState } from "react";
import { FaSave } from "react-icons/fa";

const ServiceForm = ({ onSubmit, initialData = {}, loading = false }) => {
  const [form, setForm] = useState({
    title: initialData.title || "",
    price: initialData.price || "",
    location: initialData.location || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Service name is required";
    if (!form.price || Number(form.price) <= 0)
      next.price = "Enter a valid price";
    if (!form.location.trim()) next.location = "Location is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div>
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          Service Details
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the details below and save.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Service name — full width */}
        <Field
          label="Service Name"
          name="title"
          placeholder="e.g. Airport Transfer"
          value={form.title}
          onChange={handleChange}
          error={errors.title}
          className="sm:col-span-2"
        />

        {/* Price */}
        <Field
          label="Price (₹)"
          name="price"
          type="number"
          inputMode="numeric"
          placeholder="e.g. 999"
          value={form.price}
          onChange={handleChange}
          error={errors.price}
        />

        {/* Location */}
        <Field
          label="Location"
          name="location"
          placeholder="e.g. Goa Airport"
          value={form.location}
          onChange={handleChange}
          error={errors.location}
        />
      </div>

      {/* Sticky action bar on mobile */}
      <div className="sticky bottom-0 -mx-5 -mb-5 border-t border-slate-100 bg-white/95 px-5 py-4 backdrop-blur-sm sm:static sm:mx-0 sm:mb-0 sm:border-0 sm:bg-transparent sm:p-0 sm:pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <FaSave />
          {loading ? "Saving..." : "Save Service"}
        </button>
      </div>
    </form>
  );
};

/* Reusable field — same as PackageForm */
const Field = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  className = "",
  inputMode,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className={`
          w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400
          transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20
          ${error ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-300"}
        `}
      />

      {error && (
        <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>
      )}
    </div>
  );
};

export default ServiceForm;