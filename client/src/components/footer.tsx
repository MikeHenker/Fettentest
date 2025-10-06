import logoImage from "@assets/image_1759770556462.png";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logoImage} 
                alt="Logo" 
                className="w-12 h-12"
                data-testid="img-footer-logo"
              />
              <div>
                <h3 className="font-heading font-bold text-lg text-primary">STIFTUNG FETTENTEST</h3>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Die unabhängige Test-Plattform für Lebensmittel und Getränke. 
              Professionelle Bewertungen nach Geschmack, Aussehen und Geruch.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection("home")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="button-footer-home"
                >
                  Startseite
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("about")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="button-footer-about"
                >
                  Über Uns
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("blogs")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="button-footer-blogs"
                >
                  Blog Posts
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">Kontakt</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                <i className="fas fa-envelope mr-2 text-primary"></i>info@fettentest.de
              </li>
              <li className="text-muted-foreground">
                <i className="fas fa-phone mr-2 text-primary"></i>+49 123 456789
              </li>
              <li className="flex space-x-3 mt-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  data-testid="link-facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  data-testid="link-instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  data-testid="link-twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground">&copy; 2024 Stiftung Fettentest. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
