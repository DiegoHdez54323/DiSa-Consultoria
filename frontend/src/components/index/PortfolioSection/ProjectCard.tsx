import { ExternalLink, Github } from "lucide-react";
import type { Project } from "../../../data/portfolioProjects";

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <div className="group relative h-full bg-card/80">
      <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/30">
        {/* Image */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div
            className={`absolute inset-0 bg-linear-to-t ${project.color} opacity-40 group-hover:opacity-60 transition-opacity`}
          />

          {/* Category badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs font-inter font-medium text-foreground">
            {project.category}
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 rounded-full glass hover:bg-primary/20 transition-colors">
              <ExternalLink className="w-4 h-4 text-foreground" />
            </button>
            <button className="p-2 rounded-full glass hover:bg-primary/20 transition-colors">
              <Github className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <h3 className="font-sora text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="font-inter text-sm text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded-md bg-muted/50 text-xs font-inter text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
