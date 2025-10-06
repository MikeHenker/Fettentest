import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import CreateBlogModal from "@/components/create-blog-modal";
import BlogDetailModal from "@/components/blog-detail-modal";
import logoImage from "@assets/image_1759770556462.png";
import { ArrowLeft, Trash2, Edit, Plus } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Dashboard() {
  const { user } = useAuth();
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: blogPosts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const deleteBlogMutation = useMutation({
    mutationFn: async (blogId: string) => {
      await apiRequest("DELETE", `/api/blog-posts/${blogId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Blog-Post gelöscht",
        description: "Der Blog-Post wurde erfolgreich gelöscht.",
      });
    },
    onError: () => {
      toast({
        title: "Fehler beim Löschen",
        description: "Der Blog-Post konnte nicht gelöscht werden.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteBlog = (blogId: string) => {
    if (confirm("Möchtest du diesen Blog-Post wirklich löschen?")) {
      deleteBlogMutation.mutate(blogId);
    }
  };

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

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Zugriff verweigert
            </h1>
            <p className="text-muted-foreground mb-6">
              Du musst eingeloggt sein, um das Dashboard zu sehen.
            </p>
            <Link href="/">
              <Button>Zurück zur Startseite</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button variant="outline" size="sm" data-testid="button-back-home">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Zurück
                  </Button>
                </Link>
                <div className="flex items-center space-x-3">
                  <img 
                    src={logoImage} 
                    alt="Logo" 
                    className="w-12 h-12 golden-glow"
                    data-testid="img-dashboard-logo"
                  />
                  <div>
                    <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">Willkommen, {user.username}</p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-primary text-primary-foreground font-bold hover:bg-accent golden-glow"
                data-testid="button-create-blog-dashboard"
              >
                <Plus className="w-4 h-4 mr-2" />
                Neuer Blog Post
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-8 w-48" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i}>
                    <Skeleton className="w-full h-48" />
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Fehler beim Laden
              </h3>
              <p className="text-muted-foreground">
                Die Blog Posts konnten nicht geladen werden.
              </p>
            </div>
          ) : !blogPosts || blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-utensils text-3xl text-muted-foreground"></i>
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                Noch keine Blog Posts
              </h3>
              <p className="text-muted-foreground mb-8">
                Erstelle deinen ersten Blog Post und teile deine Testerfahrungen!
              </p>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="px-8 py-4 bg-primary text-primary-foreground font-bold hover:bg-accent golden-glow"
                data-testid="button-create-first-blog-dashboard"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ersten Blog Post Erstellen
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-heading font-bold text-foreground">
                  Deine Blog Posts ({blogPosts.length})
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div 
                      className="cursor-pointer"
                      onClick={() => setSelectedBlogId(post.id)}
                      data-testid={`card-dashboard-blog-${post.id}`}
                    >
                      {post.images && post.images.length > 0 ? (
                        <img 
                          src={post.images[0]} 
                          alt={post.title} 
                          className="w-full h-48 object-cover"
                          data-testid={`img-dashboard-blog-${post.id}`}
                        />
                      ) : (
                        <div className="w-full h-48 bg-muted flex items-center justify-center">
                          <i className="fas fa-image text-4xl text-muted-foreground"></i>
                        </div>
                      )}
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                          <i className={`${post.icon} text-white text-sm`}></i>
                        </div>
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-semibold">
                          {calculateOverallScore(post)}/10
                        </span>
                      </div>
                      <CardTitle className="text-lg truncate" data-testid={`text-dashboard-blog-title-${post.id}`}>
                        {post.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(post.createdAt)}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedBlogId(post.id)}
                          data-testid={`button-view-blog-${post.id}`}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Ansehen
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteBlog(post.id)}
                          disabled={deleteBlogMutation.isPending}
                          data-testid={`button-delete-blog-${post.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

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
