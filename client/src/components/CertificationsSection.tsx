import { useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslation } from '@/contexts/LanguageContext';

interface Certification {
  id: string;
  titleKey: string;
  issuer: string;
  status: 'completed' | 'inProgress';
  driveLink?: string;
}

const certifications: Certification[] = [
  {
    id: 'intro-cyber',
    titleKey: 'introCybersecurity',
    issuer: 'ciscoNetworkingAcademy',
    status: 'completed',
    driveLink: 'https://drive.google.com/drive/folders/1IYNDNkhPl8e3T-41vkUi7wOJf_bfF7ZP?usp=drive_link',
  },
  {
    id: 'it-customer',
    titleKey: 'itCustomerSupport',
    issuer: 'ciscoNetworkingAcademy',
    status: 'completed',
  },
  {
    id: 'networking',
    titleKey: 'networkingBasics',
    issuer: 'ciscoNetworkingAcademy',
    status: 'inProgress',
  },
  {
    id: 'ethical-hacker',
    titleKey: 'ethicalHacker',
    issuer: 'ciscoNetworkingAcademy',
    status: 'inProgress',
  },
  {
    id: 'iot',
    titleKey: 'introIoT',
    issuer: 'ciscoNetworkingAcademy',
    status: 'inProgress',
  },
];

export default function CertificationsSection() {
  const ref = useScrollAnimation();
  const t = useTranslation();

  const completedCerts = certifications.filter((c) => c.status === 'completed');
  const inProgressCerts = certifications.filter((c) => c.status === 'inProgress');

  const CertificationCard = ({ cert }: { cert: Certification }) => (
    <div className="scroll-animate opacity-0 border-2 border-dashed border-accent/50 p-3 sm:p-4 hover:border-accent transition-colors duration-300">
      <div className="flex items-start gap-3 flex-col">
        <div className="flex items-start gap-3 w-full">
          <div className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center flex-shrink-0 text-base font-bold">
            🎓
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider mb-1">
              {t[cert.titleKey as keyof typeof t]}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t[cert.issuer as keyof typeof t]}
            </p>
          </div>
        </div>
        {cert.driveLink && (
          <button
            onClick={() => window.open(cert.driveLink, '_blank')}
            className="btn-primary w-full text-xs py-2"
          >
            View Certificates
          </button>
        )}
      </div>
    </div>
  );

  return (
    <section ref={ref} className="py-16 md:py-20 bg-card/50 relative z-10 px-4 md:px-6">
      <div className="container">
        <h2 className="section-title mb-8 md:mb-12">Certifications</h2>

        {/* Completed Certifications */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-accent mb-6">
            {t.completedCertifications}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {completedCerts.map((cert) => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>

        {/* In Progress Certifications */}
        <div>
          <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-accent mb-6">
            {t.inProgressCertifications}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {inProgressCerts.map((cert) => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
