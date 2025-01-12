import { useState } from 'react';
import { SkillBar } from './SkillBar';
import { Dialog, DialogContent } from './ui/dialog';
import { TetrisGame } from './TetrisGame';

const skills = [
  { name: 'Rust', percentage: 67, logo: '/logos/rust.svg' },
  { name: 'C Holy', percentage: 80, logo: '/logos/c.svg' },
  { name: 'C', percentage: 60, logo: '/logos/c.svg' },
  { name: 'TypeScript', percentage: 84, logo: '/logos/typescript.svg' },
  { name: 'Vue', percentage: 90, logo: '/logos/vue.svg' },
  { name: 'Swift', percentage: 57, logo: '/logos/swift.svg' },
];

export const SkillsSection = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showTetris, setShowTetris] = useState(false);

  const handleTitleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 19) {
      setShowTetris(true);
      setClickCount(0);
    }
  };

  return (
    <section className="mb-16 animate-fade-in">
      <h2 
        className="text-xl font-bold mb-6 cursor-pointer"
        onClick={handleTitleClick}
      >
        Skills
      </h2>
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.name} className="hover:glow transition-all duration-300">
            <SkillBar {...skill} />
          </div>
        ))}
      </div>

      <Dialog open={showTetris} onOpenChange={setShowTetris}>
        <DialogContent className="sm:max-w-[425px]">
          <TetrisGame />
        </DialogContent>
      </Dialog>
    </section>
  );
};