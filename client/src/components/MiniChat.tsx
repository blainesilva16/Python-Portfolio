import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Bot, User } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const MiniChat = () => {
  const { isOpen, setIsOpen, messages, sendMessage, isLoading } = useChat();
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:scale-110 transition-transform animate-fade-in"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col animate-scale-in overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-secondary/20">
            <Bot className="w-5 h-5 text-secondary" />
          </div>
          <span className="font-semibold text-foreground">{t('chat.title')}</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-secondary/20 shrink-0">
              <Bot className="w-4 h-4 text-secondary" />
            </div>
            <div className="bg-muted/50 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-foreground">
              {t('chat.greeting')}
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`p-2 rounded-full shrink-0 ${
              message.role === 'user' ? 'bg-primary/20' : 'bg-secondary/20'
            }`}>
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-primary" />
              ) : (
                <Bot className="w-4 h-4 text-secondary" />
              )}
            </div>
            <div className={`rounded-2xl px-4 py-3 text-sm max-w-[80%] ${
              message.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-tr-none'
                : 'bg-muted/50 text-foreground rounded-tl-none'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-secondary/20 shrink-0">
              <Bot className="w-4 h-4 text-secondary" />
            </div>
            <div className="bg-muted/50 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-muted-foreground">
              {t('chat.thinking')}
              <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-muted/20">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chat.placeholder')}
            className="flex-1 bg-background/50 border-border/50"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MiniChat;
