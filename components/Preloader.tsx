import React from 'react';
import { Logo } from './Logo';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-[#060B18] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Radial Glow with UNDD Blue */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,64,175,0.25)_0%,transparent_70%)]" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-8 animate-logo-pulse">
          <Logo inverted={true} size="xl" className="h-16 sm:h-20 w-auto" />
        </div>
        
        {/* Cinematic Progress Bar with UNDD Academy brand colors */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-64 h-[3px] bg-white/10 rounded-full overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#F59E0B] shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-load-progress" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-300 animate-pulse">
              Carregando UNDD Academy...
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes logo-pulse {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.03); opacity: 1; }
        }
        @keyframes load-progress {
          0% { width: 0%; }
          30% { width: 45%; }
          70% { width: 80%; }
          100% { width: 100%; }
        }
        .animate-logo-pulse {
          animation: logo-pulse 2.5s ease-in-out infinite;
        }
        .animate-load-progress {
          animation: load-progress 2.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
