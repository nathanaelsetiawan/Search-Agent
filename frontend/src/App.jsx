import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header'; 
import SearchCandidates from './pages/SearchPage';
import CandidatesList from './pages/CandidatesPage'; 
import ArchivePage from './pages/ArchivePage';       
import CandidateDetailModal from './modals/CandidateDetails';
import DashboardOverview from './pages/DashboardPage';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

// Helper function to normalize candidate structures returned from n8n webhook
function normalizeCandidates(data) {
  let rawList = [];
  if (Array.isArray(data)) {
    if (data.length === 1 && data[0] && (Array.isArray(data[0].candidates) || Array.isArray(data[0].results))) {
      rawList = data[0].candidates || data[0].results;
    } else {
      rawList = data;
    }
  } else if (data && typeof data === 'object') {
    rawList = data.candidates || data.results || data.data || [];
    if (!Array.isArray(rawList)) {
      rawList = [rawList];
    }
  }

  if (!Array.isArray(rawList)) {
    return [];
  }

  return rawList.map((c, index) => {
    const id = c.id || `candidate_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 5)}`;
    const metrics = c.metrics || {};
    const specialization = c.skills || metrics.specialization || c.role || "General Software Engineering";
    const location = c.location || metrics.location || "Remote / Global";
    const matchingScore = c.matchingScore || metrics.matchingScore || 0;

    return {
      id,
      name: c.name || "Unknown Candidate",
      role: c.role || "Professional",
      pool: c.pool || "search",
      statusText: c.statusText || "Action Needed",
      skills: specialization,
      matchingScore,
      metrics: {
        status: metrics.status || c.status || "Actively Looking",
        exitMultiplier: metrics.exitMultiplier || c.exitMultiplier || "N/A",
        specialization,
        location,
        matchingScore,
      },
      experienceHistory: c.experienceHistory || c.experience_history || [],
      educationHistory: c.educationHistory || c.education_history || []
    };
  });
}

export default function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [allCandidates, setAllCandidates] = useState(() => {
    const saved = localStorage.getItem('candidates');
    return saved ? JSON.parse(saved) : [];
  });

  // Keep selectedCandidate details in sync if pool or status changes
  useEffect(() => {
    if (selectedCandidate) {
      const updated = allCandidates.find(c => c.id === selectedCandidate.id);
      if (updated) {
        setSelectedCandidate(updated);
      }
    }
  }, [allCandidates]);

  const handleAccept = (id) => {
    setAllCandidates(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, pool: 'candidates', statusText: 'Action Needed' } : c);
      localStorage.setItem('candidates', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDecline = (id) => {
    setAllCandidates(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, pool: 'archive' } : c);
      localStorage.setItem('candidates', JSON.stringify(updated));
      return updated;
    });
  };

  const handleContact = (id) => {
    setAllCandidates(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, statusText: 'Contacted' } : c);
      localStorage.setItem('candidates', JSON.stringify(updated));
      return updated;
    });
  };

  const handleUnarchive = (id) => {
    setAllCandidates(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, pool: 'candidates', statusText: 'Action Needed' } : c);
      localStorage.setItem('candidates', JSON.stringify(updated));
      return updated;
    });
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <DashboardOverview 
            allCandidates={allCandidates} 
            onMenuChange={setActiveMenu} 
          />
        );
      
      case 'ai-search':
        const searchPool = allCandidates.filter(c => c.pool === 'search');
        return (
          <SearchCandidates 
            candidates={searchPool} 
            onAccept={handleAccept} 
            onDecline={handleDecline} 
            onViewDetails={setSelectedCandidate}
            onCandidatesFound={(newResults) => {
              const normalized = normalizeCandidates(newResults);
              setAllCandidates(prev => {
                const existingNames = new Set(prev.map(c => c.name.toLowerCase()));
                const existingIds = new Set(prev.map(c => c.id));
                const filteredNew = normalized.filter(
                  c => !existingNames.has(c.name.toLowerCase()) && !existingIds.has(c.id)
                );
                const updated = [...prev, ...filteredNew];
                localStorage.setItem('candidates', JSON.stringify(updated));
                return updated;
              });
            }}
          />
        );

      case 'candidates':
        const acceptedPool = allCandidates.filter(c => c.pool === 'candidates');
        return (
          <CandidatesList 
            candidates={acceptedPool} 
            onContact={handleContact}  
            onDecline={handleDecline}  
            onViewDetails={setSelectedCandidate}
          />
        );

      case 'archive':
        const archivedPool = allCandidates.filter(c => c.pool === 'archive');
        return (
          <ArchivePage 
            candidates={archivedPool} 
            onUnarchive={handleUnarchive} 
            onViewDetails={setSelectedCandidate}
          />
        );
      
      default:
        return <div>Dashboard View</div>;
    }
  };

  return (
    <div className="flex bg-neutral-100 min-h-screen w-full">
      <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      <div className="flex-1 pl-[260px] flex flex-col min-h-screen">
        
        <Header activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {selectedCandidate && (
        <CandidateDetailModal 
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onAccept={handleAccept}
          onDecline={handleDecline}
          onContact={handleContact}
          onUnarchive={handleUnarchive}
        />
      )}
    </div>
  );
}