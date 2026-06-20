import Sidebar from './Sidebar';
import Header from './Header';

export default function Dashboard({ children, activeMenu, onMenuChange }) {
  return (
    <div className="flex min-h-screen bg-[#f8f8f6]">
      {/* Fixed Sidebar */}
      <Sidebar activeMenu={activeMenu} onMenuChange={onMenuChange} />

      {/* Main Area (offset by sidebar width) */}
      <div className="ml-[260px] flex-1 flex flex-col min-h-screen">
        {/* Top Header - Tambahkan setActiveMenu di sini */}
        <Header activeMenu={activeMenu} setActiveMenu={onMenuChange} />

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}