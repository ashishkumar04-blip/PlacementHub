import React from 'react';
import { usePlacement } from '../context/PlacementContext';
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock,
  Building2,
  Sparkles,
  PieChart,
  ArrowUpRight,
  Award,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const {
    overallProgress,
    prepTasks,
    applications,
    categoryProgress,
    setActivePage
  } = usePlacement();

  const completedTasksCount = prepTasks.filter((t) => t.completed).length;
  const pendingTasksCount = prepTasks.length - completedTasksCount;

  // Application Funnel Stats
  const interestedCount = applications.filter((a) => a.status === 'Interested').length;
  const appliedCount = applications.filter((a) => a.status === 'Applied').length;
  const oaCount = applications.filter((a) => a.status === 'Online Assessment').length;
  const techCount = applications.filter((a) => a.status === 'Technical Interview').length;
  const hrCount = applications.filter((a) => a.status === 'HR Interview').length;
  const selectedCount = applications.filter((a) => a.status === 'Selected').length;
  const rejectedCount = applications.filter((a) => a.status === 'Rejected').length;

  // Mock weekly study hours
  const weeklyHours = [
    { day: 'Mon', hours: 4.5, target: 5 },
    { day: 'Tue', hours: 6.0, target: 5 },
    { day: 'Wed', hours: 5.5, target: 5 },
    { day: 'Thu', hours: 7.0, target: 5 },
    { day: 'Fri', hours: 4.0, target: 5 },
    { day: 'Sat', hours: 8.5, target: 6 },
    { day: 'Sun', hours: 6.5, target: 6 }
  ];

  const totalWeeklyHours = weeklyHours.reduce((acc, curr) => acc + curr.hours, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Placement Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
            Preparation & Performance Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor your placement readiness score, weekly study consistency, application conversion funnel, and subject strengths.
          </p>
        </div>

        <button
          onClick={() => setActivePage('my-prep')}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
        >
          Update Preparation Checklist →
        </button>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Overall Readiness</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-navy-950 mt-2">
            {overallProgress}%
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Targeting 80%+ readiness before mass on-campus drives.
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Weekly Study Time</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700 mt-2">
            {totalWeeklyHours} hrs
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Average <strong>6.0 hrs/day</strong> dedicated to coding and theory.
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Application Ratio</span>
            <Building2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-navy-950 mt-2">
            {applications.length}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            <strong className="text-emerald-700">{selectedCount} Selected</strong> • {rejectedCount} Rejected
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Task Completion</span>
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-navy-950 mt-2">
            {completedTasksCount} / {prepTasks.length}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            <strong>{pendingTasksCount} items remaining</strong> in checklist.
          </p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Subject Preparation Mastery */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-navy-950">
              Subject-Wise Preparation Mastery
            </h3>
            <span className="text-xs font-bold text-blue-600">8 Categories</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {Object.entries(categoryProgress).map(([category, stats]) => (
              <div key={category} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{category}</span>
                  <span className="font-extrabold text-slate-900">
                    {stats.percentage}% ({stats.completed}/{stats.total})
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      stats.percentage >= 65
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

        {/* Chart 2: Weekly Study Consistency Hours */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-navy-950">
                Weekly Study Consistency
              </h3>
              <span className="text-xs font-bold text-slate-400">Past 7 Days</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Daily time logged solving coding problems, reading CS fundamentals, and giving mock interviews.
            </p>

            {/* Visual Bar Chart */}
            <div className="pt-8 pb-4 flex items-end justify-between gap-3 h-48 px-2 border-b border-slate-100">
              {weeklyHours.map((item) => {
                const heightPercentage = Math.min(Math.round((item.hours / 10) * 100), 100);
                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.hours}h
                    </span>
                    <div className="w-full bg-slate-100 h-32 rounded-xl flex items-end overflow-hidden p-1">
                      <div
                        className="w-full bg-blue-600 rounded-lg group-hover:bg-blue-500 transition-all"
                        style={{ height: `${heightPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-700">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-2xl flex items-center justify-between text-xs text-blue-900">
            <span className="font-semibold">Weekly Target (35 Hours)</span>
            <span className="font-bold text-emerald-700">✓ Target Exceeded ({totalWeeklyHours} Hours)</span>
          </div>
        </div>
      </div>

      {/* Recruitment Funnel & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recruitment Funnel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-navy-950">
                Company Application Funnel
              </h3>
              <p className="text-xs text-slate-500">
                Conversion stages from interest to final offer
              </p>
            </div>
            <button
              onClick={() => setActivePage('application-tracker')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Open Manager →
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { stage: 'Applied / Interested', count: appliedCount + interestedCount, color: 'bg-slate-500' },
              { stage: 'Online Assessment (OA)', count: oaCount, color: 'bg-blue-600' },
              { stage: 'Technical Interviews', count: techCount, color: 'bg-indigo-600' },
              { stage: 'HR / Behavioral Rounds', count: hrCount, color: 'bg-purple-600' },
              { stage: 'Final Offers (Selected)', count: selectedCount, color: 'bg-emerald-600' }
            ].map((f, i) => {
              const maxCount = applications.length || 1;
              const widthPct = Math.max(Math.round((f.count / maxCount) * 100), 12);
              return (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">{f.stage}</span>
                    <span className="font-extrabold text-slate-900">{f.count} Companies</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${f.color} transition-all duration-500`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-base text-navy-950">
                Placement Readiness Insights
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Action items based on your weakest subject areas:
            </p>

            <div className="space-y-3 mt-4">
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <span className="font-bold block">1. Bolster Operating Systems (40% Mastery)</span>
                <p className="text-amber-800">
                  Virtual memory and TLB paging questions appear frequently in Google & Goldman Sachs rounds.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
                <span className="font-bold block">2. Schedule Mock Tech Interview</span>
                <p className="text-blue-800">
                  Connect with mentor Priya Nair to practice live Google Docs code verbalization.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <span className="font-bold block">3. Great Strength: DSA & OOP</span>
                <p className="text-emerald-800">
                  75%+ completion across Linked Lists, Binary Trees, and SOLID design patterns.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActivePage('my-prep')}
            className="w-full py-2.5 bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Review Weak Subjects
          </button>
        </div>
      </div>
    </div>
  );
};
