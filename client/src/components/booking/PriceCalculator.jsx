import {
  FaTag,
  FaConciergeBell,
  FaUsers,
  FaPercent,
  FaMoneyBillWave,
} from "react-icons/fa";

const PriceCalculator = ({
  bookingData,
  subtotal = 0,
  gst = 0,
  grandTotal = 0,
}) => {
  if (!bookingData) {
    return null;
  }

  const packagePrice =
    bookingData?.selectedPackage?.price || 0;

  const serviceTotal =
    bookingData?.selectedServices?.reduce(
      (total, service) => total + (service.price || 0),
      0
    ) || 0;

  const totalGuests =
    Number(bookingData?.travel?.adults || 0) +
    Number(bookingData?.travel?.children || 0);

  const discount = 0;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Price Breakdown
      </h2>

      {/* Package */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <FaTag className="text-cyan-600" />
          <span>Package</span>
        </div>

        <span className="font-semibold">
          ₹{packagePrice.toFixed(2)}
        </span>
      </div>

      {/* Services */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <FaConciergeBell className="text-cyan-600" />
          <span>Extra Services</span>
        </div>

        <span className="font-semibold">
          ₹{serviceTotal.toFixed(2)}
        </span>
      </div>

      {/* Guests */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <FaUsers className="text-cyan-600" />
          <span>Total Guests</span>
        </div>

        <span className="font-semibold">
          {totalGuests}
        </span>
      </div>

      <hr className="my-3" />

      {/* Subtotal */}
      <div className="flex items-center justify-between py-3">
        <span className="font-medium">
          Subtotal
        </span>

        <span className="font-semibold">
          ₹{subtotal.toFixed(2)}
        </span>
      </div>

      {/* Discount */}
      <div className="flex items-center justify-between py-3 text-green-600">
        <div className="flex items-center gap-3">
          <FaPercent />
          <span>Discount</span>
        </div>

        <span>
          - ₹{discount.toFixed(2)}
        </span>
      </div>

      {/* GST */}
      <div className="flex items-center justify-between py-3">
        <span>GST (5%)</span>

        <span>
          ₹{gst.toFixed(2)}
        </span>
      </div>

      <hr className="my-4" />

      {/* Grand Total */}
      <div className="rounded-xl bg-cyan-600 p-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaMoneyBillWave />
            <span className="text-lg">
              Grand Total
            </span>
          </div>

          <span className="text-3xl font-bold">
            ₹{grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-5 rounded-xl bg-gray-100 p-4">
        <p className="text-sm text-gray-600">
          • GST is included in the total amount.
        </p>

        <p className="mt-2 text-sm text-gray-600">
          • Prices are subject to availability.
        </p>

        <p className="mt-2 text-sm text-gray-600">
          • Extra activities booked later may incur additional charges.
        </p>
      </div>
    </div>
  );
};

export default PriceCalculator;