import { MessageSquare, Github, Youtube, MessageCircle, Gamepad } from 'lucide-react';
import XIcon from './icons/XIcon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

const socialLinks = [
  { 
    name: 'Discord', 
    icon: MessageSquare, 
    url: 'https://discord.gg/FEyMjn3mtA', 
    hoverColor: 'hover:text-[#5865F2]',
    tooltip: 'Meow'
  },
  { 
    name: 'Github', 
    icon: Github, 
    url: 'https://github.com/BANSAFAn', 
    hoverColor: 'hover:text-[#171515]' 
  },
  { 
    name: 'X', 
    icon: XIcon, 
    url: 'https://x.com/BanLive1', 
    hoverColor: 'hover:text-[#1DA1F2]' 
  },
  { 
    name: 'YouTube', 
    icon: Youtube, 
    url: 'https://www.youtube.com/@Baneronetwo', 
    hoverColor: 'hover:text-[#FF0000]' 
  },
  { 
    name: 'Telegram', 
    icon: MessageCircle, 
    url: 'https://t.me/banliveone', 
    hoverColor: 'hover:text-[#0088cc]' 
  },
  { 
    name: 'Steam', 
    icon: Gamepad, 
    url: 'https://steamcommunity.com/id/baneronetwo/', 
    hoverColor: 'hover:text-[#171515]' 
  }
];

export const SocialSection = () => {
  const handleYoutubeClick = () => {
    toast({
      title: "Thank you!",
      description: "Thank you for subscribing to me!",
      duration: 3000,
    });
  };

  return (
    <section className="mb-16 animate-fade-in">
      <h2 className="text-xl font-bold mb-6">Connect</h2>
      <div className="grid grid-cols-2 gap-4">
        {socialLinks.map(({ name, icon: Icon, url, hoverColor, tooltip }) => (
          <TooltipProvider key={name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={name === 'YouTube' ? handleYoutubeClick : undefined}
                  className={`flex items-center gap-2 p-4 bg-card rounded-lg transition-all duration-300 transform hover:scale-105 ${hoverColor}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{name}</span>
                </a>
              </TooltipTrigger>
              {tooltip && (
                <TooltipContent>
                  <p>{tooltip}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </section>
  );
};