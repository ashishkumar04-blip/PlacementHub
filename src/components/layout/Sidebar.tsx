import React from 'react';
import { usePlacement, NavigationPage } from '../../context/PlacementContext';
import {
  LayoutDashboard,
  Building2,
  Users2,
  CheckSquare,
  Kanban,
  BookOpen,
  BarChart3,
  UserCheck,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const {
    activePage,
    setActivePage,
    activeRole,
    prepTasks,
    applications,
    mentorshipRequests,
    companies
  } = usePlacement();

  const pendingTasksCount = prepTasks.filter((t) => !t.completed).length;
  const activeApplicationsCount = applications.filter(
    (a) => a.status !== 'Rejected' && a.status !== 'Selected'
  ).length;
  const pendingRequestsCount = mentorshipRequests.filter((r) => r.status === 'pending').length;
  const pendingReviewsCount = companies.filter((c) => c.status === 'pending_review').length;

  interface NavItem {
    id: NavigationPage;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
    badgeColor?: string;
  }

  const primaryNav: NavItem[] = [
    {
      id: 'student-dashboard',
      label: 'Student Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'company-hub',
      label: 'Company Hub',
      icon: Building2,
      badge: 'Experiences',
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'mentor-directory',
      label: 'Mentor Directory',
      icon: Users2,
    },
    {
      id: 'my-prep',
      label: 'Preparation Tracker',
      icon: CheckSquare,
      badge: pendingTasksCount,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'application-tracker',
      label: 'Application Manager',
      icon: Kanban,
      badge: activeApplicationsCount,
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'resources',
      label: 'Resource Library',
      icon: BookOpen,
    },
    {
      id: 'analytics',
      label: 'Progress Analytics',
      icon: BarChart3,
    }
  ];

  const roleNav: NavItem[] = [
    {
      id: 'mentor-dashboard',
      label: 'Mentor Portal',
      icon: UserCheck,
      badge: pendingRequestsCount > 0 ? `${pendingRequestsCount} Req` : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'admin-dashboard',
      label: 'Admin Moderation',
      icon: ShieldAlert,
      badge: pendingReviewsCount > 0 ? `${pendingReviewsCount} Review` : undefined,
      badgeColor: 'bg-purple-100 text-purple-800'
    }
  ];

  const handleNavClick = (pageId: NavigationPage) => {
    setActivePage(pageId);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 z-50 md:z-20 h-screen md:h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex-1 overflow-y-auto py-5 px-3 custom-scrollbar">
          {/* Main Navigation Group */}
          <div className="mb-6">
            <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Student Core
            </h3>
            <nav className="space-y-1">
              {primaryNav.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badgeColor || 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Role Portals Section */}
          <div className="mb-6">
            <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Role Workspaces
            </h3>
            <nav className="space-y-1">
              {roleNav.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                      isActive
                        ? 'bg-navy-900 text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-500 group-hover:text-navy-900'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badgeColor || 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Campus Placement Tip Card */}
          <div className="p-3.5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl">
            <div className="flex items-center gap-2 mb-1.5 text-blue-900 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Placement Tip of the Day</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Always articulate edge cases (null inputs, integer overflows) before coding your solution.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/50">
          <div className="flex items-center justify-between text-xs text-slate-500 px-2">
            <span>PlacementHub v2.0</span>
            <button
              onClick={() => setActivePage('landing')}
              className="text-blue-600 hover:underline font-semibold"
            >
              About
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
