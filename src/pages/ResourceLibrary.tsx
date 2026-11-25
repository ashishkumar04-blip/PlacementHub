import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { PlacementResource } from '../types/placement';
import {
  BookOpen,
  Search,
  CheckCircle2,
  AlertCircle,
  Download,
  FileText,
  Calendar,
  Sparkles,
  ExternalLink,
  Tag,
  Filter,
  Eye,
  X
} from 'lucide-react';

export const ResourceLibrary: React.FC = () => {
  const { resources, activeRole } = usePlacement();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewResource, setPreviewResource] = useState<PlacementResource | null>(null);

  const categories = [
    'All',
    'Company Preparation Guides',
    'Coding Practice Questions',
    'Previous Interview Experiences',
    'Technical Interview Tips',
    'Resume Preparation Guidance',
    'Aptitude Resources'
  ];

  const filteredResources = resources.filter((res) => {
    // Show only verified unless admin
    if (activeRole !== 'admin' && !res.isVerified) {
      return false;
    }

    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.contributorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.company && res.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || res.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Placement Library</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
            Verified Placement Resources
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Curated preparation materials, ATS resume blueprints, top coding sheets, and company-specific question banks submitted by verified seniors.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Placement Cell Verified</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-subtle space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resources, topics, contributors, or companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All 6 Resource Types' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-subtle hover:shadow-card-hover hover:border-blue-300 transition-all p-6 flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {/* Category & Format Pill */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 truncate">
                  {res.category}
                </span>

                <span className="text-[10px] font-extrabold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {res.format}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-base text-navy-950 group-hover:text-blue-600 transition-colors leading-snug">
                {res.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {res.description}
              </p>

              {/* Verification & Contributor Info */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    {res.isVerified ? (
                      <span className="flex items-center gap-1 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified Guide
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-700 font-bold">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        Community Upload
                      </span>
                    )}
                  </div>
                  <span className="text-slate-400">Year {res.submissionYear}</span>
                </div>

                <div className="text-[11px] text-slate-500 font-medium">
                  Contributed by <strong className="text-slate-800">{res.contributorName}</strong> ({res.contributorRole})
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-semibold">
                {res.downloadsCount} student views
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewResource(res)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => alert(`Downloading "${res.title}" [PlacementHub Verified]`)}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Get</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No resources found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or category filter.
          </p>
        </div>
      )}

      {/* Preview Resource Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">
                  {previewResource.category}
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 mt-0.5">
                  {previewResource.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewResource(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Verified Source: <strong>{previewResource.contributorName}</strong></span>
                <span>Format: <strong>{previewResource.format}</strong></span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {previewResource.description}
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-900">Document Key Takeaways:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  <li>Curated directly from recent on-campus placement cycles.</li>
                  <li>Formatted according to technical interview best practices.</li>
                  <li>Passed official placement cell moderation standards.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">
                Verified submission • Year {previewResource.submissionYear}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewResource(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert(`Downloading "${previewResource.title}"`);
                    setPreviewResource(null);
                  }}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resource</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
