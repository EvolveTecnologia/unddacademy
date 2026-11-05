import React, { useState, useEffect, useRef } from 'react';
import { 
  COURSES, 
  CATEGORIES_CONFIG,
  EDUCACAO_COURSES, 
  TECNOLOGIA_COURSES, 
  IDIOMAS_COURSES, 
  SUSTENTABILIDADE_COURSES, 
  ALIMENTOS_COURSES, 
  GESTAO_COURSES 
} from '../constants';
import { Category, Course } from '../types';
import CourseCard from '../components/CourseCard';
import { GraduationCap, Leaf, Cpu, Utensils, Briefcase, Globe, Check, Plus, Play, ChevronRight, Sparkles } from 'lucide-react';
import { Logo } from '../components/Logo';

interface HomeScreenProps {
  onCourseClick: (id: string) => void;
  onCategoryClick: (category: Category) => void;
  myListIds?: string[];
  onToggleMyList?: (id: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ 
  onCourseClick, 
  onCategoryClick, 
  myListIds = [], 
  onToggleMyList 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Hero Banners inspired directly by Screenshots (Alumínio & Meio Ambiente, Sustentabilidade ESG, EJA Fundamental)
  const slides = [
    {
      id: SUSTENTABILIDADE_COURSES[0].id,
      categoryTag: 'SUSTENTABILIDADE',
      category: Category.Sustentabilidade,
      title: 'ALUMÍNIO & AMBIENTE',
      subtitle: 'Entenda o ciclo completo e a responsabilidade socioambiental.',
      image: SUSTENTABILIDADE_COURSES[0].heroImage,
    },
    {
      id: SUSTENTABILIDADE_COURSES[4].id,
      categoryTag: 'MEIO AMBIENTE & ESG',
      category: Category.Sustentabilidade,
      title: 'SUSTENTABILIDADE & PRÁTICAS ESG',
      subtitle: 'Entenda o impacto ambiental e aprenda práticas de ESG que as grandes empresas valorizam hoje.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1920&auto=format&fit=crop',
    },
    {
      id: EDUCACAO_COURSES[0].id,
      categoryTag: 'EDUCAÇÃO BÁSICA & EJA',
      category: Category.Educacao,
      title: 'EDUCAÇÃO DE JOVENS E ADULTO',
      subtitle: 'Formação essencial, leitura, raciocínio lógico e preparação real para o mercado.',
      image: EDUCACAO_COURSES[0].heroImage,
    },
    {
      id: TECNOLOGIA_COURSES[1].id,
      categoryTag: 'TECNOLOGIA & INOVAÇÃO',
      category: Category.Tecnologia,
      title: 'INDÚSTRIA 4.0 & AUTOMAÇÃO',
      subtitle: 'Robótica, sensores digitais e a transformação da manufatura moderna.',
      image: TECNOLOGIA_COURSES[1].heroImage,
    }
  ];

  // Category Icon Mapping
  const iconMap: Record<Category, React.ElementType> = {
    [Category.Educacao]: GraduationCap,
    [Category.Idiomas]: Globe,
    [Category.Sustentabilidade]: Leaf,
    [Category.Tecnologia]: Cpu,
    [Category.Alimentos]: Utensils,
    [Category.Gestao]: Briefcase
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
    touchStartX.current = null;
  };

  const CONTENT_PADDING = "px-4 sm:px-6 md:px-10 lg:px-14";

  // Section Row for each Category as shown in Screenshots 3, 4, 6
  const SectionRow = ({ 
    title, 
    category, 
    courses 
  }: { 
    title: string; 
    category: Category; 
    courses: Course[];
  }) => {
    if (courses.length === 0) return null;

    const catConfig = CATEGORIES_CONFIG.find(c => c.id === category);

    return (
      <section className="mb-10 group/section">
        <div className={`flex items-center justify-between mb-3.5 ${CONTENT_PADDING}`}>
          <div className="flex items-center gap-2.5">
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-sm"
              style={{ backgroundColor: catConfig?.color || '#3B82F6' }}
            />
            <h2 className="text-sm sm:text-base md:text-lg font-black text-white tracking-wide uppercase">
              {title}
            </h2>
          </div>
          <button 
            onClick={() => onCategoryClick(category)}
            className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer group/btn"
          >
            <span>Ver todos</span>
            <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 
          Course Row:
          - Desktop (lg:): Horizontal cards with wide aspect ratio 16:9
          - Mobile & Tablet (< lg): Vertical cards with portrait aspect ratio 3:4
          Scrollable horizontally on all devices with smooth momentum
        */}
        <div className="relative">
          <div className={`flex gap-3.5 sm:gap-4 md:gap-5 overflow-x-auto hide-scrollbar py-2 ${CONTENT_PADDING} scroll-smooth items-start`}>
            {courses.map(course => (
              <div 
                key={course.id} 
                className="w-36 sm:w-44 md:w-56 lg:w-72 xl:w-80 flex-shrink-0"
              >
                <CourseCard course={course} onClick={onCourseClick} />
              </div>
            ))}
            <div className="w-4 flex-shrink-0" />
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="pb-28 bg-[#060B18] min-h-screen font-sans relative text-white">
      
      {/* Mobile Top Header */}
      <div className="fixed top-0 left-0 w-full z-40 px-4 py-3 flex justify-start items-center md:hidden bg-[#060B18]/90 backdrop-blur-md border-b border-[#1B2F5C]/40">
        <Logo size="sm" className="h-8 w-auto" />
      </div>

      {/* Hero Banner Area */}
      <div 
        className="relative w-full h-[60vh] sm:h-[68vh] md:h-[75vh] overflow-hidden group mb-8 pt-12 md:pt-0"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => {
          const isInList = myListIds.includes(slide.id);

          return (
            <div
              key={`${slide.id}-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  className="w-full h-full object-cover select-none animate-ken-burns cursor-pointer"
                  alt={slide.title}
                  draggable={false}
                  onClick={() => onCourseClick(slide.id)}
                />
                {/* Gradient Scrims using Logo Navy Blue #060B18 */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#060B18] via-[#060B18]/85 to-transparent w-full md:w-3/4 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#060B18]/50 via-transparent to-transparent pointer-events-none" />
              </div>
              
              {/* Hero Copy */}
              <div className={`absolute bottom-10 md:top-0 md:bottom-0 left-0 w-full md:w-[65%] flex flex-col justify-end md:justify-center z-20 ${CONTENT_PADDING}`}>
                <div className="space-y-3.5 max-w-2xl">
                  
                  {/* Category Tag */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#60A5FA] bg-[#1E40AF]/40 border border-[#3B82F6]/50 px-2.5 py-1 rounded-md">
                      {slide.categoryTag}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  
                  <p className="text-xs sm:text-sm md:text-base text-gray-200 font-medium leading-relaxed drop-shadow-md max-w-xl">
                    {slide.subtitle}
                  </p>
                  
                  {/* Action Buttons as in Screenshot 5: ASSISTIR + MINHA LISTA */}
                  <div className="flex items-center gap-3 pt-3">
                    <button 
                      onClick={() => onCourseClick(slide.id)}
                      className="flex items-center gap-2.5 bg-white hover:bg-gray-100 text-[#060B18] px-6 sm:px-8 py-3 rounded-xl font-black transition-all uppercase tracking-wider text-xs md:text-sm hover:scale-[1.03] active:scale-95 shadow-xl cursor-pointer"
                    >
                      <Play size={18} className="fill-[#060B18]" />
                      <span>ASSISTIR</span>
                    </button>
                    <button 
                      onClick={() => onToggleMyList && onToggleMyList(slide.id)}
                      className="flex items-center gap-2 bg-[#0C162E]/80 hover:bg-[#0F1D3D] text-white border border-white/20 hover:border-white/40 px-5 sm:px-6 py-3 rounded-xl font-bold transition-all uppercase tracking-wider text-xs md:text-sm hover:scale-[1.03] active:scale-95 backdrop-blur-md cursor-pointer"
                    >
                      {isInList ? <Check size={18} className="text-[#10B981]" /> : <Plus size={18} />}
                      <span>{isInList ? 'NA MINHA LISTA' : 'MINHA LISTA'}</span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {/* Indicators */}
        <div className={`absolute bottom-4 right-0 z-20 flex gap-2 ${CONTENT_PADDING}`}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-[#F59E0B]' : 'w-2.5 bg-white/40'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* --- NAVEGAR POR CATEGORIAS (Screenshot 5 & Screenshot 7) --- */}
      <section className={`mb-12 ${CONTENT_PADDING}`}>
        <div className="mb-4">
          <h2 className="text-xs sm:text-sm font-black text-gray-300 uppercase tracking-widest flex items-center gap-2">
            <Sparkles size={16} className="text-[#F59E0B]" />
            NAVEGAR POR CATEGORIAS
          </h2>
        </div>

        {/* Grid of 6 Categories with their Exact Colors and Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES_CONFIG.map((cat) => {
            const Icon = iconMap[cat.id];
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryClick(cat.id)}
                className={`h-24 sm:h-28 md:h-32 rounded-xl sm:rounded-2xl ${cat.bgClass} ${cat.hoverClass} border ${cat.borderClass} flex flex-col items-center justify-center gap-2.5 p-3 hover:scale-[1.03] active:scale-95 transition-all cursor-pointer shadow-lg group relative overflow-hidden text-center`}
              >
                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />
                <div className="p-2 sm:p-2.5 rounded-xl bg-black/20 text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Icon size={22} className="sm:w-6 sm:h-6" />
                </div>
                <span className="text-[11px] sm:text-xs font-black text-white tracking-wider uppercase relative z-10">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* --- ALL COURSE CATEGORY SECTIONS (Screenshots 3, 4, 6) --- */}
      <div className="space-y-4">
        {/* 1. EDUCAÇÃO */}
        <SectionRow 
          title="EDUCAÇÃO" 
          category={Category.Educacao} 
          courses={EDUCACAO_COURSES} 
        />

        {/* 2. TECNOLOGIA & INCLUSÃO */}
        <SectionRow 
          title="TECNOLOGIA & INCLUSÃO" 
          category={Category.Tecnologia} 
          courses={TECNOLOGIA_COURSES} 
        />

        {/* 3. IDIOMAS & CULTURA */}
        <SectionRow 
          title="IDIOMAS & CULTURA" 
          category={Category.Idiomas} 
          courses={IDIOMAS_COURSES} 
        />

        {/* 4. MEIO AMBIENTE & SUSTENTABILIDADE */}
        <SectionRow 
          title="MEIO AMBIENTE & SUSTENTABILIDADE" 
          category={Category.Sustentabilidade} 
          courses={SUSTENTABILIDADE_COURSES} 
        />

        {/* 5. ALIMENTOS & PRODUÇÃO */}
        <SectionRow 
          title="ALIMENTOS & PRODUÇÃO" 
          category={Category.Alimentos} 
          courses={ALIMENTOS_COURSES} 
        />

        {/* 6. GESTÃO & EMPREENDEDORISMO */}
        <SectionRow 
          title="GESTÃO & EMPREENDEDORISMO" 
          category={Category.Gestao} 
          courses={GESTAO_COURSES} 
        />
      </div>

      <style>{`
        .animate-ken-burns {
          animation: kenBurns 22s infinite alternate;
        }
        @keyframes kenBurns {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
      `}</style>

    </div>
  );
};

export default HomeScreen;
