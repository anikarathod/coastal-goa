import { FaBars } from "react-icons/fa";

const Topbar = ({ onMenuClick, title = "Admin Dashboard" }) => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md shadow-sm sm:px-6 lg:h-16">
      {/* Left: hamburger + title */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <FaBars className="text-lg" />
        </button>

        <h1 className="truncate text-base font-semibold text-slate-900 sm:text-lg lg:text-xl">
          {title}
        </h1>
      </div>

      {/* Right: welcome text / user */}
      <div className="flex shrink-0 items-center gap-2">
        {/* Compact on mobile */}
        <span className="hidden text-sm font-medium text-slate-600 sm:inline">
          Welcome, Admin
        </span>

        {/* Avatar circle — visible on mobile too */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
          A
        </div>
      </div>
    </header>
  );
};

export default Topbar;