import { Button } from "@/components/ui/button";
import { Cat, LogIn, HelpCircle } from "lucide-react";
import { useState } from "react";

const Posts = () => {
  const [isClicked, setIsClicked] = useState(false);
  
  const handleRedditClick = () => {
    window.open("https://www.reddit.com/user/Banerbansa/", "_blank");
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    // Only trigger if clicking the container itself, not its children
    if (e.target === e.currentTarget) {
      setIsClicked(true);
    }
  };

  return (
    <div 
      className="container mx-auto px-4 pt-24" 
      onClick={handleContainerClick}
    >
      <div className="flex flex-col items-center justify-center space-y-6 text-left">
        {isClicked ? (
          <>
            <HelpCircle className="w-24 h-24 text-primary animate-bounce" />
            <p className="text-lg max-w-2xl text-left">
              Are you blind.... or are you kidding me, the button is a bit off
            </p>
          </>
        ) : (
          <>
            <Cat className="w-24 h-24 text-primary animate-bounce" />
            <p className="text-lg max-w-2xl text-left">
              Hi! My Host writes now all on Reddit, so you can help him with information, or support him and promote his post! Click on the button to go there
            </p>
          </>
        )}
        <Button 
          onClick={handleRedditClick}
          className="flex items-center gap-2"
        >
          <LogIn className="w-5 h-5" />
          Reddit
        </Button>
      </div>
    </div>
  );
};

export default Posts;