import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ui/use-toast';

interface SkillCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  percentage: number;
  onClick?: () => void;
}

export const SkillCard = ({ title, icon, description, percentage, onClick }: SkillCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClick = () => {
    if (title === "Cybersecurity") {
      onClick?.();
    } else if (title === "Community Management") {
      const kittyDialog = document.createElement('div');
      kittyDialog.innerHTML = `
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div class="bg-card p-6 rounded-lg shadow-xl max-w-md w-full">
            <div class="flex items-center gap-4 mb-4">
              <pre class="text-primary">
                /\\___/\\
               (  o o  )
               (  =^=  ) 
                (--m--)
              </pre>
              <p class="text-lg">Oh you want to bring tea, maybe coffee?</p>
            </div>
            <button class="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors w-full">
              Take a cup
            </button>
          </div>
        </div>
      `;
      
      document.body.appendChild(kittyDialog);
      
      const button = kittyDialog.querySelector('button');
      if (button) {
        button.onclick = () => {
          kittyDialog.remove();
          navigate('/');
        };
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
      onClick={handleClick}
    >
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="w-full bg-secondary rounded-full h-2">
        <div
          className="bg-primary rounded-full h-2 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </motion.div>
  );
};