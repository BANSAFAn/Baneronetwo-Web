import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Shield, Globe, Users, DollarSign, Youtube } from 'lucide-react';
import { TagCloud } from 'react-tagcloud';

const About = () => {
  useEffect(() => {
    localStorage.setItem('lastVisitedPage', '/about');
  }, []);

  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showHackEffect, setShowHackEffect] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('.glitch-section');
    sections.forEach((section, index) => {
      section.classList.add('animate-fade-in');
      (section as HTMLElement).style.animationDelay = `${index * 0.2}s`;
    });
  }, []);

  const programmingLanguages = [
    { value: 'C++', count: 25, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', color: '#9b87f5' },
    { value: 'C#', count: 28, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', color: '#7E69AB' },
    { value: 'C', count: 20, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', color: '#6E59A5' },
    { value: 'Rust', count: 30, logo: 'https://rustacean.net/assets/rustacean-flat-happy.svg', color: '#F97316' },
    { value: 'Swift', count: 22, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', color: '#D946EF' },
    { value: 'TypeScript', count: 35, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#0EA5E9' },
    { value: 'JavaScript', count: 32, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#1EAEDB' },
    { value: 'Vue', count: 28, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', color: '#33C3F0' },
    { value: 'CSS', count: 25, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#E5DEFF' },
    { value: 'Lua', count: 20, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg', color: '#FFDEE2' },
    { value: 'Go', count: 27, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg', color: '#FDE1D3' }
  ];

  const customRenderer = (tag: { value: string; count: number; logo: string; color: string }, size: number) => (
    <span
      key={tag.value}
      style={{
        animation: 'floating 3s ease-in-out infinite',
        animationDelay: `${Math.random() * 2}s`,
        fontSize: `${size}px`,
        margin: '3px',
        padding: '3px',
        display: 'inline-block',
      }}
    >
      <img 
        src={tag.logo} 
        alt={tag.value}
        style={{
          width: `${size * 1.5}px`,
          height: `${size * 1.5}px`,
          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
          transition: 'all 0.3s ease',
        }}
        title={tag.value}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = `drop-shadow(0 0 12px ${tag.color})`;
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      />
    </span>
  );

  const handleCyberSecurityClick = () => {
    setShowHackEffect(true);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  const priceList = [
    {
      title: "Collaborative Video",
      price: 1000,
      description: "Record a video together"
    },
    {
      title: "Voice Over",
      price: 500,
      description: "Voice over for videos up to 5 minutes"
    },
    {
      title: "YouTube Promotion",
      price: 600,
      description: "One video promotion (up to 1,000 views)"
    },
    {
      title: "Community Promotion",
      price: 500,
      description: "Discord or Reddit server promotion"
    }
  ];

  const USD_RATE = 0.026;
  const EUR_RATE = 0.024;

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <style>
        {`
          @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes glitch {
            0% { transform: translate(0) }
            20% { transform: translate(-2px, 2px) }
            40% { transform: translate(-2px, -2px) }
            60% { transform: translate(2px, 2px) }
            80% { transform: translate(2px, -2px) }
            100% { transform: translate(0) }
          }
          .hack-effect {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: black;
            color: #0f0;
            font-family: monospace;
            font-size: 1.5rem;
            padding: 2rem;
            z-index: 9999;
            animation: glitch 0.3s infinite;
            overflow: hidden;
          }
        `}
      </style>
      <Link to="/" className="fixed top-4 left-4 text-white/60 hover:text-white transition-colors">
        ← Back
      </Link>

      {showHackEffect && (
        <div className="hack-effect">
          <pre className="text-red-500 text-2xl animate-pulse">
            {`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⠟⠛⠛⠛⠛⠛⣛⣻⣿⣿⣿⣿⣿⣟⣛⣛⣛⠛⠒⠲⠶⠦⣤⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⠏⠁⠀⠀⢀⣤⠶⣛⣩⣥⠤⠤⠤⠤⢤⣤⣤⣭⣭⣉⣉⣛⣛⣻⣭⣥⠬⡍⠛⢶⣬⣙⣛⠻⠿⠿⠿⠿⠶
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠏⠀⠀⠀⠀⠘⠿⠿⠿⠿⠖⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣸⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣸⡇⠀⢀⣀⣤⣤⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣸⡇⠀⠿⠿⠿⠿⠿⠿⠿⠿⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
            SYSTEM COMPROMISED! SELF-DESTRUCT INITIATED...
            `}
          </pre>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-16 pt-16">
        <div className="glitch-section space-y-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
            About Me
          </h1>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-gradient bg-[length:200%_auto]"></div>
            <p className="relative bg-black text-lg leading-relaxed p-6 rounded-xl">
              Hello! I'm a passionate cybersecurity expert specializing in system protection and network security. 
              I excel in translating websites and programs into different languages, ensuring perfect localization. 
              As an active moderator, I manage multiple Discord servers, Reddit communities, and YouTube channels, 
              fostering engaging and safe environments for users.
            </p>
          </div>
        </div>

        <div className="glitch-section">
          <div className="relative group mb-12">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#D946EF] rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-gradient bg-[length:200%_auto]"></div>
            <div className="relative bg-black p-6 rounded-xl">
              <Cloud className="w-12 h-12 mb-4 text-[#0EA5E9]" />
              <div className="h-[300px] flex items-center justify-center">
                <TagCloud
                  minSize={20}
                  maxSize={35}
                  tags={programmingLanguages}
                  className="text-center"
                  onClick={(tag: { value: string; count: number }) => console.log(`'${tag.value}' was selected!`)}
                  renderer={customRenderer}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="glitch-section grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative group" onClick={handleCyberSecurityClick}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-gradient bg-[length:200%_auto]"></div>
            <div className="relative bg-black p-6 rounded-xl cursor-pointer hover:bg-black/50 transition-colors">
              <Shield className="w-8 h-8 mb-4 text-white/80" />
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent">
                Cybersecurity
              </h3>
              <p className="text-white/60">Expert in cybersecurity, system protection, and program translation. Active moderator on Discord servers, Reddit forums, and YouTube channels.</p>
            </div>
          </div>

          {showTranslation ? (
            <div className="relative group" onClick={() => setShowTranslation(false)}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#D946EF] rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-gradient bg-[length:200%_auto]"></div>
              <div className="relative bg-black p-6 rounded-xl cursor-pointer hover:bg-black/50 transition-colors">
                <Globe className="w-8 h-8 mb-4 text-white/80" />
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent">
                  Translation & Localization
                </h3>
                <p className="text-white/60">Specialized in translating websites and programs into various languages, ensuring perfect localization and cultural adaptation.</p>
              </div>
            </div>
          ) : (
            <div className="relative group animate-fade-in">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#D946EF] rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-gradient bg-[length:200%_auto]"></div>
              <div className="relative bg-black p-6 rounded-xl">
                <pre className="text-green-400 text-sm whitespace-pre">
                  {`
    /\\___/\\
   (  o o  )
   (  =^=  ) 
    (---)  
  МЯЯЯУ! Я уничтожаю конкурентов!
                  `}
                </pre>
              </div>
            </div>
          )}

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F97316] via-[#D946EF] to-[#0EA5E9] rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-gradient bg-[length:200%_auto]"></div>
            <div className="relative bg-black p-6 rounded-xl">
              <Users className="w-8 h-8 mb-4 text-white/80" />
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-[#F97316] via-[#D946EF] to-[#0EA5E9] bg-clip-text text-transparent">
                Community Management
              </h3>
              <p className="text-white/60">Experienced moderator across multiple Discord servers, Reddit communities, and YouTube channels. Expert in community engagement and management.</p>
            </div>
          </div>
        </div>

        <div className="glitch-section">
          <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            Price List
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {priceList.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setHoveredPrice(index)}
                onMouseLeave={() => setHoveredPrice(null)}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-gradient bg-[length:200%_auto]"></div>
                <div className="relative bg-black p-6 rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white/90">{item.title}</h3>
                    <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                      {item.price} ГРН
                    </span>
                  </div>
                  <p className="text-white/60">{item.description}</p>
                  {hoveredPrice === index && (
                    <div className="absolute -bottom-16 left-0 right-0 text-sm text-center bg-black/80 rounded-lg p-2 backdrop-blur-sm border border-white/10 z-20">
                      <p className="text-green-400">{formatCurrency(item.price * USD_RATE, 'USD')}</p>
                      <p className="text-blue-400">{formatCurrency(item.price * EUR_RATE, 'EUR')}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-gradient bg-[length:200%_auto]"></div>
            <div className="relative bg-black p-6 rounded-xl">
              <p className="text-center text-white/80">
                You can support me through Ko-fi or visit the Posts section to make a donation.
                Your support helps create better content!
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <a
                  href="https://ko-fi.com/baneronetwo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300"
                >
                  <DollarSign className="w-5 h-5" />
                  <span>Support via Ko-fi</span>
                </a>
                <Link
                  to="/posts"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 transition-all duration-300"
                >
                  <Youtube className="w-5 h-5" />
                  <span>Support via Posts</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
