import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "How do I book a Goa tour package?",
    answer:
      "Simply select your preferred package and contact us through WhatsApp or our booking form.",
  },
  {
    question: "Do you provide hotel booking services?",
    answer:
      "Yes, we offer budget, deluxe and luxury hotel bookings across Goa.",
  },
  {
    question: "Do your packages include transportation?",
    answer:
      "Most packages include pickup and drop services. Details are mentioned in each package.",
  },
  {
    question: "Can I customize my Goa trip?",
    answer:
      "Yes. We can create personalized itineraries based on your budget and requirements.",
  },
  {
    question: "Do you offer airport transfers?",
    answer:
      "Yes, airport pickup and drop services are available throughout Goa.",
  },
  {
    question: "How can I contact Coastal Goa?",
    answer:
      "You can reach us directly through WhatsApp, phone call, or the contact form on our website.",
  },
];

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between p-5 text-left"
    >
      <span className="font-semibold text-gray-900">
        {question}
      </span>

      {isOpen ? (
        <FaChevronUp className="text-cyan-600" />
      ) : (
        <FaChevronDown className="text-cyan-600" />
      )}
    </button>

    {isOpen && (
      <div className="border-t bg-gray-50 px-5 py-4 text-gray-600">
        {answer}
      </div>
    )}
  </div>
);

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-4">

        <div className="mb-10 text-center">
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            FAQ
          </span>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-gray-600">
            Everything you need to know about our Goa tours and services.
          </p>
        </div>

        <div className="space-y-4">
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

      </div>
    </section>
  );
};

export default FAQ;