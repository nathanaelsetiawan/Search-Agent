import { 
  X, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  DollarSign, 
  Calendar, 
  Sparkles, 
  Mail, 
  Phone, 
  Globe, 
  Award,
  Clock,
  UserCheck,
  MessageSquare,
  RefreshCw,
  XCircle
} from 'lucide-react';

export default function CandidateDetailModal({ 
  candidate, 
  onClose, 
  onAccept, 
  onDecline, 
  onContact, 
  onUnarchive 
}) {
  if (!candidate) return null;

  const { id, name, role, metrics, salaryRange, experience, pool, statusText, linkedinUrl } = candidate;

  const displaySkills = candidate.skills || metrics?.specialization || "General Software Engineering";
  const displayLocation = metrics?.location || "Remote / Global";
  const displayScore = candidate.matchingScore || metrics?.matchingScore || 0;

  // Fallback data for experience history
  const experienceHistory = candidate.experienceHistory || [
    {
      role: role || "Executive Professional",
      company: "Current Corporation",
      period: experience ? `Past ${experience}` : "N/A",
      description: `Experienced in ${displaySkills}. Proven track record of high operational efficiency and leadership.`
    }
  ];

  // Fallback data for education history
  const educationHistory = candidate.educationHistory || [
    {
      degree: "Higher Degree / Certification",
      institution: "Prestigious Institute",
      period: "N/A",
      description: "Studies concentrated on technical frameworks and leadership methodologies."
    }
  ];

  const handleAction = (actionFn) => {
    if (actionFn) {
      actionFn(id);
      onClose(); // Close modal after taking action
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-overlay-fade-in">
      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-neutral-200/60 flex flex-col md:flex-row max-h-[90vh] overflow-hidden animate-modal-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-all shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Profile Card */}
        <div className="w-full md:w-1/3 bg-neutral-50/50 border-r border-neutral-100 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Match Score Badge */}
            <div className="flex justify-center mb-5 mt-2">
              {displayScore > 0 && (
                <span className="bg-olive-dark text-white text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  {displayScore}% Match
                </span>
              )}
            </div>

            {/* Profile Info */}
            <div className="text-center space-y-1 mb-6">
              <h3 className="text-lg font-bold text-neutral-900 leading-tight">{name}</h3>
              <p className="text-xs font-bold text-olive-dark uppercase tracking-wider">{role}</p>
              
              <div className="pt-2 flex flex-wrap justify-center gap-1.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 bg-white border border-neutral-200/60 px-2 py-0.5 rounded-full">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  {displayLocation}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 bg-white border border-neutral-200/60 px-2 py-0.5 rounded-full">
                  <Briefcase className="w-3 h-3 text-neutral-400" />
                  {experience}
                </span>
              </div>
            </div>

            <hr className="border-neutral-200/60 my-5" />

            {/* Candidate Details */}
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Salary Expectation</p>
                <p className="text-xs font-bold text-neutral-700 mt-0.5 flex items-center gap-0.5">
                  <DollarSign className="w-3.5 h-3.5 text-neutral-400" />
                  {salaryRange || "Confidential"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Specialization</p>
                <p className="text-xs font-semibold text-neutral-700 mt-0.5">
                  {displaySkills}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Current Pipeline Status</p>
                <div className="mt-1">
                  {pool === 'search' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-bold">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      AI Search (Pending)
                    </span>
                  )}
                  {pool === 'candidates' && (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${
                      statusText === 'Contacted' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusText === 'Contacted' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      Shortlisted - {statusText || 'Action Needed'}
                    </span>
                  )}
                  {pool === 'archive' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold">
                      <XCircle className="w-3.5 h-3.5 text-red-500" />
                      Archived / Declined
                    </span>
                  )}
                </div>
              </div>
            </div>

            <hr className="border-neutral-200/60 my-5" />

            {/* Contact Info */}
            <div className="space-y-2.5 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                {linkedinUrl ? (
                  <a 
                    href={linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-olive-dark underline transition-colors truncate"
                    title={linkedinUrl}
                  >
                    {candidate.linkedinUrl ? candidate.linkedinUrl.replace(/^https?:\/\/(?:[a-z]{2}\.)?/, "") : "linkedin.com/in/"}
                  </a>
                ) : (
                  <span className="text-neutral-300 italic">LinkedIn URL tidak tersedia</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons Column Bottom (Only on desktop) */}
          <div className="mt-8 hidden md:block">
            {pool === 'search' && (
              <div className="flex gap-2.5 w-full">
                <button 
                  onClick={() => handleAction(onAccept)}
                  className="flex-1 bg-olive-dark hover:bg-olive-dark/90 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Accept
                </button>
                <button 
                  onClick={() => handleAction(onDecline)}
                  className="flex-1 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 border border-neutral-300 font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                >
                  <XCircle className="w-3.5 h-3.5 text-neutral-400" />
                  Decline
                </button>
              </div>
            )}
            {pool === 'candidates' && (
              <div className="flex flex-col gap-2 w-full">
                <button 
                  onClick={() => handleAction(onContact)}
                  disabled={statusText === 'Contacted'}
                  className={`w-full font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                    statusText === 'Contacted'
                      ? 'bg-neutral-100 text-neutral-400 border border-neutral-200 shadow-none cursor-not-allowed opacity-60'
                      : 'bg-olive-dark hover:bg-olive-dark/90 text-white cursor-pointer'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  {statusText === 'Contacted' ? 'Contacted' : 'Contact Candidate'}
                </button>
                <button 
                  onClick={() => handleAction(onDecline)}
                  className="w-full bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 border border-neutral-300 font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                >
                  <XCircle className="w-3.5 h-3.5 text-neutral-400" />
                  Move to Archive
                </button>
              </div>
            )}
            {pool === 'archive' && (
              <button 
                onClick={() => handleAction(onUnarchive)}
                className="w-full bg-olive-dark hover:bg-olive-dark/90 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Unarchive Candidate
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Work Experience Timeline & Education */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8 max-h-[50vh] md:max-h-none">
          {/* Work Experience */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-olive-dark" />
              Work Experience History
            </h4>
            
            <div className="relative border-l border-neutral-200 pl-5 ml-2.5 space-y-6">
              {experienceHistory.map((exp, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[27.5px] top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-olive-dark flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="w-1.5 h-1.5 rounded-full bg-olive-dark" />
                  </span>
                  
                  <div>
                    <span className="inline-block text-[10px] font-bold text-olive-dark bg-olive-dark/5 px-2 py-0.5 rounded-md mb-1.5">
                      {exp.period}
                    </span>
                    <h5 className="text-sm font-bold text-neutral-800">{exp.role}</h5>
                    <p className="text-xs font-semibold text-neutral-500">{exp.company}</p>
                    <p className="text-xs text-neutral-500 mt-2 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* Education */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <GraduationCap className="w-4.5 h-4.5 text-olive-dark" />
              Education History
            </h4>

            <div className="space-y-5 pl-2">
              {educationHistory.map((edu, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/50 text-neutral-600 flex-shrink-0">
                    <GraduationCap className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h5 className="text-xs font-bold text-neutral-800">{edu.degree}</h5>
                      <span className="text-[10px] font-bold text-neutral-400 px-1.5 py-0.5 bg-neutral-100 rounded-md">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-neutral-500">{edu.institution}</p>
                    {edu.description && (
                      <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons: Mobile Layout (Only visible at bottom on small screens) */}
          <div className="pt-4 border-t border-neutral-100 md:hidden">
            {pool === 'search' && (
              <div className="flex gap-2.5 w-full">
                <button 
                  onClick={() => handleAction(onAccept)}
                  className="flex-1 bg-olive-dark hover:bg-olive-dark/90 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Accept
                </button>
                <button 
                  onClick={() => handleAction(onDecline)}
                  className="flex-1 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 border border-neutral-300 font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                >
                  Decline
                </button>
              </div>
            )}
            {pool === 'candidates' && (
              <div className="flex flex-col gap-2 w-full">
                <button 
                  onClick={() => handleAction(onContact)}
                  disabled={statusText === 'Contacted'}
                  className={`w-full font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                    statusText === 'Contacted'
                      ? 'bg-neutral-100 text-neutral-400 border border-neutral-200 shadow-none cursor-not-allowed opacity-60'
                      : 'bg-olive-dark hover:bg-olive-dark/90 text-white cursor-pointer'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  {statusText === 'Contacted' ? 'Contacted' : 'Contact Candidate'}
                </button>
                <button 
                  onClick={() => handleAction(onDecline)}
                  className="w-full bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 border border-neutral-300 font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
                >
                  Move to Archive
                </button>
              </div>
            )}
            {pool === 'archive' && (
              <button 
                onClick={() => handleAction(onUnarchive)}
                className="w-full bg-olive-dark hover:bg-olive-dark/90 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Unarchive Candidate
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
