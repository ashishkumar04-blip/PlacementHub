import React, { useRef, useEffect } from 'react';
import { WaveformType } from '../../hooks/useAudioSynth';

interface WaveformCanvasProps {
  analyserNode: AnalyserNode | null;
  isPlaying: boolean;
  waveform: WaveformType;
  frequency: number;
  detune: number;
  onFrequencyChange?: (freq: number) => void;
}

export const WaveformCanvas: React.FC<WaveformCanvasProps> = ({
  analyserNode,
  isPlaying,
  waveform,
  frequency,
  detune,
  onFrequencyChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    const bufferLength = analyserNode ? analyserNode.frequencyBinCount : 256;
    const timeDomainArray = new Uint8Array(bufferLength);
    const frequencyArray = new Uint8Array(bufferLength);

    let idlePhase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Center Baseline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height);
      ctx.stroke();

      if (isPlaying && analyserNode) {
        analyserNode.getByteTimeDomainData(timeDomainArray);
        analyserNode.getByteFrequencyData(frequencyArray);

        // 1. Draw Frequency Spectrum Bars in background
        const barWidth = (width / bufferLength) * 2.5;
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (frequencyArray[i] / 255) * (height * 0.45);
          const x = i * (barWidth + 1);
          if (x > width) break;

          const grad = ctx.createLinearGradient(0, height, 0, height - barHeight);
          grad.addColorStop(0, 'rgba(56, 189, 248, 0.05)');
          grad.addColorStop(1, 'rgba(99, 102, 241, 0.35)');

          ctx.fillStyle = grad;
          ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        }

        // 2. Draw Oscilloscope Waveform
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#38bdf8';
        ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
        ctx.shadowBlur = 12;
        ctx.beginPath();

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = timeDomainArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadow
      } else {
        // Idle ambient animated wave
        idlePhase += 0.03;
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.beginPath();

        for (let x = 0; x < width; x += 3) {
          const y = height / 2 + Math.sin(x * 0.02 + idlePhase) * 12 + Math.cos(x * 0.04 - idlePhase) * 6;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [analyserNode, isPlaying, waveform]);

  // Interactive mouse/touch pitch modulation on canvas
  const handleCanvasInteraction = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !onFrequencyChange) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    // Map x coordinate from 55Hz (A1) to 1760Hz (A6) exponentially
    const normalized = x / rect.width;
    const minFreq = 65;
    const maxFreq = 1200;
    const newFreq = Math.round(minFreq * Math.pow(maxFreq / minFreq, normalized));
    onFrequencyChange(newFreq);
  };

  return (
    <div className="relative w-full rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-inner">
      <canvas
        ref={canvasRef}
        className="w-full h-48 sm:h-56 cursor-crosshair block"
        onMouseDown={(e) => {
          isDraggingRef.current = true;
          handleCanvasInteraction(e);
        }}
        onMouseMove={(e) => {
          if (isDraggingRef.current) {
            handleCanvasInteraction(e);
          }
        }}
        onMouseUp={() => {
          isDraggingRef.current = false;
        }}
        onMouseLeave={() => {
          isDraggingRef.current = false;
        }}
      />

      {/* Real-Time Telemetry HUD Overlay */}
      <div className="absolute top-2.5 left-3 flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800/80 backdrop-blur-sm pointer-events-none">
        <span className={`h-2 w-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`}></span>
        <span>{isPlaying ? 'DSP ENGINE: ACTIVE' : 'DSP ENGINE: STANDBY'}</span>
      </div>

      <div className="absolute top-2.5 right-3 flex items-center gap-3 font-mono text-[11px] text-zinc-400 bg-zinc-950/80 px-2.5 py-0.5 rounded border border-zinc-800/80 backdrop-blur-sm pointer-events-none">
        <span>Freq: <strong className="text-cyan-400">{frequency} Hz</strong></span>
        <span>Wave: <strong className="text-zinc-200 capitalize">{waveform}</strong></span>
        {detune !== 0 && <span>Detune: <strong className="text-indigo-400">{detune}¢</strong></span>}
      </div>

      <div className="absolute bottom-2 left-3 font-mono text-[10px] text-zinc-500 pointer-events-none hidden sm:block">
        💡 Drag cursor horizontally across canvas to sweep oscillator frequency
      </div>
    </div>
  );
};
