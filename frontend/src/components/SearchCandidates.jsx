import { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X, 
  Loader2,
  Clock,
  Sparkles,
  Percent // Icon baru untuk matching score
} from 'lucide-react';

export default function SearchCandidates({ candidates, onAccept, onDecline, onViewDetails }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState(candidates);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    skills: '',
    location: '',
    minExperience: ''
  });

  useEffect(() => {
    filterLocalData(searchQuery);
  }, [candidates]);

  const filterLocalData = (queryText) => {
    const query = queryText.toLowerCase().trim();
    if (query === '') {
      setFilteredCandidates(candidates);
      return;
    }

    const filtered = candidates.filter((candidate) => 
      candidate.name.toLowerCase().includes(query) ||
      (candidate.skills && candidate.skills.toLowerCase().includes(query)) ||
      (candidate.metrics?.specialization && candidate.metrics.specialization.toLowerCase().includes(query))
    );
    setFilteredCandidates(filtered);
  };

  const handleLocalSearch = () => {
    filterLocalData(searchQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLocalSearch();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL; 

    if (!N8N_WEBHOOK_URL) {
      alert("Error: Webhook URL tidak ditemukan di .env");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        alert('AI Search request sent successfully to n8n!');
        setIsModalOpen(false);
        setFormData({ role: '', skills: '', location: '', minExperience: '' });
      } else {
        alert('Failed to trigger n8n webhook.');
      }
    } catch (error) {
      console.error('Error connecting to n8n:', error);
      alert('Error connecting to n8n automation network.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative">
      
      {/* Filter Search Bar */}
      <div className="bg-white rounded-xl border border-neutral-200/60 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          
          <div className="relative flex-1 w-full flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Quick filter cached candidates by name, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2.5 pl-10 pr-4 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-olive-dark/20 focus:border-olive-dark transition-all font-medium h-[42px]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            </div>

            <button 
              className="px-3.5 h-[42px] rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors flex items-center justify-center gap-2 text-sm font-medium cursor-pointer active:scale-[0.98]"
              title="Advanced Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden md:inline">Filters</span>
            </button>
          </div>

          <div className="w-full sm:w-auto flex-shrink-0">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-olive-dark hover:bg-olive-dark/90 text-white font-semibold text-sm py-2.5 px-5 rounded-lg shadow-md shadow-olive-dark/10 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer h-[42px] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" />
              Talent Sourcing
            </button>
          </div>

        </div>
      </div>

      {/* Pop-Up Modal Form n8n */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl max-w-md w-full overflow-hidden transform transition-all scale-100">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div>
                <h4 className="text-base font-bold text-neutral-900">AI Deep Search Engine</h4>
                <p className="text-xs text-neutral-400">Trigger agent workflows via n8n integration.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitSearch} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">Target Role</label>
                <input 
                  type="text" 
                  name="role"
                  required
                  placeholder="e.g., VP of Engineering"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-olive-dark/20 focus:border-olive-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">Required Skills / Specialization</label>
                <input 
                  type="text" 
                  name="skills"
                  placeholder="e.g., LLMs, RAG, Node.js"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-olive-dark/20 focus:border-olive-dark"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">Geo Location</label>
                  <input 
                    type="text" 
                    name="location"
                    placeholder="e.g., Singapore"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-olive-dark/20 focus:border-olive-dark"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5">Min. Experience</label>
                  <input 
                    type="text" 
                    name="minExperience"
                    placeholder="e.g., 10+ Years"
                    value={formData.minExperience}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-olive-dark/20 focus:border-olive-dark"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-olive-dark hover:bg-olive-dark/90 text-white text-xs font-bold py-2.5 rounded-xl shadow-md transition-all cursor-pointer active:scale-[0.98] flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Invoking Agent...
                    </>
                  ) : (
                    'Launch Search'
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Title & Total Info */}
      <div className="py-2">
        <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
          AI Search Results
          <span className="text-xs font-medium text-olive-dark bg-olive-dark/10 px-2 py-0.5 rounded-full border border-olive-dark/20">
            {filteredCandidates.length} Candidate{filteredCandidates.length !== 1 ? 's' : ''} Found
          </span>
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5">Pre-screened individuals matching your custom search criteria.</p>
      </div>

      {/* Candidate Container */}
      <div className="space-y-4">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => {
            const { id, name, avatar, metrics, skills, matchingScore } = candidate;

            const displaySkills = skills || metrics?.specialization || "General Software Engineering";
            const displayLocation = metrics?.location || "Remote / Global";
            // Fallback default score jika data matchingScore belum dikirim dari payload n8n
            const displayScore = matchingScore || metrics?.matchingScore || 0; 

            return (
              <div
                key={id}
                onClick={() => onViewDetails?.(candidate)}
                className="bg-white border border-neutral-200/50 rounded-2xl shadow-sm hover:shadow-md hover:border-olive-dark/30 hover:bg-neutral-50/20 cursor-pointer transition-all duration-300 overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between p-6 gap-6"
              >
                {/* Left Part: Foto & Nama */}
                <div className="flex items-center gap-4 lg:w-[25%]">
                  <div className="relative flex-shrink-0">
                    <img
                      src={`${avatar}`}
                      alt={`${name}`}
                      className="w-16 h-16 rounded-xl object-cover grayscale contrast-125 brightness-95 border border-neutral-200/40"
                    />
                  </div>
                  
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-neutral-900 truncate tracking-tight">{`${name}`}</h4>
                  </div>
                </div>

                {/* Middle Part: Keterangan Keahlian (Skills) & Lokasi */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 flex-1 border-t lg:border-t-0 lg:border-l border-neutral-100 lg:pl-8 py-4 lg:py-0">
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

                {/* New Part: Matching Score (Di Sebelah Kiri Status) */}
                <div className="flex flex-col items-start lg:items-center justify-center lg:w-[12%] lg:border-l lg:border-neutral-100 lg:pl-4">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1 hidden lg:block">Match Score</p>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-olive-dark/5 text-olive-dark border border-olive-dark/10 rounded-lg text-xs font-bold">
                    {displayScore}%
                  </span>
                </div>

                {/* Right-Middle Part: Status Pending */}
                <div className="flex flex-col items-start lg:items-center justify-center lg:w-[12%]">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1 hidden lg:block">Status</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-bold">
                    <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    Pending
                  </span>
                </div>

                {/* Right Part: Tombol Aksi */}
                <div className="flex flex-row lg:flex-col gap-2.5 lg:w-[15%] w-full">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAccept(id); }}
                    className="flex-1 bg-olive-dark hover:bg-olive-dark/90 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md shadow-olive-dark/10 hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDecline(id); }}
                    className="flex-1 bg-transparent hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 border border-neutral-300 font-bold text-xs py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    Decline
                  </button>
                </div>

              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white border border-neutral-200/50 rounded-2xl">
            <p className="text-sm text-neutral-500 font-medium">No candidates match your search query.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-neutral-200/50 pt-5 mt-4">
        <p className="text-xs text-neutral-400 font-medium">
          Showing <span className="font-semibold text-neutral-700">1</span> to <span className="font-semibold text-neutral-700">{filteredCandidates.length}</span> of <span className="font-semibold text-neutral-700">{filteredCandidates.length}</span> candidates
        </p>
        
        <div className="flex items-center gap-1.5">
          <button className="p-2 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 cursor-pointer disabled:opacity-50 disabled:pointer-events-none transition-colors" disabled>
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button className="px-3.5 py-1.5 rounded-lg bg-olive-dark text-white font-semibold text-xs transition-colors">
            1
          </button>
          
          <button className="p-2 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 cursor-pointer disabled:opacity-50 disabled:pointer-events-none transition-colors" disabled>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}