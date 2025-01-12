import { motion } from 'framer-motion';

interface InterestCardProps {
  interest: string;
  index: number;
}

export const InterestCard = ({ interest, index }: InterestCardProps) => {
  return (
    <motion.div
      className="p-4 bg-card rounded-lg"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {interest}
    </motion.div>
  );
};