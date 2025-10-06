import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import LoginModal from "./login-modal";
import logoImage from "@assets/image_1759770556462.png";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3" data-testid="link-home">
              <div className="relative w-12 h-12">
                <img 
                  src={logoImage} 
                  alt="Stiftung Fettentest Logo" 
                  className="w-full h-full object-contain golden-glow"
                  data-testid="img-logo"
                />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-primary">STIFTUNG</h1>
                <h2 className="text-xl font-heading font-bold text-foreground -mt-1">FETTENTEST</h2>
              </div>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {location === "/" && (
                <>
                  <button 
                    onClick={() => scrollToSection("home")}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                    data-testid="button-home"
                  >
                    Startseite
                  </button>
                  <button 
                    onClick={() => scrollToSection("about")}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                    data-testid="button-about"
                  >
                    Über Uns
                  </button>
                  <button 
                    onClick={() => scrollToSection("blogs")}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                    data-testid="button-blogs"
                  >
                    Blog Posts
                  </button>
                </>
              )}
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/dashboard"
                    className="text-foreground hover:text-primary transition-colors font-medium"
                    data-testid="link-dashboard"
                  >
                    Dashboard
                  </Link>
                  <span className="text-muted-foreground">
                    Willkommen, {user.username}
                  </span>
                  <Button 
                    onClick={handleLogout}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    data-testid="button-logout"
                  >
                    Abmelden
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 py-2 bg-primary text-primary-foreground font-semibold hover:bg-accent golden-glow"
                  data-testid="button-login"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>Fettiger Fettsack einloggen
                </Button>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-card">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {location === "/" && (
                  <>
                    <button 
                      onClick={() => scrollToSection("home")}
                      className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium w-full text-left"
                      data-testid="button-home-mobile"
                    >
                      Startseite
                    </button>
                    <button 
                      onClick={() => scrollToSection("about")}
                      className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium w-full text-left"
                      data-testid="button-about-mobile"
                    >
                      Über Uns
                    </button>
                    <button 
                      onClick={() => scrollToSection("blogs")}
                      className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium w-full text-left"
                      data-testid="button-blogs-mobile"
                    >
                      Blog Posts
                    </button>
                  </>
                )}
                
                {user ? (
                  <>
                    <Link 
                      href="/dashboard"
                      className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
                      data-testid="link-dashboard-mobile"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium w-full text-left"
                      data-testid="button-logout-mobile"
                    >
                      Abmelden
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => {
                      setShowLoginModal(true);
                      setMobileMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium w-full text-left"
                    data-testid="button-login-mobile"
                  >
                    Fettiger Fettsack einloggen
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
}
