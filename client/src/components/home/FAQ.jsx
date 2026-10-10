import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    question: "How do I book a Goa tour package?",
    answer:
      "Simply choose your preferred package and reach out via WhatsApp or our booking form. Our team will confirm availability, share the details, and finalize your booking within minutes.",
  },
  {
    question: "Do you provide hotel booking services?",
    answer:
      "Yes. We offer budget, deluxe and luxury hotel bookings across North and South Goa — all at rates negotiated directly with the properties, often cheaper than online portals.",
  },
  {
    question: "Do your packages include transportation?",
    answer:
      "Most of our packages include pickup and drop from your hotel. Full transportation details are listed on each package page, so you always know what's included before you book.",
  },
  {
    question: "Can I customize my Goa trip?",
    answer:
      "Absolutely. Tell us your budget, dates and interests, and we'll build a personalized itinerary — whether it's a family vacation, honeymoon, or group adventure.",
  },
  {
    question: "Do you offer airport transfers?",
    answer:
      "Yes, we provide airport pickup and drop services across Goa, 24/7. Your driver will be waiting at the arrivals gate with a name board — no haggling with taxis after a long flight.",
  },
  {
    question: "How can I contact Coastal Goa?",
    answer:
      "You can reach us anytime on WhatsApp, by phone, or through the contact form on this website. We typically respond within 15 minutes during working hours.",
  },
];

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div
    className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
      isOpen ? "border-teal-600 shadow-md" : "border-gray-200 shadow-sm"
    }`}
  >
    <button
      onClick={onClick}
      aria-expanded={isOpen}
      className="flex w-full items-center justify-between gap-4 p-5 text-left"
    >
      <span
        className={`font-semibold transition-colors duration-300 ${
          isOpen ? "text-teal-700" : "text-gray-900"
        }`}
      >
        {question}
      </span>

      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
          isOpen
            ? "rotate-180 bg-teal-700 text-white"
            : "bg-teal-50 text-teal-700"
        }`}
      >
        <FaChevronDown className="text-xs" />
      </span>
    </button>

    {/* Smooth height animation using CSS grid trick */}
    <div
      className="grid transition-[grid-template-rows] duration-300 ease-in-out"
      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden">
        <div className="border-t border-gray-100 bg-teal-50/40 px-5 py-4 text-sm leading-6 text-gray-600">
          {answer}
        </div>
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white px-3 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10">
          <span className="inline-block rounded-full bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-teal-700 sm:text-sm">
            FAQ
          </span>

          <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
            Frequently Asked Questions
          </h2>

          {/* ✅ FIXED: was "Everything you need to know about our  and services." */}
          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Everything you need to know about our packages and services.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3 sm:space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={activeIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* Contact nudge — converts FAQ readers into leads */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Still have questions?{" "}
          <a
            href="/contact"
            className="font-bold text-teal-700 underline-offset-2 hover:underline"
          >
            Chat with us on WhatsApp
          </a>{" "}
          — we reply within minutes.
        </p>
      </div>
    </section>
  );
};

export default FAQ;