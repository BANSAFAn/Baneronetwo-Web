
import { useState, useEffect } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

export const Clock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Europe/Kiev' };
      setTime(now.toLocaleTimeString('en-US', options));
      setDate(now.toLocaleDateString('en-US', { ...options, dateStyle: 'full' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-black/20 backdrop-blur-lg border border-white/10 hover:bg-black/30 transition-all duration-300"
      >
        <ClockIcon className="w-6 h-6 text-white/80" />
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 bg-black/80 backdrop-blur-lg rounded-lg border border-white/10 p-4 min-w-[200px]">
          <p className="text-white/80 font-mono text-lg">{time}</p>
          <p className="text-white/60 font-mono text-sm">{date}</p>
        </div>
      )}
    </div>
  );
};
