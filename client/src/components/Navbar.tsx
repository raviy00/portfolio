import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'wouter';
import { APP_LOGO } from '@/const';
import AccordionMenu from '@/components/AccordionMenu';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import { useTranslation } from '@/contexts/LanguageContext';

interface NavbarProps {
  activeSection?: string;
  onNavClick?: (href: string) => void;
}

export default function Navbar({ activeSection = 'home', onNavClick }: NavbarProps) {
  const t = useTranslation();
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [debugActive, setDebugActive] = useState(activeSection);

  useEffect(() => {
    setDebugActive(activeSection);
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const currentPath = window.location.pathname;

    // Handle page routes (starting with /)
    if (href.startsWith('/')) {
      window.location.href = href;
      onNavClick?.(href);
      return;
    }

    // Handle anchor links (starting with #)
    // If not on home page, navigate to home first
    if (currentPath !== '/' && currentPath !== '') {
      // Store the anchor in session storage to scroll after navigation
      sessionStorage.setItem('scrollTarget', href);
      window.location.href = '/';
    } else {
      // Already on home page, just scroll
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        onNavClick?.(href.slice(1));
      }
    }
  };

  const navItems = [
    { label: t.home, href: '#home', id: 'home' },
    { label: t.about, href: '#about', id: 'about' },
    { label: t.services, href: '#services', id: 'services' },
    { label: t.projects, href: '#projects', id: 'projects' },
    { label: t.caseStudies, href: '/case-studies', id: 'case-studies' },
    { label: 'Blog', href: '/blog', id: 'blog' },
    { label: t.contact, href: '#contact', id: 'contact' },
  ];

  // Determine active nav item based on current page and scroll position
  const isActivePage = (id: string) => {
    const currentPath = window.location.pathname;
    
    if (id === 'case-studies') {
      return currentPath === '/case-studies';
    }
    if (id === 'blog') {
      return currentPath === '/blog';
    }
    // For home page sections, use activeSection prop
    return currentPath === '/' && debugActive === id;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dashed border-border bg-background/95 backdrop-blur-sm">
        <div className="container flex justify-between items-center py-3 sm:py-4 px-3 sm:px-4 md:px-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 border-2 border-dashed border-accent rounded-full flex items-center justify-center text-sm sm:text-lg animate-rotate">
              R
            </div>
            <span className="text-sm sm:text-lg md:text-xl font-bold uppercase tracking-wider">Ravishan</span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-4 lg:gap-8 items-center">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`nav-link ${isActivePage(item.id) ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageSelector />
            </li>
          </ul>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <LanguageSelector />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:text-accent transition-colors"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Accordion Menu */}
      <AccordionMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
