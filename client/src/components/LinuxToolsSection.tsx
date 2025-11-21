import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslation } from '@/contexts/LanguageContext';

interface LinuxTool {
  name: string;
  icon: string;
  description: string;
  useCases: string[];
}

const tools: LinuxTool[] = [
  {
    name: 'Nmap',
    icon: '🔍',
    description: 'Network mapper for discovering hosts and services on a computer network, creating a "map" of the network topology.',
    useCases: ['Port scanning', 'Service enumeration', 'Network discovery', 'Vulnerability assessment'],
  },
  {
    name: 'Metasploit',
    icon: '⚔️',
    description: 'Penetration testing framework with thousands of exploits, payloads, and evasion techniques for authorized security testing.',
    useCases: ['Exploit development', 'Vulnerability exploitation', 'Payload generation', 'Post-exploitation'],
  },
  {
    name: 'Wireshark',
    icon: '📡',
    description: 'Network protocol analyzer that captures and displays data flowing back and forth on a network in real time.',
    useCases: ['Packet analysis', 'Network troubleshooting', 'Protocol inspection', 'Traffic analysis'],
  },
  {
    name: 'Burp Suite',
    icon: '🧪',
    description: 'Web vulnerability scanner and proxy tool for testing web application security, identifying injection flaws and misconfigurations.',
    useCases: ['Web app testing', 'SQL injection testing', 'CSRF detection', 'API security testing'],
  },
  {
    name: 'John the Ripper',
    icon: '🔑',
    description: 'Password cracking tool that supports multiple hash types and can perform dictionary attacks and brute-force cracking.',
    useCases: ['Password cracking', 'Hash cracking', 'Dictionary attacks', 'Credential testing'],
  },
  {
    name: 'SQLMap',
    icon: '💾',
    description: 'Automated SQL injection detection and exploitation tool that can identify and exploit SQL injection vulnerabilities.',
    useCases: ['SQL injection testing', 'Database extraction', 'Vulnerability detection', 'Automated exploitation'],
  },
  {
    name: 'Aircrack-ng',
    icon: '📶',
    description: 'Wireless network security assessment suite for monitoring, attacking, and testing WiFi networks and security protocols.',
    useCases: ['WiFi monitoring', 'WEP/WPA cracking', 'Packet injection', 'Wireless assessment'],
  },
];

export default function LinuxToolsSection() {
  const ref = useScrollAnimation();
  const t = useTranslation();

  return (
    <section ref={ref} className="py-16 md:py-20 relative z-10 px-4 md:px-6">
      <div className="container">
        <h2 className="section-title mb-8 md:mb-12">Familiar Linux Tools</h2>
        <p className="text-center text-sm md:text-base text-muted-foreground mb-12 md:mb-16 max-w-3xl mx-auto">
          Expertise in industry-standard security and network tools for authorized penetration testing, network analysis, and security research.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="scroll-animate opacity-0 border-2 border-dashed border-accent/50 p-4 md:p-5 hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              {/* Tool Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl flex-shrink-0">{tool.icon}</div>
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider flex-grow">
                  {tool.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-muted-foreground mb-4 leading-relaxed">
                {tool.description}
              </p>

              {/* Use Cases */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">Use Cases:</p>
                <ul className="space-y-1">
                  {tool.useCases.map((useCase, cIdx) => (
                    <li key={cIdx} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-1 flex-shrink-0">▸</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
