import React from 'react';
import { ArrowLeft, Briefcase, GraduationCap, Globe, Leaf, Cpu, Utensils, Check } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';
import { CATEGORIES_CONFIG, COURSES } from '../../constants';
import { Category } from '../../types';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const CategoriesPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  const iconMap: Record<Category, React.ElementType> = {
    [Category.Educacao]: GraduationCap,
    [Category.Idiomas]: Globe,
    [Category.Sustentabilidade]: Leaf,
    [Category.Tecnologia]: Cpu,
    [Category.Alimentos]: Utensils,
    [Category.Gestao]: Briefcase
  };

  return (
    <div className="min-h-screen bg-[#060B18] text-white font-sans animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-50 p-4 md:p-6 flex items-center justify-between bg-[#060B18]/90 backdrop-blur-md border-b border-[#1B2F5C]">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Voltar</span>
        </button>
        <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">Áreas de Formação • UNDD Academy</span>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1E40AF]/30 border border-[#3B82F6]/40 rounded-full text-[#60A5FA] text-xs font-bold uppercase tracking-wider mb-4">
            <span>Catálogo Completo</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Áreas de Capacitação <br />
            <span className="text-[#3B82F6]">Técnica e Profissional</span>
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-3xl leading-relaxed">
            A <strong>UNDD Academy</strong> estrutura seus cursos em áreas estratégicas para o mercado de trabalho, com foco em habilidades práticas, ética profissional e desenvolvimento contínuo.
          </p>
        </div>

        {/* 6 Categories Grid with exact colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CATEGORIES_CONFIG.map((cat) => {
            const Icon = iconMap[cat.id];
            const coursesCount = COURSES.filter(c => c.category === cat.id).length;
            const categoryCourses = COURSES.filter(c => c.category === cat.id);

            return (
              <div 
                key={cat.id}
                className="bg-[#0C162E] border border-[#1B2F5C] hover:border-[#3B82F6] rounded-3xl p-6 sm:p-8 space-y-5 transition-all shadow-xl group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: cat.color }}
                    >
                      <Icon size={28} />
                    </div>
                    <span 
                      className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white"
                      style={{ backgroundColor: `${cat.color}CC` }}
                    >
                      {coursesCount} Cursos
                    </span>
                  </div>

                  <h3 className="text-xl font-black uppercase text-white tracking-tight">
                    {cat.sectionTitle}
                  </h3>

                  <ul className="space-y-2 pt-3 border-t border-white/10 text-xs text-gray-300">
                    {categoryCourses.slice(0, 3).map(c => (
                      <li key={c.id} className="flex items-start gap-2">
                        <Check size={14} className="text-[#10B981] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{c.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <span className="text-xs font-bold text-[#60A5FA] group-hover:text-white transition-colors flex items-center gap-1">
                    Conhecer trilha técnica →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default CategoriesPage;
