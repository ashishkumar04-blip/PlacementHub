import React from 'react';
import { 
  PERSONAL_INFO, 
  EDUCATION_LIST, 
  CERTIFICATES_LIST, 
  ACHIEVEMENTS_LIST, 
  PROJECTS, 
  SKILL_CATEGORIES 
} from '../../config/portfolioData';
import { 
  X, 
  Printer, 
  Mail, 
  MapPin, 
  Phone, 
  Terminal, 
  Award, 
  GraduationCap, 
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  playClickFeedback?: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, playClickFeedback }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    playClickFeedback?.();
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/80 px-6 py-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span className="font-mono text-xs font-semibold text-zinc-200">
              Curriculum Vitae — {PERSONAL_INFO.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => {
                playClickFeedback?.();
                onClose();
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 font-sans text-zinc-300">
          
          {/* Header Info */}
          <div className="border-b border-zinc-800 pb-5 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-sm font-mono text-cyan-400 font-medium">
              {PERSONAL_INFO.role}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-400 pt-2">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <Mail className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <Phone className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan-300 transition-colors truncate">
                <LinkedinIcon className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <span className="truncate">linkedin.com/in/ashish-kumar-pal-a1b689381/</span>
              </a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                <GithubIcon className="h-3.5 w-3.5 text-zinc-300 shrink-0" />
                <span>github.com/ashishkumar04</span>
              </a>
            </div>
          </div>

          {/* Technical Skills Matrix */}
          <div className="space-y-3">
            <h2 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-cyan-400" />
              Technical & Professional Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3 space-y-1">
                <span className="font-mono font-semibold text-zinc-200">Programming Languages:</span>
                <p className="text-cyan-300 font-mono text-[11px]">Python, JavaScript, C, C++</p>
              </div>
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3 space-y-1">
                <span className="font-mono font-semibold text-zinc-200">Web Technologies:</span>
                <p className="text-zinc-300 font-mono text-[11px]">HTML, CSS, Bootstrap, Node.js</p>
              </div>
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3 space-y-1">
                <span className="font-mono font-semibold text-zinc-200">Databases & Tools:</span>
                <p className="text-zinc-300 font-mono text-[11px]">MySQL, VS Code, Git, GitHub</p>
              </div>
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3 space-y-1">
                <span className="font-mono font-semibold text-zinc-200">Soft Skills:</span>
                <p className="text-zinc-300 font-mono text-[11px]">Problem Solving, Team Collaboration, Time Management, Adaptability</p>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-indigo-400" />
              Featured Projects
            </h2>
            <div className="space-y-3">
              {/* Footstep Electricity Generator */}
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-zinc-100">Footstep Electricity Generator</span>
                  <span className="font-mono text-[11px] text-cyan-400 px-2 py-0.5 rounded bg-zinc-800">Academic Project</span>
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-300 list-disc pl-4 leading-relaxed">
                  <li>Developed a prototype to generate electrical energy from footsteps using piezoelectric elements.</li>
                  <li>Integrated piezoelectric sensors with an Arduino-based circuit to detect and convert mechanical pressure into electrical energy.</li>
                  <li>Used electronic components including a rectifier, capacitor, and resistor to collect and stabilize the generated output.</li>
                  <li>Tested the prototype to demonstrate energy harvesting from human movement.</li>
                </ul>
                <div className="pt-2 border-t border-zinc-800/80 font-mono text-[11px] text-zinc-400">
                  <strong className="text-zinc-300">Tech Stack:</strong> Arduino, Piezoelectric Sensors, C/C++, Electronics
                </div>
              </div>

              {/* Pulse Engine & Web Project */}
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-zinc-100">Pulse DSP Web Synthesizer & Visualizer</span>
                  <span className="font-mono text-[11px] text-emerald-400 px-2 py-0.5 rounded bg-zinc-800">Interactive Web Project</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Browser-native digital signal processing and sound synthesis engine with real-time 60 FPS HTML5 Canvas frequency and waveform oscilloscope visualization.
                </p>
                <div className="pt-2 border-t border-zinc-800/80 font-mono text-[11px] text-zinc-400">
                  <strong className="text-zinc-300">Tech Stack:</strong> JavaScript, WebAudio API, HTML5 Canvas, Node.js, CSS3
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h2 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              Certificates
            </h2>
            <div className="space-y-2">
              {CERTIFICATES_LIST.map((cert, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3 text-xs">
                  <div>
                    <span className="font-semibold text-zinc-100">{cert.title}</span>
                    <span className="text-zinc-400 block text-[11px]">Issued by {cert.issuer}</span>
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-3">
            <h2 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              Achievements
            </h2>
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-2">
              {ACHIEVEMENTS_LIST.map((ach, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5 text-emerald-400" />
              Education
            </h2>
            <div className="space-y-2.5">
              {EDUCATION_LIST.map((edu, idx) => (
                <div key={idx} className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-zinc-100">{edu.institution}</span>
                    <span className="font-mono text-[11px] text-zinc-400">{edu.period}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-400">
                    <span>{edu.degree}</span>
                    <span className="font-mono font-semibold text-emerald-400 mt-0.5 sm:mt-0">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
