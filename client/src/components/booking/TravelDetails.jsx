import {
  FaCalendarAlt,
  FaUsers,
  FaChild,
  FaRegStickyNote,
} from "react-icons/fa";

const TravelDetails = ({
  travel,
  updateTravel,
}) => {
  return (
    <div className="rounded-2xl bg-white p-4 md:p-6 shadow-lg">

      <h2 className="mb-4 md:mb-6 text-xl md:text-2xl font-bold text-gray-800">
        Travel Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

        {/* Travel Date */}
        <div>
          <label className="mb-2 block text-sm md:text-base font-medium text-gray-700">
            Travel Date *
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 px-3 md:px-4 focus-within:border-cyan-600">

            <FaCalendarAlt className="text-gray-400 text-sm md:text-base" />

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
              className="w-full bg-transparent p-3 md:p-4 text-sm md:text-base outline-none"
            />

          </div>
        </div>

        {/* Adults */}
        <div>
          <label className="mb-2 block text-sm md:text-base font-medium text-gray-700">
            Adults
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 px-3 md:px-4">

            <FaUsers className="text-gray-400 text-sm md:text-base" />

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
              className="w-full bg-transparent p-3 md:p-4 text-sm md:text-base outline-none"
            />

          </div>
        </div>

        {/* Children */}
        <div>
          <label className="mb-2 block text-sm md:text-base font-medium text-gray-700">
            Children
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 px-3 md:px-4">

            <FaChild className="text-gray-400 text-sm md:text-base" />

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
              className="w-full bg-transparent p-3 md:p-4 text-sm md:text-base outline-none"
            />

          </div>
        </div>

        {/* Special Requests */}
        <div className="md:col-span-2">

          <label className="mb-2 block text-sm md:text-base font-medium text-gray-700">
            Special Requests
          </label>

          <div className="flex rounded-xl border border-gray-300 px-3 md:px-4 pt-3 md:pt-4 focus-within:border-cyan-600">

            <FaRegStickyNote className="mt-1 text-gray-400 text-sm md:text-base" />

            <textarea
              rows={4}
              placeholder="Tell us if you need anything special..."
              value={travel.specialRequests}
              onChange={(e) =>
                updateTravel(
                  "specialRequests",
                  e.target.value
                )
              }
              className="w-full resize-none bg-transparent px-3 text-sm md:text-base outline-none"
            />

          </div>

        </div>

      </div>

      {/* Travel Tips */}
      <div className="mt-6 md:mt-8 rounded-xl bg-cyan-50 p-4 md:p-5">

        <h3 className="mb-3 text-sm md:text-base font-semibold text-cyan-700">
          Travel Tips
        </h3>

        <ul className="list-disc space-y-2 pl-5 text-xs md:text-sm text-gray-600">
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