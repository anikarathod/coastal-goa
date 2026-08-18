import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const CustomerDetails = ({ customer, updateCustomer }) => {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Customer Details
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="mb-2 block font-medium text-gray-700">
            Full Name *
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 px-4 focus-within:border-cyan-600">
            <FaUser className="text-gray-400" />

            <input
              type="text"
              placeholder="Enter your full name"
              value={customer.fullName}
              onChange={(e) =>
                updateCustomer("fullName", e.target.value)
              }
              className="w-full bg-transparent p-4 outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Email Address *
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 px-4 focus-within:border-cyan-600">
            <FaEnvelope className="text-gray-400" />

            <input
              type="email"
              placeholder="example@email.com"
              value={customer.email}
              onChange={(e) =>
                updateCustomer("email", e.target.value)
              }
              className="w-full bg-transparent p-4 outline-none"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Phone Number *
          </label>

          <div className="flex items-center rounded-xl border border-gray-300 px-4 focus-within:border-cyan-600">
            <FaPhone className="text-gray-400" />

            <input
              type="tel"
              placeholder="+91 9175884119"
              value={customer.phone}
              onChange={(e) =>
                updateCustomer("phone", e.target.value)
              }
              className="w-full bg-transparent p-4 outline-none"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerDetails;