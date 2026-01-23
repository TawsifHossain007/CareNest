import React from 'react';

const faqData = [
  {
    question: "What kind of mental health support do you provide?",
    answer: "We provide counseling, therapy, and psychiatric consultations to support emotional and mental well-being for all age groups."
  },
  {
    question: "How can I book an appointment?",
    answer: "You can book an appointment directly through our website by selecting your preferred expert and time slot."
  },
  {
    question: "Are the sessions confidential?",
    answer: "Yes, all sessions are strictly confidential. Your privacy and trust are our top priorities."
  },
  {
    question: "Do you offer online consultations?",
    answer: "Absolutely! We provide secure online sessions for clients who prefer virtual support."
  },
  {
    question: "What should I expect during the first session?",
    answer: "During the first session, the expert will listen to your concerns, understand your situation, and discuss the best way forward."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 px-6 bg-base-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
          <p className="text-neutral leading-relaxed">
            Here are some common questions our clients ask about our services.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="collapse-title text-lg font-medium text-primary">
                {item.question}
              </div>
              <div className="collapse-content text-neutral">
                <p className="leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;