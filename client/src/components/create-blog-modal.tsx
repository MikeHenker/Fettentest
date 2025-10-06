import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { X } from "lucide-react";
import type { InsertBlogPost } from "@shared/schema";

interface CreateBlogModalProps {
  onClose: () => void;
}

const iconOptions = [
  { value: "fas fa-hamburger", label: "Burger", icon: "🍔" },
  { value: "fas fa-pizza-slice", label: "Pizza", icon: "🍕" },
  { value: "fas fa-fish", label: "Sushi/Fisch", icon: "🍣" },
  { value: "fas fa-beer", label: "Bier", icon: "🍺" },
  { value: "fas fa-birthday-cake", label: "Kuchen/Dessert", icon: "🍰" },
  { value: "fas fa-blender", label: "Smoothie/Getränk", icon: "🥤" },
  { value: "fas fa-bowl-rice", label: "Suppe/Bowl", icon: "🍜" },
  { value: "fas fa-coffee", label: "Kaffee", icon: "☕" },
  { value: "fas fa-utensils", label: "Allgemein", icon: "🍽️" },
  { value: "fas fa-wine-glass", label: "Wein", icon: "🍷" },
];

export default function CreateBlogModal({ onClose }: CreateBlogModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    icon: "fas fa-utensils",
    tasteScore: 0,
    appearanceScore: 0,
    smellScore: 0,
    images: [] as string[],
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createBlogMutation = useMutation({
    mutationFn: async (blogData: InsertBlogPost) => {
      const response = await apiRequest("POST", "/api/blog-posts", blogData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Blog-Post erstellt",
        description: "Dein neuer Blog-Post wurde erfolgreich veröffentlicht!",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Fehler beim Erstellen",
        description: "Der Blog-Post konnte nicht erstellt werden. Bitte versuche es erneut.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Titel erforderlich",
        description: "Bitte gib einen Titel für deinen Blog-Post ein.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: "Inhalt erforderlich",
        description: "Bitte schreibe eine Bewertung für deinen Blog-Post.",
        variant: "destructive",
      });
      return;
    }

    if (formData.tasteScore < 0 || formData.tasteScore > 10 || 
        formData.appearanceScore < 0 || formData.appearanceScore > 10 || 
        formData.smellScore < 0 || formData.smellScore > 10) {
      toast({
        title: "Ungültige Bewertungen",
        description: "Bewertungen müssen zwischen 0 und 10 liegen.",
        variant: "destructive",
      });
      return;
    }

    createBlogMutation.mutate(formData);
  };

  const handleImageUrlAdd = () => {
    const url = prompt("Bitte gib die URL des Bildes ein:");
    if (url && url.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url.trim()]
      }));
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] overflow-y-auto golden-glow-strong p-0" data-testid="modal-create-blog">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-8">
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-3xl font-heading font-bold text-primary-foreground mb-2">
                Neuer Blog Post Erstellen
              </DialogTitle>
              <p className="text-primary-foreground/80">Teile deine Test-Ergebnisse mit der Community</p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
              data-testid="button-close-create-blog"
            >
              <X className="w-6 h-6 text-white" />
            </Button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8" data-testid="form-create-blog">
            {/* Blog Icon */}
            <div>
              <Label className="text-sm font-bold text-foreground mb-3">Blog Post Icon</Label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center border-4 border-border">
                  <i className={`${formData.icon} text-4xl text-white`}></i>
                </div>
                <div className="flex-1">
                  <Select 
                    value={formData.icon} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
                  >
                    <SelectTrigger data-testid="select-blog-icon">
                      <SelectValue placeholder="Icon auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center space-x-2">
                            <span>{option.icon}</span>
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-2">Wähle ein passendes Icon für deinen Blog-Post</p>
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-sm font-bold text-foreground">Blog Titel</Label>
              <Input
                id="title"
                type="text"
                placeholder="z.B. Premium Burger Deluxe Test"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="mt-3 text-lg border-2 border-border focus:border-primary"
                data-testid="input-blog-title"
              />
            </div>

            {/* Rating Scores */}
            <div>
              <Label className="text-sm font-bold text-foreground mb-4">Bewertungen</Label>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-background rounded-lg p-4 border border-border">
                  <Label htmlFor="tasteScore" className="text-sm font-semibold text-muted-foreground mb-2">
                    Geschmack
                  </Label>
                  <Input
                    id="tasteScore"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="0.0"
                    value={formData.tasteScore}
                    onChange={(e) => setFormData(prev => ({ ...prev, tasteScore: parseFloat(e.target.value) || 0 }))}
                    className="text-xl font-bold border border-border focus:border-primary"
                    data-testid="input-taste-score"
                  />
                </div>
                <div className="bg-background rounded-lg p-4 border border-border">
                  <Label htmlFor="appearanceScore" className="text-sm font-semibold text-muted-foreground mb-2">
                    Aussehen
                  </Label>
                  <Input
                    id="appearanceScore"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="0.0"
                    value={formData.appearanceScore}
                    onChange={(e) => setFormData(prev => ({ ...prev, appearanceScore: parseFloat(e.target.value) || 0 }))}
                    className="text-xl font-bold border border-border focus:border-primary"
                    data-testid="input-appearance-score"
                  />
                </div>
                <div className="bg-background rounded-lg p-4 border border-border">
                  <Label htmlFor="smellScore" className="text-sm font-semibold text-muted-foreground mb-2">
                    Geruch
                  </Label>
                  <Input
                    id="smellScore"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="0.0"
                    value={formData.smellScore}
                    onChange={(e) => setFormData(prev => ({ ...prev, smellScore: parseFloat(e.target.value) || 0 }))}
                    className="text-xl font-bold border border-border focus:border-primary"
                    data-testid="input-smell-score"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <Label htmlFor="content" className="text-sm font-bold text-foreground">Blog Inhalt</Label>
              <Textarea
                id="content"
                placeholder="Schreibe hier deine detaillierte Bewertung..."
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="mt-3 min-h-[300px] border-2 border-border focus:border-primary resize-y"
                data-testid="textarea-blog-content"
              />
            </div>

            {/* Image URLs */}
            <div>
              <Label className="text-sm font-bold text-foreground mb-3">Bilder vom Produkt</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-all cursor-pointer bg-background">
                <i className="fas fa-cloud-upload-alt text-5xl text-muted-foreground mb-4"></i>
                <p className="text-foreground font-semibold mb-2">Bilder hinzufügen</p>
                <p className="text-sm text-muted-foreground mb-4">Füge Bild-URLs hinzu</p>
                <Button 
                  type="button" 
                  onClick={handleImageUrlAdd}
                  className="bg-primary text-primary-foreground font-semibold hover:bg-accent"
                  data-testid="button-add-image"
                >
                  Bild-URL Hinzufügen
                </Button>
              </div>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-muted rounded-lg border border-border overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Bild ${index + 1}`} 
                          className="w-full h-full object-cover"
                          data-testid={`img-preview-${index}`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        data-testid={`button-remove-image-${index}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-border">
              <Button 
                type="button" 
                variant="outline"
                onClick={onClose}
                className="px-8 py-3 font-semibold"
                data-testid="button-cancel-create"
              >
                Abbrechen
              </Button>
              <Button
                type="submit"
                disabled={createBlogMutation.isPending}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold hover:bg-accent golden-glow"
                data-testid="button-submit-create"
              >
                {createBlogMutation.isPending ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Erstellen...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save mr-2"></i>
                    Blog Post Veröffentlichen
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
