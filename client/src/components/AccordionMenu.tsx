import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';

interface MenuItem {
  label: string;
  href: string;
  subsections?: {
    label: string;
    href: string;
  }[];
}

const menuItems: MenuItem[] = [
  { label: 'Home', href: '#home' },
  {
    label: 'About',
    href: '#about',
    subsections: [
      { label: 'Background', href: '#about-background' },
      { label: 'Skills', href: '#about-skills' },
    ],
  },
  {
    label: 'Services',
    href: '#services',
    subsections: [
      { label: 'Development', href: '#services-dev' },
      { label: 'Security', href: '#services-security' },
      { label: 'AI/ML', href: '#services-ai' },
    ],
  },
  {
    label: 'Projects',
    href: '#projects',
    subsections: [
      { label: 'In Progress', href: '#projects-progress' },
      { label: 'Completed', href: '#projects-completed' },
    ],
  },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
];

interface AccordionMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccordionMenu({ isOpen, onClose }: AccordionMenuProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const handleNavClick = (href: string) => {
    // Handle page routes (starting with /)
    if (href.startsWith('/')) {
      window.location.href = href;
      onClose();
      return;
    }

    // Handle anchor links (starting with #)
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Accordion Menu */}
      <div
        className={`fixed left-0 top-0 h-screen w-80 bg-card border-r border-dashed border-border z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-8">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 text-foreground">
            Menu
          </h2>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.label} className="border-b border-dashed border-border">
                <button
                  onClick={() => {
                    if (item.subsections) {
                      toggleItem(item.label);
                    } else {
                      handleNavClick(item.href);
                    }
                  }}
                  className="w-full flex items-center justify-between py-4 px-4 hover:bg-accent hover:bg-opacity-10 transition-colors group"
                >
                  <span className="text-lg font-semibold uppercase tracking-wider text-foreground group-hover:text-accent transition-colors">
                    {item.label}
                  </span>
                  {item.subsections && (
                    <ChevronDown
                      size={20}
                      className={`text-accent transition-transform duration-300 ${
                        expandedItems.includes(item.label) ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Subsections */}
                {item.subsections && expandedItems.includes(item.label) && (
                  <div className="bg-background/50 border-t border-dashed border-border">
                    {item.subsections.map((subsection) => (
                      <button
                        key={subsection.label}
                        onClick={() => handleNavClick(subsection.href)}
                        className="w-full text-left py-3 px-8 text-sm uppercase tracking-wider text-muted-foreground hover:text-accent hover:bg-accent hover:bg-opacity-5 transition-colors"
                      >
                        {subsection.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-dashed border-border">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Get in Touch
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📧 ravi@example.com</p>
              <p>🔗 github.com/Raviraviy00</p>
              <p>📍 Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
