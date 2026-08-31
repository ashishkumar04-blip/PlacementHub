import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../config/portfolioData';
import { useLiveClock } from '../../hooks/useLiveClock';
import { 
  Terminal, 
  Search, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Cpu, 
  Layers, 
  Briefcase, 
  Mail,
  Activity,
  FileText,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResumeModal: () => void;
  audioFeedbackEnabled: boolean;
  onToggleAudioFeedback: () => void;
  playClickFeedback?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenResumeModal,
  audioFeedbackEnabled,
  onToggleAudioFeedback,
  playClickFeedback
}) => {
  const { timeStr } = useLiveClock();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Projects', href: '#projects', icon: Layers },
    { name: 'DSP Workbench', href: '#dsp-workbench', icon: Activity },
    { name: 'Systems & Skills', href: '#skills', icon: Cpu },
    { name: 'Essays', href: '#writing', icon: BookOpen },
    { name: 'Timeline', href: '#experience', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const handleNavClick = () => {
    playClickFeedback?.();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand & Status */}
        <div className="flex items-center gap-3">
          <a 
            href="#" 
            className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-zinc-100 hover:text-cyan-400 transition-colors"
            onClick={playClickFeedback}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700/80 bg-zinc-900/90 text-cyan-400 shadow-sm group-hover:border-cyan-500/40 group-hover:shadow-cyan-glow transition-all">
              <Terminal className="h-4 w-4" />
            </div>
            <div>
              <span className="font-semibold">{PERSONAL_INFO.name}</span>
              <span className="hidden text-xs text-zinc-500 sm:inline ml-2">/ systems.dev</span>
            </div>
          </a>

          {/* Live Availability Pill */}
          <div className="hidden items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/30 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400 lg:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            </span>
            <span>Available</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={playClickFeedback}
              className="rounded-md px-3 py-1.5 text-xs tracking-wide transition-all hover:bg-zinc-800/60 hover:text-zinc-100"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Resume Preview Trigger Button */}
          <button
            onClick={() => {
              playClickFeedback?.();
              onOpenResumeModal();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1.5 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
          >
            <FileText className="h-3.5 w-3.5 text-cyan-400" />
            <span>CV</span>
          </button>

          {/* Live IST Clock */}
          <div className="hidden xl:flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/50 px-2.5 py-1 font-mono text-[11px] text-zinc-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{timeStr || 'IST'}</span>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              onToggleAudioFeedback();
              playClickFeedback?.();
            }}
            title={audioFeedbackEnabled ? "Mute interactive audio feedback" : "Enable tactile sound feedback"}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all ${
              audioFeedbackEnabled 
                ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-400 shadow-cyan-glow' 
                : 'border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            {audioFeedbackEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              playClickFeedback?.();
              onOpenCommandPalette();
            }}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-2.5 py-1.5 text-xs text-zinc-400 shadow-sm transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200"
          >
            <Search className="h-3.5 w-3.5 text-zinc-500" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded border border-zinc-700/80 bg-zinc-800/90 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 sm:inline-block">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-400 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleNavClick}
                  className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-800 hover:bg-zinc-900 hover:text-cyan-400"
                >
                  <Icon className="h-4 w-4 text-zinc-500" />
                  {link.name}
                </a>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-medium text-cyan-300"
            >
              <FileText className="h-4 w-4" />
              <span>View Curriculum Vitae (CV)</span>
            </button>
            <div className="mt-2 flex items-center justify-between border-t border-zinc-800/80 pt-3 text-xs text-zinc-500">
              <span>Timezone: {timeStr}</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Online
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
