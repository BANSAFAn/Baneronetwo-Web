
import { MessageCircle, Github, Youtube, Twitter, GamepadIcon } from 'lucide-react';

const createParticles = (event: React.MouseEvent, color: string) => {
  const numParticles = 10;
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = `${event.clientX}px`;
  container.style.top = `${event.clientY}px`;
  container.style.pointerEvents = 'none';
  container.style.zIndex = '100';
  
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    
    const angle = (Math.random() * Math.PI * 2);
    const velocity = 2 + Math.random() * 3;
    const tx = Math.cos(angle) * 100;
    const ty = Math.sin(angle) * 100;
    
    particle.style.transform = 'translate(-50%, -50%)';
    particle.animate([
      { 
        transform: 'translate(-50%, -50%) scale(1)',
        opacity: 1 
      },
      { 
        transform: `translate(${tx}px, ${ty}px) scale(0)`,
        opacity: 0 
      }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    });
    
    container.appendChild(particle);
  }
  
  document.body.appendChild(container);
  setTimeout(() => container.remove(), 1000);
};

export const SocialLinks = () => {
  const socials = [
    { 
      icon: MessageCircle,
      color: '#5865F2',
      href: 'https://rebrand.ly/liveone',
      glowColor: 'rgba(88, 101, 242, 0.6)',
      animation: 'animate-bounce'
    },
    { 
      icon: Github,
      color: '#fff',
      href: 'https://github.com/BANSAFAn',
      glowColor: 'rgba(255, 255, 255, 0.6)',
      animation: 'animate-spin'
    },
    { 
      icon: Youtube,
      color: '#FF0000',
      href: 'https://www.youtube.com/@Baneronetwo',
      glowColor: 'rgba(255, 0, 0, 0.6)',
      animation: 'animate-pulse'
    },
    { 
      icon: Twitter,
      color: '#1DA1F2',
      href: 'https://x.com/BanLive1',
      glowColor: 'rgba(29, 161, 242, 0.6)',
      animation: 'animate-ping'
    },
    { 
      icon: GamepadIcon,
      color: '#00adee',
      href: 'https://steamcommunity.com/id/baneronetwo/',
      glowColor: 'rgba(0, 173, 238, 0.6)',
      animation: 'animate-bounce'
    },
    { 
      icon: MessageCircle,
      color: '#0088cc',
      href: 'https://t.me/banliveone',
      glowColor: 'rgba(0, 136, 204, 0.6)',
      animation: 'animate-pulse'
    },
  ];

  return (
    <div className="flex gap-6 justify-center mt-8">
      {socials.map((social, index) => {
        const Icon = social.icon;
        return (
          <a
            key={index}
            href={social.href}
            className="relative group"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              createParticles(e, social.color);
            }}
          >
            <div 
              className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                backgroundColor: social.glowColor,
                transform: 'scale(1.5)'
              }}
            />
            <Icon
              className={`w-8 h-8 relative transition-transform duration-300 hover:scale-110 group-hover:${social.animation}`}
              style={{ color: social.color }}
            />
          </a>
        );
      })}
    </div>
  );
};
