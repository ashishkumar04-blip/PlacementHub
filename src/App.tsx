import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { AudioDspWorkbench } from './components/playground/AudioDspWorkbench';
import { SkillsMatrix } from './components/skills/SkillsMatrix';
import { WritingSection } from './components/writing/WritingSection';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { SystemBar } from './components/layout/SystemBar';
import { CommandPalette } from './components/command-palette/CommandPalette';
import { ResumeModal } from './components/resume/ResumeModal';
import { useAudioSynth } from './hooks/useAudioSynth';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';

export function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const {
    isPlaying,
    waveform,
    frequency,
    detune,
    gain,
    analyserNode,
    audioFeedbackEnabled,
    setAudioFeedbackEnabled,
    toggleSynth,
    setWaveform,
    setFrequency,
    setDetune,
    setGain,
    playClickFeedback,
  } = useAudioSynth();

  // Global hotkeys
  useKeyboardShortcut('cmd+k', () => {
    setCommandPaletteOpen((prev) => !prev);
  });

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-zinc-100 bg-grid-pattern selection:bg-cyan-500/20 selection:text-cyan-200">
      
      {/* Top Sticky Navigation */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        audioFeedbackEnabled={audioFeedbackEnabled}
        onToggleAudioFeedback={() => setAudioFeedbackEnabled((prev) => !prev)}
        playClickFeedback={playClickFeedback}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          playClickFeedback={playClickFeedback}
          onSelectProject={handleSelectProject}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        <ProjectsSection
          playClickFeedback={playClickFeedback}
          selectedProjectId={selectedProjectId}
          onClearSelectedProject={() => setSelectedProjectId(null)}
        />

        <AudioDspWorkbench
          isPlaying={isPlaying}
          waveform={waveform}
          frequency={frequency}
          detune={detune}
          gain={gain}
          analyserNode={analyserNode}
          onToggleSynth={toggleSynth}
          onWaveformChange={setWaveform}
          onFrequencyChange={setFrequency}
          onDetuneChange={setDetune}
          onGainChange={setGain}
          playClickFeedback={playClickFeedback}
        />

        <SkillsMatrix playClickFeedback={playClickFeedback} />

        <WritingSection playClickFeedback={playClickFeedback} />

        <ExperienceTimeline playClickFeedback={playClickFeedback} />

        <ContactSection playClickFeedback={playClickFeedback} />
      </main>

      {/* Footer */}
      <Footer playClickFeedback={playClickFeedback} />

      {/* Floating Telemetry System Bar */}
      <SystemBar
        audioFeedbackEnabled={audioFeedbackEnabled}
        onToggleAudioFeedback={() => setAudioFeedbackEnabled((prev) => !prev)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        playClickFeedback={playClickFeedback}
      />

      {/* Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectProject={handleSelectProject}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        audioFeedbackEnabled={audioFeedbackEnabled}
        onToggleAudioFeedback={() => setAudioFeedbackEnabled((prev) => !prev)}
        playClickFeedback={playClickFeedback}
      />

      {/* Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        playClickFeedback={playClickFeedback}
      />

    </div>
  );
}

export default App;
