import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CategoryTabs from "@/components/CategoryTabs";
import ProjectCard from "@/components/ProjectCard";

const categories = [
  "All Projects",
  "Python Core",
  // "Games",
  "Automations",
  "External Libraries",
  "APIs",
  "Databases",
  "Data Science",
  "Machine Learning",
];

const projects = [
  {
    id: 1,
    title: "To-do List",
    description: "Keep your Tasks organized with this App where you can create Lists to categorize your to-dos.",
    image: "/placeholder.svg",
    color: "#4ECDC4",
    category: "Web Development",
    projectId: "todo-list",
  },
  {
    id: 2,
    title: "Year Tracker",
    description: "Create Trackers for your Activities like Mood and Exercises to keep track through the whole Year.",
    image: "/placeholder.svg",
    color: "#FF6B6B",
    category: "Web Development",
    projectId: "year-tracker",
  },
  {
    id: 3,
    title: "Text to Speech Converter",
    description: "Convert Text to .mp3 Audio. You can type the text or extract text from PDF, then select language, voice and Convert!",
    image: "/placeholder.svg",
    color: "#FFE66D",
    category: "Web Development",
    projectId: "text-to-speech",
  },
  {
    id: 7,
    title: "Cafe & Wifi",
    description: "Find the best cafes for remote work with wifi strength ratings, coffee quality, and location details.",
    image: "/placeholder.svg",
    color: "#AD864B",
    category: "Web Development",
    projectId: "cafe-wifi",
  },
  {
    id: 4,
    title: "Snake Game",
    description: "Classic snake game built with Python and Pygame. Control the snake and eat food to grow!",
    image: "/placeholder.svg",
    color: "#95E1D3",
    category: "Games",
    projectId: "snake-game",
  },
  {
    id: 5,
    title: "Web Scraper",
    description: "Automated web scraper using BeautifulSoup and requests to extract data from websites.",
    image: "/placeholder.svg",
    color: "#DDA0DD",
    category: "Automations",
    projectId: "web-scraper",
  },
  {
    id: 6,
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard built with Plotly to visualize complex datasets with charts and graphs.",
    image: "/placeholder.svg",
    color: "#87CEEB",
    category: "Data Science",
    projectId: "data-viz-dashboard",
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [projects, setProjects] = useState([]);

  // Get projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL ?? '';
        const res = await fetch(`${API_BASE}/api/projects`);
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        setProjects(json.projects);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setProjects([]);
      } 
    };
    fetchProjects();
  }, []);

  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="glass-card glow-accent p-8 md:p-12">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              My {activeCategory === "All Projects" ? "whole set of Python" : activeCategory} Projects
            </h1>
            <p className="text-muted-foreground mb-8">
              {activeCategory === "All Projects" ? "Check all of my Python Projects!" : `Here are some of the projects I've worked on that are focused on ${activeCategory}. Click on the links to try them out!`}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    color={project.color}
                    projectId={project.projectId}
                  />
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No projects found in this category yet.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
