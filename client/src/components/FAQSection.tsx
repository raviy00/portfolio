import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What services do you offer?',
    answer: 'I offer comprehensive services including Telegram bot development, Python automation, API integration, machine learning solutions, security research tools, and data analysis projects. Each project is customized to meet your specific needs.',
  },
  {
    question: 'How long do projects typically take?',
    answer: 'Project timelines vary based on complexity and requirements. Simple bots can be completed in 1-2 weeks, while complex applications may take 4-8 weeks. I provide detailed timelines after understanding your specific requirements.',
  },
  {
    question: 'Do you provide support after project completion?',
    answer: 'Yes, I provide comprehensive post-launch support including bug fixes, updates, and feature additions. Support packages are customizable based on your needs.',
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'I specialize in Python, Telegram Bot API, FastAPI, Streamlit, machine learning frameworks, and various security testing tools. I stay updated with latest technologies and best practices.',
  },
  {
    question: 'Can you help with security testing?',
    answer: 'Yes, I can assist with authorized security testing, vulnerability assessments, and educational security research. All work is done with proper authorization and follows ethical guidelines.',
  },
  {
    question: 'How do I get started with a project?',
    answer: 'Simply fill out the "Get In Touch" form or reach me via email. I\'ll schedule a consultation to understand your requirements, provide a quote, and create a detailed project plan.',
  },
];

export default function FAQSection() {
  const ref = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-16 md:py-20 relative z-10 px-4 md:px-6">
      <div className="container">
        <h2 className="section-title mb-8 md:mb-12">Frequently Asked Questions</h2>
        <p className="text-center text-sm md:text-base text-muted-foreground mb-12 md:mb-16 max-w-3xl mx-auto">
          Find answers to common questions about my services, technologies, and project workflow.
        </p>

        <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="scroll-animate opacity-0 border-2 border-dashed border-accent/50 rounded-lg overflow-hidden hover:border-accent transition-colors duration-300"
              style={{ transitionDelay: `${idx * 0.05}s` }}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-accent/5 transition-colors duration-300 text-left"
                aria-expanded={openIndex === idx}
                aria-controls={`faq-content-${idx}`}
              >
                <h3 className="font-bold uppercase tracking-wider text-sm md:text-base flex-grow">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 ml-4 text-accent transition-transform duration-300 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === idx && (
                <div
                  id={`faq-content-${idx}`}
                  className="px-4 md:px-5 pb-4 md:pb-5 border-t-2 border-dashed border-accent/30"
                >
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
