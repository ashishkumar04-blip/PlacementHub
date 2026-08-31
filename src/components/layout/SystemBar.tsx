import React from 'react';
import { useLiveClock } from '../../hooks/useLiveClock';
import { SYSTEM_META } from '../../config/portfolioData';
import { Activity, Cpu, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface SystemBarProps {
  audioFeedbackEnabled: boolean;
  onToggleAudioFeedback: () => void;
  onOpenCommandPalette: () => void;
  playClickFeedback?: () => void;
}

export const SystemBar: React.FC<SystemBarProps> = ({
  audioFeedbackEnabled,
  onToggleAudioFeedback,
  onOpenCommandPalette,
  playClickFeedback,
}) => {
  const { timeStr, uptime } = useLiveClock();

  return (
    <div className="fixed bottom-4 right-4 z-30 hidden sm:flex items-center gap-2 rounded-full border border-zinc-800/90 bg-zinc-950/90 px-3 py-1.5 font-mono text-[11px] text-zinc-400 shadow-2xl backdrop-blur-md">
      {/* Live System Indicator */}
      <div className="flex items-center gap-1.5 pr-2 border-r border-zinc-800">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="text-zinc-300 font-semibold">{SYSTEM_META.status}</span>
      </div>

      {/* Latency & Runtime */}
      <div className="hidden lg:flex items-center gap-2 pr-2 border-r border-zinc-800 text-zinc-500">
        <span>Ping: <strong className="text-cyan-400">{SYSTEM_META.latencyMs}ms</strong></span>
        <span>Uptime: <strong className="text-zinc-300">{uptime}</strong></span>
      </div>

      {/* Audio FX State */}
      <button
        onClick={() => {
          onToggleAudioFeedback();
          playClickFeedback?.();
        }}
        title={audioFeedbackEnabled ? "Audio FX On" : "Audio FX Off"}
        className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
          audioFeedbackEnabled ? 'text-cyan-400 bg-cyan-950/40' : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        {audioFeedbackEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
        <span className="text-[10px]">{audioFeedbackEnabled ? 'FX ON' : 'FX OFF'}</span>
      </button>

      {/* Cmd+K Quick Pill */}
      <button
        onClick={() => {
          playClickFeedback?.();
          onOpenCommandPalette();
        }}
        className="flex items-center gap-1 pl-1 text-zinc-400 hover:text-cyan-300 transition-colors"
      >
        <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.2 text-[10px]">
          ⌘K
        </kbd>
      </button>
    </div>
  );
};
