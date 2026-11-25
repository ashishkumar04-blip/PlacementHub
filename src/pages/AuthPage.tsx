import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { Role } from '../types/placement';
import {
  GraduationCap,
  UserCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  Building2,
  CheckCircle2
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { switchRole, setActivePage } = usePlacement();
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole(selectedRole);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-navy-950 via-navy-900 to-blue-900 text-white text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>PlacementHub Authentication</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            {isRegister ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-blue-200">
            Sign in to access verified company interview experiences, mentors, and checklists.
          </p>
        </div>

        {/* Quick 1-Click Demo Buttons */}
        <div className="p-4 bg-blue-50/70 border-b border-blue-100">
          <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-2 text-center">
            ⚡ Quick 1-Click Evaluation Login
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                switchRole('student');
                setActivePage('student-dashboard');
              }}
              className="p-2 bg-white hover:bg-blue-600 hover:text-white text-slate-800 rounded-xl border border-blue-200 font-bold transition-all shadow-sm flex flex-col items-center gap-1 text-center"
            >
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Student</span>
              <span className="text-[10px] font-normal opacity-80">Aman</span>
            </button>

            <button
              type="button"
              onClick={() => {
                switchRole('mentor');
                setActivePage('mentor-dashboard');
              }}
              className="p-2 bg-white hover:bg-emerald-600 hover:text-white text-slate-800 rounded-xl border border-emerald-200 font-bold transition-all shadow-sm flex flex-col items-center gap-1 text-center"
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Mentor</span>
              <span className="text-[10px] font-normal opacity-80">Priya</span>
            </button>

            <button
              type="button"
              onClick={() => {
                switchRole('admin');
                setActivePage('admin-dashboard');
              }}
              className="p-2 bg-white hover:bg-purple-600 hover:text-white text-slate-800 rounded-xl border border-purple-200 font-bold transition-all shadow-sm flex flex-col items-center gap-1 text-center"
            >
              <ShieldAlert className="w-4 h-4 text-purple-600" />
              <span>Admin</span>
              <span className="text-[10px] font-normal opacity-80">Prof. Sharma</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Role Selector Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  selectedRole === 'student'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('mentor')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  selectedRole === 'mentor'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mentor
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-white text-purple-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={selectedRole === 'student' ? 'Aman Sharma' : 'Priya Nair'}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                College / Corporate Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    selectedRole === 'student'
                      ? 'student@college.edu'
                      : selectedRole === 'mentor'
                      ? 'mentor@microsoft.com'
                      : 'admin@college.edu'
                  }
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>{isRegister ? 'Register & Enter Platform' : 'Sign In as ' + selectedRole}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Register/Login */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              {isRegister
                ? 'Already have an account? Sign In'
                : "Don't have an account? Register as " + selectedRole}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
