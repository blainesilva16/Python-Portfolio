import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ChatProvider } from "@/contexts/ChatContext";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
// import TodoList from "./pages/TodoList";
// import TextToSpeech from "./pages/TextToSpeech";
// import YearTracker from "./pages/YearTracker";
// import SnakeGame from "./pages/SnakeGame";
// import WebScraper from "./pages/WebScraper";
// import TurtleRaceGame from "./pages/TurtleRaceGame";
// import DataDashboard from "./pages/DataDashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ChatProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              {/* Explicit routes for project pages (clicking a ProjectCard links to `/project/<projectId>`) */}
              {/* <Route path="/project/todo-list" element={<TodoList />} />
              <Route path="/project/year-tracker" element={<YearTracker />} />
              <Route path="/project/text-to-speech" element={<TextToSpeech />} />
              <Route path="/project/snake-game" element={<SnakeGame />} />
              <Route path="/project/web-scraper" element={<WebScraper />} />
              <Route path="/project/turtle-race" element={<TurtleRaceGame />} />
              <Route path="/project/data-viz-dashboard" element={<DataDashboard />} /> */}
              {/* Fallback generic detail route */}
              <Route path="/project/:projectId" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ChatProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
