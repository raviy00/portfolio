import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslation } from '@/contexts/LanguageContext';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export default function TestimonialsSection() {
  const ref = useScrollAnimation();
  const t = useTranslation();

  const testimonials: Testimonial[] = [
    {
      name: 'Alex Chen',
      role: 'Project Manager',
      content: 'Ravi delivered an exceptional Telegram bot that streamlined our team communication. His attention to detail and quick turnaround were impressive.',
      avatar: 'AC',
    },
    {
      name: 'Sarah Johnson',
      role: 'Tech Lead',
      content: 'Working with Ravi on API integrations was seamless. His technical expertise and problem-solving skills are outstanding.',
      avatar: 'SJ',
    },
    {
      name: 'Marcus Williams',
      role: 'Startup Founder',
      content: 'Ravi built our automation system from scratch. The code quality and documentation were professional. Highly recommended!',
      avatar: 'MW',
    },
  ];

  return (
    <section ref={ref} className="py-16 md:py-20 relative z-10 px-4 md:px-6">
      <div className="container">
        <h2 className="section-title mb-8 md:mb-12">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="stagger-animate card-dotted flex flex-col"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-sm md:text-base">{testimonial.avatar}</div>
                <div>
                  <p className="text-base md:text-lg font-bold uppercase tracking-wider">
                    {testimonial.name}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-grow">
                "{testimonial.content}"
              </p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent text-lg">
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
