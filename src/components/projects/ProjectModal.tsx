import React, { useState } from 'react';
import { Project } from '../../types/portfolio';
import { 
  X, 
  Layers, 
  Cpu, 
  Code2, 
  Activity, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  Copy,
  Check
} from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  playClickFeedback?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  playClickFeedback,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'challenges' | 'code' | 'outcomes'>('architecture');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet?.code) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopiedCode(true);
      playClickFeedback?.();
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-zinc-800/80 bg-zinc-900/60 p-5 sm:p-6">
          <div className="space-y-1.5 pr-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30 font-semibold">
                {project.category.toUpperCase()} CASE STUDY
              </span>
              <span className="font-mono text-xs text-zinc-500">{project.year}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-zinc-400">{project.tagline}</p>
          </div>

          <button
            onClick={() => {
              playClickFeedback?.();
              onClose();
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-zinc-800 bg-zinc-950 px-5 pt-2 text-xs font-mono overflow-x-auto">
          {[
            { id: 'architecture', label: 'System Architecture', icon: Layers },
            { id: 'challenges', label: 'Engineering Hurdles', icon: AlertTriangle },
            { id: 'code', label: 'Code & Implementation', icon: Code2 },
            { id: 'outcomes', label: 'Outcomes & Metrics', icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClickFeedback?.();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`flex items-center gap-2 border-b-2 px-3.5 py-2.5 font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-cyan-400 text-cyan-400 bg-zinc-900/50'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* 1. Architecture Tab */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-mono text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  System Architecture Overview
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80">
                  {project.architecture}
                </p>
              </div>

              {/* Interactive Architecture Flow Diagram */}
              <div>
                <h4 className="font-mono text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Data Pipeline & Component Nodes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {project.architectureNodes.map((node, idx) => (
                    <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 relative group hover:border-cyan-500/40 transition-colors">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[10px] text-zinc-500">STAGE 0{idx + 1}</span>
                        <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                      </div>
                      <h5 className="font-semibold text-sm text-zinc-100">{node.name}</h5>
                      <p className="text-xs text-zinc-400 mt-1">{node.role}</p>
                      <div className="mt-2 pt-2 border-t border-zinc-800/80">
                        <span className="font-mono text-[11px] text-cyan-300">{node.tech}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack Grid */}
              <div>
                <h4 className="font-mono text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
                  Core Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((st) => (
                    <span key={st} className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-300">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. Challenges & Solutions Tab */}
          {activeTab === 'challenges' && (
            <div className="space-y-6">
              <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-5 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm font-mono">
                  <AlertTriangle className="h-4 w-4" />
                  <span>The Root Problem</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-950/10 p-5 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm font-mono">
                  <Zap className="h-4 w-4" />
                  <span>Core Engineering Bottleneck</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm font-mono">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>The Architectural Solution</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          )}

          {/* 3. Code Tab */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              {project.codeSnippet ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-2 text-xs font-mono">
                    <span className="text-zinc-300 flex items-center gap-2">
                      <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                      {project.codeSnippet.filename}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-zinc-300 overflow-x-auto bg-zinc-950/90 leading-relaxed">
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                  <div className="border-t border-zinc-800/80 bg-zinc-900/40 p-3 text-xs text-zinc-400 font-mono">
                    💡 {project.codeSnippet.description}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-zinc-800 p-8 text-center text-zinc-500 font-mono text-xs">
                  Source code repository available on request or via GitHub link.
                </div>
              )}
            </div>
          )}

          {/* 4. Outcomes & Metrics Tab */}
          {activeTab === 'outcomes' && (
            <div className="space-y-6">
              {project.metrics && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-center">
                      <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">
                        {m.value}
                      </div>
                      <div className="font-mono text-xs text-zinc-400 mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
                <h4 className="font-mono text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Verified Deliverables & Benchmarks
                </h4>
                <ul className="space-y-2.5 text-sm text-zinc-300">
                  {project.results.map((res, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-normal">{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between border-t border-zinc-800/80 bg-zinc-900/60 p-4 sm:p-5">
          <div className="text-xs font-mono text-zinc-500">
            Role: <span className="text-zinc-300 font-medium">{project.role}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                onClick={onClose}
                className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-cyan-400 transition-colors shadow-sm"
              >
                <span>Live Interactive</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
