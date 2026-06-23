import React from 'react';
import { 
  UserCheck, 
  Archive, 
  Target, 
  Zap, 
  Brain,
  ChevronRight
} from 'lucide-react';

export default function DashboardOverview({ allCandidates, onMenuChange }) {
  // Menghitung Data Metrik Utama
  const totalSearch = allCandidates.filter(c => c.pool === 'search').length;
  const totalAccepted = allCandidates.filter(c => c.pool === 'candidates').length;
  const totalArchived = allCandidates.filter(c => c.pool === 'archive').length;
  const totalTalents = allCandidates.length;

  // Rasio konversi kandidat
  const conversionRate = totalTalents > 0 ? ((totalAccepted / totalTalents) * 100).toFixed(0) : 0;

  // Mengubah filter untuk mengambil 3 kandidat terbaru yang sudah masuk 'candidates' list
  const recentShortlisted = allCandidates
    .filter(c => c.pool === 'candidates')
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <Brain className="w-64 h-64 -mr-10 -mb-10 text-white" />
        </div>
        <div className="relative z-10">
            <div className="inline-flex items-center gap-2 border border-[#C9A84C]/40 bg-[#C9A84C]/[0.1] rounded-full px-3 py-1 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#4ade80] animate-pulse flex-shrink-0" />
                <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#E5C158]">
                System Active &nbsp;·&nbsp; Talent AI
                </span>
            </div>
          <h2 className="text-2xl font-extrabold tracking-tight mt-3 mb-2">Welcome Back.</h2>
          <p className="text-neutral-400 text-sm mt-1 max-w-xl">
            Your AI agent has refreshed the latest talent intelligence. Review today's top candidates and move your most promising pipelines forward.
          </p>
        </div>
      </div>
      {/* Grid Metrik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1 */}
        <div className="bg-white border border-neutral-200/60 p-5 rounded-2xl shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">AI Search Pool</p>
            <p className="text-3xl font-bold text-neutral-800 mt-2">{totalSearch}</p>
            <span className="text-[11px] text-neutral-400 block mt-1">Candidates are ready to be reviewed</span>
          </div>
          <div className="p-3 bg-neutral-100 rounded-xl text-neutral-600">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-neutral-200/60 p-5 rounded-2xl shadow-sm flex items-start justify-between border-l-4 border-l-emerald-500">
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Shortlisted</p>
            <p className="text-3xl font-bold text-emerald-600 mt-2">{totalAccepted}</p>
            <span className="text-[11px] text-emerald-500 font-medium block mt-1">Ready to be contacted</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-neutral-200/60 p-5 rounded-2xl shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Archived Talents</p>
            <p className="text-3xl font-bold text-neutral-600 mt-2">{totalArchived}</p>
            <span className="text-[11px] text-neutral-400 block mt-1">Stored in archive</span>
          </div>
          <div className="p-3 bg-neutral-100 rounded-xl text-neutral-500">
            <Archive className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-neutral-200/60 p-5 rounded-2xl shadow-sm flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">AI Conversion</p>
            <p className="text-3xl font-bold text-neutral-800 mt-2">{conversionRate}%</p>
            <span className="text-[11px] text-neutral-400 block mt-1">AI filter pass rate</span>
          </div>
          <div className="p-3 bg-neutral-100 rounded-xl text-neutral-600">
            <Target className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Bagian Bawah: Menggunakan grid 3 kolom, flex penuh untuk list kandidat dan tombol di sisi kanan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List Kandidat Masuk (Shortlisted) */}
        <div className="lg:col-span-2 bg-white border border-neutral-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Shortlisted Candidates</h3>
                <p className="text-xs text-neutral-400">List talents that you have agreed to proceed</p>
              </div>
              <button 
                onClick={() => onMenuChange('candidates')}
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1 cursor-pointer transition-colors"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-neutral-100 mt-2">
              {recentShortlisted.length > 0 ? (
                recentShortlisted.map((candidate) => (
                  <div key={candidate.id} className="flex items-center justify-between py-4 group">
                    <div>
                      <h4 className="text-sm font-bold text-neutral-800 group-hover:text-neutral-900 transition-colors">
                        {candidate.name}
                      </h4>
                      <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide mt-0.5">
                        {candidate.role}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-neutral-50 border border-neutral-200/60 text-neutral-600 text-[11px] font-medium px-2.5 py-1 rounded-lg">
                        {candidate.experience} Exp
                      </span>
                      <p className="text-[11px] text-neutral-400 mt-1">{candidate.metrics.location}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-sm text-neutral-400">
                  No candidates in your shortlist yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Kolom Kanan Sederhana untuk Quick Action (AI Agent Status Dihapus) */}
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="p-4 bg-olive-dark/10 rounded-full text-olive-dark mb-4">
            <Zap className="w-8 h-8 fill-olive-dark" />
          </div>
          <h3 className="text-base font-bold text-neutral-900">Start New Pipeline</h3>
          <p className="text-xs text-neutral-400 max-w-xs mt-1 mb-6">
            Use AI Agent to search and filter candidates automatically based on your specific criteria.
          </p>
          <button 
            onClick={() => onMenuChange('ai-search')}
            className="w-full bg-olive-dark hover:bg-olive-dark/90 text-white font-semibold text-xs py-3.5 px-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            Start AI Search
          </button>
        </div>
      </div>
    </div>
  );
}