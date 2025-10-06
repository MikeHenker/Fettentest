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
              Bei der Stiftung Fettentest nehmen wir die Geschmacksanalyse äußerst ernst und widmen uns mit größter Sorgfalt der Bewertung jeder einzelnen Nuance. Von der ersten süßen Note bis hin zu den herzhaften Untertönen und den komplexen Umami-Aromen - jedes Detail wird von unserem Experten, dem Fettiger Fettsack, erfasst und bewertet. Durch jahrelange Erfahrung und einen außergewöhnlich feinen Gaumen können wir selbst die subtilsten Geschmacksrichtungen identifizieren und in unserem detaillierten Bewertungssystem von 0 bis 10 Punkten einordnen. Dabei berücksichtigen wir nicht nur den Erstgeschmack, sondern auch den Nachgeschmack, die Textur im Mund und das gesamte sensorische Erlebnis, das ein Lebensmittel oder Getränk bietet.
            </p>
          </div>
          
          <div className="bg-background rounded-2xl p-8 border-2 border-border hover:border-primary transition-all hover:golden-glow" data-testid="card-appearance">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <i className="fas fa-eye text-3xl text-primary"></i>
            </div>
            <h3 className="text-2xl font-heading font-bold text-center mb-4 text-foreground">Aussehen</h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              Das visuelle Erscheinungsbild eines Produkts ist oft der erste Kontaktpunkt und spielt eine entscheidende Rolle für den Gesamteindruck. Bei unserer umfassenden visuellen Bewertung analysieren wir die Präsentation des Produkts in allen Facetten: die Farbgebung und deren Intensität, die Oberflächenstruktur und Konsistenz, die appetitliche Anordnung und Garnierung sowie die allgemeine ästhetische Qualität. Wir dokumentieren jedes getestete Produkt mit professionellen Fotografien aus verschiedenen Perspektiven, um unseren Lesern einen authentischen Eindruck zu vermitteln. Die Bewertung erfolgt nach objektiven Kriterien wie Frische, Verarbeitung und Präsentation, wobei wir stets die Erwartungen an die jeweilige Produktkategorie berücksichtigen.
            </p>
          </div>
          
          <div className="bg-background rounded-2xl p-8 border-2 border-border hover:border-primary transition-all hover:golden-glow" data-testid="card-smell">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <i className="fas fa-nose text-3xl text-primary"></i>
            </div>
            <h3 className="text-2xl font-heading font-bold text-center mb-4 text-foreground">Geruch</h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              Die olfaktorische Prüfung ist ein fundamentaler Bestandteil unserer Tests, denn der Geruchssinn spielt eine Schlüsselrolle beim Genusserlebnis. Wir führen eine sorgfältige Analyse des Aromas durch, wobei wir die Intensität, die Komplexität und die charakteristischen Duftnoten identifizieren. Dabei achten wir besonders auf die Frische des Produkts, etwaige Fehlnoten sowie die Harmonie der verschiedenen Aromakomponenten. Unser Experte nimmt sich ausreichend Zeit, um sowohl die unmittelbaren als auch die subtileren Geruchsnuancen zu erfassen. Von fruchtigen und floralen Noten über würzige und erdige Aromen bis hin zu kräftigen und intensiven Düften - jede Geruchskomponente wird dokumentiert und in die Gesamtbewertung einbezogen, um unseren Lesern ein vollständiges Bild zu vermitteln.
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 border border-primary/30">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-heading font-bold mb-6 text-foreground text-center">
              Der Fettiger Fettsack im Einsatz
            </h3>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Die Stiftung Fettentest ist eine vollkommen unabhängige Organisation, die sich mit Leib und Seele der umfassenden, objektiven und ehrlichen Bewertung von Lebensmitteln und Getränken verschrieben hat. In einer Welt voller Marketing-Versprechen und geschönter Produktbeschreibungen bieten wir eine verlässliche Quelle authentischer Bewertungen, die auf echten Erfahrungen basieren.
              </p>
              <p>
                Unser Experte, der legendäre "Fettiger Fettsack", verfügt über jahrelange Erfahrung in der professionellen Verkostung und hat im Laufe seiner Karriere Tausende von Produkten getestet und bewertet. Mit seinem außergewöhnlich feinen Gaumen und seiner Fähigkeit, selbst die subtilsten Geschmacksnuancen zu erkennen, testet er jedes Produkt nach unseren strengsten Qualitätskriterien: Geschmack, Aussehen und Geruch.
              </p>
              <p>
                Jeder unserer Blog-Posts ist weit mehr als nur eine einfache Bewertung - es ist eine detaillierte Reise durch die sensorische Erfahrung eines Produkts. Wir nehmen uns die Zeit, jeden Aspekt gründlich zu dokumentieren: von den ersten visuellen Eindrücken über die Geruchsanalyse bis hin zur ausführlichen Geschmacksprobe. Unsere Berichte sind komplett mit professionellen, hochauflösenden Fotografien aus verschiedenen Perspektiven, ausführlichen Beschreibungen der Testsituation und einer völlig ehrlichen, ungeschönten Bewertung.
              </p>
              <p>
                Wir lassen uns nicht von Werbung oder Sponsoring beeinflussen - unsere Bewertungen basieren ausschließlich auf der tatsächlichen Qualität und dem Genusserlebnis der getesteten Produkte. Transparenz und Authentizität stehen bei uns an erster Stelle. Ob es sich um einen Premium-Burger, ein exotisches Getränk oder ein traditionelles Gericht handelt - Sie können sich darauf verlassen, dass unsere Bewertungen ehrlich, detailliert und nachvollziehbar sind.
              </p>
              <p className="text-center font-semibold text-foreground pt-4">
                Vertrauen Sie auf die Expertise und Leidenschaft des Fettiger Fettsack - Ihr Guide durch die Welt des guten Geschmacks!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
