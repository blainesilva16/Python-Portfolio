import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  messages: Message[];
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  sendMessage: (content: string) => void;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (content: string, role: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    addMessage(content, 'user');
    setIsLoading(true);

    // Try calling backend API; fall back to mock reply on error
    try {
      const API_BASE = import.meta.env.VITE_API_URL ?? '';
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const json = await res.json();
      const reply = json.reply || "Sorry, no reply from server.";
      addMessage(reply, 'assistant');
    } catch (err) {
      // fallback mock response
      addMessage(
        "Thanks for your question! This is a placeholder response. The actual AI integration will be connected to the Python backend.",
        'assistant'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ isOpen, setIsOpen, messages, addMessage, sendMessage, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
