import React from "react";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full ${color}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
};

export default StatCard;