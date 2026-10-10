import { Helmet } from "react-helmet-async";
import { FaEnvelope, FaPhone, FaComments } from "react-icons/fa";

import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import Map from "../components/contact/Map";

const Contact = () => {
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Contact Us | Coastal Goa</title>
        <meta
          name="description"
          content="Get in touch with Coastal Goa. We're here to help you plan your perfect Goa trip — bookings, inquiries, and custom tour packages."
        />
        <meta property="og:title" content="Contact Us | Coastal Goa" />
        <meta
          property="og:description"
          content="Reach out to Coastal Goa for bookings, inquiries, or custom Goa tour packages."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="min-h-screen bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* HEADER */}
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
            {/* Eyebrow badge */}
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700 sm:text-sm">
              <FaComments className="text-[10px]" />
              Get in Touch
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Contact Us
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base">
              We'd love to hear from you. Reach out to us for bookings,
              inquiries, or custom Goa tour packages — we usually reply
              within a few hours.
            </p>

            {/* Quick contact chips */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:hello@coastalgoa.com"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm transition hover:border-teal-300 hover:text-teal-600 sm:text-sm"
              >
                <FaEnvelope className="text-teal-600" />
                hello@coastalgoa.com
              </a>

              <a
                href="tel:+919175884119"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm transition hover:border-teal-300 hover:text-teal-600 sm:text-sm"
              >
                <FaPhone className="text-teal-600" />
                +91 91758 84119
              </a>
            </div>
          </div>

          {/* INFO + FORM GRID */}
          <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
            {/* Info — narrower */}
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>

            {/* Form — wider */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>

          {/* MAP */}
          <div className="mt-12 sm:mt-16">
            <div className="mb-5 flex items-center gap-2">
              <span className="text-teal-600">📍</span>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Find Us on the Map
              </h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
              <Map />
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Contact;