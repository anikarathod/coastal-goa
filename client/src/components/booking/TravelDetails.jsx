import {
  FaCalendarAlt,
  FaUsers,
  FaChild,
  FaRegStickyNote,
} from "react-icons/fa";

const TravelDetails = ({ travel, updateTravel }) => {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Travel Details
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Travel Date */}

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Travel Date *
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 px-4 focus-within:border-cyan-600">

            <FaCalendarAlt className="text-gray-400" />

            <input
              type="date"
              value={travel.travelDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                updateTravel(
                  "travelDate",
                  e.target.value
                )
              }
              className="w-full bg-transparent p-4 outline-none"
            />

          </div>
        </div>

        {/* Adults */}

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Adults
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 px-4">

            <FaUsers className="text-gray-400" />

            <input
              type="number"
              min="1"
              value={travel.adults}
              onChange={(e) =>
                updateTravel(
                  "adults",
                  Number(e.target.value)
                )
              }
              className="w-full bg-transparent p-4 outline-none"
            />

          </div>
        </div>

        {/* Children */}

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Children
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 px-4">

            <FaChild className="text-gray-400" />

            <input
              type="number"
              min="0"
              value={travel.children}
              onChange={(e) =>
                updateTravel(
                  "children",
                  Number(e.target.value)
                )
              }
              className="w-full bg-transparent p-4 outline-none"
            />

          </div>
        </div>

        {/* Special Requests */}

        <div className="md:col-span-2">

          <label className="mb-2 block font-medium text-gray-700">
            Special Requests
          </label>

          <div className="flex rounded-xl border border-gray-300 px-4 pt-4 focus-within:border-cyan-600">

            <FaRegStickyNote className="mt-1 text-gray-400" />

            <textarea
              rows={5}
              placeholder="Tell us if you need anything special..."
              value={travel.specialRequests}
              onChange={(e) =>
                updateTravel(
                  "specialRequests",
                  e.target.value
                )
              }
              className="w-full resize-none bg-transparent px-3 outline-none"
            />

          </div>

        </div>

      </div>

      {/* Travel Tips */}

      <div className="mt-8 rounded-xl bg-cyan-50 p-5">

        <h3 className="mb-3 font-semibold text-cyan-700">
          Travel Tips
        </h3>

        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
          <li>Carry a valid ID proof.</li>
          <li>Wear comfortable clothing.</li>
          <li>Bring sunscreen and water.</li>
          <li>Our team will contact you on WhatsApp.</li>
        </ul>

      </div>

    </div>
  );
};

export default TravelDetails;