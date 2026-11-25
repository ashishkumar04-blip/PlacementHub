import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { MentorProfile } from '../types/placement';
import {
  Search,
  Users2,
  CheckCircle2,
  Star,
  MessageSquare,
  Send,
  Building2,
  Sparkles,
  Award,
  ExternalLink,
  X,
  HelpCircle
} from 'lucide-react';

export const MentorDirectory: React.FC = () => {
  const {
    mentors,
    sendMentorshipRequest,
    askMentorQuestion,
    mentorQuestions,
    activeRole
  } = usePlacement();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'mentors' | 'qa'>('mentors');

  // Modals
  const [selectedMentorForRequest, setSelectedMentorForRequest] = useState<MentorProfile | null>(null);
  const [selectedMentorForQuestion, setSelectedMentorForQuestion] = useState<MentorProfile | null>(null);

  // Form states
  const [requestTargetCompany, setRequestTargetCompany] = useState('');
  const [requestMessage, setRequestMessage] = useState('');

  const [questionSubject, setQuestionSubject] = useState('');
  const [questionBody, setQuestionBody] = useState('');

  const companiesList = ['All', 'Microsoft', 'Google', 'Amazon', 'Infosys', 'TCS'];

  // Filter mentors
  const filteredMentors = mentors.filter((m) => {
    // Show only verified unless admin
    if (activeRole !== 'admin' && !m.isVerified) {
      return false;
    }

    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.jobRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCompany =
      selectedCompanyFilter === 'All' ||
      m.company.toLowerCase() === selectedCompanyFilter.toLowerCase();

    return matchesSearch && matchesCompany;
  });

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentorForRequest) return;
    sendMentorshipRequest(
      selectedMentorForRequest.id,
      selectedMentorForRequest.name,
      requestTargetCompany || selectedMentorForRequest.company,
      requestMessage
    );
    setSelectedMentorForRequest(null);
    setRequestTargetCompany('');
    setRequestMessage('');
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentorForQuestion) return;
    askMentorQuestion(
      selectedMentorForQuestion.id,
      selectedMentorForQuestion.name,
      questionSubject,
      questionBody,
      selectedMentorForQuestion.company
    );
    setSelectedMentorForQuestion(null);
    setQuestionSubject('');
    setQuestionBody('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>1-on-1 Alumni Mentorship</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
            Senior Mentorship Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Connect directly with verified placed graduates and software engineers for resume reviews, mock interviews, and career Q&A.
          </p>
        </div>

        {/* View Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('mentors')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'mentors'
                ? 'bg-white text-navy-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Browse Mentors ({filteredMentors.length})
          </button>
          <button
            onClick={() => setActiveTab('qa')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'qa'
                ? 'bg-white text-navy-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Placement Q&A Hub ({mentorQuestions.length})
          </button>
        </div>
      </div>

      {activeTab === 'mentors' ? (
        <>
          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-subtle space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search mentors by name, company, or tech stack (e.g., LLD, AWS, LeetCode)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Company Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar text-xs">
                {companiesList.map((comp) => (
                  <button
                    key={comp}
                    onClick={() => setSelectedCompanyFilter(comp)}
                    className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all ${
                      selectedCompanyFilter === comp
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {comp}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mentors Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-subtle hover:shadow-card-hover hover:border-emerald-300 transition-all p-6 flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Top Profile Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-extrabold text-base text-navy-950">
                            {mentor.name}
                          </h3>
                          {mentor.isVerified && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs font-bold text-emerald-700">
                          {mentor.jobRole}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {mentor.company} • Batch of {mentor.placementYear}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-200">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      <span>{mentor.rating}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {mentor.bio}
                  </p>

                  {/* College Tag */}
                  <div className="mt-2 text-[11px] font-semibold text-slate-500">
                    🎓 Alumnus: {mentor.college}
                  </div>

                  {/* Specializations Pills */}
                  <div className="mt-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Mentoring Domains:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {mentor.specializations.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {mentor.menteesCount} Mentees Guided
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedMentorForQuestion(mentor);
                        setQuestionSubject(`Interview query regarding ${mentor.company}`);
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ask Q</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedMentorForRequest(mentor);
                        setRequestTargetCompany(mentor.company);
                      }}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Connect</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Q&A Tab */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-navy-950">
                Community Placement Q&A
              </h3>
              <p className="text-xs text-slate-500">
                Real student queries answered by verified senior mentors
              </p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full border border-blue-200">
              {mentorQuestions.length} Questions
            </span>
          </div>

          <div className="space-y-4">
            {mentorQuestions.map((q) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                    {q.companyTag || 'Placement Advice'} • {q.subject}
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
                      {q.studentName} asks:
                    </span>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      "{q.question}"
                    </p>
                  </div>
                </div>

                {q.answer ? (
                  <div className="ml-11 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/60 text-xs text-slate-700 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{q.mentorName}'s Verified Response:</span>
                    </div>
                    <p className="leading-relaxed">{q.answer}</p>
                    <span className="text-[10px] text-slate-400 block pt-1">
                      Answered at {q.answeredAt}
                    </span>
                  </div>
                ) : (
                  <div className="ml-11 text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>Awaiting response from {q.mentorName}...</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal 1: Request Mentorship */}
      {selectedMentorForRequest && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">
                  Request Mentorship with {selectedMentorForRequest.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMentorForRequest(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Company You are Preparing For
                </label>
                <input
                  type="text"
                  required
                  value={requestTargetCompany}
                  onChange={(e) => setRequestTargetCompany(e.target.value)}
                  placeholder="e.g. Microsoft, Google, Amazon"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  How can {selectedMentorForRequest.name} best guide you?
                </label>
                <textarea
                  rows={4}
                  required
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder="Introduce yourself (branch, year) and specify what you need help with (e.g. Resume ATS check, Mock LLD interview, or DSA roadmap)..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMentorForRequest(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Submit Mentorship Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Ask a Question */}
      {selectedMentorForQuestion && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">
                  Ask {selectedMentorForQuestion.name} a Placement Question
                </h3>
              </div>
              <button
                onClick={() => setSelectedMentorForQuestion(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendQuestion} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Topic / Subject Line
                </label>
                <input
                  type="text"
                  required
                  value={questionSubject}
                  onChange={(e) => setQuestionSubject(e.target.value)}
                  placeholder="e.g. Low-Level Design in SDE-1 interviews"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Specific Placement Question
                </label>
                <textarea
                  rows={4}
                  required
                  value={questionBody}
                  onChange={(e) => setQuestionBody(e.target.value)}
                  placeholder="Type your question clearly so the mentor can give concrete advice..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMentorForQuestion(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Post Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
