
import { useEffect, useState } from 'react';

export const LoadingScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-1000 z-50 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{
        backgroundImage: 'url("/lovable-uploads/9ed373ff-3a4d-43e3-96a8-f17a9a76ec31.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>
      <div className="relative z-10 text-6xl font-bold text-white">
        <span className="absolute inset-0 blur-sm animate-pulse bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
          Baneronetwo
        </span>
        <span className="relative bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
          Baneronetwo
        </span>
      </div>
    </div>
  );
};
