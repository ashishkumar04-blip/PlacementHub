import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS, PERSONAL_INFO } from '../../config/portfolioData';
import { 
  Search, 
  Layers, 
  Cpu, 
  Activity, 
  Mail, 
  Volume2, 
  VolumeX, 
  Check, 
  ArrowRight,
  Sparkles,
  FileText,
  BookOpen
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  onOpenResumeModal: () => void;
  audioFeedbackEnabled: boolean;
  onToggleAudioFeedback: () => void;
  playClickFeedback?: () => void;
}

interface PaletteItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Case Study' | 'Action' | 'Contact';
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenResumeModal,
  audioFeedbackEnabled,
  onToggleAudioFeedback,
  playClickFeedback,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    playClickFeedback?.();
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  };

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
    onClose();
    playClickFeedback?.();
  };

  const items: PaletteItem[] = [
    // Navigation Items
    {
      id: 'nav-projects',
      title: 'Navigate to Case Studies & Projects',
      category: 'Navigation',
      icon: Layers,
      shortcut: 'G P',
      action: () => navigateTo('projects'),
    },
    {
      id: 'nav-workbench',
      title: 'Launch Interactive Audio DSP Workbench',
      category: 'Navigation',
      icon: Activity,
      shortcut: 'G D',
      action: () => navigateTo('dsp-workbench'),
    },
    {
      id: 'nav-skills',
      title: 'View Systems Architecture & Skills Matrix',
      category: 'Navigation',
      icon: Cpu,
      shortcut: 'G S',
      action: () => navigateTo('skills'),
    },
    {
      id: 'nav-writing',
      title: 'View Architectural Notes & Essays',
      category: 'Navigation',
      icon: BookOpen,
      shortcut: 'G E',
      action: () => navigateTo('writing'),
    },
    {
      id: 'nav-experience',
      title: 'View Engineering Timeline & Milestones',
      category: 'Navigation',
      icon: Sparkles,
      shortcut: 'G T',
      action: () => navigateTo('experience'),
    },
    {
      id: 'nav-contact',
      title: 'Navigate to Direct Contact & Socials',
      category: 'Navigation',
      icon: Mail,
      shortcut: 'G C',
      action: () => navigateTo('contact'),
    },

    // Case Studies
    ...PROJECTS.map((p) => ({
      id: `proj-${p.id}`,
      title: `Inspect Architecture: ${p.title} (${p.tagline})`,
      category: 'Case Study' as const,
      icon: Layers,
      action: () => {
        onClose();
        playClickFeedback?.();
        onSelectProject(p.id);
      },
    })),

    // Actions
    {
      id: 'action-resume',
      title: 'View Curriculum Vitae (Printable CV Preview)',
      category: 'Action',
      icon: FileText,
      shortcut: '⌘ R',
      action: () => {
        onClose();
        playClickFeedback?.();
        onOpenResumeModal();
      },
    },
    {
      id: 'action-copy-email',
      title: copiedEmail ? 'Email Copied to Clipboard!' : `Copy Email (${PERSONAL_INFO.email})`,
      category: 'Action',
      icon: copiedEmail ? Check : Mail,
      action: copyEmail,
    },
    {
      id: 'action-toggle-sound',
      title: audioFeedbackEnabled ? 'Mute Interface Sound Effects' : 'Enable Tactile Sound Feedback',
      category: 'Action',
      icon: audioFeedbackEnabled ? VolumeX : Volume2,
      action: () => {
        onToggleAudioFeedback();
        onClose();
      },
    },
    {
      id: 'action-github',
      title: 'Open GitHub Profile',
      category: 'Contact',
      icon: GithubIcon,
      action: () => {
        window.open(PERSONAL_INFO.github, '_blank');
        onClose();
      },
    },
    {
      id: 'action-linkedin',
      title: 'Open LinkedIn Profile',
      category: 'Contact',
      icon: LinkedinIcon,
      action: () => {
        window.open(PERSONAL_INFO.linkedin, '_blank');
        onClose();
      },
    },
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-900/60 px-4 py-3.5">
          <Search className="h-4 w-4 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, project, or section..."
            className="w-full bg-transparent font-mono text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />
          <kbd className="rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-zinc-500">
              No matching commands or case studies found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playClickFeedback?.();
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                    isSelected
                      ? 'bg-zinc-800 text-cyan-300'
                      : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                      isSelected ? 'border-cyan-500/40 bg-cyan-950/40 text-cyan-400' : 'border-zinc-800 bg-zinc-900 text-zinc-400'
                    }`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-zinc-200">{item.title}</div>
                      <div className="font-mono text-[10px] text-zinc-500">{item.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.shortcut && (
                      <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                        {item.shortcut}
                      </kbd>
                    )}
                    <ArrowRight className={`h-3 w-3 ${isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-zinc-600'} transition-transform`} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div className="flex items-center justify-between border-t border-zinc-800/80 bg-zinc-900/40 px-4 py-2 text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>Ashish Kumar Portfolio Navigation</span>
        </div>
      </div>
    </div>
  );
};
