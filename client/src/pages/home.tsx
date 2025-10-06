import { useState } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import BlogPostsSection from "@/components/blog-posts-section";
import Footer from "@/components/footer";
import LoginModal from "@/components/login-modal";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <HeroSection 
        onScrollToBlogs={() => scrollToSection("blogs")}
        onShowLogin={() => setShowLoginModal(true)}
      />
      
      <AboutSection />
      
      <BlogPostsSection />
      
      <Footer />

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
}
