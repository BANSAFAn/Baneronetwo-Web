import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useToast } from "@/components/ui/use-toast";

type Language = 'en' | 'ru' | 'uk';

interface Translations {
  [key: string]: {
    skills: string;
    connect: string;
    latestPosts: string;
    author: string;
    about: string;
    interests: string;
    cybersecurity: string;
    networkSecurity: string;
    penetrationTesting: string;
  };
}

const translations: Translations = {
  en: {
    skills: 'Skills',
    connect: 'Connect',
    latestPosts: 'Latest Posts',
    author: 'Author of Baneronetwo, i use Black Man btw',
    about: 'About',
    interests: 'Interests',
    cybersecurity: 'Cybersecurity',
    networkSecurity: 'Network Security',
    penetrationTesting: 'Penetration Testing'
  },
  ru: {
    skills: 'Навыки',
    connect: 'Связаться',
    latestPosts: 'Последние посты',
    author: 'Автор Baneronetwo, кстати, я использую Black Man',
    about: 'Обо мне',
    interests: 'Интересы',
    cybersecurity: 'Кибербезопасность',
    networkSecurity: 'Сетевая безопасность',
    penetrationTesting: 'Тестирование на проникновение'
  },
  uk: {
    skills: 'Навички',
    connect: "Зв'язатися",
    latestPosts: 'Останні пости',
    author: 'Автор Baneronetwo, до речі, я використовую Black Man',
    about: 'Про мене',
    interests: 'Інтереси',
    cybersecurity: 'Кібербезпека',
    networkSecurity: 'Мережева безпека',
    penetrationTesting: 'Тестування на проникнення'
  },
};

export const LanguageSelector = () => {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const { toast } = useToast();

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
    toast({
      title: "Language Changed",
      description: `The site language has been changed to ${lang.toUpperCase()}`,
      duration: 3000,
    });
  };

  return (
    <div className="fixed bottom-4 right-4 flex gap-2">
      <Button
        variant={currentLang === 'en' ? 'default' : 'outline'}
        onClick={() => handleLanguageChange('en')}
        className="w-10 h-10 p-0"
      >
        🇬🇧
      </Button>
      <Button
        variant={currentLang === 'ru' ? 'default' : 'outline'}
        onClick={() => handleLanguageChange('ru')}
        className="w-10 h-10 p-0"
      >
        🇷🇺
      </Button>
      <Button
        variant={currentLang === 'uk' ? 'default' : 'outline'}
        onClick={() => handleLanguageChange('uk')}
        className="w-10 h-10 p-0"
      >
        🇺🇦
      </Button>
    </div>
  );
};

export const useTranslation = () => {
  const [currentLang, setCurrentLang] = useState<Language>('en');

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail.language);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  return translations[currentLang];
};