import { MapPin, UserCheck, MessageSquare } from 'lucide-react';

export default function CandidatesList({ candidates, onContact, onDecline, onViewDetails }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div className="py-2">
        <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
          Accepted Candidates
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {candidates.length} Shortlisted
          </span>
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5">List of executive talent moved to the hiring pipeline.</p>
      </div>

      <div className="space-y-4">
        {candidates.length > 0 ? (
          candidates.map((candidate) => {
            // Mengambil fallback deskripsi keahlian jika properti .skills belum didefinisikan dari integrasi n8n
            const displaySkills = candidate.skills || candidate.metrics?.specialization || "General Software Engineering";
            const displayLocation = candidate.metrics?.location || "Remote / Global";

            return (
              <div 
                key={candidate.id} 
                onClick={() => onViewDetails?.(candidate)}
                className={`bg-white border border-neutral-200/50 rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm border-l-4 hover:shadow-md hover:border-neutral-300 hover:bg-neutral-50/20 cursor-pointer transition-all duration-300 ${
                  candidate.statusText === 'Contacted' ? 'border-l-emerald-500' : 'border-l-amber-500'
                }`}
              >
                
                {/* Info Kandidat: Nama */}
                <div className="flex items-center gap-4 lg:w-[35%]">
                  <div>
                    <h4 className="text-base font-bold text-neutral-900">{candidate.name}</h4>
                  </div>
                </div>

                {/* Metrik Tengah: Menggunakan Border Abu-abu (border-neutral-100), Menampilkan Skills & Location */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 flex-1 lg:border-x lg:border-neutral-100 lg:px-8 py-4 lg:py-0 border-t lg:border-t-0 border-neutral-100">
                  <div className="space-y-0.5 col-span-2 sm:col-span-1">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Skills</p>
                    <p className="text-xs font-semibold text-neutral-800 truncate" title={displaySkills}>
                      {displaySkills}
                    </p>
                  </div>
                  <div className="space-y-0.5 col-span-2 sm:col-span-1">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Location</p>
                    <p className="text-xs font-semibold text-neutral-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                      <span className="truncate">{displayLocation}</span>
                    </p>
                  </div>
                </div>

                {/* Badges Status Keterangan */}
                <div className="flex flex-col items-start lg:items-center justify-center lg:w-[15%]">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1 hidden lg:block">Status</p>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${
                    candidate.statusText === 'Contacted' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${candidate.statusText === 'Contacted' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    {candidate.statusText || 'Action Needed'}
                  </span>
                </div>

                {/* Tombol Aksi Kanan: Contact & Decline */}
                <div className="flex flex-row lg:flex-col gap-2 lg:w-[15%] w-full">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onContact(candidate.id); }}
                    disabled={candidate.statusText === 'Contacted'}
                    className={`flex-1 font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                      candidate.statusText === 'Contacted'
                        ? 'bg-neutral-100 text-neutral-400 border border-neutral-200 shadow-none cursor-not-allowed opacity-60'
                        : 'bg-olive-dark hover:bg-olive-dark/90 text-white cursor-pointer'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Contact
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDecline(candidate.id); }}
                    className="flex-1 bg-transparent hover:bg-neutral-50 text-neutral-700 border border-neutral-300 font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center active:scale-[0.98]"
                  >
                    Decline
                  </button>
                </div>

              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white border border-neutral-200/50 rounded-2xl text-neutral-500 text-sm">
            No accepted candidates yet. Go to AI Search to shortlist talents.
          </div>
        )}
      </div>
    </div>
  );
}