import { MapPin, RefreshCw, XCircle } from 'lucide-react';

export default function ArchiveList({ candidates, onUnarchive, onViewDetails }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="py-2">
        <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
          Archived Talents
          <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
            {candidates.length} Archived
          </span>
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5">Talents stored for future reference or alternative roles.</p>
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
                className="bg-white border border-neutral-200/50 rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm opacity-75 hover:opacity-100 hover:shadow-md hover:border-neutral-300 hover:bg-neutral-50/20 cursor-pointer transition-all duration-300"
              >
                
                {/* Info Profile: Foto & Nama */}
                <div className="flex items-center gap-4 lg:w-[35%]">
                  <img src={candidate.avatar} alt={candidate.name} className="w-16 h-16 rounded-xl object-cover grayscale border border-neutral-200/40" />
                  <div>
                    <h4 className="text-base font-bold text-neutral-500 line-through">{candidate.name}</h4>
                  </div>
                </div>

                {/* Metrik Tengah: Menggunakan Border Abu-abu (border-neutral-100), Menampilkan Skills & Location */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 flex-1 lg:border-x lg:border-neutral-100 lg:px-8 py-4 lg:py-0 border-t lg:border-t-0 border-neutral-100">
                  <div className="space-y-0.5 col-span-2 sm:col-span-1">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Skills</p>
                    <p className="text-xs font-semibold text-neutral-600 truncate" title={displaySkills}>
                      {displaySkills}
                    </p>
                  </div>
                  <div className="space-y-0.5 col-span-2 sm:col-span-1">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Location</p>
                    <p className="text-xs font-semibold text-neutral-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                      <span className="truncate">{displayLocation}</span>
                    </p>
                  </div>
                </div>

                {/* Badges Status Keterangan: 'Declined' */}
                <div className="flex flex-col items-start lg:items-center justify-center lg:w-[15%]">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1 hidden lg:block">Status</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold">
                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                    Declined
                  </span>
                </div>

                {/* Bagian Aksi Kanan: Tombol Unarchive */}
                <div className="flex flex-row lg:flex-col gap-2.5 lg:w-[15%] w-full">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onUnarchive(candidate.id); }}
                    className="flex-1 bg-transparent hover:bg-neutral-50 text-neutral-700 border border-neutral-300 font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-neutral-500" />
                    Unarchive
                  </button>
                </div>

              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white border border-neutral-200/50 rounded-2xl text-neutral-500 text-sm">
            Archive folder is empty.
          </div>
        )}
      </div>
    </div>
  );
}