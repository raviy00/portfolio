'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { APP_LOGO, APP_TITLE } from '@/const';
import LoadingPage from '@/components/LoadingPage';
import Enhanced3DBackground from '@/components/Enhanced3DBackground';
import Section3DTransition from '@/components/Section3DTransition';
import ContactForm from '@/components/ContactForm';
import SkillsSection from '@/components/SkillsSection';
import NewsletterSignup from '@/components/NewsletterSignup';
import CertificationsSection from '@/components/CertificationsSection';
import LinuxToolsSection from '@/components/LinuxToolsSection';
import BackToTop from '@/components/BackToTop';
import SocialLinks from '@/components/SocialLinks';
import { useTranslation, useLanguage } from '@/contexts/LanguageContext';
import LottiePlayer from '@/components/LottiePlayer';

const services = [
  {
    icon: '🤖',
    title: 'Telegram Bot Development',
    description: 'Creating intelligent Telegram bots with AI integration, advanced moderation, and automation features for various use cases.',
  },
  {
    icon: '🐍',
    title: 'Python Automation',
    description: 'Building powerful automation scripts and tools using Python for data processing, web scraping, and workflow optimization.',
  },
  {
    icon: '🔌',
    title: 'API Integration',
    description: 'Expert integration with various APIs including TMDB, YouTube, Weather APIs, and custom REST API development.',
  },
  {
    icon: '🔐',
    title: 'Security Research',
    description: 'Educational security tools and research projects for authorized testing and learning purposes only.',
  },
  {
    icon: '⚙️',
    title: 'Machine Learning',
    description: 'ML model development and deployment using FastAPI, Streamlit, and popular frameworks for intelligent applications.',
  },
  {
    icon: '📊',
    title: 'Data Analysis',
    description: 'Creating comprehensive dashboards and analytical tools for data visualization and business intelligence.',
  },
];

const inProgressProjects = [
  {
    icon: '🌱',
    title: 'Carbon Footprint Calculator',
    description: 'An innovative application to calculate and track carbon emissions. Helps users understand their environmental impact and provides actionable insights for reducing carbon footprint.',
    status: 'ACTIVE_DEV',
    tech: 'Python, API_Integration',
    statusColor: '#00ff00',
  },
  {
    icon: '📡',
    title: 'Bluetooth Mesh Network',
    description: 'Developing a robust Bluetooth mesh networking solution for IoT devices. Enables seamless device-to-device communication and creates scalable smart device networks.',
    status: 'ACTIVE_DEV',
    tech: 'Bluetooth_LE, Mesh_Protocol',
    statusColor: '#00aaff',
  },
];

const completedProjects = [
  {
    icon: '🤖',
    title: 'AI Group Manager Bot',
    description: 'A professional, AI-powered Telegram group management bot with advanced moderation features. MIT Licensed. Built with intelligent automation for group administration.',
    github_url: 'https://github.com/raviy00/Group-manager-bot',
  },
  {
    icon: '🎬',
    title: 'Movie & Series Recommendation Bot',
    description: 'A fully functional Telegram bot that recommends movies and TV series using the TMDB API. Features genre-based recommendations, search, trending content, and personal watchlist.',
    github_url: 'https://github.com/raviy00/Movie-Series-Recommendation-Telegram-Bot',
  },
  {
    icon: '📥',
    title: 'Link to File Telegram Bot',
    description: 'Feature-rich Telegram bot for downloading files from various sources with specialized YouTube support, audio extraction, and animated progress tracking. MIT Licensed.',
    github_url: 'https://github.com/raviy00/Link-to-file-Telegram-bot',
  },
  {
    icon: '🔐',
    title: 'Keylogger (Educational)',
    description: 'Cross-platform keylogging solution for educational and authorized security testing purposes only. Demonstrates security concepts for learning.',
    github_url: 'https://github.com/raviy00/Keylogger-free-version',
  },
  {
    icon: '🌦️',
    title: 'SOP Project',
    description: 'Travel advisory and Open Weather API integration project. Testing various API functionalities for real-world applications.',
    github_url: 'https://github.com/raviy00/SOP-project',
  },
  {
    icon: '🍷',
    title: 'Wine Quality Prediction',
    description: 'Machine learning application for predicting wine quality using data analysis and ML algorithms. Built with Jupyter Notebook.',
    github_url: 'https://github.com/raviy00/wine-quality-app',
  },
];

