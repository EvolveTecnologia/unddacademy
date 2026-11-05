import React, { useState } from 'react';
import { Home, Search, Layout, Download, User, LogOut } from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Exact 5 screens requested: Home, Busca, Academico, Download, Perfil
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Busca', icon: Search },
    { id: 'academico', label: 'Acadêmico', icon: Layout },
    { id: 'downloads', label: 'Download', icon: Download },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full z-[100] flex flex-col transition-all duration-300 ease-in-out group outline-none select-none ${
        isHovered 
          ? 'w-[260px] bg-[#060B18]/95 backdrop-blur-xl border-r border-[#1B2F5C] shadow-2xl' 
          : 'w-[90px] bg-[#060B18] border-r border-[#1B2F5C]/60'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsHovered(false);
        }
      }}
      tabIndex={0}
    >
      {/* Logo Area */}
      <div className={`h-24 flex items-center ${isHovered ? 'justify-start px-5' : 'justify-center'} transition-all duration-300`}>
        {isHovered ? (
          <Logo size="sm" className="h-9" />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-[#0C162E] hover:bg-[#0F1D3D] border border-[#1B2F5C] flex items-center justify-center transition-all p-1.5 shadow-lg group-hover:scale-105">
            <Logo variant="icon-only" className="w-full h-full" />
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col justify-center gap-2.5 px-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 group/item outline-none cursor-pointer ${
                isActive 
                  ? 'text-white bg-[#1E40AF] shadow-md shadow-[#1E40AF]/40 font-bold' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              } ${isHovered ? 'justify-start px-4' : 'justify-center'}`}
              title={tab.label}
            >
              <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover/item:scale-110'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-white' : 'text-gray-300'} />
              </div>
              
              <span className={`text-sm font-bold tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isHovered ? 'opacity-100 max-w-[180px] translate-x-0' : 'opacity-0 max-w-0 -translate-x-4'
              }`}>
                {tab.label}
              </span>

              {/* Active Gold Indicator */}
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-[#F59E0B] rounded-l-full shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-3 pb-6">
        {onLogout && (
          <button 
            onClick={onLogout}
            className={`flex items-center gap-4 p-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full outline-none cursor-pointer ${
              isHovered ? 'justify-start px-4' : 'justify-center'
            }`}
            title="Sair"
          >
            <LogOut size={20} />
            <span className={`text-sm font-bold whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isHovered ? 'opacity-100 max-w-[180px]' : 'opacity-0 max-w-0'
            }`}>
              Sair
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
