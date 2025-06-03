
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const StreamlinedFAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "How quickly can I get my AI listing live?",
      answer: "Most listings are live within 24 hours. Just submit your property details, and our AI will be ready to chat with prospects immediately."
    },
    {
      question: "What happens when someone wants to schedule a viewing?",
      answer: "Our AI integrates with your calendar and can schedule appointments automatically. You'll get instant notifications and can approve or modify times as needed."
    },
    {
      question: "Can I use this for multiple properties?",
      answer: "Absolutely! Manage unlimited listings from one dashboard. Each property gets its own AI agent that knows all the specific details."
    },
    {
      question: "Is there really a money-back guarantee?",
      answer: "Yes! We offer a full 15-day money-back guarantee. If you're not seeing more leads within two weeks, we'll refund every penny."
    },
    {
      question: "How does the AI know about my property?",
      answer: "When you submit your listing, our AI analyzes all your property details, photos, and description to become an expert on your specific property."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Quick Answers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know to get started with your AI-powered listing.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openFAQ === index ? (
                  <ChevronUp className="text-orange-500 flex-shrink-0" size={24} />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="bg-white p-6 -mt-1 rounded-b-xl border-l border-r border-b border-gray-100">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
