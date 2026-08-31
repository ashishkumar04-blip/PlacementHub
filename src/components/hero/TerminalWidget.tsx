import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles, Check, Copy } from 'lucide-react';
import { PERSONAL_INFO, SYSTEM_META, PROJECTS } from '../../config/portfolioData';

interface TerminalWidgetProps {
  playClickFeedback?: () => void;
  onSelectProject?: (projectId: string) => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalWidget: React.FC<TerminalWidgetProps> = ({ playClickFeedback, onSelectProject }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: 'init-1',
      command: 'systemctl status ashish-profile.service',
      output: (
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Active: active (running) · 0 downtime</span>
          </div>
          <p className="text-zinc-400">
            Node: <span className="text-zinc-200">{SYSTEM_META.nodeVersion}</span> · Region: <span className="text-zinc-200">{SYSTEM_META.location}</span> · Focus: <span className="text-cyan-400">{SYSTEM_META.currentFocus}</span>
          </p>
          <p className="text-zinc-500 italic">Type <code className="text-cyan-300 font-bold">help</code> or click commands below for quick exploration.</p>
        </div>
      ),
    },
  ]);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    playClickFeedback?.();

    if (!cleanCmd) return;

    let output: React.ReactNode = null;

    switch (cleanCmd) {
      case 'help':
        output = (
          <div className="text-xs space-y-1 font-mono text-zinc-300">
            <p className="text-cyan-400 font-bold">Available Commands:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 pt-1">
              <div><span className="text-emerald-400 font-semibold">projects</span> - View flagship case studies</div>
              <div><span className="text-emerald-400 font-semibold">stack</span> - Inspect technical stack</div>
              <div><span className="text-emerald-400 font-semibold">status</span> - Systems telemetry</div>
              <div><span className="text-emerald-400 font-semibold">contact</span> - Display email & socials</div>
              <div><span className="text-emerald-400 font-semibold">principles</span> - Core engineering tenets</div>
              <div><span className="text-emerald-400 font-semibold">clear</span> - Clear terminal session</div>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="text-xs space-y-1.5 font-mono">
            <p className="text-cyan-400 font-semibold">Featured Case Studies:</p>
            {PROJECTS.map((p) => (
              <div key={p.id} className="flex items-center justify-between border-b border-zinc-800/60 pb-1">
                <div>
                  <button 
                    onClick={() => onSelectProject?.(p.id)}
                    className="text-zinc-100 hover:text-cyan-400 font-medium underline-offset-2 hover:underline text-left"
                  >
                    → {p.title}
                  </button>
                  <span className="text-zinc-500 text-[11px] block">{p.tagline}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{p.year}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'stack':
        output = (
          <div className="text-xs font-mono space-y-1 text-zinc-300">
            <p className="text-cyan-400 font-semibold">Core Technical Matrix:</p>
            <p><span className="text-zinc-400">Languages:</span> TypeScript, Go, Python, C++, SQL</p>
            <p><span className="text-zinc-400">Frontend:</span> React 19, Next.js, WebAudio API, HTML5 Canvas, Tailwind CSS</p>
            <p><span className="text-zinc-400">Backend:</span> Node.js, Redis Streams, PostgreSQL, gRPC, Docker, Kafka</p>
          </div>
        );
        break;

      case 'status':
        output = (
          <div className="text-xs font-mono space-y-1 text-zinc-300">
            <p><span className="text-zinc-500">Status:</span> <span className="text-emerald-400">● {SYSTEM_META.status}</span></p>
            <p><span className="text-zinc-500">Location:</span> {PERSONAL_INFO.location}</p>
            <p><span className="text-zinc-500">Node Runtime:</span> {SYSTEM_META.nodeVersion}</p>
            <p><span className="text-zinc-500">Simulated Ping:</span> <span className="text-cyan-400">{SYSTEM_META.latencyMs}ms</span></p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-xs font-mono space-y-1 text-zinc-300">
            <p className="text-cyan-400 font-semibold">Direct Communication Channels:</p>
            <p>Email: <span className="text-zinc-100">{PERSONAL_INFO.email}</span></p>
            <p>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">github.com</a></p>
            <p>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">linkedin.com</a></p>
          </div>
        );
        break;

      case 'principles':
        output = (
          <div className="text-xs font-mono space-y-1.5 text-zinc-300">
            {PERSONAL_INFO.principles.map((p, idx) => (
              <div key={idx} className="border-l-2 border-cyan-500/60 pl-2">
                <p className="text-zinc-100 font-semibold">{idx + 1}. {p.title}</p>
                <p className="text-zinc-400 text-[11px]">{p.desc}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <p className="text-xs font-mono text-rose-400">
            Command not recognized: &apos;{cleanCmd}&apos;. Type <span className="underline cursor-pointer" onClick={() => handleCommand('help')}>help</span> for valid commands.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: cmd,
        output,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    playClickFeedback?.();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="relative w-full rounded-xl border border-zinc-800 bg-zinc-950/90 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/40"></span>
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/40"></span>
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/40"></span>
          </div>
          <span className="ml-2 font-mono text-xs text-zinc-400 flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-zinc-500" />
            ashish@sys-runtime:~
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyEmail}
            className="flex items-center gap-1 rounded border border-zinc-800 bg-zinc-800/60 px-2 py-0.5 font-mono text-[10px] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 transition-colors"
          >
            {copiedEmail ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            <span>{copiedEmail ? 'Email Copied' : 'Copy Email'}</span>
          </button>
        </div>
      </div>

      {/* Terminal Logs & Output Area */}
      <div 
        className="max-h-[320px] min-h-[220px] overflow-y-auto p-4 space-y-3 font-mono scrollbar-thin"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="text-cyan-400 font-bold">➜</span>
              <span className="text-zinc-500">~</span>
              <span className="text-zinc-200 font-semibold">{item.command}</span>
            </div>
            <div className="pl-4 pt-0.5">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick Action Command Chips */}
      <div className="flex flex-wrap items-center gap-1.5 border-t border-zinc-800/60 bg-zinc-900/40 px-4 py-2 text-[11px] font-mono">
        <span className="text-zinc-500 flex items-center gap-1 mr-1">
          <Sparkles className="h-3 w-3 text-cyan-400" /> Quick:
        </span>
        {['projects', 'stack', 'status', 'principles', 'clear'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="rounded border border-zinc-800 bg-zinc-900/90 px-2 py-0.5 text-zinc-400 hover:border-cyan-500/40 hover:bg-cyan-950/30 hover:text-cyan-300 transition-all"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Interactive Input Row */}
      <div className="flex items-center gap-2 border-t border-zinc-800/80 bg-zinc-950 px-4 py-2.5">
        <span className="font-mono text-xs font-bold text-cyan-400">➜</span>
        <span className="font-mono text-xs text-zinc-500">~</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help', 'projects', 'stack'..."
          className="w-full bg-transparent font-mono text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
        />
        <button
          onClick={() => handleCommand(inputVal)}
          className="rounded p-1 text-zinc-500 hover:text-cyan-400 transition-colors"
        >
          <CornerDownLeft className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
