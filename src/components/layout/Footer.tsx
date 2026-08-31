import React from 'react';
import { PERSONAL_INFO, SYSTEM_META } from '../../config/portfolioData';
import { Terminal, ArrowUp, Mail, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

interface FooterProps {
  playClickFeedback?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ playClickFeedback }) => {
  const scrollToTop = () => {
    playClickFeedback?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/90 py-12 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 font-mono text-sm font-semibold text-zinc-100">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-cyan-400">
                <Terminal className="h-4 w-4" />
              </div>
              <span>{PERSONAL_INFO.name}</span>
              <span className="text-zinc-500 font-normal">/ systems & software</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-md">
              {PERSONAL_INFO.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              title="Email"
              onClick={playClickFeedback}
              className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2 text-zinc-400 hover:border-zinc-700 hover:text-cyan-400 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              title="Call"
              onClick={playClickFeedback}
              className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2 text-zinc-400 hover:border-zinc-700 hover:text-emerald-400 transition-colors"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              onClick={playClickFeedback}
              className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2 text-zinc-400 hover:border-zinc-700 hover:text-white transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              onClick={playClickFeedback}
              className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-2 text-zinc-400 hover:border-zinc-700 hover:text-cyan-400 transition-colors"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>

            <button
              onClick={scrollToTop}
              title="Return to top"
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>TOP</span>
            </button>
          </div>
        </div>

        {/* Bottom Metadata & Spec Stamp */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-zinc-800/80 pt-6 text-[11px] font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Computer Science & Engineering — Lovely Professional University.
          </div>

          <div className="flex items-center gap-4">
            <span>Location: {SYSTEM_META.location}</span>
            <span>•</span>
            <span className="text-emerald-400">● Systems Operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
