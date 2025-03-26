import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Posts = () => {
  useEffect(() => {
    localStorage.setItem('lastVisitedPage', '/posts');
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Link to="/" className="fixed top-4 left-4 text-white/60 hover:text-white transition-colors">
        ← Back
      </Link>

      <div className="max-w-4xl mx-auto pt-16">
        <div className="opacity-0 animate-fade-in glass-morphism p-8 rounded-xl space-y-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-glow">Posts & Support</h2>
          
          <a
            href="https://www.reddit.com/user/Banerbansa/"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-white/10 hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300"
          >
            <h3 className="text-xl font-bold mb-2">Check out my Reddit posts!</h3>
            <p className="text-white/60">Follow my latest updates and discussions</p>
          </a>

          <a
            href="https://www.youtube.com/@Baneronetwo"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 rounded-lg bg-gradient-to-r from-red-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 hover:from-red-500/20 hover:to-purple-500/20 transition-all duration-300"
          >
            <h3 className="text-xl font-bold mb-2">Watch my YouTube content!</h3>
            <p className="text-white/60">Subscribe for the latest videos</p>
          </a>

          <div className="relative group">
            <a
              href="https://ko-fi.com/baneronetwo"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-6 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-2">
                <Heart className="w-6 h-6 text-pink-500" />
                <span className="text-xl font-bold">Support My Work</span>
              </div>
            </a>
            <div className="absolute -bottom-24 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 rounded-lg bg-black/80 backdrop-blur-lg border border-white/10">
              <p className="text-center text-white/80">
                Your support helps me continue creating and improving! Every donation contributes to better content and development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
