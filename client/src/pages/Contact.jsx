import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import Map from "../components/contact/Map";

const Contact = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Contact Us
          </h1>

          <p className="mt-3 text-gray-600">
            We'd love to hear from you. Reach out to us for bookings,
            inquiries, or custom Goa tour packages.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <ContactInfo />
          <ContactForm />
        </div>

        <div className="mt-12">
          <Map />
        </div>
      </div>
    </section>
  );
};

export default Contact;