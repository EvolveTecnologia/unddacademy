import React, { useState, useRef, useMemo, useEffect } from 'react';
import { 
  Target, Award, Zap, TrendingUp, BookOpen, Clock, 
  Brain, ChevronRight, Lock, Check, Edit2, X, Star, Calendar as CalendarIcon,
  Filter, BarChart2, Users, MessageSquare, Send, Bot, Sparkles, Crown, Medal, Flame,
  FileText, Video, Download, CheckCircle, ChevronDown,
  GraduationCap, Headphones, Search, ShoppingBag, CheckCircle2, Volume2, BookMarked
} from 'lucide-react';
import { COURSES, CATEGORIES_CONFIG } from '../constants';
import { DIGITAL_BOOKS } from '../booksData';
import { DigitalBook } from '../types';
import { BookCard } from '../components/BookCard';
import { BookFlipReaderModal } from '../components/BookFlipReaderModal';
import { AudiobookPlayerModal } from '../components/AudiobookPlayerModal';

interface LearningNode {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'project';
  status: 'locked' | 'current' | 'completed';
  xp: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  level: number;
  maxLevel: number;
  progress: number;
  total: number;
  icon: React.ElementType;
  color: string;
}

interface Message {
  id: number;
  senderId: string;
  senderName: string;
  senderRole: 'Docente' | 'Coordenação' | 'Aluno' | 'Colega' | 'Sistema' | 'Eu';
  avatar?: string;
  text: string;
  time: string;
  read: boolean;
  isMe: boolean;
}

const ACHIEVEMENTS_DATA: Achievement[] = [
  { id: '1', title: 'Disciplina', description: 'Mantenha frequência ativa por 30 dias consecutivos', level: 2, maxLevel: 3, progress: 18, total: 30, icon: Flame, color: 'text-[#F59E0B]' },
  { id: '2', title: 'Excelência', description: 'Alcance nota máxima em 5 avaliações práticas', level: 3, maxLevel: 3, progress: 5, total: 5, icon: Brain, color: 'text-[#10B981]' },
  { id: '3', title: 'Protagonismo', description: 'Fique entre os primeiros colocados no ranking mensal', level: 1, maxLevel: 5, progress: 2, total: 3, icon: Crown, color: 'text-amber-400' },
  { id: '4', title: 'Multiárea', description: 'Conclua módulos em mais de 2 categorias diferentes', level: 1, maxLevel: 2, progress: 2, total: 2, icon: BookOpen, color: 'text-blue-400' },
];

