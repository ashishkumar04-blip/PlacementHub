import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { CompanyExperience } from '../types/placement';
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  MessageSquare,
  PlusCircle,
  Star,
  Users2,
  Award,
  Send,
  Building2,
  Clock,
  Sparkles,
  HelpCircle,
  X
} from 'lucide-react';

export const MentorDashboard: React.FC = () => {
  const {
    currentUser,
    mentorshipRequests,
    respondMentorshipRequest,
    mentorQuestions,
    answerMentorQuestion,
    submitInterviewExperience,
    companies
  } = usePlacement();

  const [activeTab, setActiveTab] = useState<'requests' | 'inbox' | 'submit-exp'>('requests');

  // Response Note Modal for Mentorship Request
  const [activeRequestModal, setActiveRequestModal] = useState<{
    id: string;
    studentName: string;
    action: 'accepted' | 'declined';
  } | null>(null);
  const [responseNote, setResponseNote] = useState('');

  // Answering Question State
  const [answeringQuestionId, setAnsweringQuestionId] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState('');

  // Submit Experience Form State
  const [expCompany, setExpCompany] = useState('');
  const [expRole, setExpRole] = useState('Software Engineer');
  const [expYear, setExpYear] = useState(2024);
  const [expDiff, setExpDiff] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [expCtc, setExpCtc] = useState('₹22 LPA');
  const [expSummary, setExpSummary] = useState('');
  const [round1Details, setRound1Details] = useState('');
  const [round2Details, setRound2Details] = useState('');
  const [round3Details, setRound3Details] = useState('');
  const [round4Details, setRound4Details] = useState('');
  const [prepTips, setPrepTips] = useState('');

  // Filter requests for current mentor (or all for demo simplicity)
  const myRequests = mentorshipRequests;
  const myQuestions = mentorQuestions;

  const handleConfirmRequestResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRequestModal) return;
    respondMentorshipRequest(
      activeRequestModal.id,
      activeRequestModal.action,
      responseNote
    );
    setActiveRequestModal(null);
    setResponseNote('');
  };

  const handleSaveAnswer = (questionId: string) => {
    if (!answerText.trim()) return;
    answerMentorQuestion(questionId, answerText);
    setAnsweringQuestionId(null);
    setAnswerText('');
  };

  const handleSubmitNewExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expCompany.trim()) return;

    submitInterviewExperience({
      companyName: expCompany,
      jobRole: expRole,
      placementYear: expYear,
      difficulty: expDiff,
      ctcOffered: expCtc,
      summary: expSummary || `Selected for ${expCompany} ${expRole} after rigorous technical rounds.`,
      rounds: [
        {
          roundNumber: 1,
          roundName: 'Online Assessment',
          duration: '90 mins',
          platform: 'HackerRank / Mettl',
          details: round1Details || 'Coding assessment covering arrays, dynamic programming, and core CS MCQs.',
          keyTopics: ['DSA', 'MCQs'],
          tips: 'Watch for edge cases and time limits.'
        },
        {
          roundNumber: 2,
          roundName: 'Technical Interview 1',
          duration: '60 mins',
          platform: 'Google Meet / MS Teams',
          details: round2Details || 'Data structures, algorithm complexity analysis, and live coding.',
          keyTopics: ['Algorithms', 'Data Structures'],
          tips: 'Communicate your thought process out loud.'
        },
        {
          roundNumber: 3,
          roundName: 'Technical Interview 2',
          duration: '45 mins',
          platform: 'MS Teams',
          details: round3Details || 'Core CS fundamentals: DBMS SQL queries, OS threads, and project discussion.',
          keyTopics: ['Core CS', 'Projects'],
          tips: 'Be prepared to explain design choices in your projects.'
        },
        {
          roundNumber: 4,
          roundName: 'HR / Behavioral Round',
          duration: '30 mins',
          platform: 'Video Call',
          details: round4Details || 'Cultural fit, team conflict scenarios, and motivation.',
          keyTopics: ['STAR Method', 'Leadership'],
          tips: 'Align your answers with company core values.'
        }
      ],
      preparationTips: prepTips
        ? prepTips.split('\n').filter((t) => t.trim().length > 0)
        : ['Solve standard Leetcode patterns', 'Revise SQL queries and OS concepts', 'Practice STAR stories']
    });

    // Reset form
    setExpCompany('');
    setExpSummary('');
    setRound1Details('');
    setRound2Details('');
    setRound3Details('');
    setRound4Details('');
    setPrepTips('');
    setActiveTab('requests');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Mentor Profile Overview Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-navy-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl object-cover ring-4 ring-emerald-400/30 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {currentUser.name}
                </h1>
                <span className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Senior Mentor
                </span>
              </div>
              <p className="text-emerald-200 text-sm mt-0.5 font-medium">
                {currentUser.jobRole || 'Software Engineer II'} @ {currentUser.company || 'Microsoft'}
              </p>
              <p className="text-slate-300 text-xs mt-1">
                🎓 Alumnus: {currentUser.college || 'NIT Trichy'} • Batch of {currentUser.gradYear || 2023}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-center">
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
              <div className="text-2xl font-black text-amber-300 flex items-center justify-center gap-1">
                <Star className="w-5 h-5 fill-amber-300" />
                <span>4.9</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 mt-0.5">
                Mentor Rating
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
              <div className="text-2xl font-black text-white">
                38
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 mt-0.5">
                Students Guided
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-bold max-w-xl">
        <button
          onClick={() => setActiveTab('requests')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'requests'
              ? 'bg-white text-navy-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users2 className="w-4 h-4 text-emerald-600" />
          <span>Mentorship Requests ({myRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inbox')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'inbox'
              ? 'bg-white text-navy-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-blue-600" />
          <span>Student Q&A Inbox ({myQuestions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('submit-exp')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'submit-exp'
              ? 'bg-white text-navy-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <PlusCircle className="w-4 h-4 text-purple-600" />
          <span>Share Experience</span>
        </button>
      </div>

      {/* Tab 1: Mentorship Requests */}
      {activeTab === 'requests' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-base text-navy-950">
                Incoming Junior Mentorship Requests
              </h3>
              <p className="text-xs text-slate-500">
                Undergraduate students requesting guidance for their upcoming placements
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {myRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={req.studentAvatar}
                      alt={req.studentName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          {req.studentName}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          ({req.studentCollege})
                        </span>
                      </div>
                      <span className="text-xs font-bold text-blue-700">
                        Targeting: {req.targetCompany}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                      req.status === 'accepted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : req.status === 'declined'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60 leading-relaxed italic">
                  "{req.message}"
                </p>

                {req.responseNote && (
                  <div className="p-3 bg-emerald-50 text-xs text-emerald-900 rounded-xl border border-emerald-200">
                    <span className="font-bold">Your Response Note:</span> {req.responseNote}
                  </div>
                )}

                {req.status === 'pending' && (
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60">
                    <button
                      onClick={() =>
                        setActiveRequestModal({
                          id: req.id,
                          studentName: req.studentName,
                          action: 'declined'
                        })
                      }
                      className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Decline</span>
                    </button>

                    <button
                      onClick={() =>
                        setActiveRequestModal({
                          id: req.id,
                          studentName: req.studentName,
                          action: 'accepted'
                        })
                      }
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Accept Mentorship</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Student Q&A Inbox */}
      {activeTab === 'inbox' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-navy-950">
              Student Placement Questions Inbox
            </h3>
            <p className="text-xs text-slate-500">
              Answer specific questions regarding interview rounds, preparation tips, and expectations
            </p>
          </div>

          <div className="space-y-4">
            {myQuestions.map((q) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-full">
                    {q.companyTag} • {q.subject}
                  </span>
                  <span className="text-[11px] text-slate-400">{q.createdAt}</span>
                </div>

                <div className="flex items-start gap-3">
                  <img
                    src={q.studentAvatar}
                    alt={q.studentName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">
                      {q.studentName}:
                    </span>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      "{q.question}"
                    </p>
                  </div>
                </div>

                {q.answer ? (
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-emerald-800">Your Answer:</span>
                    <p className="leading-relaxed">{q.answer}</p>
                    <span className="text-[10px] text-slate-400 block pt-1">
                      Submitted at {q.answeredAt}
                    </span>
                  </div>
                ) : (
                  <div>
                    {answeringQuestionId === q.id ? (
                      <div className="space-y-2 pt-2">
                        <textarea
                          rows={3}
                          value={answerText}
                          onChange={(e) => setAnswerText(e.target.value)}
                          placeholder="Type your practical advice for this student..."
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setAnsweringQuestionId(null)}
                            className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveAnswer(q.id)}
                            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                          >
                            Submit Answer
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setAnsweringQuestionId(q.id);
                          setAnswerText('');
                        }}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 mt-2"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Reply to {q.studentName}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Share Placement Experience Form */}
      {activeTab === 'submit-exp' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold mb-1">
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span>Admin Verification Workflow</span>
            </div>
            <h3 className="text-xl font-extrabold text-navy-950">
              Share Your Placement Interview Experience
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Help your college juniors by documenting all rounds. Submissions will be verified by the Placement Cell before appearing live on the Company Hub.
            </p>
          </div>

          <form onSubmit={handleSubmitNewExperience} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={expCompany}
                  onChange={(e) => setExpCompany(e.target.value)}
                  placeholder="e.g. Cisco, Uber, Adobe, Oracle"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Job Role
                </label>
                <input
                  type="text"
                  required
                  value={expRole}
                  onChange={(e) => setExpRole(e.target.value)}
                  placeholder="e.g. Software Engineer / SDE-1"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Offered CTC Package
                </label>
                <input
                  type="text"
                  required
                  value={expCtc}
                  onChange={(e) => setExpCtc(e.target.value)}
                  placeholder="e.g. ₹24 LPA"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Interview Difficulty Level
                </label>
                <select
                  value={expDiff}
                  onChange={(e) => setExpDiff(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Placement Year
                </label>
                <input
                  type="number"
                  value={expYear}
                  onChange={(e) => setExpYear(parseInt(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Overall Experience Summary
              </label>
              <textarea
                rows={2}
                value={expSummary}
                onChange={(e) => setExpSummary(e.target.value)}
                placeholder="High-level overview of the hiring drive, competition, and what helped you succeed..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* 4 Rounds Detail Breakdown */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <h4 className="font-extrabold text-sm text-navy-950">
                Round-by-Round Breakdown
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Round 1: Online Assessment (OA)
                  </label>
                  <textarea
                    rows={2}
                    value={round1Details}
                    onChange={(e) => setRound1Details(e.target.value)}
                    placeholder="Platform, duration, topics asked (e.g. 2 coding problems on arrays/DP + 20 MCQs)..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Round 2: Technical Interview 1
                  </label>
                  <textarea
                    rows={2}
                    value={round2Details}
                    onChange={(e) => setRound2Details(e.target.value)}
                    placeholder="DSA questions asked, live coding platform, complexity analysis..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Round 3: Technical Interview 2
                  </label>
                  <textarea
                    rows={2}
                    value={round3Details}
                    onChange={(e) => setRound3Details(e.target.value)}
                    placeholder="Core CS questions (DBMS, OS, Networks), system design, resume projects..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Round 4: HR / Behavioral Interview
                  </label>
                  <textarea
                    rows={2}
                    value={round4Details}
                    onChange={(e) => setRound4Details(e.target.value)}
                    placeholder="Managerial questions, cultural fit, questions you asked the interviewer..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preparation Tips for Juniors (One tip per line)
              </label>
              <textarea
                rows={3}
                value={prepTips}
                onChange={(e) => setPrepTips(e.target.value)}
                placeholder="Master graph BFS/DFS traversal&#10;Study ACID properties and indexing&#10;Prepare STAR method for behavioral answers"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Experience to Admin for Verification</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Response Note for Mentorship Request */}
      {activeRequestModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {activeRequestModal.action === 'accepted' ? 'Accept Request from ' : 'Decline Request from '}
                {activeRequestModal.studentName}
              </h3>
              <button
                onClick={() => setActiveRequestModal(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmRequestResponse} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Add a friendly note / schedule link:
                </label>
                <textarea
                  rows={3}
                  value={responseNote}
                  onChange={(e) => setResponseNote(e.target.value)}
                  placeholder={
                    activeRequestModal.action === 'accepted'
                      ? 'e.g. Glad to connect! Send over your resume and lets set up a call this Saturday.'
                      : 'e.g. Currently at full mentee capacity, but feel free to ask questions in the Q&A section.'
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveRequestModal(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 text-white font-bold text-xs rounded-xl shadow-md transition-colors ${
                    activeRequestModal.action === 'accepted'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  Confirm {activeRequestModal.action === 'accepted' ? 'Acceptance' : 'Decline'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
