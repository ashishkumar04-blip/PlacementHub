import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Building2,
  Users2,
  BookOpen,
  Eye,
  Award,
  Sparkles,
  Calendar,
  AlertTriangle,
  FileText,
  DollarSign
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    companies,
    verifyInterviewExperience,
    mentors,
    verifyMentor,
    resources,
    verifyResource,
    applications,
    setSelectedExperience
  } = usePlacement();

  const [activeQueueTab, setActiveQueueTab] = useState<'experiences' | 'mentors' | 'resources'>('experiences');

  // Pending items
  const pendingExperiences = companies.filter((c) => c.status === 'pending_review');
  const pendingMentors = mentors.filter((m) => !m.isVerified);
  const pendingResources = resources.filter((r) => !r.isVerified);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-navy-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-card">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-400/30">
            <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
            <span>Placement & Training Directorate Administration</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Admin Verification & Moderation Portal
          </h1>

          <p className="text-purple-100 text-xs sm:text-sm leading-relaxed">
            Ensure platform integrity. Review company interview rounds, authenticate corporate email IDs for senior mentors, and verify high-quality placement resources.
          </p>
        </div>
      </div>

      {/* Platform Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <div className="text-xs font-bold uppercase text-slate-400">Total Applications</div>
          <div className="text-3xl font-extrabold text-navy-950 mt-1">{applications.length}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Active campus tracking</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <div className="text-xs font-bold uppercase text-slate-400">Verified Mentors</div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-1">
            {mentors.filter((m) => m.isVerified).length}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Across Google, MSFT, AWS</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <div className="text-xs font-bold uppercase text-slate-400">Published Experiences</div>
          <div className="text-3xl font-extrabold text-blue-600 mt-1">
            {companies.filter((c) => c.status === 'published').length}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Live on Company Hub</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <div className="text-xs font-bold uppercase text-slate-400">Pending Reviews</div>
          <div className="text-3xl font-extrabold text-purple-600 mt-1">
            {pendingExperiences.length + pendingMentors.length + pendingResources.length}
          </div>
          <span className="text-[11px] text-purple-700 font-semibold">Awaiting your approval</span>
        </div>
      </div>

      {/* Verification Queue Navigation Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-bold max-w-xl">
        <button
          onClick={() => setActiveQueueTab('experiences')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeQueueTab === 'experiences'
              ? 'bg-white text-navy-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4 text-blue-600" />
          <span>Experiences ({pendingExperiences.length})</span>
        </button>

        <button
          onClick={() => setActiveQueueTab('mentors')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeQueueTab === 'mentors'
              ? 'bg-white text-navy-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users2 className="w-4 h-4 text-emerald-600" />
          <span>Mentors ({pendingMentors.length})</span>
        </button>

        <button
          onClick={() => setActiveQueueTab('resources')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeQueueTab === 'resources'
              ? 'bg-white text-navy-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-purple-600" />
          <span>Resources ({pendingResources.length})</span>
        </button>
      </div>

      {/* Queue 1: Pending Experiences */}
      {activeQueueTab === 'experiences' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-base text-navy-950">
                Pending Interview Experiences ({pendingExperiences.length})
              </h3>
              <p className="text-xs text-slate-500">
                Experiences submitted by mentors or students awaiting Placement Cell validation
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {pendingExperiences.map((exp) => (
              <div
                key={exp.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center font-bold text-navy-900">
                      {exp.companyName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base text-slate-900">
                          {exp.companyName}
                        </span>
                        <span className="text-xs text-slate-500">
                          • {exp.jobRole} (Batch {exp.placementYear})
                        </span>
                      </div>
                      <p className="text-xs text-blue-700 font-semibold">
                        Submitted by: {exp.mentorName} ({exp.mentorRole})
                      </p>
                    </div>
                  </div>

                  <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                    Pending Review
                  </span>
                </div>

                <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60 leading-relaxed italic">
                  "{exp.summary}"
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-slate-500">Interview Rounds ({exp.rounds.length}):</span>
                  {exp.rounds.map((r) => (
                    <span
                      key={r.roundNumber}
                      className="bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded font-medium text-[11px]"
                    >
                      R{r.roundNumber}: {r.roundName}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/70">
                  <button
                    onClick={() => setSelectedExperience(exp)}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Round Details</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => verifyInterviewExperience(exp.id, false)}
                      className="px-3.5 py-1.5 bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Reject</span>
                    </button>

                    <button
                      onClick={() => verifyInterviewExperience(exp.id, true)}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Publish Live</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {pendingExperiences.length === 0 && (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                No pending interview experiences to review. All submissions are up to date!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Queue 2: Pending Mentors */}
      {activeQueueTab === 'mentors' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-navy-950">
              Pending Senior Mentor Verifications ({pendingMentors.length})
            </h3>
            <p className="text-xs text-slate-500">
              Verify company employment credentials and college alumni records before awarding Verified Senior Badges
            </p>
          </div>

          <div className="space-y-4">
            {pendingMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-200"
                  />
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900">{mentor.name}</h4>
                    <p className="text-xs font-bold text-blue-700">
                      {mentor.jobRole} @ {mentor.company}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Email: <strong className="text-slate-700">{mentor.email}</strong> • College: {mentor.college}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => verifyMentor(mentor.id, false)}
                    className="px-3.5 py-1.5 bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => verifyMentor(mentor.id, true)}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify & Grant Badge</span>
                  </button>
                </div>
              </div>
            ))}

            {pendingMentors.length === 0 && (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                All senior mentors verified! Zero pending applications in queue.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Queue 3: Pending Resources */}
      {activeQueueTab === 'resources' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-navy-950">
              Community Resource Moderation ({pendingResources.length})
            </h3>
            <p className="text-xs text-slate-500">
              Review student notes and guides before certifying them with the official Placement Cell verification tag
            </p>
          </div>

          <div className="space-y-4">
            {pendingResources.map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    {res.category}
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-900 mt-1">{res.title}</h4>
                  <p className="text-xs text-slate-500">{res.description}</p>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Uploaded by {res.contributorName} ({res.contributorRole})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => verifyResource(res.id, false)}
                    className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => verifyResource(res.id, true)}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Verify</span>
                  </button>
                </div>
              </div>
            ))}

            {pendingResources.length === 0 && (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                All placement library resources are reviewed and certified.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
