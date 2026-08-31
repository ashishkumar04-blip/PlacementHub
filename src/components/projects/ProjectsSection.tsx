import React, { useState } from 'react';
import { Project, ProjectCategory } from '../../types/portfolio';
import { PROJECTS } from '../../config/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Layers, Cpu } from 'lucide-react';

interface ProjectsSectionProps {
  playClickFeedback?: () => void;
  selectedProjectId?: string | null;
  onClearSelectedProject?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  playClickFeedback,
  selectedProjectId,
  onClearSelectedProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Sync selectedProjectId prop if opened from Terminal or Command Palette
  React.useEffect(() => {
    if (selectedProjectId) {
      const found = PROJECTS.find((p) => p.id === selectedProjectId);
      if (found) {
        setActiveModalProject(found);
      }
    }
  }, [selectedProjectId]);

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'hardware', label: 'Embedded & Hardware' },
    { id: 'web', label: 'WebAudio & Canvas' },
    { id: 'systems', label: 'Full-Stack & MySQL' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const handleOpenModal = (proj: Project) => {
    setActiveModalProject(proj);
  };

  const handleCloseModal = () => {
    setActiveModalProject(null);
    onClearSelectedProject?.();
  };

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-zinc-800/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/30 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
              <Layers className="h-3.5 w-3.5" />
              <span>PROJECTS & SYSTEMS WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Hardware, Audio & Full-Stack
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
              Concrete hardware prototypes, real-time audio synthesizers, and full-stack relational database systems.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playClickFeedback?.();
                  setActiveCategory(cat.id);
                }}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                  activeCategory === cat.id
                    ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={handleOpenModal}
              playClickFeedback={playClickFeedback}
            />
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={handleCloseModal}
          playClickFeedback={playClickFeedback}
        />
      )}
    </section>
  );
};
