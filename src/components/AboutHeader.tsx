import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from '../components/LanguageSelector';

export const AboutHeader = () => {
  const [showCat, setShowCat] = useState(false);
  const { toast } = useToast();
  const t = useTranslation();

  const handleTitleClick = () => {
    setShowCat(!showCat);
    toast({
      title: "Meow!",
      description: "You found the secret cat!",
    });
  };

  return (
    <>
      <h1 
        className="text-4xl font-bold mb-8 cursor-pointer hover:text-primary transition-colors"
        onClick={handleTitleClick}
      >
        {t.about}
      </h1>
      
      <AnimatePresence>
        {showCat && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mb-8"
          >
            <pre className="ascii-art text-primary">
{`
  /\\___/\\
 (  o o  )
 (  =^=  ) 
  (--m--)
`}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};