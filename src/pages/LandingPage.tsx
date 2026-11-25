import React from 'react';
import { usePlacement } from '../context/PlacementContext';
import {
  Building2,
  Users2,
  CheckSquare,
  Kanban,
  BookOpen,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  Sparkles,
  HelpCircle,
  Clock,
  Layers,
  GraduationCap
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActivePage, switchRole } = usePlacement();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-200 bg-gradient-to-b from-white via-blue-50/30 to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Smart Tech Placement Guidance Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-tight">
              Crack Top Tech Placements with <span className="text-blue-600">Verified Senior Insights</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Eliminate scattered placement info, unverified interview rumors, and preparation anxiety.
              A centralized hub for verified interview rounds, 1-on-1 senior mentorship, structured 8-subject checklists, and Kanban application tracking.
            </p>

            {/* Quick Persona Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  switchRole('student');
                  setActivePage('student-dashboard');
                }}
                className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Launch Student Dashboard (Aman)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  switchRole('mentor');
                  setActivePage('mentor-dashboard');
                }}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm flex items-center gap-2 transition-all"
              >
                <span>Mentor Workspace (Priya)</span>
              </button>

              <button
                onClick={() => {
                  switchRole('admin');
                  setActivePage('admin-dashboard');
                }}
                className="px-5 py-3.5 rounded-2xl bg-navy-900 hover:bg-navy-950 text-white font-bold text-sm shadow-sm flex items-center gap-2 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Admin Moderation</span>
              </button>
            </div>

            {/* Verification Guarantee */}
            <div className="flex items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-500 flex-wrap">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% Admin-Verified Experiences
              </span>
              <span className="flex items-center gap-1.5 text-blue-700">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Real Senior Mentors @ Top Tech
              </span>
              <span className="flex items-center gap-1.5 text-purple-700">
                <Layers className="w-4 h-4 text-purple-600" />
                8-Subject Structured Tracker
              </span>
            </div>
          </div>

          {/* Platform Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle text-center">
              <div className="text-3xl font-extrabold text-navy-900">500+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                Verified Experiences
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle text-center">
              <div className="text-3xl font-extrabold text-blue-600">80+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                Tier 1 & 2 Companies
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle text-center">
              <div className="text-3xl font-extrabold text-emerald-600">120+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                Senior Mentors
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle text-center">
              <div className="text-3xl font-extrabold text-purple-600">95%</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                Placement Readiness
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Comparison Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
              Why PlacementHub?
            </span>
            <h2 className="text-3xl font-extrabold text-navy-950 mt-1">
              Transforming Chaotic Preparation into Structured Success
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Engineering students often fail not due to lack of coding skills, but because of scattered information and absence of verified guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Old Problem */}
            <div className="p-6 rounded-3xl bg-rose-50/60 border border-rose-200 space-y-4">
              <div className="flex items-center gap-2 text-rose-700 font-extrabold text-sm uppercase tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                The Current Problem (Without PlacementHub)
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>Scattered WhatsApp Groups:</strong> Critical drive notifications and interview questions get buried under chat spam.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>Unverified Interview Rumors:</strong> Misleading advice on round difficulties, syllabus, and hiring criteria.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>Preparation Anxiety:</strong> No clear roadmap on what to study between DSA, OOP, DBMS, OS, and System Design.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>Chaotic Excel Tracking:</strong> Missed test deadlines, duplicate applications, and zero visibility into application stages.</span>
                </li>
              </ul>
            </div>

            {/* The PlacementHub Solution */}
            <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm uppercase tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                The PlacementHub Solution
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Verified Company Hub:</strong> Complete 4-round breakdown (OA, Tech 1, Tech 2, HR) with real questions and coding hints.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Senior Mentorship:</strong> Direct 1-on-1 Q&A and guidance from placed seniors working at Microsoft, Google, Amazon.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>8-Subject Smart Tracker:</strong> Category-wise progress bars across DSA, Core CS, Aptitude, and HR interview prep.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>7-Stage Kanban Tracker:</strong> Visual pipeline from "Interested" to "Selected" with interview countdowns.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
              Core Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-navy-950 mt-1">
              Everything You Need to Secure Your Dream Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Company Hub */}
            <div
              onClick={() => setActivePage('company-hub')}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle hover:shadow-card hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 group-hover:text-blue-600 transition-colors">
                Company Interview Hub
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Explore real interview rounds for Google, Microsoft, Amazon, Infosys, and TCS with problem descriptions, constraints, and mentor tips.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 mt-4">
                Explore Companies →
              </span>
            </div>

            {/* 2. Senior Mentors */}
            <div
              onClick={() => setActivePage('mentor-directory')}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle hover:shadow-card hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 group-hover:text-emerald-600 transition-colors">
                Senior Mentorship System
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Connect with verified college alumni now working as SWEs. Send mentorship requests, ask targeted questions, and get actionable advice.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 mt-4">
                Browse Mentors →
              </span>
            </div>

            {/* 3. Prep Tracker */}
            <div
              onClick={() => setActivePage('my-prep')}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle hover:shadow-card hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 group-hover:text-amber-600 transition-colors">
                8-Subject Prep Tracker
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Follow structured checklists for DSA, OOP, DBMS, OS, Networks, Aptitude, Tech Practice, and HR questions with live percentage calculation.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 mt-4">
                View Checklist →
              </span>
            </div>

            {/* 4. Application Tracker */}
            <div
              onClick={() => setActivePage('application-tracker')}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle hover:shadow-card hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Kanban className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 group-hover:text-purple-600 transition-colors">
                Company Application Manager
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Visual Kanban board & data table to monitor applications across 7 stages: Interested, Applied, OA, Tech, HR, Selected, and Rejected.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 mt-4">
                Open Kanban Board →
              </span>
            </div>

            {/* 5. Resource Library */}
            <div
              onClick={() => setActivePage('resources')}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle hover:shadow-card hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 group-hover:text-blue-600 transition-colors">
                Verified Resource Library
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Handcrafted cheat sheets, ATS resume templates, top 75 coding question sets, and previous year campus question banks.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 mt-4">
                Access Resources →
              </span>
            </div>

            {/* 6. Progress Analytics */}
            <div
              onClick={() => setActivePage('analytics')}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle hover:shadow-card hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 group-hover:text-rose-600 transition-colors">
                Placement Analytics & Score
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Visualize preparation progress, study hours, application conversion funnels, and personalized gap analysis before the drive begins.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 mt-4">
                View Analytics →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
              Senior Reviews
            </span>
            <h2 className="text-3xl font-extrabold text-navy-950 mt-1">
              Proven Impact on Engineering Placements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "The round-by-round breakdown for Microsoft SDE was 100% accurate. Having the LLD questions in advance helped me prepare Factory patterns effectively!"
              </p>
              <div className="pt-2 border-t border-slate-200/60">
                <div className="font-bold text-xs text-slate-900">Aman Sharma</div>
                <div className="text-[11px] text-slate-500">B.Tech CSE '25, Placed at TCS Prime</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "As an alumnus, I always wanted to help juniors without getting flooded with random LinkedIn DMs. PlacementHub’s Q&A and experience submission workflow is seamless."
              </p>
              <div className="pt-2 border-t border-slate-200/60">
                <div className="font-bold text-xs text-slate-900">Priya Nair</div>
                <div className="text-[11px] text-slate-500">Software Engineer II @ Microsoft</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "The admin verification queue ensures zero bogus submissions. Our college placement rate increased significantly thanks to structured roadmaps."
              </p>
              <div className="pt-2 border-t border-slate-200/60">
                <div className="font-bold text-xs text-slate-900">Prof. Rajesh Sharma</div>
                <div className="text-[11px] text-slate-500">Chief Placement Coordinator</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 text-white py-10 border-t border-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              PH
            </div>
            <span className="font-extrabold text-lg tracking-tight">PlacementHub</span>
          </div>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            A comprehensive, verified technical placement platform for undergraduate engineering students.
          </p>
          <div className="text-[11px] text-slate-500 pt-4 border-t border-navy-900">
            © 2026 PlacementHub Platform. Built for Engineering College Placement Cells.
          </div>
        </div>
      </footer>
    </div>
  );
};
