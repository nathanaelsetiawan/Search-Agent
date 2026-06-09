import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header'; 
import SearchCandidates from './components/SearchCandidates';
import CandidatesList from './components/CandidatesList'; 
import ArchiveList from './components/ArchiveList';       

const initialCandidates = [
  {
    id: "candidate_01",
    name: "Julian Vane",
    role: "CHIEF STRATEGY OFFICER",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    metrics: {
      status: "Actively Looking",
      exitMultiplier: "4.8x average exit growth",
      specialization: "Corporate M&A & Global Expansion",
      location: "London, UK",
    },
    salaryRange: "$350,000 - $450,000",
    experience: "15+ Years",
    pool: "search",
    statusText: "Action Needed" // Status default saat masuk pipeline
  },
  {
    id: "candidate_02",
    name: "Sarah Jenkins",
    role: "VP OF ENGINEERING",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80",
    metrics: {
      status: "Passive Search",
      exitMultiplier: "6.2x scaling milestone",
      specialization: "Cloud Infrastructure & AI Scaling",
      location: "Singapore / Hybrid",
    },
    salaryRange: "$280,000 - $340,000",
    experience: "12+ Years",
    pool: "search",
    statusText: "Action Needed"
  },
  {
    id: "candidate_03",
    name: "Alexander Vance",
    role: "CHIEF OPERATING OFFICER",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
    metrics: {
      status: "Confidential",
      exitMultiplier: "3.5x operational efficiency yield",
      specialization: "Supply Chain Optimization & SaaS Operations",
      location: "New York, USA",
    },
    salaryRange: "$400,000 - $500,000",
    experience: "18+ Years",
    pool: "search",
    statusText: "Action Needed"
  }
];

export default function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const [allCandidates, setAllCandidates] = useState(() => {
    const savedData = localStorage.getItem('skripsi_candidates');
    return savedData ? JSON.parse(savedData) : initialCandidates;
  });

  useEffect(() => {
    localStorage.setItem('skripsi_candidates', JSON.stringify(allCandidates));
  }, [allCandidates]);

const handleAccept = (id) => {
    setAllCandidates(prev =>
      prev.map(c => c.id === id ? { ...c, pool: 'candidates', statusText: 'Action Needed' } : c)
    );
  };

  const handleDecline = (id) => {
    setAllCandidates(prev =>
      prev.map(c => c.id === id ? { ...c, pool: 'archive' } : c)
    );
  };

  const handleContact = (id) => {
    setAllCandidates(prev =>
      prev.map(c => c.id === id ? { ...c, statusText: 'Contacted' } : c)
    );
  };

  // FUNGSI BARU: Mengubah statusText menjadi 'Contacted'
  const handleUnarchive = (id) => {
    setAllCandidates(prev =>
      prev.map(c => c.id === id ? { ...c, pool: 'candidates', statusText: 'Action Needed' } : c)
    );
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        const totalSearch = allCandidates.filter(c => c.pool === 'search').length;
        const totalAccepted = allCandidates.filter(c => c.pool === 'candidates').length;
        const totalArchived = allCandidates.filter(c => c.pool === 'archive').length;

        return (
          <div className="space-y-6">
            <div className="py-2">
              <h2 className="text-xl font-bold text-neutral-900">Dashboard Overview</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Welcome back! Here is your talent acquisition summary.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-neutral-200/60 p-5 rounded-xl shadow-sm">
                <p className="text-xs font-semibold text-neutral-400 uppercase">AI Search Pool</p>
                <p className="text-2xl font-bold text-neutral-800 mt-1">{totalSearch}</p>
              </div>
              <div className="bg-white border border-neutral-200/60 p-5 rounded-xl shadow-sm border-l-4 border-l-emerald-500">
                <p className="text-xs font-semibold text-neutral-400 uppercase">Shortlisted Candidates</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{totalAccepted}</p>
              </div>
              <div className="bg-white border border-neutral-200/60 p-5 rounded-xl shadow-sm">
                <p className="text-xs font-semibold text-neutral-400 uppercase">Archived Talents</p>
                <p className="text-2xl font-bold text-neutral-600 mt-1">{totalArchived}</p>
              </div>
            </div>
          </div>
        );
      
      case 'ai-search':
        const searchPool = allCandidates.filter(c => c.pool === 'search');
        return (
          <SearchCandidates 
            candidates={searchPool} 
            onAccept={handleAccept} 
            onDecline={handleDecline} 
          />
        );

      case 'candidates':
        const acceptedPool = allCandidates.filter(c => c.pool === 'candidates');
        return (
          <CandidatesList 
            candidates={acceptedPool} 
            onContact={handleContact}  // Oper fungsi contact
            onDecline={handleDecline}  // Oper fungsi decline
          />
        );

      case 'archive':
        const archivedPool = allCandidates.filter(c => c.pool === 'archive');
        return (
          <ArchiveList 
            candidates={archivedPool} 
            onUnarchive={handleUnarchive} // Oper fungsi unarchive ke props
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
        <Header activeMenu={activeMenu} />
        <main className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}