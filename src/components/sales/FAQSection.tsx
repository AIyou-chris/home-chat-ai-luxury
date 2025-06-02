
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI-powered chat work on my listings?",
      answer: "Our AI learns everything about your property from the listing details, photos, and neighborhood information you provide. When potential buyers visit your listing, they can chat with the AI assistant 24/7. The AI answers questions about the property, neighborhood, schools, and can even schedule appointments directly with you. All conversations are logged and leads are captured automatically."
    },
    {
      question: "What makes the Professional plan worth the extra $20/month?",
      answer: "The Professional plan ($69/month) includes powerful SMS features that the Starter plan doesn't have. You get real-time two-way SMS notifications whenever someone scans your QR code, submits a lead, or books an appointment. You can customize notification rules, set quiet hours, and even respond to leads via SMS. This instant communication capability typically increases lead conversion by 300%."
    },
    {
      question: "How quickly can I set up my AI-powered listing?",
      answer: "Most agents complete their setup in under 5 minutes. Simply provide your listing URL, upload a few photos, add your contact details, and our system automatically creates your AI assistant. The AI is immediately ready to start conversations and capture leads. No technical knowledge required - everything is handled automatically."
    },
    {
      question: "Do I need any technical skills to use this platform?",
      answer: "Absolutely not! Our platform is designed for busy real estate agents. Everything is point-and-click simple. Upload your listing details, customize your preferences, and you're done. The AI handles all the technical work - answering questions, qualifying leads, scheduling appointments, and sending you notifications. You just focus on closing deals."
    },
    {
      question: "What happens to leads when I'm not available?",
      answer: "This is where our AI truly shines. Your AI assistant works 24/7, even when you're sleeping, showing properties, or on vacation. It captures lead information, qualifies prospects, answers their questions, and can even schedule appointments in your calendar. With SMS notifications (Professional plan), you'll know immediately when hot leads come in, but the AI keeps engaging them until you're available."
    },
    {
      question: "Can I cancel anytime? What's your refund policy?",
      answer: "Yes, you can cancel anytime with no penalties or contracts. We offer a 15-day money-back guarantee on all plans. If you're not completely satisfied with the results, contact us within 15 days for a full refund. We use secure PayPal billing, so you can manage your subscription easily and safely."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
            Everything you need to know about getting started with AI-powered real estate listings.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="text-orange-500 flex-shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                  )}
                </button>
                
                {openFAQ === index && (
                  <div className="px-6 pb-5">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a 
            href="mailto:support@homelistingai.com" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
};
