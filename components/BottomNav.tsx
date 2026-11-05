import React from 'react';
import { Home, Search, Layout, Download, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  // Exact 5 screens requested: Home, Busca, Academico, Download, Perfil
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Busca', icon: Search },
    { id: 'academico', label: 'Acadêmico', icon: Layout },
    { id: 'downloads', label: 'Download', icon: Download },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#060B18]/95 backdrop-blur-xl border-t border-[#1B2F5C] z-50 flex justify-around items-center py-2.5 safe-area-inset-bottom md:hidden shadow-2xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
              isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-[#3B82F6]' : 'text-gray-400'} />
            <span className={`text-[10px] font-semibold ${isActive ? 'text-white font-bold' : 'text-gray-400'}`}>
              {tab.label}
            </span>
            {isActive && <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full mt-0.5 shadow-[0_0_6px_#F59E0B]" />}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
