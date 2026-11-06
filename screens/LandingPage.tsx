import React, { useState, useEffect, useRef } from 'react';
import { 
  Monitor, Smartphone, Tablet, Tv, ChevronDown, 
  GraduationCap, Leaf, Cpu, Utensils, Briefcase, Globe, 
  Award, Sparkles, ShieldCheck, Zap, Play, Check, ChevronRight,
  BookOpen, Headphones, BookMarked, Star, Volume2
} from 'lucide-react';
import { 
  COURSES, 
  CATEGORIES_CONFIG, 
  EDUCACAO_COURSES, 
  TECNOLOGIA_COURSES, 
  SUSTENTABILIDADE_COURSES, 
  GESTAO_COURSES 
} from '../constants';
import { DIGITAL_BOOKS } from '../booksData';
import { Category } from '../types';
import CourseCard from '../components/CourseCard';
import LandingFooter from '../components/LandingFooter';
import { Logo } from '../components/Logo';

// Sub-pages
import CategoriesPage from './landing/CategoriesPage';
import TechnologyPage from './landing/TechnologyPage';
import ImpactPage from './landing/ImpactPage';
import AboutPage from './landing/AboutPage';
import PartnersPage from './landing/PartnersPage';
import ContactPage from './landing/ContactPage';
import HelpCenterPage from './landing/HelpCenterPage';
import TermsPage from './landing/TermsPage';
import PrivacyPage from './landing/PrivacyPage';

