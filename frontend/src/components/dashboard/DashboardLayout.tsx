import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  ChevronLeft,
  Database,
  User
} from "lucide-react";
import { api } from "../../lib/api";
import { Logo } from "../common/Logo";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  navigate: (path: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  currentPath, 
  navigate 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Jobs", path: "/dashboard/jobs", icon: Briefcase },
    { name: "Interviews", path: "/dashboard/interviews", icon: Users },
    { name: "Candidates", path: "/dashboard/candidates", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? "w-64 border-r" : "w-0 border-r-0"} bg-slate-50 border-slate-200 hidden md:flex flex-col transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap shrink-0`}>
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200/60 shrink-0">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate("/")}>
            <Logo className="w-4 h-auto text-slate-900" />
            <span className="text-xs font-bold tracking-widest text-slate-900">WUUP <span className="font-normal text-slate-500 lowercase italic" style={{ fontFamily: 'cursive', textTransform: 'lowercase' }}>hire</span></span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 -mr-2 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200/50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== "/dashboard" && currentPath.startsWith(item.path));
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-slate-900 text-white shadow-sm border border-slate-900" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? "text-[#78d11d]" : "text-slate-400"}`} />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions & User Profile */}
        <div className="p-4 border-t border-slate-200/60 mt-auto">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors border border-transparent">
            <Settings className="w-4 h-4 text-slate-400" />
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 transition-all duration-300">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="hidden md:flex p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <button className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-semibold text-slate-900 capitalize">
              {currentPath === "/dashboard" ? "Overview" : currentPath.split("/").filter(Boolean).slice(1).join(" / ")}
            </h2>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 rounded-sm hover:bg-slate-100 transition-colors relative">
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#78d11d] rounded-full border border-white" />
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>
            
            <div className="w-px h-6 bg-slate-200" />

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-8 h-8 rounded-sm bg-slate-900 border border-slate-800 flex items-center justify-center text-[#78d11d] font-semibold text-xs shadow-sm">
                <User className="w-4 h-4" />
              </div>
            </div>
            
            <button 
              onClick={() => {
                const current = localStorage.getItem('isDemoMode') === 'true';
                localStorage.setItem('isDemoMode', (!current).toString());
                window.location.reload();
              }}
              className={`ml-2 hover:text-[#78d11d] transition-colors ${localStorage.getItem('isDemoMode') === 'true' ? 'text-[#78d11d]' : 'text-slate-400'}`}
              title="Toggle Demo Data"
            >
              <Database className="w-4 h-4" />
            </button>

            <button 
              onClick={async () => {
                try {
                  await api.post("/auth/logout");
                } catch (error) {
                  console.error("Logout failed", error);
                } finally {
                  localStorage.removeItem("token");
                  navigate("/");
                }
              }}
              className="ml-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
          <div className="max-w-[1600px] mx-auto w-full h-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};
