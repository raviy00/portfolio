import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export default function SocialLinks() {
  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/raviy00',
      color: 'hover:text-blue-400',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/kasun-ravishan',
      color: 'hover:text-blue-500',
    },
    {
      icon: Mail,
      label: 'Email',
      url: 'mailto:ravishandisanayaka@gmail.com',
      color: 'hover:text-red-400',
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        const isEmail = social.label === 'Email';
        return (
          <a
            key={social.label}
            href={social.url}
            target={isEmail ? undefined : '_blank'}
            rel={isEmail ? undefined : 'noopener noreferrer'}
            title={social.label}
            className={`transition-colors duration-300 ${social.color} text-muted-foreground`}
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
}
