import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { CompanyExperience } from '../types/placement';
import {
  X,
  CheckCircle2,
  Clock,
  Laptop,
  Code2,
  Lightbulb,
  Award,
  Calendar,
  Building,
  DollarSign,
  ChevronRight,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

interface InterviewExperienceModalProps {
  experience: CompanyExperience | null;
  onClose: () => void;
  onAskMentor?: (mentorId: string, mentorName: string, company: string) => void;
}

export const InterviewExperienceModal: React.FC<InterviewExperienceModalProps> = ({
  experience,
  onClose,
  onAskMentor
}) => {
  const { setSelectedExperience } = usePlacement();
  const [activeRoundTab, setActiveRoundTab] = useState<number>(1);

  if (!experience) return null;

  const currentRound = experience.rounds.find((r) => r.roundNumber === activeRoundTab) || experience.rounds[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-navy-950 via-navy-900 to-blue-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-start justify-between gap-4 pr-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white p-2.5 shadow-md flex items-center justify-center">
                {experience.companyLogo ? (
                  <img
                    src={experience.companyLogo}
                    alt={experience.companyName}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <Building className="w-7 h-7 text-slate-700" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl font-extrabold tracking-tight">
                    {experience.companyName}
                  </h2>
                  {experience.isVerified ? (
                    <span className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified Senior Experience
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-amber-500/20 text-amber-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Under Verification Review
                    </span>
                  )}
                </div>
                <p className="text-blue-200 text-sm mt-0.5">
                  {experience.jobRole} • Batch of {experience.placementYear}
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 text-xs flex-wrap">
              <span className="bg-white/15 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-300" />
                {experience.ctcOffered}
              </span>
              <span
                className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[11px] ${
                  experience.difficulty === 'Hard'
                    ? 'bg-rose-500/30 text-rose-200 border border-rose-400/40'
                    : experience.difficulty === 'Medium'
                    ? 'bg-amber-500/30 text-amber-200 border border-amber-400/40'
                    : 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40'
                }`}
              >
                {experience.difficulty} Difficulty
              </span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/50">
          {/* Summary Quote */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Experience Summary
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed italic">
              "{experience.summary}"
            </p>
          </div>

          {/* Round Selector Tabs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Round-by-Round Breakdown ({experience.rounds.length} Rounds)</span>
              </h3>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {experience.rounds.map((round) => (
                <button
                  key={round.roundNumber}
                  onClick={() => setActiveRoundTab(round.roundNumber)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                    activeRoundTab === round.roundNumber
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-200/50 flex items-center justify-center text-[10px]">
                    {round.roundNumber}
                  </span>
                  <span>{round.roundName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Round Details Card */}
          {currentRound && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-4 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">
                    Round {currentRound.roundNumber}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900">{currentRound.roundName}</h4>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {currentRound.duration}
                  </span>
                  {currentRound.platform && (
                    <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Laptop className="w-3.5 h-3.5 text-slate-400" />
                      {currentRound.platform}
                    </span>
                  )}
                </div>
              </div>

              {/* Round Details Description */}
              <p className="text-sm text-slate-700 leading-relaxed">
                {currentRound.details}
              </p>

              {/* Key Topics Covered */}
              {currentRound.keyTopics && currentRound.keyTopics.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Key Topics Tested
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {currentRound.keyTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-blue-100"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Coding Questions (if any) */}
              {currentRound.codingQuestions && currentRound.codingQuestions.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-purple-600" />
                    <span>Real Interview Coding Questions Asked</span>
                  </h5>
                  {currentRound.codingQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">{q.title}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            q.difficulty === 'Hard'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{q.description}</p>
                      {q.approachTip && (
                        <div className="bg-amber-50/70 border border-amber-200/60 p-2 rounded-lg text-xs text-amber-900 flex items-start gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Key Approach:</strong> {q.approachTip}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Round Specific Tips */}
              {currentRound.tips && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200/60 flex items-start gap-2 text-xs text-blue-900">
                  <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold">Senior Pro-Tip for this Round: </span>
                    {currentRound.tips}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Overall Preparation Tips List */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Essential Preparation Tips for {experience.companyName}
            </h4>
            <ul className="space-y-1.5 text-sm text-slate-700">
              {experience.preparationTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Mentor Info Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-navy-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={experience.mentorAvatar}
                alt={experience.mentorName}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-400"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-white">{experience.mentorName}</h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <p className="text-xs text-slate-300">
                  {experience.mentorRole} ({experience.mentorCompany})
                </p>
              </div>
            </div>

            {onAskMentor && (
              <button
                onClick={() => {
                  onClose();
                  onAskMentor(experience.mentorId, experience.mentorName, experience.companyName);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ask {experience.mentorName.split(' ')[0]} a Question</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Submitted on {experience.submittedAt} • Verified by Placement Cell</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors"
          >
            Close Experience
          </button>
        </div>
      </div>
    </div>
  );
};
