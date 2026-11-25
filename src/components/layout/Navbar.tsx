import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import {
  Search,
  Bell,
  CheckCircle2,
  Menu,
  X,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Building2,
  Users,
  Compass
} from 'lucide-react';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMobileSidebar,
  isMobileSidebarOpen
}) => {
  const {
    currentUser,
    activeRole,
    switchRole,
    activePage,
    setActivePage,
    notificationMessage,
    companies,
    mentors,
    setSelectedExperience
  } = usePlacement();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Search matches
  const filteredCompanies = searchQuery.trim()
    ? companies.filter(
        (c) =>
          c.status === 'published' &&
          (c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.jobRole.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const filteredMentors = searchQuery.trim()
    ? mentors.filter(
        (m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Toast Notification */}
      {notificationMessage && (
        <div className="bg-blue-600 text-white text-xs font-medium px-4 py-1.5 flex items-center justify-center gap-2 animate-fadeIn transition-all">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{notificationMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            onClick={() => setActivePage(activeRole === 'student' ? 'student-dashboard' : activeRole === 'mentor' ? 'mentor-dashboard' : 'admin-dashboard')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-900 to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-navy-900">Placement<span className="text-blue-600">Hub</span></span>
                <span className="bg-blue-50 text-blue-700 font-bold text-[10px] uppercase px-1.5 py-0.5 rounded border border-blue-200">
                  SaaS
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium -mt-0.5 hidden sm:block">
                Smart Tech Placement Guidance
              </p>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search companies (Google, Microsoft), mentors, or roles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Search Dropdown Modal */}
          {showSearchResults && searchQuery.trim().length > 0 && (
            <div
              className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-fadeIn"
              onMouseLeave={() => setShowSearchResults(false)}
            >
              <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Search results for "{searchQuery}"</span>
                <button
                  onClick={() => setShowSearchResults(false)}
                  className="hover:text-slate-700"
                >
                  Close
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 p-1">
                {filteredCompanies.length === 0 && filteredMentors.length === 0 ? (
                  <div className="p-4 text-center text-sm text-slate-500">
                    No matching companies or mentors found.
                  </div>
                ) : (
                  <>
                    {filteredCompanies.length > 0 && (
                      <div className="p-2">
                        <span className="text-[11px] font-semibold uppercase text-slate-400 px-2">
                          Companies & Experiences
                        </span>
                        {filteredCompanies.map((c) => (
                          <div
                            key={c.id}
                            onClick={() => {
                              setSelectedExperience(c);
                              setShowSearchResults(false);
                            }}
                            className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <Building2 className="w-4 h-4 text-blue-600" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-800 truncate">{c.companyName}</p>
                              <p className="text-xs text-slate-500 truncate">{c.jobRole} • {c.difficulty} Difficulty</p>
                            </div>
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded border border-emerald-200">
                              Verified
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {filteredMentors.length > 0 && (
                      <div className="p-2">
                        <span className="text-[11px] font-semibold uppercase text-slate-400 px-2">
                          Mentors
                        </span>
                        {filteredMentors.map((m) => (
                          <div
                            key={m.id}
                            onClick={() => {
                              setActivePage('mentor-directory');
                              setShowSearchResults(false);
                            }}
                            className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <img
                              src={m.avatar}
                              alt={m.name}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-800 truncate">{m.name}</p>
                              <p className="text-xs text-slate-500 truncate">{m.jobRole} @ {m.company}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Actions: Notifications, Current Role Badge & Avatar */}
        <div className="flex items-center gap-3">
          {/* Notifications Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl relative transition-colors"
              title="Recent alerts"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white animate-pulse" />
            </button>

            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-fadeIn"
                onMouseLeave={() => setShowNotifications(false)}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    3 New
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto mt-2">
                  <div className="py-2.5">
                    <p className="text-xs font-semibold text-slate-800">Microsoft Codility OA starts in 24 hrs</p>
                    <p className="text-[11px] text-slate-500">Scheduled for Nov 27 • 06:00 PM IST</p>
                  </div>
                  <div className="py-2.5">
                    <p className="text-xs font-semibold text-slate-800">Priya Nair accepted mentorship</p>
                    <p className="text-[11px] text-slate-500">"Happy to help with your LLD preparation!"</p>
                  </div>
                  <div className="py-2.5">
                    <p className="text-xs font-semibold text-slate-800">New verified experience: Google SWE-1</p>
                    <p className="text-[11px] text-slate-500">Verified by Placement Cell coordinator</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-slate-200">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
            />
            <div className="hidden sm:block text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-900 leading-tight">
                  {currentUser.name}
                </span>
                {currentUser.verified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                )}
              </div>
              <span
                className={`text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded inline-block ${
                  activeRole === 'student'
                    ? 'bg-blue-100 text-blue-800'
                    : activeRole === 'mentor'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-purple-100 text-purple-800'
                }`}
              >
                {activeRole}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
