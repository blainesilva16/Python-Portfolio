import { ArrowLeftCircle, Github, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import TodoListDemo from "@/projects/todo-list/TodoListDemo";
import YearTrackerDemo from "@/projects/year-tracker/YearTrackerDemo";
import CafeWifiDemo from "@/projects/cafe-wifi/CafeWifiDemo";
// Tech stack icons component
const TechIcon = ({ name, icon }: { name: string; icon: string }) => (
  <div className="group relative">
    <div className="p-3 bg-card/50 rounded-xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:scale-110 cursor-pointer">
      <span className="text-2xl">{icon}</span>
    </div>
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-card text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border/30">
      {name}
    </span>
  </div>
);

// Sample project data - you can replace this with your actual projects
const projectsData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  howToUse: string[];
  howItWasCreated: string[];
  techStack: { name: string; icon: string }[];
  githubUrl: string;
  demoContent: React.ReactNode;
}> = {
  "text-to-speech": {
    title: "Text to Speech Converter",
    subtitle: "Listen to your texts",
    description: "Convert any text into natural-sounding speech with multiple language and accent options.",
    howToUse: [
      "Write a text on textarea or click on button to select text from PDF.",
      "Choose the language for the speech.",
      "Choose your preferred accent among the ones available for that language.",
      "Click on \"Convert to Speech\" and wait.",
      "The audio will be played for you as soon as it is created.",
      "You can download the audio and clear textarea after all."
    ],
    howItWasCreated: [
      "This Text to Speech Converter was built using Flask, Bootstrap, and JavaScript. It utilizes AJAX for dynamic updates without page reloads.",
      "It uses the pypdf library (pure-python) to extract text from PDF and the gTTS (Google Text-to-Speech) library to make the conversion using the given accent.",
      "It features a responsive design, allowing you to manage your tasks seamlessly on any device."
    ],
    techStack: [
      { name: "Flask", icon: "🐍" },
      { name: "pypdf", icon: "📄" },
      { name: "gTTS", icon: "🔊" },
      { name: "AJAX", icon: "⚡" },
      { name: "Bootstrap", icon: "🎨" }
    ],
    githubUrl: "https://github.com/blainesilva16/text-to-speech-py",
    demoContent: <TextToSpeechDemo />
  },
  "todo-list": {
    title: "To-do List",
    subtitle: "Get hold of your tasks",
    description: "Keep your Tasks organized with this App where you can create Lists to categorize your to-dos.",
    howToUse: [
      "Create a new list by typing in the input field and clicking \"Create\".",
      "Click on a list to view its tasks.",
      "Add tasks by typing in the task input field and clicking \"Add\".",
      "Set deadlines for tasks using the calendar icon and categorize them by color.",
      "Edit or delete lists and tasks as needed.",
      "Drag a task to move it to another list or to reorder within lists.",
      "Highlight a task and mark it as completed."
    ],
    howItWasCreated: [
      "This To-do List was built using Flask, Bootstrap, and JavaScript. It utilizes AJAX for dynamic updates without page reloads.",
      "It features a responsive design, allowing you to manage your tasks seamlessly on any device.",
      "Tasks can be color-coded and have deadlines, making it easy to prioritize and organize your work.",
      "This demo version stores data in localStorage. In the live version, lists and tasks are stored in a SQLite database managed through SQLAlchemy."
    ],
    techStack: [
      { name: "Flask", icon: "🐍" },
      { name: "JavaScript", icon: "⚡" },
      { name: "Bootstrap", icon: "🎨" },
      { name: "SQLite", icon: "🗄️" }
    ],
    githubUrl: "https://github.com/blainesilva16/todo-list-py",
    demoContent: <TodoListDemo />
  },
  "year-tracker": {
    title: "Year Tracker",
    subtitle: "Track your Activities along the Year",
    description: "Create Trackers for your Activities like Mood and Exercises to keep track through the whole Year.",
    howToUse: [
      "Choose a track.",
      "Click on a color to select it then click on a day to apply the color.",
      "Click again on the day to remove the applied color.",
      "Create more color codes for the trackers.",
      "Edit or delete color codes as well as trackers.",
      "Add more trackers to get hold of different activities."
    ],
    howItWasCreated: [
      "This Year Tracker was built using Flask, Bootstrap, and JavaScript. It utilizes AJAX for dynamic updates without page reloads.",
      "It features a responsive design, allowing you to manage your tasks seamlessly on any device.",
      "Color codes and trackers are fully customizable so that you can keep track of many activities as mood, exercises, sleep time, goals achieved and more.",
      "This demo version stores data in localStorage. In the live version, trackers and color codes are stored in a SQLite database managed through SQLAlchemy."
    ],
    techStack: [
      { name: "Flask", icon: "🐍" },
      { name: "JavaScript", icon: "⚡" },
      { name: "Bootstrap", icon: "🎨" },
      { name: "SQLite", icon: "🗄️" }
    ],
    githubUrl: "https://github.com/blainesilva16/year-tracker-py",
    demoContent: <YearTrackerDemo />
  },
  "cafe-wifi": {
    title: "Cafe & Wifi",
    subtitle: "Find places to work with good coffee",
    description: "A web application to discover and share the best cafes for remote work, featuring wifi strength ratings, coffee quality, and more.",
    howToUse: [
      "Browse all cafes or sort by A-Z, Coffee Rating, or Wifi Strength using the tabs.",
      "Use the search bar to find cafes by name.",
      "Click \"Get a Random Cafe\" to discover a new spot.",
      "On mobile, tap cards to flip and see cafe details.",
      "Click on cafe links to view their location on Google Maps.",
      "Add new cafes by clicking \"Add a Cafe\" button."
    ],
    howItWasCreated: [
      "This Cafe & Wifi finder was built using Flask with a RESTful API backend and a Bootstrap frontend.",
      "The application features a SQLite database managed through SQLAlchemy to store cafe information.",
      "It includes full CRUD operations: Create, Read, Update, and Delete cafes through the API.",
      "The frontend uses interactive flip cards for mobile responsiveness and tab-based sorting.",
      "This demo version uses mock data. In the live version, data is fetched from the Flask API."
    ],
    techStack: [
      { name: "Flask", icon: "🐍" },
      { name: "SQLAlchemy", icon: "🗄️" },
      { name: "Bootstrap", icon: "🎨" },
      { name: "REST API", icon: "🔌" },
      { name: "JavaScript", icon: "⚡" }
    ],
    githubUrl: "https://github.com/blainesilva16/cafe-wifi-py",
    demoContent: <CafeWifiDemo />
  }
};

