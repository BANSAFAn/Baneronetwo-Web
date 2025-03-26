
import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CommandLine = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [command, setCommand] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'cat' | 'neon' | 'ascii' | 'help' | null }>({ text: '', type: null });
  const [isCatGameActive, setIsCatGameActive] = useState(false);
  const [catsFound, setCatsFound] = useState(0);
  const navigate = useNavigate();

  const handleHover = () => {
    const newNumbers = Array.from({ length: 5 }, () => 
      Math.floor(Math.random() * 10)
    );
    setNumbers(newNumbers);
  };

  const spawnCat = () => {
    if (!isCatGameActive) return;

    const cat = document.createElement('div');
    cat.innerHTML = '🐱';
    cat.style.position = 'fixed';
    cat.style.left = `${Math.random() * (window.innerWidth - 40)}px`;
    cat.style.top = `${Math.random() * (window.innerHeight - 40)}px`;
    cat.style.fontSize = '24px';
    cat.style.cursor = 'pointer';
    cat.style.zIndex = '1000';
    cat.style.animation = 'fadeIn 0.5s ease-in';
    cat.style.userSelect = 'none';

    cat.addEventListener('click', () => {
      cat.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => cat.remove(), 300);
      setCatsFound(prev => prev + 1);
    });

    document.body.appendChild(cat);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isCatGameActive) {
      interval = setInterval(spawnCat, 2000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCatGameActive]);

  const handleCommand = (cmd: string) => {
    switch (cmd.toLowerCase()) {
      case '/help':
        setMessage({
          text: `Доступные команды:
/help - показать список команд
/cat - начать игру с котиками
/stop cat - остановить игру с котиками
/virus - сломать сайт на 10 секунд
/baner - показать информацию о создателе
/penis - показать ASCII-арт`,
          type: 'help'
        });
        break;
      case '/cat':
        setIsCatGameActive(true);
        setMessage({ 
          text: "Catch the cats! Game started! Use /stop cat to end the game.",
          type: 'cat'
        });
        break;
      case '/stop cat':
        setIsCatGameActive(false);
        setMessage({ 
          text: `Game Over! You caught ${catsFound} cats!`,
          type: 'cat'
        });
        setCatsFound(0);
        // Remove all existing cats
        document.querySelectorAll('[data-cat]').forEach(cat => cat.remove());
        break;
      case '/virus':
        setMessage({ 
          text: "MEOW! I BROKE THE SITE! RESTARTING IN 10 SECONDS... >:3",
          type: 'cat'
        });
        setTimeout(() => {
          window.location.reload();
        }, 10000);
        break;
      case '/baner':
        setMessage({
          text: "✨ This site was created by Baneronetwo ✨",
          type: 'neon'
        });
        break;
      case '/penis':
        setMessage({
          text: `
   O
  /|\\
  / \\
Really want to see this?`,
          type: 'ascii'
        });
        break;
      default:
        setMessage({ text: 'Command not found. Type /help to see available commands.', type: null });
    }
    setCommand('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(command);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.8); }
          }
        `}
      </style>
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onMouseEnter={handleHover}
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-3 rounded-full bg-black/20 backdrop-blur-lg border border-white/10 hover:bg-black/30 transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        >
          <Terminal className="w-6 h-6 text-white/80" />
          {numbers.map((num, i) => (
            <span
              key={i}
              className="absolute -top-8 left-1/2 text-white/80 animate-float"
              style={{
                animationDelay: `${i * 0.1}s`,
                transform: `translateX(${(i - 2) * 20}px)`,
              }}
            >
              {num}
            </span>
          ))}
        </button>
        
        {isOpen && (
          <div className="absolute bottom-16 left-0 w-96 h-64 bg-black/80 backdrop-blur-lg rounded-lg border border-white/10 p-4 overflow-hidden">
            {message.text && (
              <div 
                className={`mb-4 p-2 rounded ${
                  message.type === 'neon' 
                    ? 'text-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.7)]' 
                    : message.type === 'cat'
                    ? 'text-red-500 animate-bounce'
                    : message.type === 'ascii'
                    ? 'text-green-500 font-mono whitespace-pre'
                    : message.type === 'help'
                    ? 'text-blue-400 font-mono whitespace-pre-line'
                    : 'text-white/60'
                }`}
              >
                {message.text}
              </div>
            )}
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-transparent border-none outline-none text-white/80 font-mono"
              placeholder="Enter command... Type /help for commands"
              autoFocus
            />
          </div>
        )}
      </div>
      {isCatGameActive && (
        <div className="fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-lg rounded-lg border border-white/10 p-2 text-white">
          Cats Found: {catsFound}
        </div>
      )}
    </>
  );
};
