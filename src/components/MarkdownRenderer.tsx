
import React from 'react';
import { Copy, CheckCheck, AlertTriangle, Info, Link2, FileWarning } from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  // Handle copying code to clipboard
  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };
  
  const processMarkdown = (text: string) => {
    let html = text;
    
    // Process code blocks with syntax highlighting
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
      const id = Math.random().toString(36).substring(2, 9);
      const lang = language || 'plaintext';
      return `<div class="relative my-4 rounded-lg overflow-hidden">
        <div class="flex items-center justify-between bg-gray-800 px-4 py-2 text-xs text-gray-300">
          <span>${lang}</span>
          <button class="copy-button" data-code="${code.replace(/"/g, '&quot;')}" data-id="${id}">
            ${copiedCode === id ? 
              '<span class="flex items-center"><CheckCheck size={16} /> Copied!</span>' : 
              '<span class="flex items-center"><Copy size={16} /> Copy</span>'}
          </button>
        </div>
        <pre class="p-4 bg-gray-900 overflow-x-auto"><code class="language-${lang}">${code}</code></pre>
      </div>`;
    });
    
    // Process tables
    html = html.replace(/\|(.+)\|\n\|([-:]+\|)+\n((?:\|.+\|\n)+)/g, (match, header, separator, rows) => {
      const headers = header.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
      const rowsData = rows.trim().split('\n').map(row => 
        row.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim())
      );
      
      return `<div class="my-4 overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-800 text-white">
              ${headers.map(h => `<th class="p-2 text-left">${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rowsData.map((row, i) => `
              <tr class="${i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800/50'}">
                ${row.map(cell => `<td class="p-2 border-t border-gray-700">${cell}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>`;
    });
    
    // Process tip, warning, and note blocks
    html = html.replace(/:::(\w+)\s+([\s\S]*?):::/g, (match, type, content) => {
      let icon = '';
      let bgColor = '';
      let borderColor = '';
      let title = '';
      
      switch (type.toLowerCase()) {
        case 'tip':
          icon = '<Info size={20} className="text-blue-400" />';
          bgColor = 'bg-blue-950/30';
          borderColor = 'border-blue-500';
          title = 'Tip';
          break;
        case 'warning':
          icon = '<AlertTriangle size={20} className="text-amber-400" />';
          bgColor = 'bg-amber-950/30';
          borderColor = 'border-amber-500';
          title = 'Warning';
          break;
        case 'note':
          icon = '<FileWarning size={20} className="text-purple-400" />';
          bgColor = 'bg-purple-950/30';
          borderColor = 'border-purple-500';
          title = 'Note';
          break;
        default:
          icon = '<Info size={20} className="text-gray-400" />';
          bgColor = 'bg-gray-800/50';
          borderColor = 'border-gray-500';
          title = type.charAt(0).toUpperCase() + type.slice(1);
      }
      
      return `<div class="my-4 p-4 rounded-lg ${bgColor} border-l-4 ${borderColor}">
        <div class="flex items-center gap-2 mb-2 font-medium">
          ${icon} ${title}
        </div>
        <div>${content.trim()}</div>
      </div>`;
    });
    
    // Process videos (iframe embeds)
    html = html.replace(/\[video:(.+?)\]/g, (match, url) => {
      if (url.includes('imgur.com')) {
        // Convert imgur URL to embed format if needed
        const imgurId = url.match(/imgur\.com\/(?:a\/|gallery\/)?([a-zA-Z0-9]+)/)?.[1];
        if (imgurId) {
          return `<div class="my-4 aspect-w-16 aspect-h-9">
            <iframe 
              src="https://imgur.com/a/${imgurId}/embed" 
              class="w-full rounded-lg" 
              frameBorder="0" 
              allowFullScreen>
            </iframe>
          </div>`;
        }
      } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
        // Handle YouTube links
        const youtubeId = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1];
        if (youtubeId) {
          return `<div class="my-4 aspect-w-16 aspect-h-9">
            <iframe 
              src="https://www.youtube.com/embed/${youtubeId}" 
              class="w-full aspect-video rounded-lg" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>`;
        }
      }
      
      // Fallback for other video URLs
      return `<div class="my-4">
        <iframe src="${url}" class="w-full aspect-video rounded-lg" frameBorder="0" allowFullScreen></iframe>
      </div>`;
    });
    
    // Process images with captions
    html = html.replace(/!\[(.*?)\]\((.*?)\)(?:\{(.*?)\})?/g, (match, alt, src, caption) => {
      return `<figure class="my-6">
        <img 
          src="${src}" 
          alt="${alt || 'Image'}" 
          class="w-full rounded-lg shadow-lg max-h-[600px] object-contain mx-auto"
        />
        ${caption ? `<figcaption class="text-center text-sm text-gray-400 mt-2">${caption}</figcaption>` : ''}
      </figure>`;
    });
    
    // Basic markdown processing
    html = html
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-6 mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-5 mb-3 text-purple-300">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-4 mb-2 text-pink-300">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline" target="_blank">$1</a>')
      .replace(/^- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
      .replace(/<\/li>\n<li/g, '</li><li')
      .replace(/\n\n/g, '<p class="my-3"></p>');
    
    return html;
  };

  React.useEffect(() => {
    // Add event listeners for copy buttons
    const handleCopyClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('.copy-button') as HTMLButtonElement;
      
      if (button) {
        const code = button.getAttribute('data-code');
        const id = button.getAttribute('data-id');
        
        if (code && id) {
          handleCopyCode(code, id);
        }
      }
    };
    
    document.addEventListener('click', handleCopyClick);
    
    return () => {
      document.removeEventListener('click', handleCopyClick);
    };
  }, []);

  return (
    <div 
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: processMarkdown(content) }}
    />
  );
};
