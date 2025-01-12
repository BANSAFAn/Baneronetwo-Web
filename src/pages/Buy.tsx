import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Star, Megaphone, Users } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { toast } from "@/components/ui/use-toast";

const Buy = () => {
  const items = [
    {
      title: "Video Advertisement",
      description: "Advertise in 1 video (no deletion)",
      price: "10",
      icon: Video,
      channels: "Baneronetwo, banerEN, RoomFBI"
    },
    {
      title: "Monthly Mention",
      description: "Get mentioned in every video for 1 month",
      price: "20",
      icon: Megaphone,
      channels: "Baneronetwo, BanerUA"
    },
    {
      title: "Video Star",
      description: "Star with me in a video",
      price: "20",
      icon: Star,
      channels: "Baneronetwo"
    },
    {
      title: "Server/Channel Advertisement",
      description: "Advertise your Discord server or YouTube channel in 1 video",
      price: "10",
      icon: Users,
      channels: "Baneronetwo, BanerEN, BanerUA"
    },
  ];

  const handleBuy = () => {
    window.open("https://ko-fi.com/baneronetwo", "_blank");
  };

  const handleContact = () => {
    toast({
      title: "Meow!",
      description: "Mr.! On the main page there are social networks through which you can contact my master",
      duration: 5000
    });
  };

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-lg text-muted-foreground">
            You can either support or buy one of the features, but just specify it before you buy!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {items.map((item, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger asChild>
                <Card className="p-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 backdrop-blur-sm cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <p className="text-2xl font-bold text-primary">${item.price}</p>
                    </div>
                  </div>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Available Channels:</h4>
                  <p className="text-sm text-muted-foreground">{item.channels}</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>

        <div className="text-center flex justify-center gap-4">
          <Button
            onClick={handleBuy}
            className="px-8 py-6 text-lg hover:scale-105 transition-transform duration-300 hover:glow"
          >
            Support / Buy Now
          </Button>
          <Button
            onClick={handleContact}
            variant="secondary"
            className="px-8 py-6 text-lg hover:scale-105 transition-transform duration-300"
          >
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Buy;