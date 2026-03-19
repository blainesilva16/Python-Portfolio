import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'pt-BR' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.about': 'About me',
    'nav.language': 'Language',
    
    // Hero
    'hero.greeting': "Hi! I'm Blaine Silva.",
    'hero.title': 'A Python Developer',
    'hero.subtitle': 'Talk to my AI Agent to get to know about my qualifications!',
    'hero.placeholder': 'Ask anything...',
    
    // Projects
    'projects.title': 'My Projects',
    'projects.all': 'All',
    'projects.ai': 'AI',
    'projects.web': 'Web',
    'projects.tools': 'Tools',
    'projects.demo': 'Interactive Demo',
    'projects.howToUse': 'How to use',
    'projects.howCreated': 'How it was created',
    'projects.techStack': 'Tech Stack',
    'projects.viewGithub': 'View on GitHub',
    'projects.back': 'Back to Projects',
    
    // About
    'about.title': 'About Me',
    'about.bio': 'Biography',
    'about.skills': 'Skills',
    'about.experience': 'Experience',
    'about.contact': 'Contact',
    'about.bioText': 'Passionate Python developer with expertise in building scalable applications, automation tools, and AI-powered solutions. I love turning complex problems into elegant, efficient code.',
    'about.yearsExp': 'years of experience',
    'about.projectsCompleted': 'projects completed',
    'about.getInTouch': 'Get in Touch',
    
    // Chat
    'chat.title': 'AI Assistant',
    'chat.placeholder': 'Type your message...',
    'chat.send': 'Send',
    'chat.greeting': "Hello! I'm Blaine's AI assistant. Ask me anything about her skills, projects, experience or on what she's working now!",
    'chat.thinking': 'Thinking...',
    'chat.mockResponse': "Thanks for your question! This is a placeholder response. The actual AI integration will be connected to the Python backend.",
  },
  'pt-BR': {
    // Navbar
    'nav.home': 'Início',
    'nav.projects': 'Projetos',
    'nav.about': 'Sobre mim',
    'nav.language': 'Idioma',
    
    // Hero
    'hero.greeting': 'Olá! Eu sou Blaine Silva.',
    'hero.title': 'Uma Desenvolvedora Python',
    'hero.subtitle': 'Converse com meu Agente de IA para conhecer minhas qualificações!',
    'hero.placeholder': 'Pergunte qualquer coisa...',
    
    // Projects
    'projects.title': 'Meus Projetos',
    'projects.all': 'Todos',
    'projects.ai': 'IA',
    'projects.web': 'Web',
    'projects.tools': 'Ferramentas',
    'projects.demo': 'Demo Interativa',
    'projects.howToUse': 'Como usar',
    'projects.howCreated': 'Como foi criado',
    'projects.techStack': 'Tecnologias',
    'projects.viewGithub': 'Ver no GitHub',
    'projects.back': 'Voltar aos Projetos',
    
    // About
    'about.title': 'Sobre Mim',
    'about.bio': 'Biografia',
    'about.skills': 'Habilidades',
    'about.experience': 'Experiência',
    'about.contact': 'Contato',
    'about.bioText': 'Desenvolvedora Python apaixonada com experiência em construir aplicações escaláveis, ferramentas de automação e soluções com IA. Adoro transformar problemas complexos em código elegante e eficiente.',
    'about.yearsExp': 'anos de experiência',
    'about.projectsCompleted': 'projetos concluídos',
    'about.getInTouch': 'Entre em Contato',
    
    // Chat
    'chat.title': 'Assistente IA',
    'chat.placeholder': 'Digite sua mensagem...',
    'chat.send': 'Enviar',
    'chat.greeting': 'Olá! Sou a assistente de IA da Blaine. Pergunte-me qualquer coisa sobre suas habilidades, projetos, experiência ou no que ela está trabalhando agora!',
    'chat.thinking': 'Pensando...',
    'chat.mockResponse': 'Obrigado pela sua pergunta! Esta é uma resposta de exemplo. A integração real com IA será conectada ao backend Python.',
  },
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.about': 'Sobre mí',
    'nav.language': 'Idioma',
    
    // Hero
    'hero.greeting': '¡Hola! Soy Blaine Silva.',
    'hero.title': 'Una Desarrolladora Python',
    'hero.subtitle': '¡Habla con mi Agente de IA para conocer mis calificaciones!',
    'hero.placeholder': 'Pregunta lo que quieras...',
    
    // Projects
    'projects.title': 'Mis Proyectos',
    'projects.all': 'Todos',
    'projects.ai': 'IA',
    'projects.web': 'Web',
    'projects.tools': 'Herramientas',
    'projects.demo': 'Demo Interactiva',
    'projects.howToUse': 'Cómo usar',
    'projects.howCreated': 'Cómo fue creado',
    'projects.techStack': 'Tecnologías',
    'projects.viewGithub': 'Ver en GitHub',
    'projects.back': 'Volver a Proyectos',
    
    // About
    'about.title': 'Sobre Mí',
    'about.bio': 'Biografía',
    'about.skills': 'Habilidades',
    'about.experience': 'Experiencia',
    'about.contact': 'Contacto',
    'about.bioText': 'Desarrolladora Python apasionada con experiencia en construir aplicaciones escalables, herramientas de automatización y soluciones con IA. Me encanta convertir problemas complejos en código elegante y eficiente.',
    'about.yearsExp': 'años de experiencia',
    'about.projectsCompleted': 'proyectos completados',
    'about.getInTouch': 'Contáctame',
    
    // Chat
    'chat.title': 'Asistente IA',
    'chat.placeholder': 'Escribe tu mensaje...',
    'chat.send': 'Enviar',
    'chat.greeting': '¡Hola! Soy el asistente de IA de Blaine. ¡Pregúntame cualquier cosa sobre sus habilidades, proyectos o experiencia!',
    'chat.thinking': 'Pensando...',
    'chat.mockResponse': '¡Gracias por tu pregunta! Esta es una respuesta de ejemplo. La integración real con IA se conectará al backend de Python.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
