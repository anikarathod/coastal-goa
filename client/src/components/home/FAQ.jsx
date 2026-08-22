import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "How can I book a tour package?",
    answer:
      "You can book directly through our website by selecting your preferred package and filling out the booking form. You can also contact us via WhatsApp.",
  },
  {
    question: "Do you provide hotel booking services?",
    answer:
      "Yes. We offer hotel bookings ranging from budget stays to luxury resorts across Goa.",
  },
  {
    question: "Can I customize my tour package?",
    answer:
      "Absolutely! We can customize your itinerary, hotels, transport, and activities according to your preferences.",
  },
  {
    question: "Do you offer airport pickup and drop?",
    answer:
      "Yes, airport transfers are available for individuals, families, and groups.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, Debit Cards, Credit Cards, Net Banking, and Cash (for selected bookings).",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellation charges depend on the package and the cancellation date. Please contact us for detailed information.",
  },
];

const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}) => (
  <div className="overflow-hidden rounded-xl border bg-white">
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between p-4 md:p-5 text-left"
    >
      <span className="text-base md:text-lg font-semibold text-gray-800">
        {question}
      </span>

      {isOpen ? (
        <FaChevronUp className="text-cyan-600 flex-shrink-0" />
      ) : (
        <FaChevronDown className="text-cyan-600 flex-shrink-0" />
      )}
    </button>

    {isOpen && (
      <div className="border-t bg-gray-50 px-4 py-3 md:px-5 md:py-4 text-sm md:text-base text-gray-600">
        {answer}
      </div>
    )}
  </div>
);

const FAQ = () => {
  const [activeIndex, setActiveIndex] =
    useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(
      activeIndex === index ? null : index
    );
  };

  return (
    <section className="bg-gray-50 py-10 md:py-16">
      <div className="mx-auto max-w-4xl px-4 md:px-6">

        <div className="mb-6 md:mb-10 text-center">

          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-sm md:text-base text-gray-600">
            Find answers to the most common questions
            about our Goa tour packages and services.
          </p>

        </div>

        <div className="space-y-3 md:space-y-4">

          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={activeIndex === index}
              onClick={() =>
                toggleFAQ(index)
              }
            />
          ))}

        </div>

      </div>
    </section>
  );
};

export default FAQ;