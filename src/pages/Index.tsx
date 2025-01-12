import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { SkillsSection } from '../components/SkillsSection';
import { SocialSection } from '../components/SocialSection';
import { LanguageSelector, useTranslation } from '../components/LanguageSelector';
import { formatInTimeZone } from 'date-fns-tz';

const Index = () => {
  const [displayText, setDisplayText] = useState('');
  const [kievTime, setKievTime] = useState('');
  const t = useTranslation();

  useEffect(() => {
    const fullText = `> Hello, World!\n> Welcome to my hmmm....\n> Type 'help' for commands...`;
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    // Update Kiev time every second
    const timeInterval = setInterval(() => {
      const now = new Date();
      const formatted = formatInTimeZone(now, 'Europe/Kiev', 'dd.MM.yyyy HH:mm:ss');
      setKievTime(formatted);
    }, 1000);

    toast({
      title: "Site Under Development",
      description: "This site is currently in development. Some features may not be available yet.",
      duration: 30000,
      className: "absolute bottom-4 left-4",
    });

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 pt-24 relative backdrop-blur-sm">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold site-title">Baneronetwo</h1>
          <div className="text-right">
            <p className="text-sm font-mono">{kievTime}</p>
            <p className="text-xs text-muted-foreground">Kiev Time</p>
          </div>
        </div>

        <pre className="text-sm mb-12 font-fira-code animate-fade-in">
          {displayText}
        </pre>

        <SkillsSection />
        <SocialSection />

        <footer className="text-sm text-muted-foreground">
          <p className="rainbow-text">{t.author}</p>
        </footer>
      </div>

      <LanguageSelector />
    </div>
  );
};

export default Index;