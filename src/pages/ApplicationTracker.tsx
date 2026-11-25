import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { ApplicationStatus, CompanyApplication } from '../types/placement';
import {
  Kanban,
  Table as TableIcon,
  PlusCircle,
  Building2,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit3,
  ExternalLink,
  Sparkles,
  X,
  FileText
} from 'lucide-react';

export const ApplicationTracker: React.FC = () => {
  const {
    applications,
    addApplication,
    updateApplicationStatus,
    updateApplicationNotes,
    deleteApplication
  } = usePlacement();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');

  // Add Application Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('Software Engineer');
  const [appliedDate, setAppliedDate] = useState('2024-11-26');
  const [status, setStatus] = useState<ApplicationStatus>('Applied');
  const [ctc, setCtc] = useState('₹18.0 LPA');
  const [location, setLocation] = useState('Bangalore / Remote');
  const [interviewDate, setInterviewDate] = useState('');
  const [notes, setNotes] = useState('');
  const [link, setLink] = useState('');

  // Edit Notes Modal
  const [editingApp, setEditingApp] = useState<CompanyApplication | null>(null);
  const [editedNotes, setEditedNotes] = useState('');

  const statuses: ApplicationStatus[] = [
    'Interested',
    'Applied',
    'Online Assessment',
    'Technical Interview',
    'HR Interview',
    'Selected',
    'Rejected'
  ];

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    addApplication({
      companyName,
      jobRole,
      appliedDate,
      status,
      ctc,
      location,
      interviewDate: interviewDate || undefined,
      notes: notes || undefined,
      link: link || undefined
    });

    setCompanyName('');
    setNotes('');
    setIsAddModalOpen(false);
  };

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingApp) {
      updateApplicationNotes(editingApp.id, editedNotes);
      setEditingApp(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Multi-Company Recruitment Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
            Company Application Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track your progress across 7 placement stages, log interview rounds, update statuses, and store personal preparation notes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle View Mode */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white text-navy-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban Board</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-navy-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table View</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {statuses.map((st) => {
          const count = applications.filter((a) => a.status === st).length;
          return (
            <div
              key={st}
              className={`p-3 rounded-2xl border text-center transition-all ${
                st === 'Selected'
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : st === 'Rejected'
                  ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                  : 'bg-white border-slate-200 text-slate-800 shadow-subtle'
              }`}
            >
              <div className="text-xl font-black">{count}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider truncate mt-0.5">
                {st}
              </div>
            </div>
          );
        })}
      </div>

      {/* View Mode: Kanban Board */}
      {viewMode === 'kanban' ? (
        <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar items-start min-h-[550px]">
          {statuses.map((columnStatus) => {
            const columnApps = applications.filter((a) => a.status === columnStatus);
            return (
              <div
                key={columnStatus}
                className="w-80 flex-shrink-0 bg-slate-100/70 rounded-3xl border border-slate-200/80 p-3 space-y-3"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-2 pt-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        columnStatus === 'Selected'
                          ? 'bg-emerald-500'
                          : columnStatus === 'Rejected'
                          ? 'bg-rose-500'
                          : columnStatus === 'Interested'
                          ? 'bg-slate-400'
                          : 'bg-blue-600'
                      }`}
                    />
                    <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                      {columnStatus}
                    </h3>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-white text-slate-700 font-extrabold text-[11px] flex items-center justify-center border border-slate-200 shadow-xs">
                    {columnApps.length}
                  </span>
                </div>

                {/* Cards in column */}
                <div className="space-y-3 min-h-[120px]">
                  {columnApps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-subtle hover:shadow-card transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-extrabold text-sm text-navy-950">
                            {app.companyName}
                          </h4>
                          <p className="text-xs text-slate-500">{app.jobRole}</p>
                        </div>
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                          title="Remove application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* CTC & Location */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-600 flex-wrap">
                        {app.ctc && (
                          <span className="flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            <DollarSign className="w-3 h-3" />
                            {app.ctc}
                          </span>
                        )}
                        {app.location && (
                          <span className="flex items-center gap-1 text-slate-500">
                            <MapPin className="w-3 h-3" />
                            {app.location.split('/')[0]}
                          </span>
                        )}
                      </div>

                      {/* Interview Date Badge */}
                      {app.interviewDate && (
                        <div className="bg-purple-50 text-purple-800 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-purple-200 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-purple-600" />
                          <span>Round: {app.interviewDate}</span>
                        </div>
                      )}

                      {/* Notes snippet */}
                      {app.notes && (
                        <div
                          onClick={() => {
                            setEditingApp(app);
                            setEditedNotes(app.notes || '');
                          }}
                          className="bg-slate-50 p-2 rounded-xl text-[11px] text-slate-600 italic cursor-pointer hover:bg-slate-100 transition-colors border border-slate-100 flex items-start gap-1"
                          title="Click to edit notes"
                        >
                          <FileText className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">"{app.notes}"</span>
                        </div>
                      )}

                      {/* Move to next stage dropdown */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[10px] text-slate-400 font-medium">Stage:</span>
                        <select
                          value={app.status}
                          onChange={(e) =>
                            updateApplicationStatus(app.id, e.target.value as ApplicationStatus)
                          }
                          className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg border border-blue-200 focus:outline-none"
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}

                  {columnApps.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-xs text-slate-400">
                      Empty stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* View Mode: Data Table */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400 font-extrabold border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6">Company & Role</th>
                  <th className="py-4 px-4">Applied Date</th>
                  <th className="py-4 px-4">Package (CTC)</th>
                  <th className="py-4 px-4">Current Status</th>
                  <th className="py-4 px-4">Interview Schedule</th>
                  <th className="py-4 px-6">Personal Notes</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-extrabold text-navy-950">{app.companyName}</div>
                      <div className="text-xs text-slate-500">{app.jobRole}</div>
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-slate-600">
                      {app.appliedDate}
                    </td>
                    <td className="py-4 px-4 text-xs font-bold text-emerald-700">
                      {app.ctc || 'N/A'}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          updateApplicationStatus(app.id, e.target.value as ApplicationStatus)
                        }
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                          app.status === 'Selected'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : app.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : 'bg-blue-50 text-blue-800 border-blue-200'
                        }`}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-4 px-4 text-xs">
                      {app.interviewDate ? (
                        <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                          {app.interviewDate}
                        </span>
                      ) : (
                        <span className="text-slate-400">Not scheduled</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600 max-w-xs truncate">
                      {app.notes || <span className="text-slate-400 italic">None</span>}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal 1: Add Company Application */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                Track New Company Application
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateApplication} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Cisco, Oracle, Qualcomm, TCS"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Job Role
                  </label>
                  <input
                    type="text"
                    required
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Initial Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Offered Package (CTC)
                  </label>
                  <input
                    type="text"
                    value={ctc}
                    onChange={(e) => setCtc(e.target.value)}
                    placeholder="e.g. ₹15 LPA"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Interview Date (if set)
                  </label>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Personal Preparation Notes / Round Details
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Focus on OS deadlock questions and Java Collections for technical round."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Notes Modal */}
      {editingApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                Notes for {editingApp.companyName}
              </h3>
              <button
                onClick={() => setEditingApp(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNotes} className="space-y-4">
              <textarea
                rows={4}
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
                placeholder="Update your interview notes, questions asked, or follow-up tips..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingApp(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Save Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
