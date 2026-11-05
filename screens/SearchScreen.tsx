import React, { useState, useMemo } from 'react';
import { Search, History, TrendingUp, X } from 'lucide-react';
import { Category } from '../types';
import { COURSES, CATEGORIES_CONFIG } from '../constants';
import CourseCard from '../components/CourseCard';

interface SearchScreenProps {
  onCourseClick: (id: string) => void;
  onCategoryClick?: (category: Category) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onCourseClick, onCategoryClick }) => {
  const [query, setQuery] = useState('');
  
  const filteredCourses = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return COURSES.filter(course => 
      course.title.toLowerCase().includes(lowerQuery) || 
      course.category.toLowerCase().includes(lowerQuery) ||
      course.instructor.toLowerCase().includes(lowerQuery) ||
      (course.tagline && course.tagline.toLowerCase().includes(lowerQuery)) ||
      (course.description && course.description.toLowerCase().includes(lowerQuery))
    );
  }, [query]);

  const trending = [
    'Indústria 4.0 & Automação',
    'Educação de Jovens e Adultos (EJA)',
    'Gestão Financeira para Pequenos Negócios',
    'Redação Nota 1000',
    'Sustentabilidade & ESG',
    'Inglês Instrumental'
  ];

  return (
    <div className="min-h-screen bg-[#060B18] text-white px-4 sm:px-8 md:px-16 pt-12 md:pt-16 pb-28 animate-in fade-in duration-500">
      
      {/* Search Header */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="relative group">
          <div className="absolute inset-0 bg-[#1E40AF]/20 blur-xl rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3B82F6] transition-colors" size={24} />
          <input 
            type="text" 
            placeholder="O que você deseja aprender hoje na UNDD Academy?"
            className="w-full bg-[#0C162E] text-white py-4 md:py-5 pl-16 pr-14 rounded-2xl font-medium placeholder-gray-400 outline-none border border-[#1B2F5C] focus:border-[#3B82F6] transition-all text-base md:text-lg shadow-xl relative z-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white z-20 cursor-pointer p-1"
              aria-label="Limpar busca"
            >
              <X size={22} />
            </button>
          )}
        </div>
      </div>

      {!query ? (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {/* Buscas Frequentes */}
            <section className="bg-[#0C162E]/60 p-6 rounded-2xl border border-[#1B2F5C]/60">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <History size={16} className="text-[#3B82F6]" /> Buscas Frequentes
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {['automação', 'redação', 'eja', 'matemática', 'gestão', 'inglês', 'esg', 'alimentos', 'logística'].map(tag => (
                  <button 
                    key={tag} 
                    onClick={() => setQuery(tag)}
                    className="px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300 hover:bg-[#1E40AF]/30 hover:border-[#3B82F6] hover:text-white transition-all cursor-pointer capitalize"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </section>

            {/* Tendências */}
            <section className="bg-[#0C162E]/60 p-6 rounded-2xl border border-[#1B2F5C]/60">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-[#F59E0B]" /> Cursos em Alta
              </h2>
              <div className="space-y-2">
                {trending.map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setQuery(item)}
                    className="w-full flex items-center gap-3.5 py-2 px-3 rounded-xl hover:bg-white/5 transition-all group text-left cursor-pointer"
                  >
                    <span className="text-sm font-black text-[#F59E0B] w-6">#{idx + 1}</span>
                    <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{item}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Categorias */}
          <section>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
              Navegar por Categoria
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {CATEGORIES_CONFIG.map(cat => (
                <button
                  key={cat.id} 
                  onClick={() => {
                    if (onCategoryClick) onCategoryClick(cat.id);
                    else setQuery(cat.id);
                  }}
                  className={`h-24 rounded-2xl ${cat.bgClass} ${cat.hoverClass} border ${cat.borderClass} p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-md`}
                >
                  <span className="text-xs font-black uppercase text-white tracking-wider">{cat.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="animate-in fade-in duration-300 max-w-[1600px] mx-auto">
          <h2 className="text-gray-300 text-xs font-bold uppercase tracking-[0.2em] mb-8 border-b border-white/10 pb-3 flex items-center justify-between">
            <span>Resultados para <span className="text-white font-black">"{query}"</span> ({filteredCourses.length})</span>
            <button onClick={() => setQuery('')} className="text-[#3B82F6] hover:underline cursor-pointer">Limpar</button>
          </h2>
          
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-5">
              {filteredCourses.map(course => (
                <div key={course.id} className="flex justify-center w-full">
                  <CourseCard course={course} onClick={onCourseClick} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#0C162E] border border-[#1B2F5C] rounded-2xl flex items-center justify-center mb-4 text-[#3B82F6]">
                <Search size={28} />
              </div>
              <p className="text-lg font-bold text-white mb-2">Nenhum curso encontrado</p>
              <p className="text-xs text-gray-400">Tente buscar por termos mais gerais como "Educação", "Indústria", "Gestão" ou explore as categorias.</p>
              <button 
                onClick={() => setQuery('')}
                className="mt-6 text-white font-bold text-xs uppercase tracking-wider bg-[#1E40AF] hover:bg-[#1D4ED8] px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
              >
                Limpar busca
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
