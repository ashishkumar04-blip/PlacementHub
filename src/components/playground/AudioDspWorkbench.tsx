import React, { useEffect, useState } from 'react';
import { WaveformCanvas } from './WaveformCanvas';
import { WaveformType } from '../../hooks/useAudioSynth';
import { 
  Play, 
  Square, 
  Activity, 
  Sliders, 
  Zap, 
  Music, 
  Cpu,
  Info,
  Keyboard
} from 'lucide-react';

interface AudioDspWorkbenchProps {
  isPlaying: boolean;
  waveform: WaveformType;
  frequency: number;
  detune: number;
  gain: number;
  analyserNode: AnalyserNode | null;
  onToggleSynth: () => void;
  onWaveformChange: (wf: WaveformType) => void;
  onFrequencyChange: (freq: number) => void;
  onDetuneChange: (detune: number) => void;
  onGainChange: (gain: number) => void;
  playClickFeedback?: () => void;
}

interface PianoKey {
  note: string;
  freq: number;
  keyLabel: string;
}

export const AudioDspWorkbench: React.FC<AudioDspWorkbenchProps> = ({
  isPlaying,
  waveform,
  frequency,
  detune,
  gain,
  analyserNode,
  onToggleSynth,
  onWaveformChange,
  onFrequencyChange,
  onDetuneChange,
  onGainChange,
  playClickFeedback,
}) => {
  const waveforms: { id: WaveformType; label: string; desc: string }[] = [
    { id: 'sawtooth', label: 'Sawtooth', desc: 'Rich in all harmonics (bright/edgy)' },
    { id: 'square', label: 'Square', desc: 'Odd harmonics (hollow/8-bit character)' },
    { id: 'triangle', label: 'Triangle', desc: 'Muted odd harmonics (smooth flute-like)' },
    { id: 'sine', label: 'Sine', desc: 'Pure fundamental frequency (zero harmonics)' },
  ];

  const presets = [
    { label: 'Sub-Bass (55Hz / A1)', freq: 55, wave: 'sine' as WaveformType },
    { label: 'Warm Bass (110Hz / A2)', freq: 110, wave: 'sawtooth' as WaveformType },
    { label: 'Standard Pitch (440Hz / A4)', freq: 440, wave: 'sawtooth' as WaveformType },
    { label: 'Chiptune Lead (523Hz / C5)', freq: 523, wave: 'square' as WaveformType },
    { label: 'Harmonic Bell (880Hz / A5)', freq: 880, wave: 'triangle' as WaveformType },
  ];

  const pianoKeys: PianoKey[] = [
    { note: 'C4', freq: 261.63, keyLabel: 'A' },
    { note: 'D4', freq: 293.66, keyLabel: 'S' },
    { note: 'E4', freq: 329.63, keyLabel: 'D' },
    { note: 'F4', freq: 349.23, keyLabel: 'F' },
    { note: 'G4', freq: 392.00, keyLabel: 'G' },
    { note: 'A4', freq: 440.00, keyLabel: 'H' },
    { note: 'B4', freq: 493.88, keyLabel: 'J' },
    { note: 'C5', freq: 523.25, keyLabel: 'K' },
  ];

  const [activeNote, setActiveNote] = useState<string | null>(null);

  const triggerPianoNote = (key: PianoKey) => {
    playClickFeedback?.();
    onFrequencyChange(Math.round(key.freq));
    setActiveNote(key.note);
    if (!isPlaying) {
      onToggleSynth();
    }
    setTimeout(() => setActiveNote(null), 300);
  };

  // Computer keyboard trigger (A, S, D, F, G, H, J, K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid capturing when user is typing in an input field
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const matched = pianoKeys.find((pk) => pk.keyLabel.toLowerCase() === e.key.toLowerCase());
      if (matched) {
        triggerPianoNote(matched);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const applyPreset = (presetFreq: number, presetWave: WaveformType) => {
    playClickFeedback?.();
    onFrequencyChange(presetFreq);
    onWaveformChange(presetWave);
  };

  return (
    <section id="dsp-workbench" className="py-16 md:py-24 border-t border-zinc-800/60 relative">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[350px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/30 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
              <Activity className="h-3.5 w-3.5" />
              <span>INTERACTIVE WORKBENCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Real-Time WebAudio DSP & Visualizer
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
              A live, browser-native audio synthesizer and FFT frequency analyzer demonstrating zero-allocation audio loops and 60fps canvas rendering.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playClickFeedback?.();
                onToggleSynth();
              }}
              className={`inline-flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition-all shadow-lg ${
                isPlaying
                  ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20'
                  : 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:from-cyan-400 hover:to-indigo-400 shadow-cyan-glow'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="h-4 w-4 fill-white" />
                  <span>Stop Oscillator</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-white" />
                  <span>Launch Audio Oscillator</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Workbench Grid: Controls & Canvas Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Display: Canvas Oscilloscope */}
          <div className="lg:col-span-7 space-y-4">
            <WaveformCanvas
              analyserNode={analyserNode}
              isPlaying={isPlaying}
              waveform={waveform}
              frequency={frequency}
              detune={detune}
              onFrequencyChange={onFrequencyChange}
            />

            {/* Interactive Musical Piano Roll */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-zinc-300 font-semibold flex items-center gap-1.5">
                  <Keyboard className="h-3.5 w-3.5 text-cyan-400" /> Interactive Piano Roll (C4 — C5):
                </span>
                <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                  Press keys <kbd className="text-zinc-300">A</kbd> through <kbd className="text-zinc-300">K</kbd>
                </span>
              </div>

              <div className="grid grid-cols-8 gap-1.5">
                {pianoKeys.map((key) => {
                  const isActive = activeNote === key.note || Math.abs(frequency - key.freq) < 2;
                  return (
                    <button
                      key={key.note}
                      onClick={() => triggerPianoNote(key)}
                      className={`flex flex-col items-center justify-between h-20 rounded-lg border p-2 transition-all select-none ${
                        isActive
                          ? 'border-cyan-400 bg-cyan-950/80 text-cyan-300 shadow-cyan-glow -translate-y-1'
                          : 'border-zinc-800 bg-zinc-900/90 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800'
                      }`}
                    >
                      <span className="font-bold text-xs font-mono">{key.note}</span>
                      <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1 py-0.5 text-[9px] font-mono text-zinc-400">
                        {key.keyLabel}
                      </kbd>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Harmonic Presets */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
                  <Music className="h-3.5 w-3.5 text-cyan-400" /> Frequency Presets:
                </span>
                <span className="text-[11px] font-mono text-zinc-500">Quick pitch tuning</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => applyPreset(preset.freq, preset.wave)}
                    className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-all ${
                      frequency === preset.freq && waveform === preset.wave
                        ? 'border-cyan-500 bg-cyan-950/60 text-cyan-300 shadow-cyan-glow'
                        : 'border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-5">
              
              {/* Waveform Selector */}
              <div>
                <label className="block font-mono text-xs text-zinc-300 font-semibold mb-2.5 flex items-center justify-between">
                  <span>Waveform Mathematical Function</span>
                  <span className="text-[11px] text-cyan-400 font-mono capitalize">{waveform}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {waveforms.map((wf) => (
                    <button
                      key={wf.id}
                      onClick={() => onWaveformChange(wf.id)}
                      className={`flex flex-col text-left p-2.5 rounded-lg border transition-all ${
                        waveform === wf.id
                          ? 'border-cyan-500/60 bg-cyan-950/40 text-white shadow-sm'
                          : 'border-zinc-800/90 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      <span className="font-semibold text-xs text-zinc-100">{wf.label}</span>
                      <span className="text-[10px] text-zinc-500 line-clamp-1">{wf.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-4 pt-2 border-t border-zinc-800/80">
                
                {/* Frequency Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Sliders className="h-3 w-3 text-cyan-400" /> Fundamental Frequency
                    </span>
                    <span className="text-cyan-400 font-semibold">{frequency} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="1800"
                    step="1"
                    value={frequency}
                    onChange={(e) => onFrequencyChange(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-600 mt-1">
                    <span>40 Hz (Sub)</span>
                    <span>440 Hz (A4)</span>
                    <span>1800 Hz (High)</span>
                  </div>
                </div>

                {/* Detune Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Zap className="h-3 w-3 text-indigo-400" /> Detune Modulation
                    </span>
                    <span className="text-indigo-400 font-semibold">{detune} cents</span>
                  </div>
                  <input
                    type="range"
                    min="-600"
                    max="600"
                    step="10"
                    value={detune}
                    onChange={(e) => onDetuneChange(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                  />
                </div>

                {/* Gain / Volume Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-zinc-400">Master Gain (Safety Limited)</span>
                    <span className="text-zinc-300 font-semibold">{Math.round(gain * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.4"
                    step="0.01"
                    value={gain}
                    onChange={(e) => onGainChange(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>

              </div>

              {/* Technical Spec Box */}
              <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/60 p-3 text-xs text-zinc-400 flex items-start gap-2.5">
                <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  Audio graph connects <code className="text-zinc-200">OscillatorNode</code> → <code className="text-zinc-200">GainNode</code> → <code className="text-zinc-200">AnalyserNode (FFT 512)</code> → <code className="text-zinc-200">AudioDestination</code>.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