export default function Home() {
  const t = useTranslation();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Only track sections that have corresponding navbar items
      const navSectionIds = ['home', 'about', 'services', 'projects', 'contact'];
      let current = 'home';
      let lowestTop = Infinity;

      navSectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const sectionTop = section.getBoundingClientRect().top;
        
        // Find the section that has the lowest top value (closest to being at top)
        // but is still above or very close to 1/3 of viewport
        if (sectionTop < window.innerHeight / 3 + 100 && sectionTop < lowestTop) {
          lowestTop = sectionTop;
          current = sectionId;
        }
      });

      // Clear the timeout to avoid rapid updates
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setActiveSection(current);
      }, 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Setup IntersectionObserver for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe all scroll-animate elements
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      animateElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [isLoading]);

  if (isLoading) {
    return <LoadingPage onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Enhanced 3D Background */}
      <Enhanced3DBackground />

      {/* Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Hero Section */}
      <Section3DTransition sectionId="home">
      <section className="min-h-screen flex items-center pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 relative z-10 px-3 sm:px-4 md:px-6">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <div className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground">{t.helloIm}</div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest leading-tight">
              Ravishan <span className="text-accent"></span>
            </h1>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold uppercase tracking-wider">{t.softwareDeveloper}</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
              {t.bio}
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 pt-4">
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-primary text-xs sm:text-sm md:text-base w-full xs:w-auto"
              >
                {t.getStarted}
              </button>
              <button 
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-secondary text-xs sm:text-sm md:text-base w-full xs:w-auto"
              >
                {t.viewProjects}
              </button>
            </div>
          </div>
          <div className="flex justify-center order-first md:order-last mb-6 md:mb-0">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md overflow-hidden">
              <LottiePlayer src="/profile.json" loop autoplay speed={1} />
            </div>
          </div>
        </div>
      </section>
      </Section3DTransition>

      {/* About Section */}
      <Section3DTransition sectionId="about" delay={0.2}>
      <section className="py-12 sm:py-16 md:py-20 bg-card/50 relative z-10 px-3 sm:px-4 md:px-6">
        <div className="container">
          <h2 className="section-title mb-8 sm:mb-10 md:mb-12">{t.aboutMe}</h2>
          <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
            <div className="text-center space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                {t.aboutText1}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                {t.aboutText2}
              </p>
            </div>
            
            <div className="border-t border-dashed border-border pt-8 sm:pt-10 md:pt-12">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-widest mb-6 sm:mb-8 text-center">{t.languages}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                <div className="text-center p-3 sm:p-4 md:p-6 border-2 border-dashed border-border rounded">
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-accent mb-1 sm:mb-2">Sinhala</p>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{t.sinhala}</p>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-6 border-2 border-dashed border-border rounded">
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-accent mb-1 sm:mb-2">English</p>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{t.english}</p>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-6 border-2 border-dashed border-border rounded">
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-accent mb-1 sm:mb-2">German</p>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{t.german}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </Section3DTransition>

      {/* Services Section */}
      <Section3DTransition sectionId="services" delay={0.3}>
      <section className="py-12 sm:py-16 md:py-20 relative z-10 px-3 sm:px-4 md:px-6">
        <div className="container">
          <h2 className="section-title mb-6 sm:mb-8 md:mb-12">{t.services_title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              { icon: '🤖', title: t.telegramBot, description: t.telegramBotDesc },
              { icon: '🐍', title: t.pythonAutomation, description: t.pythonAutomationDesc },
              { icon: '🔌', title: t.apiIntegration, description: t.apiIntegrationDesc },
              { icon: '🔐', title: t.securityResearch, description: t.securityResearchDesc },
              { icon: '⚙️', title: t.machineLearning, description: t.machineLearningDesc },
              { icon: '📊', title: t.dataAnalysis, description: t.dataAnalysisDesc },
            ].map((service, idx) => (
              <div key={idx} className="card-dotted scroll-animate p-3 sm:p-4 md:p-6" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className="glyph-circle mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl">{service.icon}</div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider mb-3 sm:mb-4">{service.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Section3DTransition>

      {/* In-Progress Projects Section */}
      <Section3DTransition sectionId="in-progress" delay={0.4}>
      <section className="py-12 sm:py-16 md:py-20 bg-card/50 relative z-10 px-3 sm:px-4 md:px-6">
        <div className="container">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-widest text-center mb-6 sm:mb-8 md:mb-12">{t.inProgress}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {[
              { icon: '🌱', titleKey: 'carbonFootprintTitle', descKey: 'carbonFootprintDesc', status: 'ACTIVE_DEV', tech: 'Python, API_Integration', statusColor: '#00ff00' },
              { icon: '📡', titleKey: 'bluetoothMeshTitle', descKey: 'bluetoothMeshDesc', status: 'ACTIVE_DEV', tech: 'Bluetooth_LE, Mesh_Protocol', statusColor: '#00aaff' },
            ].map((project, idx) => (
              <div key={idx} className="relative border-2 border-solid border-accent bg-transparent p-3 sm:p-4 md:p-6 overflow-visible">
                <div className="absolute -top-3 sm:-top-4 -right-1 sm:-right-2 bg-accent text-accent-foreground px-2 sm:px-4 py-1 sm:py-2 text-xs font-bold uppercase tracking-wider">
                  {t.inProgress}
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 text-center">{project.icon}</div>
                <h4 className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider mb-2 sm:mb-4">{t[project.titleKey as keyof typeof t]}</h4>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">{t[project.descKey as keyof typeof t]}</p>
                <div
                  className="p-2 sm:p-3 border border-dashed text-xs font-mono text-center"
                  style={{
                    borderColor: project.statusColor,
                    color: project.statusColor,
                  }}
                >
                  <div><strong>STATUS:</strong> {project.status}</div>
                  <div className="mt-1"><strong>TECH:</strong> {project.tech}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Section3DTransition>

      {/* Completed Projects Section */}
      <Section3DTransition sectionId="projects" delay={0.5}>
      <section className="py-12 sm:py-16 md:py-20 relative z-10 px-3 sm:px-4 md:px-6">
        <div className="container">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-widest text-center mb-6 sm:mb-8 md:mb-12">{language === 'de' ? 'ABGESCHLOSSENE_PROJEKTE' : 'COMPLETED_PROJECTS'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              { icon: '🤖', titleKey: 'aiGroupBotTitle', descKey: 'aiGroupBotDesc', github_url: 'https://github.com/raviy00/Group-manager-bot' },
              { icon: '🎬', titleKey: 'movieBotTitle', descKey: 'movieBotDesc', github_url: 'https://github.com/raviy00/Movie-Series-Recommendation-Telegram-Bot' },
              { icon: '📥', titleKey: 'linkToBotTitle', descKey: 'linkToBotDesc', github_url: 'https://github.com/raviy00/Link-to-file-Telegram-bot' },
              { icon: '🔑', titleKey: 'keyloggerTitle', descKey: 'keyloggerDesc', github_url: 'https://github.com/raviy00/Keylogger-free-version' },
              { icon: '📋', titleKey: 'sopProjectTitle', descKey: 'sopProjectDesc', github_url: 'https://github.com/raviy00/SOP-project' },
              { icon: '🍇', titleKey: 'wineQualityTitle', descKey: 'wineQualityDesc', github_url: 'https://github.com/raviy00/wine-quality-app' },
            ].map((project, idx) => (
              <div key={idx} className="card-dotted flex flex-col scroll-animate p-3 sm:p-4 md:p-6" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-center">{project.icon}</div>
                <h4 className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider mb-2 sm:mb-4 flex-grow">{t[project.titleKey as keyof typeof t]}</h4>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-6 leading-relaxed">{t[project.descKey as keyof typeof t]}</p>
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block text-center text-xs sm:text-sm md:text-base py-2 sm:py-2.5"
                >
                  {t.viewOnGithub}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Section3DTransition>

      {/* Skills Section */}
      <Section3DTransition sectionId="skills" delay={0.57}>
      <SkillsSection />
      </Section3DTransition>

      {/* Certifications Section */}
      <Section3DTransition sectionId="certifications" delay={0.58}>
      <CertificationsSection />
      </Section3DTransition>

      {/* Linux Tools Section */}
      <Section3DTransition sectionId="tools" delay={0.585}>
      <LinuxToolsSection />
      </Section3DTransition>

      {/* Newsletter Section */}
      <Section3DTransition sectionId="newsletter" delay={0.59}>
      <NewsletterSignup />
      </Section3DTransition>

      {/* CV Download Section */}
      <Section3DTransition sectionId="cv" delay={0.595}>
      <section className="py-12 sm:py-16 md:py-20 relative z-10 px-3 sm:px-4 md:px-6">
        <div className="container max-w-2xl">
          <div className="text-center space-y-6 md:space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest mb-3 md:mb-4">Grab My CV</h2>
              <p className="text-base md:text-lg text-muted-foreground">Download my comprehensive resume and explore my full professional background, skills, and achievements.</p>
            </div>
            <button
              onClick={() => window.open('https://drive.google.com/uc?export=download&id=1Eexn1ZIqmpmraYXSHcYbKJAC47voOP0v', '_blank')}
              className="btn-primary inline-block text-center text-base md:text-lg py-3 md:py-4 px-8 md:px-12 hover:scale-105 transition-transform duration-300"
            >
              📥 Download CV
            </button>
          </div>
        </div>
      </section>
      </Section3DTransition>

      {/* Contact Section */}
      <Section3DTransition sectionId="contact" delay={0.6}>
      <section className="py-12 sm:py-16 md:py-20 bg-card/50 relative z-10 px-3 sm:px-4 md:px-6">
        <div className="container">
          <h2 className="section-title mb-6 sm:mb-8 md:mb-12">{t.getInTouch}</h2>
          <ContactForm />
        </div>
      </section>
      </Section3DTransition>

      {/* Footer */}
      <footer className="py-6 sm:py-8 md:py-10 bg-card border-t border-dashed border-border relative z-10 px-3 sm:px-4 md:px-6">
        <div className="container">
          {/* Social Links */}
          <div className="flex justify-center mb-6">
            <SocialLinks />
          </div>
          {/* Copyright */}
          <p className="break-words text-center text-xs sm:text-sm text-muted-foreground">&copy; 2025 Ravishan (raviy00). {t.allRightsReserved}. | {t.colombo}</p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
