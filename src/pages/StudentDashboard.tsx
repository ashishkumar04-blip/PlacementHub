import React from 'react';
import { usePlacement } from '../context/PlacementContext';
import {
  CheckSquare,
  Building2,
  Calendar,
  MessageSquare,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    overallProgress,
    prepTasks,
    applications,
    upcomingInterviews,
    mentorQuestions,
    categoryProgress,
    setActivePage,
    setSelectedExperience,
    companies
  } = usePlacement();

  const completedTasks = prepTasks.filter((t) => t.completed).length;
  const totalTasks = prepTasks.length;

  const activeApplications = applications.filter(
    (a) => a.status !== 'Rejected' && a.status !== 'Selected'
  );

  const selectedCount = applications.filter((a) => a.status === 'Selected').length;

  // Recent mentor questions that are answered
  const recentMentorAnswers = mentorQuestions
    .filter((q) => q.status === 'answered')
    .slice(0, 2);

  // Recommended activities
  const recommendedActivities = [
    {
      title: 'Practice Binary Tree DP & LCA',
      tag: 'Google & Microsoft Priority',
      duration: '45 mins',
      difficulty: 'Medium',
      actionPage: 'my-prep' as const
    },
    {
      title: 'Review ACID Properties & Dirty Reads',
      tag: 'Core CS - DBMS',
      duration: '30 mins',
      difficulty: 'Easy',
      actionPage: 'my-prep' as const
    },
    {
      title: 'Craft STAR Stories for Leadership Principles',
      tag: 'Amazon & Goldman Fit',
      duration: '35 mins',
      difficulty: 'Important',
      actionPage: 'my-prep' as const
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-blue-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-card">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Placement Season 2024–2025 Active</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Welcome back, {currentUser.name.split(' ')[0]}! 👋
          </h1>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            You are actively tracking <strong className="text-white">{applications.length} company applications</strong>. Your overall placement readiness is at <strong className="text-emerald-300">{overallProgress}%</strong>. Let's conquer today's target!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActivePage('my-prep')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Resume Preparation Checklist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActivePage('company-hub')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4" />
              <span>Explore Verified Experiences</span>
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Key Metric Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Overall Readiness */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Readiness Score
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-navy-950">{overallProgress}%</div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Based on 8 core tech placement categories
          </span>
        </div>

        {/* Metric 2: Companies Applied */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Target Companies
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-navy-950">
              {applications.length}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              <strong className="text-emerald-700">{activeApplications.length} active</strong> in pipeline
            </p>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {selectedCount} Offer(s) Received
          </span>
        </div>

        {/* Metric 3: Completed Tasks */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tasks Solved
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-navy-950">
              {completedTasks} <span className="text-sm font-medium text-slate-400">/ {totalTasks}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {totalTasks - completedTasks} remaining questions
            </p>
          </div>
          <button
            onClick={() => setActivePage('my-prep')}
            className="text-[11px] text-blue-600 font-bold hover:underline text-left"
          >
            Manage Checklist →
          </button>
        </div>

        {/* Metric 4: Upcoming Interviews */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Scheduled Rounds
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-navy-950">
              {upcomingInterviews.length}
            </div>
            <p className="text-xs text-purple-700 font-semibold mt-1">
              Next: Microsoft Codility OA
            </p>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Starts in 24 hours
          </span>
        </div>
      </div>

      {/* Main Content Grid: Upcoming Interviews & Subject-wise Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Upcoming Schedule & Mentor Updates */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Interview Schedule Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Upcoming Interview Schedules
                  </h3>
                  <p className="text-xs text-slate-500">
                    Active online assessments and technical panel interviews
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActivePage('application-tracker')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                View Pipeline →
              </button>
            </div>

            <div className="space-y-3">
              {upcomingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-wrap items-center justify-between gap-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-navy-900 text-sm shadow-xs">
                      {interview.companyName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          {interview.companyName}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          {interview.roundName}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {interview.role} • Intervewer: {interview.interviewerName || 'Panel'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1 justify-end">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>{interview.date}</span>
                      </div>
                      <span className="text-[11px] text-slate-500">{interview.time}</span>
                    </div>

                    <a
                      href={interview.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
                    >
                      <span>Join</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Mentor Responses */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Recent Mentor Responses
                  </h3>
                  <p className="text-xs text-slate-500">
                    Direct advice from verified seniors
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActivePage('mentor-directory')}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                Ask Question →
              </button>
            </div>

            <div className="space-y-3">
              {recentMentorAnswers.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                      {item.companyTag} • {item.subject}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.answeredAt}</span>
                  </div>

                  <p className="text-xs font-semibold text-slate-800">
                    Q: "{item.question}"
                  </p>

                  <div className="p-3 bg-white rounded-xl border border-emerald-200/60 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-emerald-800">
                      {item.mentorName}:
                    </span>{' '}
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Subject-Wise Progress & Recommendations */}
        <div className="space-y-6">
          {/* Subject Mastery Snapshot */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm">
                Subject Preparation Mastery
              </h3>
              <button
                onClick={() => setActivePage('my-prep')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                All 8 Subjects →
              </button>
            </div>

            <div className="space-y-3">
              {Object.entries(categoryProgress).slice(0, 5).map(([cat, stats]) => (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 truncate max-w-[180px]">
                      {cat}
                    </span>
                    <span className="font-bold text-slate-900">
                      {stats.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        stats.percentage >= 60
                          ? 'bg-emerald-500'
                          : stats.percentage >= 40
                          ? 'bg-blue-600'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${stats.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Recommended Prep Activities */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="font-extrabold text-slate-900 text-sm">
                Recommended Daily Drills
              </h3>
            </div>

            <div className="space-y-2.5">
              {recommendedActivities.map((act, i) => (
                <div
                  key={i}
                  onClick={() => setActivePage(act.actionPage)}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-blue-700">{act.tag}</span>
                    <span className="text-slate-400">{act.duration}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {act.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Verified Experience Promo */}
          {companies.length > 0 && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-navy-950 to-blue-900 text-white space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-blue-200 px-2 py-0.5 rounded-full">
                Featured Experience
              </span>
              <h4 className="text-sm font-extrabold">
                {companies[0].companyName} – {companies[0].jobRole}
              </h4>
              <p className="text-xs text-blue-200 leading-relaxed">
                4-round interview breakdown with live coding questions and CTC details.
              </p>
              <button
                onClick={() => setSelectedExperience(companies[0])}
                className="w-full py-2 bg-white text-navy-950 hover:bg-blue-50 font-bold text-xs rounded-xl transition-colors"
              >
                Read Round Breakdown
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
