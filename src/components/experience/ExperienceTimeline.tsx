import React from 'react';
import { EXPERIENCES, EDUCATION_LIST, CERTIFICATES_LIST, ACHIEVEMENTS_LIST } from '../../config/portfolioData';
import { Briefcase, GraduationCap, Award, MapPin, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface ExperienceTimelineProps {
  playClickFeedback?: () => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ playClickFeedback }) => {
  return (
    <section id="experience" className="py-16 md:py-24 border-t border-zinc-800/60 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/30 px-3 py-1 text-xs font-mono text-emerald-400 mb-3">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>ACADEMICS, TRACK RECORD & CERTIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Education, Milestones & Credentials
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400">
            Formal education at Lovely Professional University, verified programming certifications, and project milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Milestones & Experience */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-cyan-400" />
              Project Milestones & Training Tracks
            </h3>

            <div className="relative border-l border-zinc-800 ml-3 sm:ml-4 space-y-8">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="relative pl-6 sm:pl-8 group">
                  
                  {/* Indicator Dot */}
                  <div className="absolute -left-[7px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950 group-hover:border-cyan-400 group-hover:bg-cyan-950 transition-colors">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 sm:p-6 shadow-md group-hover:border-zinc-700 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div>
                        <span className="font-mono text-xs text-cyan-400 font-semibold">{exp.period}</span>
                        <h4 className="text-lg font-bold text-white tracking-tight">
                          {exp.role}
                        </h4>
                        <div className="text-xs text-zinc-400 font-mono">
                          <span className="text-zinc-200 font-semibold">{exp.company}</span>
                          <span className="mx-1.5">·</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      <span className="self-start sm:self-auto rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                        {exp.type}
                      </span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-zinc-300 my-3">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500/70 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.impactMetric && (
                      <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 px-3 py-1.5 text-[11px] text-emerald-300 font-mono mb-3">
                        ⚡ {exp.impactMetric}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1 pt-2 border-t border-zinc-800/80">
                      {exp.technologies.map((t) => (
                        <span key={t} className="rounded border border-zinc-800/80 bg-zinc-900/60 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Certifications Stack */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Education Box */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 space-y-4 shadow-lg">
              <h3 className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-emerald-400" />
                Formal Education
              </h3>

              <div className="space-y-3">
                {EDUCATION_LIST.map((edu, idx) => (
                  <div key={idx} className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-sm text-zinc-100">{edu.institution}</h4>
                      <span className="font-mono text-[10px] text-zinc-400 shrink-0">{edu.period}</span>
                    </div>
                    <p className="text-xs text-zinc-400">{edu.degree}</p>
                    <div className="pt-1 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">{edu.location}</span>
                      <span className="font-semibold text-emerald-400">{edu.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Box */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 space-y-4 shadow-lg">
              <h3 className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-400" />
                Professional Certifications
              </h3>

              <div className="space-y-2.5">
                {CERTIFICATES_LIST.map((cert, idx) => (
                  <div key={idx} className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3 flex items-center justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-xs text-zinc-100">{cert.title}</h4>
                      <span className="text-[11px] text-zinc-400 block font-mono">{cert.issuer}</span>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500 shrink-0 px-2 py-0.5 rounded bg-zinc-800">
                      {cert.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Achievements */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 space-y-3 shadow-lg">
              <h3 className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                Key Achievements
              </h3>

              <div className="space-y-2">
                {ACHIEVEMENTS_LIST.map((ach, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
