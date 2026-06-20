import { Bell, ChevronRight } from 'lucide-react';

const pageTitles = {
  dashboard: { parent: 'Dashboard', title: 'Overview' },
  'ai-search': { parent: 'Dashboard', title: 'AI Search' },
  'candidates': { parent: 'Dashboard', title: 'Candidates' },
  'archive': { parent: 'Dashboard', title: 'Archive' }
};

// Tambahkan prop setActiveMenu di sini
export default function Header({ activeMenu, setActiveMenu }) {
  const page = pageTitles[activeMenu] || pageTitles.dashboard;

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-xl border-b border-neutral-200/50 flex items-center justify-between px-8">
      {/* Breadcrumb / Page Title */}
      <div className="flex items-center gap-2 text-sm">
        {/* Pastikan onClick memanggil setActiveMenu */}
        <button 
          onClick={() => setActiveMenu?.('dashboard')}
          className="text-neutral-400 font-medium hover:text-neutral-600 cursor-pointer transition-colors"
        >
          {page.parent}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-300" strokeWidth={2} />
        <span className="text-neutral-900 font-semibold">{page.title}</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-xl text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 transition-all duration-200 cursor-pointer">
          <Bell className="w-5 h-5" strokeWidth={1.8} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-olive-dark rounded-full ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-neutral-200/60" />

        {/* User Avatar */}
        <button className="flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-neutral-50 transition-all duration-200 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-olive-dark flex items-center justify-center text-white text-sm font-bold shadow-md shadow-olive-dark/20">
            N
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-semibold text-neutral-900 leading-tight">Nathan</p>
            <p className="text-[11px] text-neutral-400 leading-tight">Admin</p>
          </div>
        </button>
      </div>
    </header>
  );
}