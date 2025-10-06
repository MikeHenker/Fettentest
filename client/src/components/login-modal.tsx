import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@assets/image_1759770556462.png";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(username, password);
      toast({
        title: "Erfolgreich eingeloggt",
        description: "Willkommen zurück, Fettiger Fettsack!",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Login fehlgeschlagen",
        description: "Bitte überprüfe deine Anmeldedaten.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md golden-glow-strong border-2 border-primary/30">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4">
            <img 
              src={logoImage} 
              alt="Logo" 
              className="w-20 h-20 mx-auto golden-glow"
              data-testid="img-login-logo"
            />
          </div>
          <DialogTitle className="text-3xl font-heading font-bold text-primary mb-2">
            Fettiger Fettsack Login
          </DialogTitle>
          <p className="text-muted-foreground">Zugang für exklusive Tester</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-login">
          <div>
            <Label htmlFor="username" className="text-sm font-semibold text-foreground">
              Benutzername
            </Label>
            <div className="relative mt-2">
              <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"></i>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-12 border-2 border-border focus:border-primary"
                data-testid="input-username"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-semibold text-foreground">
              Passwort
            </Label>
            <div className="relative mt-2">
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"></i>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 border-2 border-border focus:border-primary"
                data-testid="input-password"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-primary text-primary-foreground font-bold hover:bg-accent golden-glow text-lg"
            data-testid="button-submit-login"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin mr-2"></i>
            ) : (
              <i className="fas fa-sign-in-alt mr-2"></i>
            )}
            {isLoading ? "Fettiger Fettsack einloggen..." : "Fettiger Fettsack einloggen"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
