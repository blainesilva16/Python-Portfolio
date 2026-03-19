import { ArrowLeftCircle, Github, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import projectsData from "@/hooks/use-projects";

// Tech stack icons component
const TechIcon = ({ name, icon }: { name: string; icon: string | React.ReactNode }) => (
  <div className="group relative">
    <div className="p-3 bg-card/50 rounded-xl border border-border/30 hover:border-accent/50 transition-all duration-300 hover:scale-110 cursor-pointer">
      <span className="text-2xl">
        {typeof icon === "string" || typeof icon === "number"
          ? icon
          : <FontAwesomeIcon icon={icon as any} />}
      </span>
    </div>
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-card text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border/30">
      {name}
    </span>
  </div>
);

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectsData[projectId || "default"] || projectsData["default"];

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
        
        {/* <div className="w-full max-w-4xl"> */}
        <div className="w-full">
          {project.demoContent}
        </div>
      </section>

      {/* How to Use & How it was Created */}
      <section className="bg-card/30 py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* How to Use */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
              How to use this {project.title.split(' ')}
              <span className="text-accent">↓</span>
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
                <span className="text-accent">↓</span>
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