import { useState, useRef, useEffect, useCallback } from 'react';

export type WaveformType = 'sine' | 'square' | 'sawtooth' | 'triangle';

export function useAudioSynth() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveformState] = useState<WaveformType>('sawtooth');
  const [frequency, setFrequencyState] = useState(220); // A3 default
  const [detune, setDetuneState] = useState(0);
  const [gain, setGainState] = useState(0.15);
  const [audioFeedbackEnabled, setAudioFeedbackEnabled] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
      
      const analyser = audioCtxRef.current.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.85;
      analyserRef.current = analyser;

      const masterGain = audioCtxRef.current.createGain();
      masterGain.gain.setValueAtTime(gain, audioCtxRef.current.currentTime);
      gainNodeRef.current = masterGain;

      masterGain.connect(analyser);
      analyser.connect(audioCtxRef.current.destination);
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    return audioCtxRef.current;
  }, [gain]);

  // Tactile micro-sound for UI clicks
  const playClickFeedback = useCallback((freq = 880, duration = 0.04) => {
    if (!audioFeedbackEnabled) return;
    try {
      const ctx = getAudioContext();
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      
      clickOsc.type = 'sine';
      clickOsc.frequency.setValueAtTime(freq, ctx.currentTime);
      clickGain.gain.setValueAtTime(0.08, ctx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);

      clickOsc.start();
      clickOsc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext policy catch
    }
  }, [audioFeedbackEnabled, getAudioContext]);

  const startSynth = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
      }

      const osc = ctx.createOscillator();
      osc.type = waveform;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.detune.setValueAtTime(detune, ctx.currentTime);

      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setValueAtTime(gain, ctx.currentTime);
        osc.connect(gainNodeRef.current);
      }

      osc.start();
      oscRef.current = osc;
      setIsPlaying(true);
    } catch (e) {
      console.warn('WebAudio failed to start:', e);
    }
  }, [getAudioContext, waveform, frequency, detune, gain]);

  const stopSynth = useCallback(() => {
    if (oscRef.current && audioCtxRef.current) {
      try {
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        }
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {
        // Oscillator already stopped
      }
      oscRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const toggleSynth = useCallback(() => {
    if (isPlaying) {
      stopSynth();
    } else {
      startSynth();
    }
  }, [isPlaying, startSynth, stopSynth]);

  const setWaveform = useCallback((type: WaveformType) => {
    setWaveformState(type);
    if (oscRef.current) {
      oscRef.current.type = type;
    }
    playClickFeedback(440, 0.03);
  }, [playClickFeedback]);

  const setFrequency = useCallback((freq: number) => {
    setFrequencyState(freq);
    if (oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
    }
  }, []);

  const setDetune = useCallback((cents: number) => {
    setDetuneState(cents);
    if (oscRef.current && audioCtxRef.current) {
      oscRef.current.detune.setValueAtTime(cents, audioCtxRef.current.currentTime);
    }
  }, []);

  const setGain = useCallback((val: number) => {
    setGainState(val);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch {
          // ignore
        }
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return {
    isPlaying,
    waveform,
    frequency,
    detune,
    gain,
    analyserNode: analyserRef.current,
    audioFeedbackEnabled,
    setAudioFeedbackEnabled,
    startSynth,
    stopSynth,
    toggleSynth,
    setWaveform,
    setFrequency,
    setDetune,
    setGain,
    playClickFeedback,
  };
}
