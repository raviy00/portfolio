import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Skill {
  name: string;
  proficiency: number;
  category: string;
  icon: string;
}

export default function SkillsSection() {
  const ref = useScrollAnimation();

  const skills: Skill[] = [
    // Programming Languages
    { name: 'Python', proficiency: 95, category: 'Languages', icon: '🐍' },
    { name: 'JavaScript', proficiency: 85, category: 'Languages', icon: '⚡' },
    { name: 'TypeScript', proficiency: 80, category: 'Languages', icon: '📘' },
    { name: 'SQL', proficiency: 85, category: 'Languages', icon: '🗄️' },
    { name: 'Bash', proficiency: 80, category: 'Languages', icon: '💻' },
    // Frameworks & Libraries
    { name: 'React', proficiency: 85, category: 'Frameworks', icon: '⚛️' },
    { name: 'FastAPI', proficiency: 90, category: 'Frameworks', icon: '🚀' },
    { name: 'Flask', proficiency: 85, category: 'Frameworks', icon: '🍶' },
    { name: 'Telegram Bot API', proficiency: 95, category: 'Frameworks', icon: '🤖' },
    { name: 'REST APIs', proficiency: 90, category: 'Frameworks', icon: '🔌' },
    // Tools & Technologies
    { name: 'Git', proficiency: 90, category: 'Tools', icon: '🔀' },
    { name: 'Docker', proficiency: 80, category: 'Tools', icon: '🐳' },
    { name: 'Linux', proficiency: 90, category: 'Tools', icon: '🐧' },
    { name: 'Security Testing', proficiency: 85, category: 'Tools', icon: '🔐' },
    { name: 'Database Design', proficiency: 85, category: 'Tools', icon: '📊' },
  ];

  const categories = ['Languages', 'Frameworks', 'Tools'];

  return (
    <section ref={ref} className="py-16 md:py-20 bg-card/50 relative z-10 px-4 md:px-6">
      <div className="container">
        <h2 className="section-title mb-8 md:mb-12">Skills & Technologies</h2>
        
        {categories.map((category) => (
          <div key={category} className="mb-12 md:mb-16">
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-6 md:mb-8 text-accent">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill, idx) => (
                  <div
                    key={idx}
                    className="scroll-animate card-dotted"
                    style={{ transitionDelay: `${idx * 0.05}s` }}
                  >
                    <div className="flex justify-between items-start mb-3 gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{skill.icon}</span>
                          <p className="text-base md:text-lg font-bold uppercase tracking-wider">
                            {skill.name}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm md:text-base font-semibold text-accent flex-shrink-0">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="w-full bg-background border border-dashed border-border rounded h-2">
                      <div
                        className="bg-accent h-full rounded transition-all duration-500"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
