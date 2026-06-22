import { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Clock,
  Sparkles
} from 'lucide-react';
import SearchModal from '../modals/CandidateSearch'; 

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export default function SearchCandidates({ candidates, onAccept, onDecline, onViewDetails, onCandidatesFound }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState(candidates);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    role: '',
    jobDescription: '',
    skills: '',
    location: '',
    minExperience: '',
    numResult: '5'
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

  const handleLocalSearch = () => { filterLocalData(searchQuery); };
  const handleKeyDown = (e) => { if (e.key === 'Enter') handleLocalSearch(); };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData }),
      });

      if (response.ok) {
        const data = await response.json();
        if (onCandidatesFound) onCandidatesFound(data);
        alert('AI Search completed and results imported successfully!');
        setIsModalOpen(false);
        setFormData({ role: '', jobDescription: '', skills: '', location: '', minExperience: '', numResult: '5' });
      } else {
        alert('Failed to trigger backend search agent.');
      }
    } catch (error) {
      console.error('Error connecting to backend search agent:', error);
      alert('Error connecting to search backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full relative animate-fade-in">
      
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

            <button className="px-3.5 h-[42px] rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors flex items-center justify-center gap-2 text-sm font-medium cursor-pointer active:scale-[0.98]">
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

      {/* 2. PANGGIL KOMPONEN MODAL DI SINI */}
      <SearchModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        onChangeInput={handleInputChange}
        onSubmit={handleSubmitSearch}
        isLoading={isLoading}
      />

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
            const displayScore = matchingScore || metrics?.matchingScore || 0; 

            return (
              <div
                key={id}
                onClick={() => onViewDetails?.(candidate)}
                className="bg-white border border-neutral-200/50 rounded-2xl shadow-sm hover:shadow-md hover:border-olive-dark/30 hover:bg-neutral-50/20 cursor-pointer transition-all duration-300 overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between p-6 gap-6"
              >
                {/* Left Part */}
                <div className="flex items-center gap-4 lg:w-[25%]">
                  <img src={`${avatar}`} alt={`${name}`} className="w-16 h-16 rounded-xl object-cover grayscale contrast-125 brightness-95 border border-neutral-200/40" />
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-neutral-900 truncate tracking-tight">{`${name}`}</h4>
                  </div>
                </div>

                {/* Middle Part */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 flex-1 border-t lg:border-t-0 lg:border-l border-neutral-100 lg:pl-8 py-4 lg:py-0">
                  <div className="space-y-0.5 col-span-2 sm:col-span-1">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Skills</p>
                    <p className="text-xs font-semibold text-neutral-800 truncate" title={displaySkills}>{displaySkills}</p>
                  </div>
                  <div className="space-y-0.5 col-span-2 sm:col-span-1">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Location</p>
                    <p className="text-xs font-semibold text-neutral-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                      <span className="truncate">{displayLocation}</span>
                    </p>
                  </div>
                </div>

                {/* Match Score */}
                <div className="flex flex-col items-start lg:items-center justify-center lg:w-[12%] lg:border-l lg:border-neutral-100 lg:pl-4">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1 hidden lg:block">Match Score</p>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-olive-dark/5 text-olive-dark border border-olive-dark/10 rounded-lg text-xs font-bold">
                    {displayScore}%
                  </span>
                </div>

                {/* Status */}
                <div className="flex flex-col items-start lg:items-center justify-center lg:w-[12%]">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1 hidden lg:block">Status</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-bold">
                    <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    Pending
                  </span>
                </div>

                {/* Tombol Aksi */}
                <div className="flex flex-row lg:flex-col gap-2.5 lg:w-[15%] w-full">
                  <button onClick={(e) => { e.stopPropagation(); onAccept(id); }} className="flex-1 bg-olive-dark hover:bg-olive-dark/90 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md shadow-olive-dark/10 hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]">
                    Accept
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onDecline(id); }} className="flex-1 bg-transparent hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 border border-neutral-300 font-bold text-xs py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]">
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
          <button className="px-3.5 py-1.5 rounded-lg bg-olive-dark text-white font-semibold text-xs transition-colors">1</button>
          <button className="p-2 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 cursor-pointer disabled:opacity-50 disabled:pointer-events-none transition-colors" disabled>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}