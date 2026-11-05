import React from 'react';

export const BRFlag: React.FC<{ className?: string }> = ({ className = "w-6 h-4" }) => (
  <svg viewBox="0 0 700 490" className={`${className} rounded-sm object-cover shadow-sm shrink-0 border border-white/20`} aria-label="Bandeira do Brasil (Português Brasileiro)">
    <rect width="700" height="490" fill="#009B3A"/>
    <polygon points="350,52 648,245 350,438 52,245" fill="#FEDF00"/>
    <circle cx="350" cy="245" r="115" fill="#002776"/>
    <path d="M 230 260 Q 350 200 470 260" fill="none" stroke="#FFF" strokeWidth="14"/>
  </svg>
);

interface LanguageSelectorProps {
  variant?: 'navbar' | 'settings' | 'flags-only';
  onLanguageChange?: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'navbar' }) => {
  if (variant === 'settings') {
    return (
      <div className="p-4 rounded-xl bg-[#060B18] border border-[#1B2F5C] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BRFlag className="w-8 h-5 rounded shadow" />
          <div>
            <h4 className="text-xs font-bold text-white">Português Brasileiro (pt-BR)</h4>
            <p className="text-[10px] text-gray-400">Idioma único e oficial de todas as formações da UNDD Academy</p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-bold">
          OFICIAL &amp; PADRÃO
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0C162E] border border-[#1B2F5C] text-gray-200">
      <BRFlag className="w-5 h-3.5" />
      <span className="text-xs font-bold tracking-wider">PT-BR</span>
    </div>
  );
};

export default LanguageSelector;
