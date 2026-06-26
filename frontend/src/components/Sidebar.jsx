import {
  LayoutDashboard,
  Users,
  Search,
  Compass,
  Archive,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Search, label: 'AI Search', id: 'ai-search' },
  { icon: Users, label: 'Candidates', id: 'candidates' },
  { icon: Archive, label: 'Archive', id: 'archive' }
];

export default function Sidebar({ activeMenu, onMenuChange }) {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-neutral-50 border-r border-neutral-200/60 flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-neutral-200/50">
        <div className="flex items-center gap-3">
          {/* Logo Box Minimalis dengan Ikon Compass (Scout) */}
          <div className="w-9 h-9 rounded-lg bg-olive-dark flex items-center justify-center shadow-sm shadow-olive-dark/10">
            <Compass className="w-5 h-5 text-white" strokeWidth={2} />
          </div>

          {/* Brand Typography */}
          <div className="flex flex-col gap-0.5">
            <h1 className="font-serif text-lg font-bold text-neutral-900 leading-none tracking-tight">
              Scoutly
            </h1>
            <p className="text-[12px] font-semibold text-neutral-400 tracking-wider">
              Talent Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onMenuChange(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-200 cursor-pointer border
                    ${isActive
                      ? 'bg-olive-dark/10 text-olive-dark border-olive-dark/20 shadow-sm'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 border-transparent'
                    }
                  `}
                >
                  <Icon
                    className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-olive-dark' : 'text-neutral-400'}`}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}