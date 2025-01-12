import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";
import { CommandLine } from "./CommandLine";

export const HotBar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/posts", label: "Posts" },
    { href: "/buy", label: "Buy" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold site-title">
            Baneronetwo
          </Link>

          <div className="hidden md:block">
            <CommandLine />
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  location.pathname === href && "text-primary"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <CommandLine />
            {links.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  "block text-sm transition-colors hover:text-primary",
                  location.pathname === href && "text-primary"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};