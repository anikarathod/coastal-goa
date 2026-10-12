import React from "react";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg sm:p-6">
      <div className="flex items-center justify-between gap-4">

        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium uppercase tracking-wider text-slate-500 sm:text-sm sm:normal-case sm:tracking-normal">
            {title}
          </p>

          <h2 className="mt-1.5 text-2xl font-bold text-slate-900 sm:mt-2 sm:text-3xl">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg sm:h-14 sm:w-14 sm:text-xl ${color}`}
        >
          {icon}
        </div>

      </div>

      {/* Subtle accent line at bottom on hover */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-teal-500 transition-transform duration-300 group-hover:scale-x-100" />
    </div>
  );
};

export default StatCard;