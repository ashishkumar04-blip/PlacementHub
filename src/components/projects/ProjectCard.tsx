import React from 'react';
import { Project } from '../../types/portfolio';
import { 
  ArrowUpRight, 
  Cpu, 
  Layers, 
  ExternalLink
} from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
  playClickFeedback?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenModal,
  playClickFeedback,
}) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'systems':
        return 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30';
      case 'distributed':
        return 'text-indigo-400 border-indigo-500/30 bg-indigo-950/30';
      case 'frontend':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30';
      case 'ai':
        return 'text-amber-400 border-amber-500/30 bg-amber-950/30';
      default:
        return 'text-zinc-400 border-zinc-700 bg-zinc-900';
    }
  };

  return (
    <div 
      className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 sm:p-7 shadow-lg transition-all hover:border-zinc-700 hover:bg-zinc-900/60 hover:shadow-card-elevated"
    >
      <div className="space-y-4">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[11px] font-semibold ${getCategoryColor(project.category)}`}>
            <Cpu className="h-3 w-3" />
            {project.category.toUpperCase()}
          </span>
          <span className="font-mono text-xs text-zinc-500">{project.year}</span>
        </div>

        {/* Title & Tagline */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm font-mono text-zinc-400 mt-1">
            {project.tagline}
          </p>
        </div>

        {/* The Concrete Problem */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 text-xs text-zinc-300 leading-relaxed">
          <span className="text-zinc-500 font-mono text-[10px] block uppercase font-semibold mb-1">Architecture Objective:</span>
          {project.problem}
        </div>

        {/* Key Metrics HUD */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-2 pt-1 font-mono">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="rounded-lg border border-zinc-800/60 bg-zinc-900/80 p-2 text-center">
                <div className="text-sm font-bold text-cyan-400">{m.value}</div>
                <div className="text-[10px] text-zinc-500 mt-0.5 truncate">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-zinc-800 bg-zinc-900/70 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="rounded-md border border-zinc-800 bg-zinc-900/40 px-2 py-0.5 font-mono text-[11px] text-zinc-500">
              +{project.stack.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Bottom CTA Actions */}
      <div className="mt-6 flex items-center justify-between border-t border-zinc-800/80 pt-4">
        <button
          onClick={() => {
            playClickFeedback?.();
            onOpenModal(project);
          }}
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Inspect Architecture & Code</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              title="View Repository"
              className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              title="Live Interactive Demo"
              className="p-1.5 text-zinc-500 hover:text-cyan-400 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
