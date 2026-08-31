import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../config/portfolioData';
import { 
  Mail, 
  Copy, 
  Check, 
  Send,
  Terminal,
  Phone
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

interface ContactSectionProps {
  playClickFeedback?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ playClickFeedback }) => {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    playClickFeedback?.();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    playClickFeedback?.();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject || 'Software Engineering Opportunity / Collaboration'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-zinc-800/60 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Pitch & Quick Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/30 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
                <Mail className="h-3.5 w-3.5" />
                <span>INITIATE CONTACT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Let&apos;s build software & systems.
              </h2>
              <p className="mt-3 text-base text-zinc-400 leading-relaxed">
                Whether you&apos;re looking to collaborate on embedded hardware, explore full-stack applications with Python & Node.js, or discuss software engineering roles—my inbox is always open.
              </p>
            </div>

            {/* Direct Contact Cards (Email + Phone) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Email Card */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-4 space-y-2.5 shadow-lg flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-400">Email Address:</span>
                  <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Direct
                  </span>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-2.5">
                  <span className="font-mono text-xs font-semibold text-zinc-100 block truncate">
                    {PERSONAL_INFO.email}
                  </span>
                </div>

                <button
                  onClick={copyEmail}
                  className={`w-full flex items-center justify-center gap-1.5 rounded-lg py-2 font-mono text-xs font-semibold transition-all ${
                    copied
                      ? 'bg-emerald-500 text-zinc-950'
                      : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                  }`}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>

              {/* Phone Card */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-4 space-y-2.5 shadow-lg flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-400">Phone / WhatsApp:</span>
                  <span className="font-mono text-[10px] text-cyan-400">India</span>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-2.5">
                  <span className="font-mono text-xs font-semibold text-zinc-100 block">
                    {PERSONAL_INFO.phone}
                  </span>
                </div>

                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  onClick={playClickFeedback}
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-zinc-800 py-2 font-mono text-xs font-semibold text-zinc-200 hover:bg-zinc-700 hover:text-white transition-all"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Call Directly</span>
                </a>
              </div>
            </div>

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                onClick={playClickFeedback}
                className="group flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition-all hover:border-zinc-700 hover:bg-zinc-900"
              >
                <GithubIcon className="h-5 w-5 text-zinc-400 group-hover:text-white transition-colors" />
                <span className="mt-2 font-mono text-xs text-zinc-300">GitHub</span>
                <span className="text-[10px] text-zinc-500 font-mono">@ashishkumar04</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={playClickFeedback}
                className="group flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition-all hover:border-zinc-700 hover:bg-zinc-900"
              >
                <LinkedinIcon className="h-5 w-5 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                <span className="mt-2 font-mono text-xs text-zinc-300">LinkedIn</span>
                <span className="text-[10px] text-zinc-500 font-mono">ashish-kumar-pal</span>
              </a>
            </div>
          </div>

          {/* Right Column: Quick Dispatch Form */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-7 shadow-xl">
              <div className="flex items-center gap-2 mb-4 font-mono text-xs text-zinc-400">
                <Terminal className="h-4 w-4 text-cyan-400" />
                <span>Quick Dispatch Relay</span>
              </div>

              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-zinc-300 mb-1.5 font-medium">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Software Engineering Role / Project Collaboration"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 font-sans text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-zinc-300 mb-1.5 font-medium">
                    Message Payload
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your role requirements, team details, or collaboration ideas..."
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 p-3.5 font-sans text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-white hover:shadow-cyan-glow"
                >
                  <Send className="h-4 w-4" />
                  <span>Launch Default Email Client</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