const MyTrailScreen: React.FC = () => {
  // Duas Abas Principais do Ambiente Acadêmico: Cursos vs Livros
  const [academicMode, setAcademicMode] = useState<'cursos' | 'livros'>('cursos');
  
  // Estados para a Área de Livros Digitais & Audiobooks
  const [bookFilter, setBookFilter] = useState<'todos' | 'gratuitos' | 'comprados' | 'audiobooks' | 'lendo'>('todos');
  const [bookSearch, setBookSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('todas');
  const [booksList, setBooksList] = useState<DigitalBook[]>(DIGITAL_BOOKS);
  const [selectedBookForReader, setSelectedBookForReader] = useState<DigitalBook | null>(null);
  const [selectedBookForAudio, setSelectedBookForAudio] = useState<DigitalBook | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Categorias disponíveis de livros
  const bookCategories = useMemo(() => {
    const cats = Array.from(new Set(booksList.map(b => b.category)));
    return ['todas', ...cats];
  }, [booksList]);

  // Livros filtrados pela busca, abas de status (gratuitos/comprados/audiobooks/lendo) e categoria
  const filteredBooks = useMemo(() => {
    return booksList.filter(book => {
      if (bookSearch.trim()) {
        const query = bookSearch.toLowerCase();
        const matchesTitle = book.title.toLowerCase().includes(query);
        const matchesAuthor = book.author.toLowerCase().includes(query);
        const matchesCat = book.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAuthor && !matchesCat) return false;
      }
      if (selectedCategoryFilter !== 'todas' && book.category !== selectedCategoryFilter) {
        return false;
      }
      if (bookFilter === 'gratuitos') return book.isFree;
      if (bookFilter === 'comprados') return book.isPurchased && !book.isFree;
      if (bookFilter === 'audiobooks') return book.type === 'audiobook' || book.type === 'both';
      if (bookFilter === 'lendo') return (book.readingProgress || 0) > 0;
      return true;
    });
  }, [booksList, bookSearch, selectedCategoryFilter, bookFilter]);

  const bookStats = useMemo(() => {
    const freeCount = booksList.filter(b => b.isFree).length;
    const purchasedCount = booksList.filter(b => b.isPurchased && !b.isFree).length;
    const audioCount = booksList.filter(b => b.type === 'audiobook' || b.type === 'both').length;
    const readingCount = booksList.filter(b => (b.readingProgress || 0) > 0).length;
    return { freeCount, purchasedCount, audioCount, readingCount, total: booksList.length };
  }, [booksList]);

  const handleOpenReader = (book: DigitalBook) => {
    setSelectedBookForReader(book);
  };

  const handleOpenAudio = (book: DigitalBook) => {
    setSelectedBookForAudio(book);
  };

  const handlePurchaseBook = (book: DigitalBook) => {
    setBooksList(prev => prev.map(b => b.id === book.id ? { ...b, isPurchased: true } : b));
    setToastMessage(`"${book.title}" adicionado com sucesso aos seus livros adquiridos!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Estados dos Cursos
  const [activeTab, setActiveTab] = useState<'trilha' | 'avaliacoes' | 'calendario' | 'comunicacao' | 'biblioteca'>('trilha');
  const [selectedCourseId, setSelectedCourseId] = useState(COURSES[0].id);
  const [selectedProfileType, setSelectedProfileType] = useState('Profissionais');
  
  // Safe dropdown hover and pin state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<number | null>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const selectedCourse = useMemo(() => {
    return COURSES.find(c => c.id === selectedCourseId) || COURSES[0];
  }, [selectedCourseId]);

  const categoryConfig = useMemo(() => {
    return CATEGORIES_CONFIG.find(c => c.id === selectedCourse.category) || CATEGORIES_CONFIG[0];
  }, [selectedCourse.category]);

  // Handle safe hover: opens immediately and does NOT close abruptly when traversing down
  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      window.clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setIsDropdownOpen(false);
    }, 450); // Generous delay prevents snap closure
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsDropdownOpen(false);
    if (dropdownTimeoutRef.current) {
      window.clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (dropdownTimeoutRef.current) window.clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  // Dynamic Learning Path generated from selectedCourse
  const dynamicLearningPath: LearningNode[] = useMemo(() => {
    if (selectedCourse.modules && selectedCourse.modules.length > 0) {
      const nodes: LearningNode[] = [];
      let totalLessons = 0;
      selectedCourse.modules.forEach((mod) => {
        mod.lessons.forEach((l) => {
          totalLessons++;
          const isDone = totalLessons <= 2;
          const isCurrent = totalLessons === 3;
          nodes.push({
            id: l.id,
            title: `${mod.title}: ${l.title}`,
            type: totalLessons % 3 === 0 ? 'quiz' : totalLessons % 5 === 0 ? 'project' : 'video',
            status: isDone ? 'completed' : isCurrent ? 'current' : 'locked',
            xp: isDone ? 500 : isCurrent ? 750 : 400
          });
        });
      });
      return nodes;
    }

    return [
      { id: '1', title: `Fundamentos Práticos: ${selectedCourse.title}`, type: 'video', status: 'completed', xp: 500 },
      { id: '2', title: `Exercícios de Fixação & Lógica Aplicada (${selectedCourse.category})`, type: 'quiz', status: 'completed', xp: 350 },
      { id: '3', title: `Técnicas Avançadas e Ferramentas de Produção`, type: 'video', status: 'completed', xp: 600 },
      { id: '4', title: `Projeto Real para o Mercado: ${selectedCourse.title}`, type: 'project', status: 'current', xp: 1000 },
      { id: '5', title: `Gestão de Eficiência, Mérito e Resultados`, type: 'video', status: 'locked', xp: 500 },
      { id: '6', title: `Avaliação Final e Certificação Oficial UN2D`, type: 'quiz', status: 'locked', xp: 850 },
    ];
  }, [selectedCourse]);

  // Dynamic Assessments based on selectedCourse
  const dynamicAssessments = useMemo(() => [
    {
      id: 1,
      title: `Avaliação Teórica: ${selectedCourse.title}`,
      type: 'Exame de Certificação',
      status: 'pending',
      dueDate: '25 Nov 2026',
      grade: null
    },
    {
      id: 2,
      title: `Estudo de Caso Prático: Aplicação no Setor de ${selectedCourse.category}`,
      type: 'Projeto Aplicado',
      status: 'graded',
      dueDate: '15 Out 2026',
      grade: 9.8
    },
    {
      id: 3,
      title: `Simulado de Normas Técnicas e Produtividade`,
      type: 'Quiz Avaliativo',
      status: 'graded',
      dueDate: '02 Out 2026',
      grade: 9.5
    },
  ], [selectedCourse]);

  // Dynamic Calendar Events based on selectedCourse
  const dynamicCalendarEvents = useMemo(() => [
    {
      id: 1,
      title: `Live Interativa: Melhores Práticas em ${selectedCourse.title}`,
      date: '20 Nov 19:30',
      type: 'live',
      link: '#'
    },
    {
      id: 2,
      title: `Submissão do Projeto Prático: ${selectedCourse.title}`,
      date: '28 Nov 23:59',
      type: 'deadline',
      link: '#'
    },
    {
      id: 3,
      title: `Mentoria com Docentes da Área de ${selectedCourse.category}`,
      date: '05 Dez 15:00',
      type: 'live',
      link: '#'
    },
  ], [selectedCourse]);

  // Dynamic Messages based on selectedCourse
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageText, setNewMessageText] = useState('');

  useEffect(() => {
    setMessages([
      {
        id: 1,
        senderId: 'docente',
        senderName: `Prof. Docente (${selectedCourse.category})`,
        senderRole: 'Docente',
        avatar: '',
        text: `Olá! Seja bem-vindo ao módulo de ${selectedCourse.title}. Acompanharei sua evolução nas avaliações práticas e na entrega do seu projeto profissional. Bons estudos!`,
        time: '09:15',
        read: false,
        isMe: false
      },
      {
        id: 2,
        senderId: 'coord',
        senderName: 'Coordenação Acadêmica UN2D',
        senderRole: 'Coordenação',
        avatar: '',
        text: `Seu progresso em "${selectedCourse.title}" está registrado em ${selectedCourse.progress}%. Mantenha o ritmo para liberar seu certificado digital oficial com selo de autenticidade.`,
        time: 'Ontem',
        read: true,
        isMe: false
      }
    ]);
  }, [selectedCourse]);

  const handleSendMessage = () => {
    if (!newMessageText.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      senderId: 'me',
      senderName: 'Aluno UN2D',
      senderRole: 'Eu',
      avatar: '/perfil.jpg',
      text: newMessageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      isMe: true
    };
    setMessages(prev => [...prev, newMessage]);
    setNewMessageText('');
  };

  // Dynamic Technical Library based on selectedCourse
  const dynamicLibrary = useMemo(() => [
    {
      id: 1,
      title: `Apostila Oficial (PDF): ${selectedCourse.title} - Roteiro Didático Completo`,
      type: 'pdf',
      url: '#'
    },
    {
      id: 2,
      title: `Gravação da Masterclass de Inovação Técnica & Mercado (${selectedCourse.category})`,
      type: 'video',
      url: '#'
    },
    {
      id: 3,
      title: `Guia de Consulta Rápida: Normas Técnicas e Produtividade Profissional`,
      type: 'doc',
      url: '#'
    },
  ], [selectedCourse]);

  const tabs = [
    { id: 'trilha', label: 'Trilha de Aprendizagem', icon: Target },
    { id: 'avaliacoes', label: 'Avaliações & Notas', icon: FileText },
    { id: 'calendario', label: 'Calendário & Lives', icon: CalendarIcon },
    { id: 'comunicacao', label: 'Mensagens com Docentes', icon: MessageSquare, badge: 1 },
    { id: 'biblioteca', label: 'Biblioteca Técnica', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-[#060B18] text-white px-4 md:px-8 lg:px-14 pt-20 pb-32 animate-in fade-in duration-500 overflow-x-hidden">
      
      {/* --- HEADER ACADÊMICO --- */}
      <header className="mb-8 flex flex-col gap-6">
        
        {/* DUAS ABAS PRINCIPAIS: CURSOS vs LIVROS DIGITAIS */}
        <div className="flex flex-wrap items-center gap-3 p-1.5 bg-[#0C162E] border border-[#1B2F5C] rounded-2xl w-fit shadow-xl">
          <button
            onClick={() => setAcademicMode('cursos')}
            className={`flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
              academicMode === 'cursos'
                ? 'bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white shadow-lg shadow-[#1E40AF]/40 scale-[1.02]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <GraduationCap size={18} />
            <span>Cursos &amp; Aulas</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-black/30 text-white">
              {COURSES.length}
            </span>
          </button>

          <button
            onClick={() => setAcademicMode('livros')}
            className={`flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
              academicMode === 'livros'
                ? 'bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-black shadow-lg shadow-[#F59E0B]/40 scale-[1.02]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen size={18} />
            <span>Livros &amp; Audiobooks</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-black/20 text-current">
              {booksList.length}
            </span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-[#3B82F6]">
                Portal Acadêmico Oficial
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
              {academicMode === 'cursos' ? 'Ambiente Acadêmico UN2D' : 'Biblioteca Digital & Audiobooks'}
            </h1>
            <p className="text-xs md:text-sm text-gray-300 max-w-2xl mt-1 leading-relaxed">
              {academicMode === 'cursos' 
                ? 'Acompanhe sua evolução formativa, aulas práticas, entregas de projetos e interações pedagógicas com docentes comprometidos com a excelência.'
                : 'Acesse obras clássicas gratuitas inclusas na sua matrícula ou explore sua estante de livros adquiridos. Leia no Leitor Bookflip ou ouça com narração profissional.'}
            </p>
          </div>

          {/* Selecionador de Curso Ativo (Apenas visível na aba Cursos) */}
          {academicMode === 'cursos' && (
            <div 
              ref={dropdownContainerRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-3.5 flex items-center gap-3.5 cursor-pointer hover:border-[#3B82F6] transition-all min-w-[280px] sm:min-w-[340px] shadow-lg select-none"
              >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md"
                style={{ backgroundColor: categoryConfig.color || '#1E40AF' }}
              >
                {selectedCourse.title.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Curso em Andamento</p>
                <h3 className="text-white font-bold text-xs truncate max-w-[240px]">{selectedCourse.title}</h3>
              </div>
              <ChevronDown 
                className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-blue-400' : ''}`} 
                size={16} 
              />
            </div>
            
            {/* Dropdown Menu com Safe Hover Bridge (sem gaps mortos) */}
            {isDropdownOpen && (
              <div 
                className="absolute top-full right-0 w-full sm:w-[360px] pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto">
                  <div className="px-3.5 py-2.5 bg-[#060B18] border-b border-white/5 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <span>Selecione para alternar o curso</span>
                    <span className="text-blue-400">{COURSES.length} cursos</span>
                  </div>

                  {COURSES.map(course => {
                    const isSelected = selectedCourseId === course.id;
                    const catCfg = CATEGORIES_CONFIG.find(c => c.id === course.category);
                    return (
                      <div 
                        key={course.id}
                        onClick={() => handleSelectCourse(course.id)}
                        className={`p-3.5 flex items-center gap-3 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/5 last:border-b-0 ${
                          isSelected ? 'bg-[#1E40AF]/20 text-[#3B82F6]' : 'text-gray-200'
                        }`}
                      >
                        <span 
                          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: catCfg?.color || '#3B82F6' }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold truncate text-white">{course.title}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-400 font-medium">{course.category}</span>
                            <span className="text-[10px] text-gray-500">•</span>
                            <span className="text-[10px] text-emerald-400 font-semibold">{course.progress}% concluído</span>
                          </div>
                        </div>
                        {isSelected && <Check size={16} className="text-[#10B981] shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          )}
        </div>

        {/* Navigation Tabs (Apenas visível na aba Cursos) */}
        {academicMode === 'cursos' && (
          <div className="flex overflow-x-auto hide-scrollbar gap-2 border-b border-[#1B2F5C] pb-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-t-xl border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'border-[#F59E0B] text-white bg-[#0C162E] font-bold shadow-sm' 
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-[#F59E0B]' : ''} />
                  <span className="text-xs tracking-wide">{tab.label}</span>
                  {tab.badge && (
                    <span className="bg-[#1E40AF] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{tab.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* --- CONTEÚDO CONDICIONAL ACADÊMICO: CURSOS OU LIVROS --- */}
      {academicMode === 'cursos' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CONTEÚDO PRINCIPAL (8 Colunas) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Aba 1: Trilha de Aprendizagem */}
          {activeTab === 'trilha' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Segmentação de Perfil */}
              <div className="p-5 bg-[#0C162E] rounded-2xl border border-[#1B2F5C] shadow-lg space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                    <span className="text-xs font-black uppercase tracking-wider text-white">Perfil e Trilha Personalizada</span>
                  </div>
                  <span className="text-[10px] bg-[#1E40AF]/30 text-[#60A5FA] px-2.5 py-0.5 rounded-full font-bold border border-[#3B82F6]/40">
                    Foco: Qualificação Técnica e Mercado Real
                  </span>
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
                  {[
                    'Profissionais',
                    'Jovens & Estudantes',
                    'Empreendedores',
                    'Gestores e Líderes',
                    'Educação Básica / EJA'
                  ].map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedProfileType(p)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        selectedProfileType === p
                          ? 'bg-[#1E40AF] text-white shadow-md'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status do Curso Selecionado (Dinâmico) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 bg-[#0C162E] rounded-2xl border border-[#1B2F5C] shadow-md">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase text-white shadow"
                      style={{ backgroundColor: categoryConfig.color || '#1E40AF' }}
                    >
                      {selectedCourse.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Trilha Ativa • {selectedProfileType}
                    </span>
                  </div>
                  <h2 className="text-white font-bold text-base sm:text-lg">{selectedCourse.title}</h2>
                  <p className="text-xs text-gray-400 line-clamp-1">{selectedCourse.description}</p>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0 shrink-0">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Progresso Geral</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#10B981] font-black text-2xl">{selectedCourse.progress}%</span>
                    <span className="text-[10px] text-gray-400 font-semibold">concluído</span>
                  </div>
                </div>
              </div>
              
              {/* Etapas / Nódulos da Trilha Dinâmicos */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-300">
                    Etapas do Curso ({dynamicLearningPath.length} módulos)
                  </h3>
                  <span className="text-[11px] font-bold text-blue-400">
                    {dynamicLearningPath.filter(n => n.status === 'completed').length} de {dynamicLearningPath.length} concluídas
                  </span>
                </div>

                {dynamicLearningPath.map((node, idx) => (
                  <div 
                    key={node.id} 
                    className={`p-4 sm:p-5 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                      node.status === 'completed'
                        ? 'bg-[#0C162E]/70 border-[#10B981]/40'
                        : node.status === 'current'
                          ? 'bg-[#0C162E] border-[#F59E0B] shadow-lg shadow-[#F59E0B]/10 ring-1 ring-[#F59E0B]/30'
                          : 'bg-[#060B18]/50 border-white/5 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                        node.status === 'completed'
                          ? 'bg-[#10B981]/20 text-[#10B981]'
                          : node.status === 'current'
                            ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                            : 'bg-white/5 text-gray-500'
                      }`}>
                        {node.status === 'completed' ? <Check size={20} /> : node.status === 'current' ? <Star size={20} className="fill-[#F59E0B]" /> : <Lock size={20} />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase text-gray-400">Etapa {idx + 1}</span>
                          <span className="text-[10px] font-bold text-[#3B82F6]">+{node.xp} XP</span>
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-white/5 text-gray-400">{node.type}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-0.5 truncate">{node.title}</h4>
                      </div>
                    </div>
                    <div className="shrink-0">
                      {node.status === 'completed' ? (
                        <span className="text-[11px] font-bold text-[#10B981] uppercase px-3 py-1 bg-[#10B981]/15 rounded-lg border border-[#10B981]/30">Concluído</span>
                      ) : node.status === 'current' ? (
                        <button className="px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md">
                          Continuar
                        </button>
                      ) : (
                        <span className="text-[11px] font-semibold text-gray-500">Bloqueado</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Aba 2: Avaliações Dinâmicas */}
          {activeTab === 'avaliacoes' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="p-4 bg-[#0C162E] border border-[#1B2F5C] rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Avaliações do Curso: {selectedCourse.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Média de aprovação mínima institucional: 7.0 / 10.0
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold">
                  Status: Regular
                </span>
              </div>

              {dynamicAssessments.map(item => (
                <div key={item.id} className="bg-[#0C162E] border border-[#1B2F5C] p-5 rounded-2xl flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1E40AF]/20 text-[#3B82F6] flex items-center justify-center shrink-0">
                      <FileText size={22} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm sm:text-base">{item.title}</h4>
                      <p className="text-gray-400 text-xs mt-0.5">{item.type} • Data Limite: {item.dueDate}</p>
                    </div>
                  </div>
                  <div>
                    {item.grade ? (
                      <div className="text-right">
                        <span className="text-lg sm:text-xl font-black text-[#10B981]">{item.grade}</span>
                        <span className="text-xs text-gray-400 block font-bold">de 10.0</span>
                      </div>
                    ) : (
                      <span className="text-xs font-bold px-3 py-1.5 rounded-lg uppercase bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30">
                        Pendente
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Aba 3: Calendário & Lives Dinâmico */}
          {activeTab === 'calendario' && (
            <div className="bg-[#0C162E] border border-[#1B2F5C] p-6 rounded-2xl space-y-4 shadow-xl animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                  <CalendarIcon size={18} className="text-[#F59E0B]" /> Lives Interativas e Prazos do Curso
                </h3>
                <span className="text-xs text-blue-400 font-semibold">{selectedCourse.category}</span>
              </div>
              <div className="space-y-3 pt-2">
                {dynamicCalendarEvents.map(event => (
                  <div key={event.id} className="flex items-center gap-4 p-4 bg-[#060B18] rounded-xl border border-[#1B2F5C]/60">
                    <div className="text-center min-w-[70px] bg-white/5 p-2 rounded-lg border border-white/5">
                      <span className="block text-xs font-bold text-[#3B82F6] uppercase">{event.date.split(' ')[0]} {event.date.split(' ')[1]}</span>
                      <span className="block text-sm font-black text-white">{event.date.split(' ')[2]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-sm truncate">{event.title}</h4>
                      <p className="text-gray-400 text-xs">{event.type === 'live' ? 'Sessão ao Vivo com Docentes' : 'Prazo Final de Submissão'}</p>
                    </div>
                    {event.type === 'live' && (
                      <button className="px-4 py-2 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md shrink-0">
                        Acessar Live
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aba 4: Mensagens com Docentes Dinâmicas */}
          {activeTab === 'comunicacao' && (
            <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl overflow-hidden h-[520px] flex flex-col shadow-xl animate-in fade-in duration-300">
              <div className="p-4 border-b border-[#1B2F5C] bg-[#060B18] flex justify-between items-center">
                <h3 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare size={16} className="text-[#3B82F6]" /> Canal com Docentes • {selectedCourse.title}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Docente Online
                </span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#060B18]/60">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex gap-3 p-3.5 rounded-2xl border ${msg.isMe ? 'bg-[#1E40AF]/20 border-[#3B82F6]/30 ml-8' : 'bg-[#0C162E] border-[#1B2F5C] mr-8'}`}>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs shrink-0">
                      {msg.senderName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-bold text-white">{msg.senderName} ({msg.senderRole})</span>
                        <span className="text-[10px] text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-gray-200 text-xs leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#060B18] border-t border-[#1B2F5C]">
                <div className="flex gap-2">
                  <input 
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={`Tire dúvidas pedagógicas sobre ${selectedCourse.title}...`}
                    className="flex-1 bg-[#0C162E] border border-[#1B2F5C] rounded-xl px-4 text-xs text-white outline-none focus:border-[#3B82F6]" 
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="p-3 bg-[#1E40AF] hover:bg-[#1D4ED8] rounded-xl text-white transition-colors cursor-pointer"
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Aba 5: Biblioteca Técnica Dinâmica */}
          {activeTab === 'biblioteca' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="p-4 bg-[#0C162E] border border-[#1B2F5C] rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Materiais Técnicos: {selectedCourse.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Apostilas e guias autorizados para download offline
                  </p>
                </div>
                <span className="text-xs text-blue-400 font-bold">
                  {dynamicLibrary.length} arquivos disponíveis
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dynamicLibrary.map(item => (
                  <div key={item.id} className="bg-[#0C162E] border border-[#1B2F5C] p-5 rounded-2xl hover:border-[#3B82F6] transition-all group cursor-pointer flex justify-between items-center shadow-md">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-[#1E40AF]/20 flex items-center justify-center text-[#3B82F6] shrink-0">
                        {item.type === 'pdf' ? <FileText size={20} /> : <Video size={20} />}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-white font-bold text-xs md:text-sm truncate">{item.title}</h4>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">{item.type} • UN2D Academy</p>
                      </div>
                    </div>
                    <Download size={18} className="text-gray-400 group-hover:text-white transition-colors shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* COLUNA LATERAL DE APOIO (4 Colunas) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card de Frequência e Horas Proporcionais ao Curso */}
          <div className="bg-[#0C162E] p-5 rounded-2xl border border-[#1B2F5C] shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock size={16} className="text-[#10B981]" /> Dedicação aos Estudos
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#060B18] p-3 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Horas Realizadas</span>
                <span className="text-xl font-black text-white mt-1 block">
                  {Math.max(12, Math.round((selectedCourse.progress / 100) * 40))}h
                </span>
              </div>
              <div className="bg-[#060B18] p-3 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Assiduidade</span>
                <span className="text-xl font-black text-[#10B981] mt-1 block">96%</span>
              </div>
            </div>
          </div>

          {/* Badges de Conquistas */}
          <div className="bg-[#0C162E] p-5 rounded-2xl border border-[#1B2F5C] shadow-xl space-y-3.5">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Medal size={16} className="text-amber-400" /> Distinções Acadêmicas
              </h3>
              <span className="text-[10px] text-gray-400 font-bold">4 / 4</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {ACHIEVEMENTS_DATA.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.id} className="p-3 bg-[#060B18] rounded-xl border border-white/5 flex flex-col items-center text-center gap-1.5">
                    <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center ${badge.color}`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-white truncate w-full">{badge.title}</span>
                    <span className="text-[9px] text-gray-400">{badge.progress}/{badge.total}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Banner de Missão Institucional UN2D */}
          <div className="bg-gradient-to-br from-[#1E40AF]/40 via-[#0C162E] to-[#10B981]/20 p-5 rounded-2xl border border-[#1B2F5C] space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#F59E0B]">
              Compromisso UN2D
            </span>
            <h4 className="text-xs font-bold text-white leading-relaxed">
              "Ensino técnico, ético e emancipador: foco no mérito, no protagonismo individual e nas reais exigências do mercado."
            </h4>
          </div>

        </div>

      </div>
      ) : (
        /* --- ABA LIVROS DIGITAIS & AUDIOBOOKS (BOOKFLIP 3D) --- */
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Banner Hero Hotmart-Style para Livros & Audiobooks */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0C162E] via-[#1E40AF]/30 to-[#0C162E] border border-[#1B2F5C] p-6 sm:p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E40AF]/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#F59E0B]/20 to-[#10B981]/20 border border-[#F59E0B]/30 text-[#F59E0B] text-[11px] font-black uppercase tracking-wider">
                <BookMarked size={13} />
                <span>Biblioteca Digital Interativa & Audiobooks</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                Leitura Emancipadora com Experiência <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#10B981]">Bookflip 3D</span>
              </h2>
              
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Explore nosso acervo completo de obras formativas, filosofia política, fundamentos de livre mercado, liderança e tecnologia. Leia folheando as páginas na tela com som de virada e marcadores, ou ouça as versões em audiobook narradas em alto padrão.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-gray-300">
                <div className="flex items-center gap-1.5 bg-[#060B18]/60 px-3 py-1.5 rounded-xl border border-white/10">
                  <BookOpen size={14} className="text-[#3B82F6]" />
                  <span>Modo Livro Folheável 3D</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#060B18]/60 px-3 py-1.5 rounded-xl border border-white/10">
                  <Headphones size={14} className="text-[#F59E0B]" />
                  <span>Audiobooks com Velocidade Variável</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#060B18]/60 px-3 py-1.5 rounded-xl border border-white/10">
                  <CheckCircle2 size={14} className="text-[#10B981]" />
                  <span>Progresso Salvo Automaticamente</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cards de Métricas do Acervo */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div className="p-4 bg-[#0C162E] rounded-2xl border border-[#1B2F5C] shadow-lg space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <BookOpen size={12} className="text-blue-400" /> Acervo Total
              </span>
              <div className="text-2xl font-black text-white">{bookStats.total}</div>
              <p className="text-[10px] text-gray-400">Títulos disponíveis</p>
            </div>

            <div className="p-4 bg-[#0C162E] rounded-2xl border border-emerald-500/30 shadow-lg space-y-1 bg-gradient-to-br from-[#10B981]/10 to-transparent">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 size={12} /> Inclusos / Gratuitos
              </span>
              <div className="text-2xl font-black text-emerald-400">{bookStats.freeCount}</div>
              <p className="text-[10px] text-gray-400">Acesso 100% liberado</p>
            </div>

            <div className="p-4 bg-[#0C162E] rounded-2xl border border-amber-500/30 shadow-lg space-y-1 bg-gradient-to-br from-[#F59E0B]/10 to-transparent">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <ShoppingBag size={12} /> Meus Adquiridos
              </span>
              <div className="text-2xl font-black text-[#F59E0B]">{bookStats.purchasedCount}</div>
              <p className="text-[10px] text-gray-400">Edições especiais</p>
            </div>

            <div className="p-4 bg-[#0C162E] rounded-2xl border border-[#1B2F5C] shadow-lg space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <Headphones size={12} className="text-[#F59E0B]" /> Audiobooks
              </span>
              <div className="text-2xl font-black text-white">{bookStats.audioCount}</div>
              <p className="text-[10px] text-gray-400">Com narração em áudio</p>
            </div>

            <div className="col-span-2 sm:col-span-1 p-4 bg-[#0C162E] rounded-2xl border border-[#1B2F5C] shadow-lg space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <BookMarked size={12} className="text-[#60A5FA]" /> Em Leitura
              </span>
              <div className="text-2xl font-black text-[#60A5FA]">{bookStats.readingCount}</div>
              <p className="text-[10px] text-gray-400">Obras em andamento</p>
            </div>
          </div>

          {/* Barra de Filtros, Categorias e Busca */}
          <div className="p-4 bg-[#0C162E] rounded-2xl border border-[#1B2F5C] space-y-3.5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Abas de Filtro de Acesso */}
              <div className="flex overflow-x-auto hide-scrollbar gap-1.5 p-1 bg-[#060B18] rounded-xl border border-white/5">
                {[
                  { id: 'todos', label: 'Todos os Títulos', count: bookStats.total },
                  { id: 'gratuitos', label: 'Inclusos & Gratuitos', count: bookStats.freeCount },
                  { id: 'comprados', label: 'Meus Livros Adquiridos', count: bookStats.purchasedCount },
                  { id: 'audiobooks', label: 'Audiobooks', count: bookStats.audioCount },
                  { id: 'lendo', label: 'Em Leitura', count: bookStats.readingCount },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setBookFilter(item.id as any)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      bookFilter === item.id
                        ? 'bg-[#1E40AF] text-white shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      bookFilter === item.id ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'
                    }`}>
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Busca e Categoria */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={bookSearch}
                    onChange={(e) => setBookSearch(e.target.value)}
                    placeholder="Buscar livro, autor..."
                    className="w-full pl-9 pr-8 py-2 bg-[#060B18] border border-[#1B2F5C] focus:border-blue-500 rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-colors"
                  />
                  {bookSearch && (
                    <button 
                      onClick={() => setBookSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="w-full sm:w-auto bg-[#060B18] border border-[#1B2F5C] text-gray-300 text-xs rounded-xl px-3 py-2 outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="todas">Todas as Categorias</option>
                  {bookCategories.filter(c => c !== 'todas').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Grid de Livros */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <div key={book.id} className="h-full flex flex-col">
                  <BookCard
                    book={book}
                    onRead={handleOpenReader}
                    onListen={handleOpenAudio}
                    layout="grid"
                  />
                  {/* Se for livro que ainda não foi comprado nem é gratuito, botão simulado para adquirir */}
                  {!book.isFree && !book.isPurchased && (
                    <div className="mt-2">
                      <button
                        onClick={() => handlePurchaseBook(book)}
                        className="w-full py-2 bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:brightness-110 active:scale-95 text-black font-black text-xs rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
                      >
                        <ShoppingBag size={13} />
                        <span>Adquirir por R$ {book.price?.toFixed(2) || '49,90'}</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#0C162E] rounded-3xl border border-[#1B2F5C] space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-400">
                <BookOpen size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Nenhum livro ou audiobook encontrado</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  Não encontramos títulos para o filtro selecionado. Tente alterar os termos de busca ou redefinir a categoria.
                </p>
              </div>
              <button
                onClick={() => { setBookFilter('todos'); setBookSearch(''); setSelectedCategoryFilter('todas'); }}
                className="px-5 py-2.5 bg-[#1E40AF] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          )}

          {/* Rodapé Informativo da Biblioteca UN2D Hotmart-Style */}
          <div className="p-6 bg-gradient-to-br from-[#0C162E] to-[#060B18] rounded-3xl border border-[#1B2F5C] grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <BookOpen size={16} className="text-[#3B82F6]" />
                <span>Leitor Bookflip 3D</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Experiência de livro físico com virada suave de página, modo noite/sépia, zoom, índice de capítulos e retomada automática do ponto onde parou.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Headphones size={16} className="text-[#F59E0B]" />
                <span>Audiobooks Narrados</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Aprenda enquanto se desloca ou realiza outras atividades. Controle de velocidade de 0.75x até 2x com avanço rápido de 15 segundos.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Award size={16} className="text-[#10B981]" />
                <span>Acesso Permanente</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Todas as obras gratuitas inclusas na sua matrícula UN2D Academy e livros especiais adquiridos ficam permanentemente vinculados ao seu perfil.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#10B981] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 font-bold text-xs">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal Leitor Bookflip 3D */}
      {selectedBookForReader && (
        <BookFlipReaderModal
          book={selectedBookForReader}
          onClose={() => setSelectedBookForReader(null)}
          onOpenAudiobook={(b) => {
            setSelectedBookForReader(null);
            setSelectedBookForAudio(b);
          }}
        />
      )}

      {/* Modal Audiobook Player */}
      {selectedBookForAudio && (
        <AudiobookPlayerModal
          book={selectedBookForAudio}
          onClose={() => setSelectedBookForAudio(null)}
          onOpenBookflip={(b) => {
            setSelectedBookForAudio(null);
            setSelectedBookForReader(b);
          }}
        />
      )}

    </div>
  );
};

export default MyTrailScreen;
