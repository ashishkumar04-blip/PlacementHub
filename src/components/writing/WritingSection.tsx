import React from 'react';
import { BookOpen, ArrowUpRight, Clock, Tag } from 'lucide-react';

interface Article {
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  category: string;
  url: string;
}

const ARTICLES: Article[] = [
  {
    title: 'Zero-Allocation Real-Time Audio Loops in WebAudio Worklets',
    excerpt: 'How garbage collection pauses destroy real-time audio threads, and how static TypedArray ring buffers and SharedArrayBuffer isolate DSP calculations.',
    readTime: '6 min read',
    date: 'Jan 2025',
    category: 'Audio DSP / WebAssembly',
    url: '#dsp-workbench',
  },
  {
    title: 'Distributed At-Least-Once Delivery: Redis Streams vs Raft Leader Election',
    excerpt: 'Analyzing failure modes in distributed background queues under high burst traffic and comparing lease renew mechanics during network partitions.',
    readTime: '8 min read',
    date: 'Nov 2024',
    category: 'Distributed Systems',
    url: '#projects',
  },
  {
    title: 'Local-First State Sync: Sub-2ms Latency with Yjs CRDTs & IndexedDB',
    excerpt: 'Why local mutations should never wait on the network. Architectural lessons from building collaborative infinite canvas applications.',
    readTime: '5 min read',
    date: 'Sep 2024',
    category: 'Frontend Architecture',
    url: '#projects',
  },
];

interface WritingSectionProps {
  playClickFeedback?: () => void;
}

export const WritingSection: React.FC<WritingSectionProps> = ({ playClickFeedback }) => {
  return (
    <section id="writing" className="py-16 md:py-24 border-t border-zinc-800/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-950/30 px-3 py-1 text-xs font-mono text-amber-400 mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            <span>TECHNICAL WRITING & ESSAYS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Architectural Notes & Deep Dives
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400">
            Deconstructing systems engineering problems, performance bottlenecks, and frontend craft.
          </p>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {ARTICLES.map((art, idx) => (
            <a
              key={idx}
              href={art.url}
              onClick={playClickFeedback}
              className="group block rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900/60"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                    <span className="text-cyan-400">{art.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-zinc-500" />
                      {art.readTime}
                    </span>
                    <span>·</span>
                    <span>{art.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-400 group-hover:text-cyan-300 shrink-0">
                  <span>Read Note</span>
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
