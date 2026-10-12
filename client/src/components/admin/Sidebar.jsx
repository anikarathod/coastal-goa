import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaConciergeBell,
  FaCalendarCheck,
  FaUsers,
  FaImages,
  FaEnvelope,
  FaCog,
  FaChartBar,
} from "react-icons/fa";
import { useSettings } from "../../context/SettingsContext";

const Sidebar = ({ isOpen, onClose }) => {
  const { settings } = useSettings();
  const websiteName = settings.websiteName || "Alpha Waves Goa";

  const menu = [
    { name: "Dashboard", path: "/pearlrathod", icon: <FaTachometerAlt /> },
    { name: "Analytics", path: "/pearlrathod/analytics", icon: <FaChartBar /> },
    { name: "Packages", path: "/pearlrathod/packages", icon: <FaBoxOpen /> },
    { name: "Services", path: "/pearlrathod/services", icon: <FaConciergeBell /> },
    { name: "Bookings", path: "/pearlrathod/bookings", icon: <FaCalendarCheck /> },
    { name: "Customers", path: "/pearlrathod/customers", icon: <FaUsers /> },
    { name: "Gallery", path: "/pearlrathod/gallery", icon: <FaImages /> },
    { name: "Contacts", path: "/pearlrathod/contacts", icon: <FaEnvelope /> },
    { name: "Settings", path: "/pearlrathod/settings", icon: <FaCog /> },
  ];

  return (
    <>
      {/* Mobile backdrop — tap to close */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col bg-slate-900 text-white
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:z-auto lg:w-64 lg:translate-x-0
        `}
      >
        {/* Logo + mobile close button */}
        <div className="flex items-center justify-between border-b border-slate-700 p-5 lg:p-6">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold text-teal-400 lg:text-2xl">
              {websiteName}
            </h1>
            <p className="mt-0.5 text-xs text-slate-400 lg:text-sm">
              Admin Panel
            </p>
          </div>

          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-3 lg:py-4">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.name === "Dashboard"}
              onClick={onClose}   // auto-close on mobile after tapping a link
              className={({ isActive }) =>
                `mx-2 mb-1 flex min-h-11 items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition lg:mx-3 lg:mb-2 lg:py-3 lg:text-base ${
                  isActive
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-900/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-700 p-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {websiteName}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;