import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { UserCheck, Shield, GraduationCap, RotateCcw, Sparkles } from 'lucide-react';

export const DemoRoleBar: React.FC = () => {
  const { activeRole, switchRole, resetDemoData, setActivePage } = usePlacement();

  return (
    <div className="bg-navy-950 text-white text-xs px-4 py-2 border-b border-navy-800 flex flex-wrap items-center justify-between gap-3 shadow-inner z-50">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 font-bold tracking-wide text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-800">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
          DEMO MODE ACTIVE
        </span>
        <span className="hidden md:inline text-slate-300">
          Switch personas to test real-time workflows:
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => switchRole('student')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
            activeRole === 'student'
              ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
              : 'bg-navy-900 text-slate-300 hover:bg-navy-800 hover:text-white'
          }`}
          title="Student Persona: Aspirant Aman"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Student View</span>
          <span className="text-[10px] opacity-75 hidden sm:inline">(Aman)</span>
        </button>

        <button
          onClick={() => switchRole('mentor')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
            activeRole === 'mentor'
              ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
              : 'bg-navy-900 text-slate-300 hover:bg-navy-800 hover:text-white'
          }`}
          title="Mentor Persona: Priya Nair @ Microsoft"
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Mentor View</span>
          <span className="text-[10px] opacity-75 hidden sm:inline">(Priya @ MSFT)</span>
        </button>

        <button
          onClick={() => switchRole('admin')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
            activeRole === 'admin'
              ? 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-400'
              : 'bg-navy-900 text-slate-300 hover:bg-navy-800 hover:text-white'
          }`}
          title="Admin Persona: Prof. Sharma (Placement Cell)"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Admin View</span>
          <span className="text-[10px] opacity-75 hidden sm:inline">(Prof. Sharma)</span>
        </button>

        <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

        <button
          onClick={() => setActivePage('landing')}
          className="text-slate-300 hover:text-white px-2.5 py-1 rounded hover:bg-navy-800 transition-colors"
          title="View Landing Page"
        >
          Public Site
        </button>

        <button
          onClick={resetDemoData}
          className="flex items-center gap-1 text-slate-400 hover:text-amber-300 px-2 py-1 rounded hover:bg-navy-900 transition-colors"
          title="Reset all tasks, applications, and verification data to fresh initial state"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset Demo</span>
        </button>
      </div>
    </div>
  );
};
