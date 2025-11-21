import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import Navbar from '@/components/Navbar';
import Enhanced3DBackground from '@/components/Enhanced3DBackground';
import Section3DTransition from '@/components/Section3DTransition';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  date: string;
  link?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'child-safety-prevention',
    title: 'Child Safety Prevention System',
    category: 'Security Research',
    description: 'Currently developing an intelligent system to prevent child abuse content on social media platforms through automated detection and reporting mechanisms.',
    challenge: 'Creating an effective detection system that can identify harmful content while minimizing false positives, respecting privacy, and working across different social media platforms.',
    solution: 'Building an AI-powered content analysis system using computer vision and NLP, integrating with social media APIs for real-time monitoring, implementing secure reporting mechanisms, and collaborating with child safety organizations.',
    results: [
      'System designed to detect harmful content with 95%+ accuracy',
      'Automated reporting workflow to relevant authorities',
      'Privacy-preserving analysis techniques implemented',
      'Educational resources for parents and educators in development'
    ],
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'NLP', 'FastAPI', 'PostgreSQL'],
    date: '2024-2025 (In Progress)'
  },
  {
    id: 'vanishing-tuskers-report',
    title: 'Detailed Report: Vanishing Sri Lankan Tuskers',
    category: 'Data Analysis',
    description: 'Comprehensive research report documenting the decline of tusked elephants in Sri Lanka, analyzing conservation data, and proposing actionable solutions.',
    challenge: 'Collecting and analyzing scattered data about elephant populations, identifying trends, and presenting findings in an accessible format for stakeholders.',
    solution: 'Conducted extensive research, compiled historical data, created visualizations of population trends, interviewed conservation experts, and published detailed findings on Medium.',
    results: [
      'Published comprehensive report with statistical analysis',
      'Identified key factors contributing to tusker decline',
      'Provided evidence-based conservation recommendations'
    ],
    technologies: ['Python', 'Pandas', 'Matplotlib', 'Research Methodology', 'Data Visualization'],
    date: '2024',
    link: 'https://medium.com/@npkpathirage'
  }
];


export default function CaseStudies() {
  const [, setLocation] = useLocation();
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Enhanced3DBackground />

      {/* Navigation */}
      <Navbar activeSection="case-studies" />

      {/* Header - shown when a case study is selected */}
      {selectedStudy && (
      <div className="fixed top-0 w-full bg-background/95 backdrop-blur border-b border-dashed border-border z-40 py-6 mt-16">
        <div className="container flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedStudy(null)}
            className="border border-dashed border-border"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold uppercase tracking-widest">Back to Case Studies</h1>
        </div>
      </div>
      )}

      {/* Case Study Detail */}
      {selectedStudy && (
      <div className="pt-48 pb-20 relative z-10">
        <div className="container max-w-4xl">
          <Section3DTransition sectionId="case-study-detail">
            <div className="space-y-12">
              {/* Header */}
              <div className="space-y-4">
                <div className="text-sm uppercase tracking-widest text-accent">{selectedStudy.category}</div>
                <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-widest">{selectedStudy.title}</h1>
                <p className="text-lg text-muted-foreground">{selectedStudy.date}</p>
              </div>

              {/* Overview */}
              <div className="space-y-6 border-t border-dashed border-border pt-8">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Overview</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">{selectedStudy.description}</p>
                </div>
              </div>

              {/* Challenge */}
              <div className="space-y-6 border-t border-dashed border-border pt-8">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Challenge</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">{selectedStudy.challenge}</p>
                </div>
              </div>

              {/* Solution */}
              <div className="space-y-6 border-t border-dashed border-border pt-8">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Solution</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">{selectedStudy.solution}</p>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6 border-t border-dashed border-border pt-8">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Results</h2>
                  <ul className="space-y-3">
                    {selectedStudy.results.map((result, idx) => (
                      <li key={idx} className="flex gap-4 text-lg text-muted-foreground">
                        <span className="text-accent font-bold">✓</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-6 border-t border-dashed border-border pt-8">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Technologies</h2>
                  <div className="flex flex-wrap gap-3">
                    {selectedStudy.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 border-2 border-dashed border-accent text-accent text-sm uppercase tracking-widest"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="border-t border-dashed border-border pt-8 flex gap-4">
                {selectedStudy.link && (
                  <Button
                    onClick={() => window.open(selectedStudy.link, '_blank')}
                    className="uppercase tracking-widest bg-accent hover:bg-accent/90"
                  >
                    View Full Report
                  </Button>
                )}
                <Button
                  onClick={() => setSelectedStudy(null)}
                  className="uppercase tracking-widest"
                >
                  Back to All Case Studies
                </Button>
              </div>
            </div>
          </Section3DTransition>
        </div>
      </div>
      )}

      {/* List View - shown when no case study is selected */}
      {!selectedStudy && (
      <div className="pt-20 pb-12 relative z-10">
        <div className="container">
          <Section3DTransition sectionId="case-studies">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest">Case Studies</h2>
                <p className="text-base text-muted-foreground max-w-2xl">
                  Explore detailed case studies of my most impactful projects, showcasing challenges solved, solutions implemented, and results achieved.
                </p>
              </div>

              <div className="flex flex-col gap-2 max-w-md pt-4">
                {caseStudies.map((study) => (
                  <Button
                    key={study.id}
                    onClick={() => setSelectedStudy(study)}
                    variant="outline"
                    className="justify-start text-left h-auto py-2 px-4 uppercase tracking-widest hover:bg-accent hover:text-background transition-all duration-300 text-sm"
                  >
                    {study.title}
                  </Button>
                ))}
              </div>
            </div>
          </Section3DTransition>
        </div>
      </div>
      )}
    </div>
  );
}
