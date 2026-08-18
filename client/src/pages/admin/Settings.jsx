import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] =
    useState(false);

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

  const [passwordData, setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
const [showCurrentPassword, setShowCurrentPassword] =
  useState(false);

const [showNewPassword, setShowNewPassword] =
  useState(false);

const [showConfirmPassword, setShowConfirmPassword] =
  useState(false);
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get("/settings");

      if (res.data.settings) {
          setFormData({
  websiteName:
    res.data.settings.websiteName || "",

  phone:
    res.data.settings.phone || "",

  whatsapp:
    res.data.settings.whatsapp || "",

  email:
    res.data.settings.email || "",

  address:
    res.data.settings.address || "",

  facebook:
    res.data.settings.facebook || "",

  instagram:
    res.data.settings.instagram || "",

  youtube:
    res.data.settings.youtube || "",

  googleMaps:
    res.data.settings.googleMaps || "",

  latitude:
    res.data.settings.latitude || "",

  longitude:
    res.data.settings.longitude || "",
        });
      }
    } catch (error) {
      console.error(error);
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

      toast.success(
        "Settings Updated Successfully"
      );
    } catch (error) {
      console.error(error);
      toast.error(
        "Failed to update settings"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }

    try {
      setPasswordLoading(true);

      const res = await api.put(
        "/auth/change-password",
        {
          currentPassword:
            passwordData.currentPassword,
          newPassword:
            passwordData.newPassword,
        }
      );

      toast.success(res.data.message);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to change password"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        Website Settings
      </h1>

      {/* Website Settings */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl bg-white p-8 shadow"
      >

        <div>
  <label className="mb-2 block font-medium">
    Website Name
  </label>

  <input
    type="text"
    name="websiteName"
    value={formData.websiteName}
    onChange={handleChange}
    className="w-full rounded-lg border p-3"
  />
</div>
        <div>
          <label className="mb-2 block font-medium">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            WhatsApp Number
          </label>

          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Address
          </label>

          <textarea
            rows="3"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Facebook Link
          </label>

          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Instagram Link
          </label>

          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>
        <div>
  <label className="mb-2 block font-medium">
    YouTube Link
  </label>

  <input
    type="text"
    name="youtube"
    value={formData.youtube}
    onChange={handleChange}
    className="w-full rounded-lg border p-3"
  />
</div>

<div>
  <label className="mb-2 block font-medium">
    Google Maps Embed URL
  </label>

  <textarea
    rows="3"
    name="googleMaps"
    value={formData.googleMaps}
    onChange={handleChange}
    className="w-full rounded-lg border p-3"
  />
</div>

<div>
  <label className="mb-2 block font-medium">
    Latitude
  </label>

  <input
    type="text"
    name="latitude"
    value={formData.latitude}
    onChange={handleChange}
    className="w-full rounded-lg border p-3"
  />
</div>

<div>
  <label className="mb-2 block font-medium">
    Longitude
  </label>

  <input
    type="text"
    name="longitude"
    value={formData.longitude}
    onChange={handleChange}
    className="w-full rounded-lg border p-3"
  />
</div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"
        >
          {loading
            ? "Saving..."
            : "Save Settings"}
        </button>
      </form>

      {/* Change Password */}
<form
  onSubmit={handlePasswordSubmit}
  className="mt-8 space-y-6 rounded-xl bg-white p-8 shadow"
>
  <h2 className="text-2xl font-bold">
    Change Password
  </h2>

  {/* Current Password */}
  <div>
    <label className="mb-2 block font-medium">
      Current Password
    </label>

    <div className="relative">
      <input
        type={showCurrentPassword ? "text" : "password"}
        name="currentPassword"
        value={passwordData.currentPassword}
        onChange={handlePasswordChange}
        className="w-full rounded-lg border p-3 pr-12"
      />

      <button
        type="button"
        onClick={() =>
          setShowCurrentPassword(!showCurrentPassword)
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
      >
        {showCurrentPassword ? (
          <FaEyeSlash />
        ) : (
          <FaEye />
        )}
      </button>
    </div>
  </div>

  {/* New Password */}
  <div>
    <label className="mb-2 block font-medium">
      New Password
    </label>

    <div className="relative">
      <input
        type={showNewPassword ? "text" : "password"}
        name="newPassword"
        value={passwordData.newPassword}
        onChange={handlePasswordChange}
        className="w-full rounded-lg border p-3 pr-12"
      />

      <button
        type="button"
        onClick={() =>
          setShowNewPassword(!showNewPassword)
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
      >
        {showNewPassword ? (
          <FaEyeSlash />
        ) : (
          <FaEye />
        )}
      </button>
    </div>
  </div>

  {/* Confirm Password */}
  <div>
    <label className="mb-2 block font-medium">
      Confirm Password
    </label>

    <div className="relative">
      <input
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        value={passwordData.confirmPassword}
        onChange={handlePasswordChange}
        className="w-full rounded-lg border p-3 pr-12"
      />

      <button
        type="button"
        onClick={() =>
          setShowConfirmPassword(
            !showConfirmPassword
          )
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
      >
        {showConfirmPassword ? (
          <FaEyeSlash />
        ) : (
          <FaEye />
        )}
      </button>
    </div>
  </div>

  <button
    type="submit"
    disabled={passwordLoading}
    className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
  >
    {passwordLoading
      ? "Updating..."
      : "Change Password"}
  </button>
</form>
    </div>
  );
};

export default Settings;