import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import BlogDetailModal from "./blog-detail-modal";
import CreateBlogModal from "./create-blog-modal";
import type { BlogPost } from "@shared/schema";

export default function BlogPostsSection() {
  const { user } = useAuth();
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: blogPosts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const calculateOverallScore = (post: BlogPost) => {
    return ((post.tasteScore + post.appearanceScore + post.smellScore) / 3).toFixed(1);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <section id="blogs" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Test <span className="text-primary">Blog Posts</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent"></div>
            </div>
            {user && (
              <Skeleton className="h-12 w-48" />
            )}
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="game-cart-inner">
                <Skeleton className="w-full h-48" />
                <div className="p-4 bg-card">
                  <div className="flex items-center space-x-2 mb-3">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blogs" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Test <span className="text-primary">Blog Posts</span>
            </h2>
            <p className="text-muted-foreground">Fehler beim Laden der Blog Posts</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="blogs" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Test <span className="text-primary">Blog Posts</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent"></div>
            </div>
            {user && (
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-primary text-primary-foreground font-bold hover:bg-accent golden-glow"
                data-testid="button-create-blog"
              >
                <i className="fas fa-plus mr-2"></i>Neuer Blog Post
              </Button>
            )}
          </div>
          
          {!blogPosts || blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-utensils text-3xl text-muted-foreground"></i>
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                Noch keine Blog Posts
              </h3>
              <p className="text-muted-foreground mb-8">
                {user 
                  ? "Erstelle deinen ersten Blog Post und teile deine Testerfahrungen!"
                  : "Melde dich an um Blog Posts zu sehen und zu erstellen."
                }
              </p>
              {user && (
                <Button 
                  onClick={() => setShowCreateModal(true)}
                  className="px-8 py-4 bg-primary text-primary-foreground font-bold hover:bg-accent golden-glow"
                  data-testid="button-create-first-blog"
                >
                  <i className="fas fa-plus mr-2"></i>Ersten Blog Post Erstellen
                </Button>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {blogPosts.map((post) => (
                <div 
                  key={post.id}
                  className="game-cart cursor-pointer" 
                  onClick={() => setSelectedBlogId(post.id)}
                  data-testid={`card-blog-${post.id}`}
                >
                  <div className="game-cart-inner">
                    {post.images && post.images.length > 0 ? (
                      <img 
                        src={post.images[0]} 
                        alt={post.title} 
                        className="w-full h-48 object-cover"
                        data-testid={`img-blog-${post.id}`}
                      />
                    ) : (
                      <div className="w-full h-48 bg-muted flex items-center justify-center">
                        <i className="fas fa-image text-4xl text-muted-foreground"></i>
                      </div>
                    )}
                    <div className="p-4 bg-card">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                          <i className={`${post.icon} text-white`}></i>
                        </div>
                        <h3 className="font-heading font-bold text-lg text-foreground truncate">
                          {post.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {post.content.substring(0, 100)}...
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          <i className="far fa-calendar mr-1"></i>
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded font-semibold">
                          {calculateOverallScore(post)}/10
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedBlogId && (
        <BlogDetailModal 
          blogId={selectedBlogId}
          onClose={() => setSelectedBlogId(null)}
        />
      )}

      {showCreateModal && (
        <CreateBlogModal 
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </>
  );
}
