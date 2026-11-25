import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { CompanyExperience } from '../types/placement';
import {
  Search,
  Filter,
  Building2,
  CheckCircle2,
  AlertCircle,
  Award,
  DollarSign,
  Calendar,
  ChevronRight,
  PlusCircle,
  Star,
  Layers,
  Sparkles
} from 'lucide-react';

interface CompanyHubProps {
  onOpenSubmitModal: () => void;
  onAskMentor: (mentorId: string, mentorName: string, company: string) => void;
}

export const CompanyHub: React.FC<CompanyHubProps> = ({
  onOpenSubmitModal,
  onAskMentor
}) => {
  const { companies, setSelectedExperience, activeRole } = usePlacement();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Available unique roles for filter
  const roleFilters = ['All', 'Software Engineer', 'SDE-1', 'Specialist Programmer', 'TCS Digital', 'AAEA Analyst'];

  // Filter logic
  const filteredExperiences = companies.filter((exp) => {
    // Show only published unless admin
    if (activeRole !== 'admin' && exp.status !== 'published') {
      return false;
    }

    const matchesSearch =
      exp.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.jobRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole =
      selectedRoleFilter === 'All' ||
      exp.jobRole.toLowerCase().includes(selectedRoleFilter.toLowerCase());

    const matchesDiff =
      selectedDifficulty === 'All' || exp.difficulty === selectedDifficulty;

    const matchesVerified = onlyVerified ? exp.isVerified : true;

    return matchesSearch && matchesRole && matchesDiff && matchesVerified;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Verified Knowledge Base</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
            Company Interview Experience Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Explore verified round-by-round interview questions, test formats, and senior preparation blueprints.
          </p>
        </div>

        <button
          onClick={onOpenSubmitModal}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Share Interview Experience</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-subtle space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search companies (Google, Microsoft, Amazon), topics, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Difficulty Dropdown */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Verified Toggle */}
          <button
            onClick={() => setOnlyVerified(!onlyVerified)}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
              onlyVerified
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Verified Only</span>
          </button>
        </div>

        {/* Role Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
          <span className="font-bold text-slate-400 uppercase tracking-wider mr-1 text-[11px]">
            Roles:
          </span>
          {roleFilters.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRoleFilter(role)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-semibold transition-all ${
                selectedRoleFilter === role
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-900">{filteredExperiences.length}</strong> company interview experiences
        </span>
      </div>

      {/* Company Experience Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((exp) => (
          <div
            key={exp.id}
            onClick={() => setSelectedExperience(exp)}
            className="bg-white rounded-3xl border border-slate-200 shadow-subtle hover:shadow-card-hover hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group"
          >
            {/* Top Card Section */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 p-2 shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                    {exp.companyLogo ? (
                      <img
                        src={exp.companyLogo}
                        alt={exp.companyName}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <Building2 className="w-6 h-6 text-slate-700" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-navy-950 group-hover:text-blue-600 transition-colors">
                      {exp.companyName}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">
                      {exp.jobRole}
                    </p>
                  </div>
                </div>

                {/* Difficulty Badge */}
                <span
                  className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    exp.difficulty === 'Hard'
                      ? 'bg-rose-100 text-rose-700'
                      : exp.difficulty === 'Medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {exp.difficulty}
                </span>
              </div>

              {/* Verified Badge & CTC */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  {exp.isVerified ? (
                    <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md text-[11px] border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Senior
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md text-[11px] border border-amber-200">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      Under Review
                    </span>
                  )}
                </div>

                <span className="font-extrabold text-navy-950 text-xs flex items-center gap-0.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  {exp.ctcOffered}
                </span>
              </div>

              {/* Rounds Pills */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Interview Rounds ({exp.rounds.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {exp.rounds.map((r) => (
                    <span
                      key={r.roundNumber}
                      className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                    >
                      R{r.roundNumber}: {r.roundName.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Summary Snippet */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                "{exp.summary}"
              </p>
            </div>

            {/* Bottom Card Footer: Mentor & CTA */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={exp.mentorAvatar}
                  alt={exp.mentorName}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div className="text-[11px]">
                  <span className="font-bold text-slate-800 block leading-tight truncate max-w-[130px]">
                    {exp.mentorName}
                  </span>
                  <span className="text-slate-400 text-[10px]">Batch of {exp.placementYear}</span>
                </div>
              </div>

              <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View Details</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredExperiences.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No company experiences found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms, role filters, or difficulty selection.
          </p>
        </div>
      )}
    </div>
  );
};
