
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ParticlesBg from 'particles-bg';
import { LoadingScreen } from '@/components/LoadingScreen';
import { CommandLine } from '@/components/CommandLine';
import { Clock } from '@/components/Clock';
import { SocialLinks } from '@/components/SocialLinks';
import { AudioPlayer } from '@/components/AudioPlayer';
import { UserCircle, Newspaper, BookOpen } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  // Check if there's a saved last visited page
  useEffect(() => {
    const lastPage = localStorage.getItem('lastVisitedPage');
    if (lastPage && lastPage !== '/') {
      navigate(lastPage);
    }
  }, [navigate]);

  // Save current page to localStorage
  useEffect(() => {
    localStorage.setItem('lastVisitedPage', '/');
  }, []);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 100);
    }, 3000);
    return () => clearTimeout(loadingTimer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-[2px]">
        <ParticlesBg 
          type="cobweb" 
          bg={true} 
          color="#1a1a1a" // Darker color for particles
          num={150}
        />
      </div>
      
      <div className={`w-full min-h-screen flex flex-col items-center justify-center transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <AudioPlayer />
        
        <div className="fixed top-0 right-0 z-50 p-4">
          <Clock />
        </div>
        
        <div className="fixed bottom-0 left-0 z-50 p-4">
          <CommandLine />
        </div>

        <main className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center">
          <h1 className={`text-7xl font-bold text-center mb-8 transition-all duration-1000 delay-200 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Baneronetwo
            </span>
          </h1>

          <div className={`transition-all duration-1000 delay-400 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <SocialLinks />
          </div>
        </main>

        <nav className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-1000 delay-600 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="absolute inset-0 blur-xl bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] animate-gradient bg-[length:200%_auto] rounded-full" />
              <div className="absolute inset-0 blur-md bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] animate-gradient bg-[length:200%_auto] rounded-full" />
            </div>
            <div className="glass-morphism rounded-full px-8 py-4 flex gap-8 backdrop-blur-md border border-white/10 relative z-10">
              <Link
                to="/about"
                className="transition-all duration-300"
                title="About"
                onClick={() => localStorage.setItem('lastVisitedPage', '/about')}
              >
                <UserCircle className="w-6 h-6 text-white/80 hover:text-white transition-colors" />
              </Link>
              <Link
                to="/posts"
                className="transition-all duration-300"
                title="Posts"
                onClick={() => localStorage.setItem('lastVisitedPage', '/posts')}
              >
                <Newspaper className="w-6 h-6 text-white/80 hover:text-white transition-colors" />
              </Link>
              <Link
                to="/blogs"
                className="transition-all duration-300"
                title="Blogs"
                onClick={() => localStorage.setItem('lastVisitedPage', '/blogs')}
              >
                <BookOpen className="w-6 h-6 text-white/80 hover:text-white transition-colors" />
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Index;