// Demo component for Text to Speech
function TextToSpeechDemo() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [accent, setAccent] = useState("us");

  const accents: Record<string, { value: string; label: string }[]> = {
    en: [
      { value: "com.au", label: "English (Australia)" },
      { value: "co.uk", label: "English (United Kingdom)" },
      { value: "us", label: "English (United States)" },
      { value: "ca", label: "English (Canada)" },
      { value: "co.in", label: "English (India)" }
    ],
    es: [
      { value: "es", label: "Spanish (Spain)" },
      { value: "com.mx", label: "Spanish (Mexico)" }
    ],
    fr: [
      { value: "fr", label: "French (France)" },
      { value: "ca", label: "French (Canada)" }
    ],
    pt: [
      { value: "com.br", label: "Portuguese (Brazil)" },
      { value: "pt", label: "Portuguese (Portugal)" }
    ]
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Text Input Area */}
      <div className="glass-card p-6 space-y-4">
        <div className="space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here or extract from PDF..."
            className="w-full h-40 bg-background/50 border border-border/30 rounded-xl p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <button className="w-full py-3 bg-accent/20 border border-accent/30 rounded-xl text-accent hover:bg-accent/30 transition-colors">
          Extract text from PDF
        </button>
      </div>

      {/* Options Area */}
      <div className="glass-card p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Select Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-background/50 border border-border/30 rounded-xl p-3 text-foreground focus:outline-none focus:border-accent/50"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="pt">Portuguese</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Select Accent:</label>
            <select
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              className="w-full bg-background/50 border border-border/30 rounded-xl p-3 text-foreground focus:outline-none focus:border-accent/50"
            >
              {accents[language]?.map((a) => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
          </div>
        </div>

        <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/80 transition-colors font-medium">
          Convert to Speech
        </button>

        <div className="border-t border-border/30 pt-4">
          <div className="bg-background/30 rounded-xl p-4 flex items-center justify-center">
            <audio controls className="w-full" style={{ filter: 'invert(1)' }}>
              <source src="" type="audio/mpeg" />
            </audio>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setText("")}
            className="flex-1 py-3 bg-muted/50 border border-border/30 rounded-xl text-muted-foreground hover:bg-muted/70 transition-colors"
          >
            Clear Text
          </button>
          <button className="flex-1 py-3 bg-accent/20 border border-accent/30 rounded-xl text-accent hover:bg-accent/30 transition-colors">
            Download MP3
          </button>
        </div>
      </div>
    </div>
  );
}

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectsData[projectId || "text-to-speech"] || projectsData["text-to-speech"];

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <Link 
        to="/projects" 
        className="fixed top-6 left-6 z-50 text-foreground/70 hover:text-foreground transition-colors"
      >
        <ArrowLeftCircle size={32} />
      </Link>

      {/* Main Demo Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4 text-center">
          {project.title}
        </h1>
        <p className="text-muted-foreground text-lg mb-12">{project.subtitle}</p>
        
        <div className="w-full max-w-4xl">
          {project.demoContent}
        </div>
      </section>

      {/* How to Use & How it was Created */}
      <section className="bg-card/30 py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* How to Use */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
              How to use this {project.title.split(' ')[0]}
              <span className="text-accent">→</span>
            </h2>
            <div className="glass-card p-6 space-y-4">
              {project.howToUse.map((step, index) => (
                <p key={index} className="text-muted-foreground">
                  <span className="text-accent font-bold mr-2">{index + 1}.</span>
                  {step}
                </p>
              ))}
            </div>
          </div>

          {/* How it was Created */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <span className="text-accent">←</span>
                How it was created
              </h2>
              <div className="flex gap-2">
                {project.techStack.map((tech, index) => (
                  <TechIcon key={index} name={tech.name} icon={tech.icon} />
                ))}
              </div>
            </div>
            <div className="glass-card p-6 space-y-4">
              {project.howItWasCreated.map((text, index) => (
                <p key={index} className="text-muted-foreground">{text}</p>
              ))}
              <p className="text-muted-foreground">
                Feel free to explore the code on{" "}
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline inline-flex items-center gap-1"
                >
                  Github <Github size={16} />
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
