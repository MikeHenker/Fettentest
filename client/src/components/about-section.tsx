export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Was ist <span className="text-primary">Fettentest?</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Test Criteria Cards */}
          <div className="bg-background rounded-2xl p-8 border-2 border-border hover:border-primary transition-all hover:golden-glow" data-testid="card-taste">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <i className="fas fa-smile text-3xl text-primary"></i>
            </div>
            <h3 className="text-2xl font-heading font-bold text-center mb-4 text-foreground">Geschmack</h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              Detaillierte Geschmacksanalyse von süß über herzhaft bis umami. Jede Nuance wird erfasst und bewertet.
            </p>
          </div>
          
          <div className="bg-background rounded-2xl p-8 border-2 border-border hover:border-primary transition-all hover:golden-glow" data-testid="card-appearance">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <i className="fas fa-eye text-3xl text-primary"></i>
            </div>
            <h3 className="text-2xl font-heading font-bold text-center mb-4 text-foreground">Aussehen</h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              Visuelle Bewertung der Präsentation, Farbe, Textur und appetitlichen Erscheinung des Produkts.
            </p>
          </div>
          
          <div className="bg-background rounded-2xl p-8 border-2 border-border hover:border-primary transition-all hover:golden-glow" data-testid="card-smell">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <i className="fas fa-nose text-3xl text-primary"></i>
            </div>
            <h3 className="text-2xl font-heading font-bold text-center mb-4 text-foreground">Geruch</h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              Olfaktorische Prüfung des Aromas, der Frische und der charakteristischen Duftnoten.
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 border border-primary/30">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-heading font-bold mb-6 text-foreground">
              Der Fettiger Fettsack im Einsatz
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Die Stiftung Fettentest ist eine unabhängige Organisation, die sich der umfassenden 
              Bewertung von Lebensmitteln und Getränken verschrieben hat. Unser Experte, der 
              "Fettiger Fettsack", testet mit jahrelanger Erfahrung und feinem Gaumen jedes 
              Produkt nach strengsten Kriterien: Geschmack, Aussehen und Geruch.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Jeder Blog-Post ist eine detaillierte Reise durch die sensorische Erfahrung eines 
              Produkts, komplett mit professionellen Fotos, ausführlichen Beschreibungen und 
              einer ehrlichen Bewertung. Vertrauen Sie auf die Expertise des Fettsacks!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
