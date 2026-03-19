import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  color: string;
  link?: string;
  projectId?: string;
}

const ProjectCard = ({ title, description, image, color, link, projectId }: ProjectCardProps) => {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (projectId) {
      return (
        <Link to={`/project/${projectId}`} className="block">
          {children}
        </Link>
      );
    }
    return <>{children}</>;
  };

  return (
    <CardWrapper>
      <div className="project-card group cursor-pointer">
        <div
          className="aspect-video overflow-hidden rounded-t-2xl"
          style={{ backgroundColor: color }}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="text-center text-sm font-medium" style={{ color: '#1a1a2e' }}>
              {title}
            </div>
            <img
              src={image}
              alt={title}
              className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="bg-card p-6 rounded-b-2xl border border-t-0 border-border/30">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {description}
              </p>
            </div>
            {link && !projectId && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 p-2 rounded-lg bg-muted/50 hover:bg-secondary hover:text-secondary-foreground transition-all"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default ProjectCard;
