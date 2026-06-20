import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header'; 
import SearchCandidates from './components/SearchCandidates';
import CandidatesList from './components/CandidatesList'; 
import ArchiveList from './components/ArchiveList';       
import CandidateDetailModal from './components/CandidateDetailModal';

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
    statusText: "Action Needed",
    experienceHistory: [
      {
        role: "Chief Strategy Officer",
        company: "Apex Global Solutions",
        period: "2021 - Present",
        description: "Designed and executed corporate M&A strategies that yielded a 4.8x exit valuation growth. Managed cross-border operations and led global expansion into EU markets."
      },
      {
        role: "Director of Strategy",
        company: "McKinsey & Company",
        period: "2015 - 2021",
        description: "Consulted Fortune 500 tech companies on international growth, portfolio restructuring, and market entry strategies."
      },
      {
        role: "Senior Strategy Manager",
        company: "Accenture Strategy",
        period: "2010 - 2015",
        description: "Led a team of consultants focusing on digital transformation and operating model strategy in the telecoms sector."
      }
    ],
    educationHistory: [
      {
        degree: "Master of Business Administration (MBA)",
        institution: "Harvard Business School",
        period: "2008 - 2010",
        description: "Concentrated in Corporate Finance and Strategic Management. Active member of Venture Capital Club."
      },
      {
        degree: "Bachelor of Science in Economics",
        institution: "London School of Economics (LSE)",
        period: "2004 - 2007",
        description: "Graduated with First Class Honours. Received LSE Merit Scholarship."
      }
    ]
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
    statusText: "Action Needed",
    experienceHistory: [
      {
        role: "VP of Engineering",
        company: "Stripe",
        period: "2022 - Present",
        description: "Overseeing engineering team of 80+ across global hubs. Leading the migration to decentralized cloud infrastructure and launching core AI-assisted billing modules."
      },
      {
        role: "Director of Engineering",
        company: "Grab",
        period: "2017 - 2022",
        description: "Managed engineering teams responsible for ride-hailing services. Scaled system throughput to handle 50M+ requests per day with 99.99% uptime."
      },
      {
        role: "Lead Software Architect",
        company: "Atlassian",
        period: "2013 - 2017",
        description: "Designed enterprise SaaS architecture for next-generation collaboration tools. Led a team of 12 senior engineers."
      }
    ],
    educationHistory: [
      {
        degree: "Master of Science in Computer Science",
        institution: "Stanford University",
        period: "2011 - 2013",
        description: "Research focus on Distributed Systems and Machine Learning. GPA 3.92."
      },
      {
        degree: "Bachelor of Engineering in Computer Science",
        institution: "National University of Singapore (NUS)",
        period: "2007 - 2011",
        description: "Dean's List award recipient. Minor in Entrepreneurship."
      }
    ]
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
    statusText: "Action Needed",
    experienceHistory: [
      {
        role: "Chief Operating Officer",
        company: "Flexport",
        period: "2020 - Present",
        description: "Optimizing global freight logistics and SaaS operation networks. Increased operational efficiency by 3.5x using proprietary predictive routing algorithms."
      },
      {
        role: "VP of Global Operations",
        company: "Amazon",
        period: "2013 - 2020",
        description: "Directed logistics and warehouse automation networks for North American fulfillment centers. Managed a headcount of 1,200+ employees."
      },
      {
        role: "Director of Operations",
        company: "FedEx Express",
        period: "2007 - 2013",
        description: "Oversaw air cargo operations and ground network synchronization. Implemented cost-saving lean six sigma projects."
      }
    ],
    educationHistory: [
      {
        degree: "Master of Science in Logistics & Supply Chain Management",
        institution: "Massachusetts Institute of Technology (MIT)",
        period: "2005 - 2007",
        description: "Thesis on Multi-echelon Inventory Optimization. MIT Supply Chain Fellowship."
      },
      {
        degree: "Bachelor of Science in Industrial Engineering",
        institution: "Georgia Institute of Technology",
        period: "2001 - 2005",
        description: "Summa Cum Laude. Alpha Pi Mu Honor Society member."
      }
    ]
  }
];

export default function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [allCandidates, setAllCandidates] = useState(() => {
    const savedData = localStorage.getItem('skripsi_candidates');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      // Migrate existing cache to include detailed arrays
      if (parsed.length > 0 && !parsed[0].experienceHistory) {
        return initialCandidates;
      }
      return parsed;
    }
    return initialCandidates;
  });

  useEffect(() => {
    localStorage.setItem('skripsi_candidates', JSON.stringify(allCandidates));
  }, [allCandidates]);

  // Keep selectedCandidate details in sync if pool changes
  useEffect(() => {
    if (selectedCandidate) {
      const updated = allCandidates.find(c => c.id === selectedCandidate.id);
      if (updated) {
        setSelectedCandidate(updated);
      }
    }
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
            onViewDetails={setSelectedCandidate}
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
          <ArchiveList 
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