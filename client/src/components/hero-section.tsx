import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import logoImage from "@assets/image_1759770556462.png";

interface HeroSectionProps {
  onScrollToBlogs: () => void;
  onShowLogin: () => void;
}

export default function HeroSection({ onScrollToBlogs, onShowLogin }: HeroSectionProps) {
  const { user } = useAuth();

  return (
    <section id="home" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8 inline-block">
            <img 
              src={logoImage} 
              alt="Stiftung Fettentest" 
              className="w-32 h-32 mx-auto pulse-glow"
              data-testid="img-hero-logo"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-6">
            STIFTUNG <span className="text-primary">FETTENTEST</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Der offizielle Fettsack testet Lebensmittel und Getränke auf Geschmack, Aussehen und Geruch
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={onScrollToBlogs}
              className="px-8 py-4 bg-primary text-primary-foreground font-bold hover:bg-accent golden-glow text-lg"
              data-testid="button-view-blogs"
            >
              <i className="fas fa-utensils mr-2"></i>Blog Posts Ansehen
            </Button>
            {!user && (
              <Button 
                onClick={onShowLogin}
                variant="outline"
                className="px-8 py-4 border-2 border-primary font-bold hover:bg-primary hover:text-primary-foreground text-lg"
                data-testid="button-login-hero"
              >
                <i className="fas fa-user mr-2"></i>Fettiger Fettsack einloggen
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
