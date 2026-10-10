import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  FaEye,
  FaEyeSlash,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShareAlt,
  FaLock,
  FaSave,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaInfoCircle,
} from "react-icons/fa";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [formData, setFormData] = useState({
    websiteName: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    facebook: "",
    instagram: "",
    youtube: "",
    googleMaps: "",
    latitude: "",
    longitude: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get("/settings");

      if (res.data.settings) {
        setFormData({
          websiteName: res.data.settings.websiteName || "",
          phone: res.data.settings.phone || "",
          whatsapp: res.data.settings.whatsapp || "",
          email: res.data.settings.email || "",
          address: res.data.settings.address || "",
          facebook: res.data.settings.facebook || "",
          instagram: res.data.settings.instagram || "",
          youtube: res.data.settings.youtube || "",
          googleMaps: res.data.settings.googleMaps || "",
          latitude: res.data.settings.latitude || "",
          longitude: res.data.settings.longitude || "",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.put("/settings", formData);
      toast.success("Settings updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setPasswordLoading(true);

      const res = await api.put("/auth/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      toast.success(res.data.message || "Password changed successfully");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to change password"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const passwordsMatch =
    passwordData.newPassword && passwordData.confirmPassword
      ? passwordData.newPassword === passwordData.confirmPassword
      : null;

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white p-3 text-sm shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 sm:text-base";

  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

  const sectionClass =
    "rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7";

  const tabs = [
    { key: "general", label: "General", icon: <FaGlobe /> },
    { key: "contact", label: "Contact", icon: <FaPhone /> },
    { key: "social", label: "Social Media", icon: <FaShareAlt /> },
    { key: "location", label: "Location", icon: <FaMapMarkerAlt /> },
    { key: "security", label: "Security", icon: <FaLock /> },
  ];

  if (initialLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <FaSpinner className="animate-spin text-3xl text-teal-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl pb-16">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Website Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Manage your website's general information, contact details, and security.
        </p>
      </div>

      {/* TABS */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex min-w-max gap-2 rounded-xl border border-gray-100 bg-white p-1.5 shadow-sm">
          {tabs.map((t) => {
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* GENERAL TAB */}
      {activeTab === "general" && (
        <form onSubmit={handleSubmit} className="space-y-6">

          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-2">
              <FaGlobe className="text-teal-600" />
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                General Information
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Website Name</label>
                <input
                  type="text"
                  name="websiteName"
                  value={formData.websiteName}
                  onChange={handleChange}
                  placeholder="Coastal Goa"
                  className={inputClass}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@coastalgoa.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 91758 84119"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Address</label>
                <textarea
                  rows="3"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Beach Road, North Goa, India"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <SaveBar loading={loading} />
        </form>
      )}

      {/* CONTACT TAB */}
      {activeTab === "contact" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-2">
              <FaPhone className="text-teal-600" />
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                Contact Information
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Phone Number</label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 91758 84119"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>WhatsApp Number</label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+91 91758 84119"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@coastalgoa.com"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-xs text-blue-700">
              <FaInfoCircle className="mt-0.5 shrink-0" />
              <span>
                These details appear on the public site's contact page and
                footer.
              </span>
            </div>
          </section>

          <SaveBar loading={loading} />
        </form>
      )}

      {/* SOCIAL TAB */}
      {activeTab === "social" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-2">
              <FaShareAlt className="text-teal-600" />
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                Social Media Links
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Facebook URL</label>
                <div className="relative">
                  <FaFacebook className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" />
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/coastalgoa"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Instagram URL</label>
                <div className="relative">
                  <FaInstagram className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-600" />
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/coastalgoa"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>YouTube URL</label>
                <div className="relative">
                  <FaYoutube className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" />
                  <input
                    type="text"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    placeholder="https://youtube.com/@coastalgoa"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>
            </div>
          </section>

          <SaveBar loading={loading} />
        </form>
      )}

      {/* LOCATION TAB */}
      {activeTab === "location" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-2">
              <FaMapMarkerAlt className="text-teal-600" />
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                Location & Map
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Google Maps Embed URL</label>
                <textarea
                  rows="3"
                  name="googleMaps"
                  value={formData.googleMaps}
                  onChange={handleChange}
                  placeholder="Paste the Google Maps iframe src URL here..."
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Tip: Go to Google Maps → Share → Embed a map → Copy the{" "}
                  <code className="rounded bg-gray-100 px-1">src</code> URL.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Latitude</label>
                  <input
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    placeholder="15.4909"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Longitude</label>
                  <input
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    placeholder="73.8278"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600">
                <p className="font-semibold text-gray-700">Where to find coordinates?</p>
                <p className="mt-1">
                  Right-click on any location in Google Maps → Click the
                  coordinates to copy them.
                </p>
              </div>
            </div>
          </section>

          <SaveBar loading={loading} />
        </form>
      )}

      {/* SECURITY TAB */}
      {activeTab === "security" && (
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <section className={sectionClass}>
            <div className="mb-5 flex items-center gap-2">
              <FaLock className="text-red-600" />
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                Change Password
              </h2>
            </div>

            <div className="space-y-5">
              {/* CURRENT PASSWORD */}
              <div>
                <label className={labelClass}>Current Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter your current password"
                    required
                    className={`${inputClass} pl-11 pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((p) => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
                    aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                  >
                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* NEW PASSWORD */}
              <div>
                <label className={labelClass}>New Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="At least 6 characters"
                    required
                    className={`${inputClass} pl-11 pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((p) => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className={labelClass}>Confirm New Password</label>
                <div
                  className={`relative flex items-center rounded-lg border bg-white shadow-sm transition focus-within:ring-2 ${
                    passwordsMatch === false
                      ? "border-red-300 focus-within:border-red-500 focus-within:ring-red-100"
                      : passwordsMatch === true
                      ? "border-green-300 focus-within:border-green-500 focus-within:ring-green-100"
                      : "border-gray-200 focus-within:border-teal-500 focus-within:ring-teal-100"
                  }`}
                >
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Re-type your new password"
                    required
                    className="w-full rounded-lg bg-transparent p-3 pl-11 pr-12 text-sm outline-none sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {passwordsMatch === true && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-green-600">
                    <FaCheckCircle className="text-[10px]" /> Passwords match
                  </p>
                )}
                {passwordsMatch === false && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
                    <FaTimesCircle className="text-[10px]" /> Passwords don't match
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-xl border border-yellow-100 bg-yellow-50/60 p-3 text-xs text-yellow-800">
              <FaInfoCircle className="mt-0.5 shrink-0" />
              <span>
                <strong>Security tip:</strong> Use a strong password with
                uppercase letters, numbers, and special characters.
              </span>
            </div>
          </section>

          <div className="sticky bottom-0 -mx-4 flex justify-end border-t border-gray-100 bg-white/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6">
            <button
              type="submit"
              disabled={passwordLoading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {passwordLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <FaLock />
                  Change Password
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

/* ============= SAVE BAR ============= */
const SaveBar = ({ loading }) => (
  <div className="sticky bottom-0 -mx-4 flex justify-end border-t border-gray-100 bg-white/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6">
    <button
      type="submit"
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <FaSave />
          Save Settings
        </>
      )}
    </button>
  </div>
);

export default Settings;