import React from 'react';
import { PERSONAL_INFO } from '../../config/portfolioData';
import { TerminalWidget } from './TerminalWidget';
import { 
  ArrowUpRight, 
  Cpu, 
  Radio, 
  FileText, 
  Layers, 
  Sparkles,
  ShieldCheck,
  Zap,
  Sliders
} from 'lucide-react';

interface HeroProps {
  playClickFeedback?: () => void;
  onSelectProject?: (projectId: string) => void;
  onOpenCommandPalette?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  playClickFeedback,
  onSelectProject,
  onOpenCommandPalette
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Identification Pill */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-3 py-1 text-xs font-mono text-zinc-300 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400"></span>
            <span className="text-zinc-400">ROLE:</span>
            <span className="font-semibold text-zinc-100">{PERSONAL_INFO.role}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800/80 bg-zinc-900/60 px-3 py-1 text-xs font-mono text-zinc-400">
            <Radio className="h-3 w-3 text-emerald-400 animate-pulse" />
            <span>{PERSONAL_INFO.location}</span>
          </div>
        </div>

        {/* Hero Grid: Main Pitch + Interactive Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Thesis & Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">low-latency</span> systems & tactile interfaces.
              </h1>
              
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-light">
                {PERSONAL_INFO.bio}
              </p>
            </div>

            {/* Core Working Tenets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-cyan-400 mb-1.5">
                  <Zap className="h-4 w-4" />
                  <span className="font-mono text-xs font-semibold text-zinc-200">Zero-Latency</span>
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Local-first state, Web Workers & micro-second memory caching over network blocking.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-indigo-400 mb-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="font-mono text-xs font-semibold text-zinc-200">Distributed Rigor</span>
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Idempotent consumer groups, partition tolerance & explicit state machines.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
                  <Sliders className="h-4 w-4" />
                  <span className="font-mono text-xs font-semibold text-zinc-200">Tactile Craft</span>
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Sub-pixel alignment, keyboard ergonomics, and responsive audio-visual feedback.
                </p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={playClickFeedback}
                className="group inline-flex items-center gap-2 rounded-xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-white hover:shadow-cyan-glow"
              >
                <Layers className="h-4 w-4 text-zinc-950 group-hover:rotate-6 transition-transform" />
                <span>Explore Case Studies</span>
                <ArrowUpRight className="h-4 w-4 text-zinc-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#dsp-workbench"
                onClick={playClickFeedback}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-900/90 px-4 py-3 text-sm font-medium text-zinc-200 transition-all hover:border-cyan-500/50 hover:bg-zinc-800 hover:text-white"
              >
                <Cpu className="h-4 w-4 text-cyan-400" />
                <span>Audio DSP Workbench</span>
              </a>

              <button
                onClick={() => {
                  playClickFeedback?.();
                  onOpenCommandPalette?.();
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/80 px-3.5 py-3 text-sm font-mono text-zinc-400 transition-all hover:border-zinc-700 hover:text-zinc-200"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="hidden sm:inline">Palette</span>
                <kbd className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 text-[11px] text-zinc-300">
                  ⌘K
                </kbd>
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive CLI */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/10 to-transparent blur-md -z-10" />
              <TerminalWidget 
                playClickFeedback={playClickFeedback} 
                onSelectProject={onSelectProject} 
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
