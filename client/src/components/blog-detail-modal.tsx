import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import type { BlogPost } from "@shared/schema";

interface BlogDetailModalProps {
  blogId: string;
  onClose: () => void;
}

export default function BlogDetailModal({ blogId, onClose }: BlogDetailModalProps) {
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts", blogId],
  });

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateOverallScore = (post: BlogPost) => {
    return ((post.tasteScore + post.appearanceScore + post.smellScore) / 3).toFixed(1);
  };

  if (isLoading) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl h-[90vh] overflow-y-auto golden-glow-strong p-0">
          <div className="relative h-96">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="p-8">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-8" />
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !post) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Fehler beim Laden
            </h3>
            <p className="text-muted-foreground mb-6">
              Der Blog-Post konnte nicht geladen werden.
            </p>
            <Button onClick={onClose}>Schließen</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] overflow-y-auto golden-glow-strong p-0" data-testid={`modal-blog-detail-${blogId}`}>
        {/* Blog Header */}
        <div className="relative h-96">
          {post.images && post.images.length > 0 ? (
            <img 
              src={post.images[0]} 
              alt={post.title} 
              className="w-full h-full object-cover"
              data-testid={`img-blog-header-${blogId}`}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <i className="fas fa-image text-6xl text-muted-foreground"></i>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6 w-12 h-12 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card"
            data-testid="button-close-blog-detail"
          >
            <X className="w-6 h-6" />
          </Button>
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center golden-glow">
                <i className={`${post.icon} text-white text-2xl`}></i>
              </div>
              <div>
                <h2 className="text-4xl font-heading font-bold text-white mb-1" data-testid={`text-blog-title-${blogId}`}>
                  {post.title}
                </h2>
                <p className="text-primary font-semibold">Geschmacks-Test vom Fettiger Fettsack</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Content */}
        <div className="p-8">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-border mb-8">
            <div className="flex items-center space-x-2">
              <i className="far fa-calendar text-primary"></i>
              <span className="text-muted-foreground" data-testid={`text-blog-date-${blogId}`}>
                {formatDate(post.createdAt)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="far fa-user text-primary"></i>
              <span className="text-muted-foreground">Fettiger Fettsack</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-star text-primary"></i>
              <span className="font-bold text-primary text-xl" data-testid={`text-blog-score-${blogId}`}>
                {calculateOverallScore(post)}/10
              </span>
            </div>
          </div>
          
          {/* Test Categories */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-background rounded-xl p-6 border border-border" data-testid={`card-taste-score-${blogId}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg text-foreground">Geschmack</h3>
                <span className="text-2xl font-bold text-primary">{post.tasteScore.toFixed(1)}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-full" 
                  style={{ width: `${(post.tasteScore / 10) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Bewertung des Geschmacks
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 border border-border" data-testid={`card-appearance-score-${blogId}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg text-foreground">Aussehen</h3>
                <span className="text-2xl font-bold text-primary">{post.appearanceScore.toFixed(1)}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-full" 
                  style={{ width: `${(post.appearanceScore / 10) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Bewertung der visuellen Präsentation
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 border border-border" data-testid={`card-smell-score-${blogId}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg text-foreground">Geruch</h3>
                <span className="text-2xl font-bold text-primary">{post.smellScore.toFixed(1)}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-full" 
                  style={{ width: `${(post.smellScore / 10) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Bewertung des Aromas
              </p>
            </div>
          </div>
          
          {/* Detailed Review Text */}
          <div className="mb-8">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Detaillierte Bewertung</h3>
            <div 
              className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap"
              data-testid={`text-blog-content-${blogId}`}
            >
              {post.content}
            </div>
          </div>
          
          {/* Image Gallery */}
          {post.images && post.images.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6">Foto-Galerie</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {post.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${post.title} - Bild ${index + 1}`} 
                    className="w-full h-64 object-cover rounded-lg"
                    data-testid={`img-blog-gallery-${blogId}-${index}`}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Final Verdict */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 border border-primary/30">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center">
              <i className="fas fa-award text-primary mr-3"></i>
              Fazit des Fettiger Fettsack
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Gesamtbewertung: <span className="font-bold text-primary">{calculateOverallScore(post)}/10</span>
              {parseFloat(calculateOverallScore(post)) >= 9.0 ? " - Absoluter Geheimtipp!" :
               parseFloat(calculateOverallScore(post)) >= 8.0 ? " - Sehr empfehlenswert!" :
               parseFloat(calculateOverallScore(post)) >= 7.0 ? " - Gut, aber verbesserungsfähig." :
               " - Leider nicht überzeugend."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
