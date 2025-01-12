import { useState } from 'react';
import { Terminal } from 'lucide-react';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

export const CommandLine = () => {
  const [command, setCommand] = useState('');
  const { toast } = useToast();

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      switch (command.toLowerCase()) {
        case '/baner':
          toast({
            title: "Baneronetwo",
            description: "Welcome to my personal website! Feel free to explore.",
          });
          break;
        case '/help':
          toast({
            title: "Available Commands",
            description: "Commands: /baner - About me | /help - Show this help message | /virus - ???",
          });
          break;
        case '/virus':
          const kitty = document.createElement('div');
          kitty.innerHTML = `
            <div class="fixed bottom-4 left-4 p-4 bg-card rounded-lg shadow-lg z-50 animate-bounce">
              <pre class="text-sm">
                /\\___/\\
               (  o o  )
               (  =^=  ) 
                (____)
              </pre>
              <p class="mt-2 text-red-500">OOO no, what have you done, I feel bad..... you don't love me ?</p>
            </div>
          `;
          document.body.appendChild(kitty);
          setTimeout(() => {
            window.location.reload();
          }, 10000);
          break;
        default:
          toast({
            title: "Unknown Command",
            description: "Type /help to see available commands",
            variant: "destructive",
          });
      }
      setCommand('');
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <Terminal className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleCommand}
        className="pl-8"
        placeholder="Type a command..."
      />
    </div>
  );
};