interface LandingPageProps {
  onEnter: () => void;
  onSelectCourse?: (id: string) => void;
}

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, onSelectCourse }) => {
  const [currentView, setCurrentView] = useState<LandingView>('home');
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showCookies, setShowCookies] = useState(true);
  const sliderIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView]);

  // Slides com os novos cursos em destaque e missão UN2D
  const slides = [
    {
      id: 1,
      image: '/assets/aistudio/IMG-20261105-WA0103_62381079.jpg',
      categoryTag: 'DESTAQUE • FILOSOFIA & CULTURA',
      title: 'PÉROLAS DO PROFº OLAVO DE CARVALHO',
      subtitle: 'Grandes lições, diagnóstico cultural e a busca intransigente da verdade e da liberdade individual.',
    },
    {
      id: 2,
      image: '/assets/aistudio/IMG-20261105-WA0105_742318b3.jpg',
      categoryTag: 'DESTAQUE • FORMAÇÃO POLÍTICA',
      title: 'NEO MARXISMO',
      subtitle: 'Origens, estratégias hegemônicas, Escola de Frankfurt e a guerra cultural nas instituições modernas.',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop',
      categoryTag: 'TECNOLOGIA & INDÚSTRIA',
      title: 'INDÚSTRIA 4.0 & AUTOMAÇÃO',
      subtitle: 'Capacitação prática em sistemas inteligentes, robótica e processos digitais modernos.',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1920&auto=format&fit=crop',
      categoryTag: 'MEIO AMBIENTE & ESG',
      title: 'SUSTENTABILIDADE & PRÁTICAS ESG',
      subtitle: 'Entenda o impacto ambiental e aprenda práticas de ESG que as grandes empresas valorizam hoje.',
    }
  ];

  const iconMap: Record<Category, React.ElementType> = {
    [Category.Educacao]: GraduationCap,
    [Category.Idiomas]: Globe,
    [Category.Sustentabilidade]: Leaf,
    [Category.Tecnologia]: Cpu,
    [Category.Alimentos]: Utensils,
    [Category.Gestao]: Briefcase
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const startSlider = () => {
    if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
    sliderIntervalRef.current = window.setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6500);
  };

  useEffect(() => {
    if (currentView === 'home') {
      startSlider();
    }
    return () => {
      if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
    };
  }, [currentView]);

  if (currentView === 'categories') return <CategoriesPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'technology') return <TechnologyPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'impact') return <ImpactPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'about') return <AboutPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'partners') return <PartnersPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'contact') return <ContactPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'help') return <HelpCenterPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'terms') return <TermsPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'privacy') return <PrivacyPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;

  return (
    <div className="min-h-screen bg-[#060B18] font-sans text-white overflow-x-hidden animate-in fade-in duration-500">
      
      {/* --- NAVBAR FIXA (Screenshot 7: Logo à esquerda, botão ENTRAR à direita) --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 md:px-14 py-3.5 flex justify-between items-center ${
        scrolled 
          ? 'bg-[#060B18]/95 backdrop-blur-md shadow-2xl border-b border-[#1B2F5C]' 
          : 'bg-gradient-to-b from-[#060B18]/90 via-[#060B18]/50 to-transparent'
      }`}>
        <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo size="md" className="h-9 sm:h-11 md:h-12" />
        </div>

        <div className="flex items-center">
          <button 
            onClick={onEnter}
            className="px-5 sm:px-7 py-2.5 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            ENTRAR
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION (Screenshot 7: Fundo verde e texto em destaque) --- */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] w-full overflow-hidden flex items-center">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover animate-ken-burns select-none" 
            />
            {/* Scrim Gradiente em Azul Profundo (#060B18) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#060B18] via-[#060B18]/85 to-transparent w-full md:w-4/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-[#060B18]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#060B18]/70 via-transparent to-transparent" />
            
            <div className="absolute top-0 left-0 h-full flex flex-col justify-center px-5 sm:px-8 md:px-16 max-w-3xl pt-24 md:pt-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-[#60A5FA] font-black tracking-widest uppercase text-xs md:text-sm">
                  {slide.categoryTag}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight mb-4 tracking-tight drop-shadow-2xl">
                {slide.title}
              </h1>
              
              <p className="text-gray-200 text-sm md:text-base lg:text-lg mb-8 leading-relaxed max-w-2xl font-normal drop-shadow-md">
                {slide.subtitle}
              </p>
              
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
                <button 
                  onClick={onEnter}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 sm:px-10 py-4 rounded-xl font-black uppercase tracking-wider text-xs sm:text-sm transition-all transform hover:scale-[1.03] active:scale-95 shadow-xl shadow-blue-900/40 cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <Play size={18} className="fill-white" />
                  <span>COMEÇAR AGORA</span>
                </button>
                <button 
                  onClick={onEnter}
                  className="bg-[#0C162E]/80 hover:bg-[#0F1D3D] text-white border border-white/20 px-6 sm:px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all cursor-pointer backdrop-blur-md"
                >
                  CONHECER OS CURSOS
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Indicadores do Slide */}
        <div className="absolute bottom-16 md:bottom-24 right-6 md:right-16 z-20 flex gap-2.5">
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-[#F59E0B]' : 'w-3 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* --- NAVEGAR POR CATEGORIAS (Screenshot 5 & Screenshot 7) --- */}
      <section className="px-4 sm:px-8 md:px-14 -mt-10 md:-mt-14 relative z-30 mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES_CONFIG.map((cat) => {
            const Icon = iconMap[cat.id];
            return (
              <div 
                key={cat.id} 
                onClick={onEnter} 
                className={`h-24 sm:h-28 md:h-32 rounded-xl sm:rounded-2xl ${cat.bgClass} ${cat.hoverClass} border ${cat.borderClass} flex flex-col items-center justify-center gap-2.5 p-3 shadow-2xl hover:scale-[1.03] active:scale-95 transition-all cursor-pointer group relative overflow-hidden text-center`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />
                <div className="p-2 sm:p-2.5 rounded-xl bg-black/20 text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>
                <span className="font-black text-xs sm:text-sm tracking-wider uppercase text-center text-white relative z-10">
                  {cat.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- PILARES INSTITUCIONAIS UN2D --- */}
      <section className="py-16 px-6 md:px-14 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#F59E0B] block mb-2">
            Compromisso com o Ensino de Verdade
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            Por que a UN2D Academy é diferente?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
            Ambiente completo de capacitação profissional para jovens e adultos, desenhado para as reais exigências do mercado e fundamentado em valores perenes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-7 space-y-4 hover:border-[#3B82F6] transition-all shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#1E40AF]/20 border border-[#3B82F6]/40 flex items-center justify-center text-[#3B82F6]">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-black uppercase text-white">Ensino Livre de Viés</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Formação técnica sólida que liberta as novas gerações de narrativas ideológicas, focando em fatos, ciência real e conhecimento emancipador.
            </p>
          </div>

          <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-7 space-y-4 hover:border-[#F59E0B] transition-all shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B]">
              <Award size={24} />
            </div>
            <h3 className="text-lg font-black uppercase text-white">Mérito &amp; Protagonismo</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Valorização do esforço individual, da excelência técnica e do crescimento profissional sustentável para que o aluno vença por sua própria capacidade.
            </p>
          </div>

          <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-7 space-y-4 hover:border-[#10B981] transition-all shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-black uppercase text-white">Mercado de Trabalho Real</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Cursos práticos em tecnologia, gestão, sustentabilidade e educação profissionalizantes com certificado de conclusão emitido oficialmente.
            </p>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO MULTI-DISPOSITIVOS (Screenshot 2: "Assista quando e onde quiser") --- */}
      <section className="py-20 px-6 md:px-14 bg-gradient-to-b from-[#060B18] via-[#0C162E] to-[#060B18] border-y border-[#1B2F5C]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
          {/* Lado Esquerdo: Texto e Ícones */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white tracking-tight">
              Assista quando e onde quiser.
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              No celular, tablet, Smart TV ou notebook. A UN2D Academy acompanha o seu ritmo de aprendizado, com progresso sincronizado em todos os dispositivos.
            </p>

            {/* 4 Ícones conforme Screenshot 2 */}
            <div className="grid grid-cols-4 gap-4 pt-6 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col items-center gap-2.5 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-[#0C162E] border border-[#1B2F5C] flex items-center justify-center shadow-lg">
                  <Tv size={30} className="text-[#3B82F6]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-300">TV</span>
              </div>
              <div className="flex flex-col items-center gap-2.5 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-[#0C162E] border border-[#1B2F5C] flex items-center justify-center shadow-lg">
                  <Monitor size={30} className="text-[#3B82F6]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-300">COMPUTADOR</span>
              </div>
              <div className="flex flex-col items-center gap-2.5 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-[#0C162E] border border-[#1B2F5C] flex items-center justify-center shadow-lg">
                  <Tablet size={30} className="text-[#F59E0B]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-300">TABLET</span>
              </div>
              <div className="flex flex-col items-center gap-2.5 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-[#0C162E] border border-[#1B2F5C] flex items-center justify-center shadow-lg">
                  <Smartphone size={30} className="text-[#F59E0B]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-300">CELULAR</span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Mockup do Laptop */}
          <div className="lg:w-1/2 relative w-full flex justify-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#1B2F5C] max-w-xl w-full">
              <img 
                src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=900&auto=format&fit=crop" 
                alt="Acesse a UN2D Academy de qualquer dispositivo" 
                className="w-full h-auto object-cover rounded-3xl" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060B18]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO LIVROS DIGITAIS & AUDIOBOOKS (Semelhante a Hotmart) --- */}
      <section className="py-20 px-6 md:px-14 bg-[#081024] border-b border-[#1B2F5C] relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#1E40AF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-14 relative z-10">
          
          {/* Header da Seção */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-black uppercase tracking-widest">
                <Sparkles size={13} />
                <span>Novidade na UN2D Academy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                Livros Digitais &amp; Audiobooks
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Semelhante aos maiores ecossistemas educacionais como a Hotmart, a UN2D Academy conta agora com uma livraria virtual completa. Tenha acesso a obras consagradas de filosofia, economia, liderança e política para ler folheando página a página no inovador <strong>Leitor Bookflip</strong> ou ouvir com <strong>narração profissional</strong> em qualquer lugar.
              </p>
            </div>

            <button
              onClick={onEnter}
              className="px-7 py-3.5 bg-gradient-to-r from-[#1E40AF] to-[#2563EB] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-xl shadow-[#1E40AF]/30 hover:scale-105 active:scale-95 cursor-pointer self-start lg:self-auto shrink-0 flex items-center gap-2"
            >
              <BookOpen size={16} />
              <span>Acessar Biblioteca Digital</span>
            </button>
          </div>

          {/* 3 Pilares da Experiência Digital */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0C162E] border border-[#1B2F5C] hover:border-[#3B82F6] rounded-2xl p-6 space-y-3.5 transition-all shadow-xl group">
              <div className="w-12 h-12 rounded-xl bg-[#1E40AF]/20 border border-[#3B82F6]/40 flex items-center justify-center text-[#60A5FA] group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <h3 className="text-base font-black text-white uppercase">Leitor Bookflip Imersivo</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Experiência de leitura realista com virada de página 3D em duas páginas no computador e página única ergonômica no celular, modo sépia, noturno e marcadores.
              </p>
            </div>

            <div className="bg-[#0C162E] border border-[#1B2F5C] hover:border-[#F59E0B] rounded-2xl p-6 space-y-3.5 transition-all shadow-xl group">
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B] group-hover:scale-110 transition-transform">
                <Headphones size={24} />
              </div>
              <h3 className="text-base font-black text-white uppercase">Audiobooks com Narração</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Aprenda enquanto se desloca ou realiza outras tarefas diárias. Áudios em alta definição com velocidade ajustável de 0.75x a 2x e sincronização de capítulos.
              </p>
            </div>

            <div className="bg-[#0C162E] border border-[#1B2F5C] hover:border-[#10B981] rounded-2xl p-6 space-y-3.5 transition-all shadow-xl group">
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-base font-black text-white uppercase">Títulos Inclusos &amp; Acervo Premium</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Obras clássicas gratuitas incluídas na matrícula e lançamentos com condições exclusivas, sem viés ideológico e com rigor intelectual perene.
              </p>
            </div>
          </div>

          {/* Vitrine de Livros em Destaque */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-black uppercase text-white tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Obras em Destaque no Catálogo
              </h3>
              <span className="text-xs text-gray-400 font-bold">Acesse pelo aplicativo</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {DIGITAL_BOOKS.slice(0, 4).map(book => (
                <div 
                  key={book.id}
                  onClick={onEnter}
                  className="bg-[#0C162E] hover:bg-[#0F1D3D] border border-[#1B2F5C] hover:border-[#3B82F6] rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col group"
                >
                  <div className="relative aspect-[3/4] bg-[#060B18] overflow-hidden">
                    <img 
                      src={book.coverImage} 
                      alt={book.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C162E] via-transparent to-black/30 pointer-events-none" />
                    
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-lg text-[9px] font-black uppercase bg-[#1E40AF]/90 text-white backdrop-blur-md">
                        {book.type === 'both' ? 'E-Book + Áudio' : book.type === 'audiobook' ? 'Audiobook' : 'E-Book'}
                      </span>
                      {book.isFree && (
                        <span className="px-2 py-0.5 rounded-lg text-[9px] font-black uppercase bg-[#10B981]/90 text-white backdrop-blur-md">
                          Incluso
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#60A5FA]">
                        {book.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 mt-0.5 group-hover:text-blue-300 transition-colors">
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 truncate mt-1">
                        {book.author}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#1B2F5C]/60 flex items-center justify-between text-[10px] text-gray-400">
                      <span>{book.totalPages} págs</span>
                      {book.audioDuration && (
                        <span className="text-[#F59E0B] font-bold">{book.audioDuration}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- PRÉVIA DOS CURSOS EM DESTAQUE --- */}
      <section className="py-20 px-6 md:px-14 max-w-7xl mx-auto space-y-16">
        {/* Destaques em Tecnologia (Screenshot 6) */}
        <div>
          <div className="flex items-end justify-between mb-6 border-b border-[#1B2F5C] pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#581C87]" />
                Destaques em Tecnologia
              </h2>
              <p className="text-xs text-gray-400 mt-1">Formação prática para as exigências da indústria e do mercado corporativo</p>
            </div>
            <button onClick={onEnter} className="text-xs font-bold text-[#3B82F6] hover:text-white uppercase tracking-wider cursor-pointer">
              Ver todos →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {TECNOLOGIA_COURSES.slice(0, 4).map(course => (
              <div 
                key={course.id} 
                onClick={() => onSelectCourse ? onSelectCourse(course.id) : onEnter()} 
                className="cursor-pointer transform hover:scale-[1.02] transition-all"
              >
                <CourseCard course={course} onClick={(id) => onSelectCourse ? onSelectCourse(id) : onEnter()} />
              </div>
            ))}
          </div>
        </div>

        {/* Educação Básica e EJA (Screenshot 6) */}
        <div>
          <div className="flex items-end justify-between mb-6 border-b border-[#1B2F5C] pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF]" />
                Educação Básica e EJA
              </h2>
              <p className="text-xs text-gray-400 mt-1">Reforço essencial, alfabetização de adultos e redação dissertativa</p>
            </div>
            <button onClick={onEnter} className="text-xs font-bold text-[#60A5FA] hover:text-white uppercase tracking-wider cursor-pointer">
              Ver todos →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {EDUCACAO_COURSES.slice(0, 4).map(course => (
              <div 
                key={course.id} 
                onClick={() => onSelectCourse ? onSelectCourse(course.id) : onEnter()} 
                className="cursor-pointer transform hover:scale-[1.02] transition-all"
              >
                <CourseCard course={course} onClick={(id) => onSelectCourse ? onSelectCourse(id) : onEnter()} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION (Screenshot 1) --- */}
      <section className="py-20 px-6 md:px-14 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center mb-12 uppercase tracking-tight text-white">
          Perguntas Frequentes
        </h2>
        <div className="space-y-4">
          {[
            { 
              q: 'O que é a UN2D Academy?', 
              a: 'A UN2D Academy é a plataforma oficial de ensino da União Nacional de Docentes de Direita. Um ambiente virtual completo de capacitação profissional para jovens e adultos, com foco no ensino livre de viés ideológico, no mérito e nas reais exigências do mercado de trabalho.' 
            },
            { 
              q: 'Os cursos possuem certificado reconhecido?', 
              a: 'Sim! Todos os cursos concluídos com aproveitamento emitem certificados digitais oficiais emitidos pela UN2D Academy, com autenticação para comprovação de horas complementares e qualificação profissional.' 
            },
            { 
              q: 'Posso assistir às aulas offline?', 
              a: 'Sim. Pelo aplicativo mobile ou tablet, você pode baixar as videoaulas e apostilas em PDF para estudar sem consumir sua franquia de dados ou em locais sem internet.' 
            },
            { 
              q: 'Como funciona o acesso à plataforma?', 
              a: 'O acesso é 100% online e multiplataforma. Você pode acessar pelo computador, tablet, celular ou Smart TV com sincronização automática do seu progresso em todas as telas.' 
            }
          ].map((item, idx) => (
            <div key={idx} className="border-b border-[#1B2F5C] pb-4">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-5 flex justify-between items-center text-left hover:text-[#60A5FA] transition-colors cursor-pointer"
              >
                <span className="text-sm sm:text-base md:text-lg font-bold">{item.q}</span>
                <ChevronDown className={`text-[#F59E0B] transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER OFICIAL (Screenshot 1) --- */}
      <LandingFooter onViewChange={setCurrentView} />

      {/* --- BANNER DE COOKIES (Screenshot 7) --- */}
      {showCookies && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#0C162E]/95 backdrop-blur-md border-t border-[#1B2F5C] p-4 sm:p-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-gray-300 leading-relaxed text-center md:text-left">
              Nós usamos cookies e tecnologias semelhantes para melhorar a sua experiência, personalizar conteúdo e recomendar cursos baseados no seu interesse. Ao continuar navegando, você concorda com a nossa{' '}
              <button onClick={() => setCurrentView('privacy')} className="text-[#3B82F6] hover:underline font-bold inline">
                Política de Privacidade
              </button>.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={() => setShowCookies(false)}
                className="px-6 py-2 bg-white text-[#060B18] font-bold rounded-xl uppercase tracking-wider text-xs hover:bg-gray-200 transition-colors cursor-pointer shadow-md"
              >
                ACEITAR
              </button>
              <button 
                onClick={() => setShowCookies(false)}
                className="px-5 py-2 bg-transparent text-gray-300 border border-white/20 font-bold rounded-xl uppercase tracking-wider text-xs hover:bg-white/10 transition-colors cursor-pointer"
              >
                REJEITAR
              </button>
            </div>
          </div>
        </div>
      )}

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

export default LandingPage;
