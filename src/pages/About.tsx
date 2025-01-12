import { Shield, Globe, Users } from 'lucide-react';
import { useTranslation } from '../components/LanguageSelector';
import { AboutHeader } from '@/components/AboutHeader';
import { SkillCard } from '@/components/SkillCard';
import { InterestCard } from '@/components/InterestCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

const About = () => {
  const t = useTranslation();
  const [showHackingCat, setShowHackingCat] = useState(false);
  const [showApologyDialog, setShowApologyDialog] = useState(false);
  const navigate = useNavigate();

  const handleCatAnimation = () => {
    setShowHackingCat(true);
    setTimeout(() => {
      setShowHackingCat(false);
      navigate('/');
      setTimeout(() => {
        setShowApologyDialog(true);
      }, 500);
    }, 15000);
  };

  const skills = [
    {
      title: t.cybersecurity,
      icon: <Shield className="w-6 h-6" />,
      description: "Expert in cybersecurity, system protection, and program translation. Active moderator on Discord servers, Reddit forums, and YouTube channels.",
      percentage: 90,
      onClick: handleCatAnimation
    },
    {
      title: "Translation & Localization",
      icon: <Globe className="w-6 h-6" />,
      description: "Specialized in translating websites and programs into various languages, ensuring perfect localization and cultural adaptation.",
      percentage: 95
    },
    {
      title: "Community Management",
      icon: <Users className="w-6 h-6" />,
      description: "Experienced moderator across multiple Discord servers, Reddit communities, and YouTube channels. Expert in community engagement and management.",
      percentage: 92
    }
  ];

  const interests = [
    "Cybersecurity Research",
    "Network Protection",
    "System Hardening",
    "Security Auditing"
  ];

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="max-w-2xl mx-auto">
        <AboutHeader />
        
        <p className="mb-12 text-muted-foreground">
          Hello! I'm a passionate cybersecurity expert specializing in system protection and network security.
          I excel in translating websites and programs into different languages, ensuring perfect localization.
          As an active moderator, I manage multiple Discord servers, Reddit communities, and YouTube channels,
          fostering engaging and safe environments for users.
        </p>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t.skills}</h2>
          <div className="space-y-8">
            {skills.map((skill) => (
              <SkillCard key={skill.title} {...skill} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t.interests}</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {interests.map((interest, index) => (
              <InterestCard key={interest} interest={interest} index={index} />
            ))}
          </motion.div>
        </section>

        <AnimatePresence>
          {showHackingCat && (
            <motion.div
              initial={{ x: "-100%", y: "50%" }}
              animate={{ 
                x: ["100%", "-100%", "100%", "-100%", "100%"],
                y: "50%",
                rotate: [0, 360, 0, 360, 0]
              }}
              exit={{ x: "100%", y: "50%" }}
              transition={{ 
                duration: 15,
                times: [0, 0.25, 0.5, 0.75, 1],
                repeat: 0
              }}
              className="fixed left-0 top-0 z-50"
            >
              <div className="bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                <pre className="text-sm whitespace-pre">
{`
  /\\___/\\
 (  o o  )
 (  =^=  ) 
  (--m--)
`}
                </pre>
                <p className="mt-2 font-bold animate-pulse">
                  I hacked you!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Dialog open={showApologyDialog} onOpenChange={setShowApologyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>A Message from Baneronetwo</DialogTitle>
              <DialogDescription>
                I am Baneronetwo, sorry about the cat, my fault!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setShowApologyDialog(false)}>
                Forgive
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default About;
