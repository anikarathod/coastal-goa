import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaConciergeBell,
  FaCalendarCheck,
  FaUsers,
  FaImages,
  FaEnvelope,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  const menu = [
    {
      name: "Dashboard",
      path: "/pearlrathod",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Packages",
      path: "/pearlrathod/packages",
      icon: <FaBoxOpen />,
    },
    {
      name: "Services",
      path: "/pearlrathod/services",
      icon: <FaConciergeBell />,
    },
    {
      name: "Bookings",
      path: "/pearlrathod/bookings",
      icon: <FaCalendarCheck />,
    },
    {
      name: "Customers",
      path: "/pearlrathod/customers",
      icon: <FaUsers />,
    },
    {
      name: "Gallery",
      path: "/pearlrathod/gallery",
      icon: <FaImages />,
    },
    {
      name: "Contacts",
      path: "/pearlrathod/contacts",
      icon: <FaEnvelope />,
    },
    {
      name: "Settings",
      path: "/pearlrathod/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <aside className="flex h-full w-64 flex-col bg-slate-900 text-white">
      {/* Logo */}
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold text-cyan-400">
          Coastal Goa
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Admin Panel
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.name === "Dashboard"}
            className={({ isActive }) =>
              `mx-3 mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-cyan-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-lg">
              {item.icon}
            </span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Coastal Goa
      </div>
    </aside>
  );
};

export default Sidebar;