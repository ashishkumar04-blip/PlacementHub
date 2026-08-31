import React from 'react';
import { SKILL_CATEGORIES } from '../../config/portfolioData';
import { Cpu, Terminal, Sparkles, CheckCircle2, ShieldCheck, Database, Wrench } from 'lucide-react';

interface SkillsMatrixProps {
  playClickFeedback?: () => void;
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ playClickFeedback }) => {
  const getCategoryIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return Terminal;
      case 1:
        return Sparkles;
      case 2:
        return Database;
      default:
        return Wrench;
    }
  };

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-zinc-800/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-950/30 px-3 py-1 text-xs font-mono text-indigo-400 mb-3">
            <Cpu className="h-3.5 w-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Systems Competency & Tooling
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400">
            A breakdown of technologies across the software lifecycle, annotated with specific operational contexts.
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = getCategoryIcon(idx);
            return (
              <div 
                key={cat.title} 
                className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 sm:p-7 shadow-lg flex flex-col justify-between hover:border-zinc-700 transition-all"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-cyan-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 mb-5 font-mono">
                    {cat.description}
                  </p>

                  {/* Skills List with Context */}
                  <div className="space-y-3">
                    {cat.skills.map((skill) => (
                      <div 
                        key={skill.name} 
                        className={`rounded-xl border p-3 transition-colors ${
                          skill.highlight 
                            ? 'border-cyan-500/30 bg-cyan-950/20' 
                            : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-semibold text-zinc-100">
                              {skill.name}
                            </span>
                            {skill.highlight && (
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                            )}
                          </div>
                          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
                            {skill.level}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-zinc-400 font-sans leading-relaxed">
                          {skill.context}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Stack verified in production</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Ready for deployment
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
