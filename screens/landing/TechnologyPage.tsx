import React from 'react';
import { ArrowLeft, Brain, Lock, WifiOff, Smartphone, Server } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const TechnologyPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  return (
    <div className="min-h-screen bg-[#060B18] text-white font-sans animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-50 p-4 md:p-6 flex items-center justify-between bg-[#060B18]/90 backdrop-blur-md border-b border-[#1B2F5C]">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-[#0C162E] hover:bg-[#14234B] rounded-full text-blue-400 font-bold text-xs uppercase tracking-wider transition-all border border-[#1B2F5C] cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Voltar</span>
        </button>
        <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">Tecnologia • UN2D Academy</span>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center mb-14 sm:mb-18 md:mb-24">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full mb-4 sm:mb-6">
              <Brain size={14} className="text-blue-400" />
              <span className="text-[10px] sm:text-[11px] font-bold text-blue-300 uppercase tracking-wider">Ambiente Virtual de Alta Performance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase leading-tight mb-4 sm:mb-6">
              Plataforma Moderna, <br />
              <span className="text-[#3B82F6]">Multi-Dispositivo</span> &amp; Sincronizada
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed mb-6 sm:mb-8">
              A <strong>UN2D Academy</strong> combina design moderno e engenharia de ponta: cards horizontais em tela cheia no desktop e cards verticais no mobile/tablet, com reprodutor de vídeo em alta definição e suporte a downloads offline de apostilas e videoaulas.
            </p>
            
            <div className="grid grid-cols-3 gap-4 sm:gap-6 border-t border-[#1B2F5C] pt-6 sm:pt-8">
              <div className="space-y-1">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-white block">99.9%</span>
                <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold tracking-wider">Disponibilidade</span>
              </div>
              <div className="space-y-1">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#F59E0B] block">1080p</span>
                <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold tracking-wider">Streaming HD</span>
              </div>
              <div className="space-y-1">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-400 block">PWA</span>
                <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-bold tracking-wider">Multi-Plataforma</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" 
              className="rounded-3xl border border-[#1B2F5C] shadow-2xl w-full object-cover"
              alt="Tecnologia UN2D Academy"
            />
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-4 bg-[#0C162E] border border-[#1B2F5C] p-4 rounded-2xl shadow-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                <Lock size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Criptografia de Ponta a Ponta</p>
                <p className="text-[10px] text-gray-400">Proteção de dados e conformidade LGPD</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-[#0C162E] p-8 rounded-3xl border border-[#1B2F5C] space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Smartphone size={24} />
            </div>
            <h3 className="font-bold text-lg text-white">Design Adaptativo &amp; Responsivo</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Cards horizontais no desktop para aproveitamento amplo da tela e cards verticais ergonômicos no mobile e tablet para navegação ágil.
            </p>
          </div>

          <div className="bg-[#0C162E] p-8 rounded-3xl border border-[#1B2F5C] space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <WifiOff size={24} />
            </div>
            <h3 className="font-bold text-lg text-white">Aulas Salvas &amp; Downloads Offline</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Baixe apostilas didáticas em PDF e roteiros de estudo para continuar sua capacitação em viagens ou locais com baixa conectividade.
            </p>
          </div>

          <div className="bg-[#0C162E] p-8 rounded-3xl border border-[#1B2F5C] space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Server size={24} />
            </div>
            <h3 className="font-bold text-lg text-white">Servidores Rápidos e Seguros</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Transmissão rápida e sem travamentos, com adaptação automática de bitrate e reprodução estável em qualquer velocidade de conexão.
            </p>
          </div>
        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default TechnologyPage;
