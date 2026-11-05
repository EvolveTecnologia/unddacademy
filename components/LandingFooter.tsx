import React from 'react';
import { Logo } from './Logo';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface LandingFooterProps {
  onViewChange: (view: LandingView) => void;
}

const LandingFooter: React.FC<LandingFooterProps> = ({ onViewChange }) => {
  const handleNav = (view: LandingView) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onViewChange(view);
  };

  return (
    <footer className="bg-[#060B18] text-gray-300 py-16 px-6 md:px-16 border-t border-[#1B2F5C] text-xs relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* PLATAFORMA */}
        <div className="space-y-4">
          <h4 className="font-bold text-white uppercase tracking-widest text-xs border-b border-[#1B2F5C] pb-2">
            PLATAFORMA
          </h4>
          <div className="space-y-2.5">
            <button onClick={() => handleNav('categories')} className="block text-gray-400 hover:text-white cursor-pointer transition-colors text-left">
              Categorias &amp; Ecossistema
            </button>
            <button onClick={() => handleNav('technology')} className="block text-gray-400 hover:text-white cursor-pointer transition-colors text-left">
              Tecnologia Adaptativa
            </button>
            <button onClick={() => handleNav('impact')} className="block text-gray-400 hover:text-white cursor-pointer transition-colors text-left">
              Impacto e Capacitação
            </button>
          </div>
        </div>

        {/* SUPORTE */}
        <div className="space-y-4">
          <h4 className="font-bold text-white uppercase tracking-widest text-xs border-b border-[#1B2F5C] pb-2">
            SUPORTE
          </h4>
          <div className="space-y-2.5">
            <button onClick={() => handleNav('help')} className="block text-gray-400 hover:text-white cursor-pointer transition-colors text-left">
              Central de Ajuda
            </button>
            <button onClick={() => handleNav('terms')} className="block text-gray-400 hover:text-white cursor-pointer transition-colors text-left">
              Termos de Uso
            </button>
            <button onClick={() => handleNav('privacy')} className="block text-gray-400 hover:text-white cursor-pointer transition-colors text-left">
              Políticas de Privacidade
            </button>
          </div>
        </div>

        {/* SOBRE */}
        <div className="space-y-4">
          <h4 className="font-bold text-white uppercase tracking-widest text-xs border-b border-[#1B2F5C] pb-2">
            SOBRE
          </h4>
          <div className="space-y-2.5">
            <button onClick={() => handleNav('about')} className="block text-gray-400 hover:text-white cursor-pointer transition-colors text-left">
              Quem Somos
            </button>
            <button onClick={() => handleNav('partners')} className="block text-gray-400 hover:text-white cursor-pointer transition-colors text-left">
              Parceiros &amp; Docentes
            </button>
            <button onClick={() => handleNav('contact')} className="block text-gray-400 hover:text-white cursor-pointer transition-colors text-left">
              Fale Conosco
            </button>
          </div>
        </div>

        {/* Brand Lockup & Mission */}
        <div className="space-y-4 flex flex-col items-start lg:items-end text-left lg:text-right">
          <div className="cursor-pointer" onClick={() => handleNav('home')}>
            <Logo size="md" className="h-10" />
          </div>
          <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
            Plataforma oficial de ensino da <strong>União Nacional de Docentes de Direita (UNDD)</strong>. Ensino técnico, ético e emancipador com foco no mérito.
          </p>
          <p className="text-gray-400 text-xs pt-1">
            Feito com <span className="text-[#EF4444]">❤️</span> para a educação.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-[#1B2F5C] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-gray-400 text-[11px]">
        <p>Copyright © 2026 UNDD Academy Inc. Todos os direitos reservados.</p>
        <button onClick={() => handleNav('privacy')} className="hover:text-white transition-colors cursor-pointer">
          Cookies &amp; Privacidade
        </button>
      </div>
    </footer>
  );
};

export default LandingFooter;
