import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChat } from "@/contexts/ChatContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const { setIsOpen, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setIsOpen(true);
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="glass-card glow-accent p-10 md:p-16 max-w-2xl mx-4 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 shimmer-text">
          {t('hero.greeting')}
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
          {t('hero.title')}
        </h2>
        <p className="text-muted-foreground mb-8">
          {t('hero.subtitle')}
        </p>
        <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('hero.placeholder')}
            className="w-full pl-4 pr-12 py-6 bg-muted/50 border-border/50 rounded-full text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-secondary/50"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
