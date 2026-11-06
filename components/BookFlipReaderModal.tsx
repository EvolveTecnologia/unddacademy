import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, BookOpen, Headphones, 
  Sun, Moon, BookMarked, Maximize, Minimize, Type, 
  List, Check, Volume2, Sparkles
} from 'lucide-react';
import { DigitalBook, BookPage } from '../types';

interface BookFlipReaderModalProps {
  book: DigitalBook;
  onClose: () => void;
  onOpenAudiobook?: (book: DigitalBook) => void;
}

type ReadingTheme = 'paper' | 'sepia' | 'dark';

export const BookFlipReaderModal: React.FC<BookFlipReaderModalProps> = ({
  book,
  onClose,
  onOpenAudiobook
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(() => {
    const saved = localStorage.getItem(`book_progress_${book.id}`);
    if (saved) {
      const idx = parseInt(saved, 10);
      if (!isNaN(idx) && idx >= 0 && idx < book.pages.length) return idx;
    }
    return 0;
  });

  const [theme, setTheme] = useState<ReadingTheme>('dark');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    const saved = localStorage.getItem(`book_bookmarks_${book.id}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [isFlipping, setIsFlipping] = useState<'next' | 'prev' | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = book.pages.length;
  const isDualPage = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;

  // Pages to display: if dual, show left and right
  const leftPageIndex = isDualPage ? (currentPageIndex % 2 === 0 ? currentPageIndex : currentPageIndex - 1) : currentPageIndex;
  const rightPageIndex = isDualPage ? leftPageIndex + 1 : -1;

  const leftPage: BookPage | undefined = book.pages[leftPageIndex];
  const rightPage: BookPage | undefined = rightPageIndex >= 0 && rightPageIndex < totalPages ? book.pages[rightPageIndex] : undefined;

  // Save progress
  useEffect(() => {
    localStorage.setItem(`book_progress_${book.id}`, currentPageIndex.toString());
  }, [currentPageIndex, book.id]);

  const handleNextPage = () => {
    if (isFlipping) return;
    const step = isDualPage ? 2 : 1;
    if (currentPageIndex + step < totalPages) {
      setIsFlipping('next');
      setTimeout(() => {
        setCurrentPageIndex(prev => Math.min(prev + step, totalPages - 1));
        setIsFlipping(null);
      }, 300);
    }
  };

  const handlePrevPage = () => {
    if (isFlipping) return;
    const step = isDualPage ? 2 : 1;
    if (currentPageIndex > 0) {
      setIsFlipping('prev');
      setTimeout(() => {
        setCurrentPageIndex(prev => Math.max(0, prev - step));
        setIsFlipping(null);
      }, 300);
    }
  };

  const handleToggleBookmark = (pageIdx: number) => {
    setBookmarks(prev => {
      const exists = prev.includes(pageIdx);
      const updated = exists ? prev.filter(p => p !== pageIdx) : [...prev, pageIdx];
      localStorage.setItem(`book_bookmarks_${book.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevPage();
      } else if (e.key === 'Escape') {
        if (showToc) setShowToc(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex, showToc]);

  // Color schemes
  const themeStyles = {
    paper: {
      bg: 'bg-[#FDFBF7]',
      text: 'text-[#24211D]',
      pageBg: 'bg-[#FAF6EC]',
      border: 'border-[#E2D8C3]',
      headerBg: 'bg-[#F2ECE1]',
      spine: 'from-black/15 via-black/5 to-transparent',
      subtext: 'text-[#7A7061]'
    },
    sepia: {
      bg: 'bg-[#F4ECD8]',
      text: 'text-[#3E2E20]',
      pageBg: 'bg-[#EDE2C9]',
      border: 'border-[#D9C8A7]',
      headerBg: 'bg-[#E4D7BB]',
      spine: 'from-amber-950/20 via-amber-950/5 to-transparent',
      subtext: 'text-[#826E58]'
    },
    dark: {
      bg: 'bg-[#060B18]',
      text: 'text-slate-100',
      pageBg: 'bg-[#0B142B]',
      border: 'border-[#1B2F5C]',
      headerBg: 'bg-[#081023]',
      spine: 'from-black/40 via-black/10 to-transparent',
      subtext: 'text-slate-400'
    }
  }[theme];

  const fontSizeClass = {
    sm: 'text-xs md:text-sm leading-relaxed',
    base: 'text-sm md:text-base leading-relaxed md:leading-loose',
    lg: 'text-base md:text-lg leading-loose'
  }[fontSize];

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[150] flex flex-col ${themeStyles.bg} text-white select-none transition-colors duration-300 animate-in fade-in duration-200 overflow-hidden`}
    >
      {/* Top Controls Toolbar */}
      <header className={`${themeStyles.headerBg} border-b ${themeStyles.border} px-4 md:px-8 py-3 flex items-center justify-between gap-4 shrink-0 transition-colors`}>
        {/* Book Title & Author */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Fechar Livro"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1E40AF]/40 text-[#60A5FA] border border-[#1E40AF]">
                LEITOR BOOKFLIP
              </span>
              <h2 className="text-xs sm:text-sm font-black text-white truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                {book.title}
              </h2>
            </div>
            <p className="text-[11px] text-gray-400 truncate">
              {book.author} • {book.category}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Table of Contents Button */}
          <button
            onClick={() => setShowToc(prev => !prev)}
            className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              showToc ? 'bg-[#1E40AF] text-white' : 'hover:bg-white/10 text-gray-300'
            }`}
            title="Sumário / Capítulos"
          >
            <List size={16} />
            <span className="hidden sm:inline">Sumário</span>
          </button>

          {/* Audiobook Version Shortcut (if available) */}
          {(book.type === 'audiobook' || book.type === 'both') && onOpenAudiobook && (
            <button
              onClick={() => onOpenAudiobook(book)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#F59E0B]/20 hover:bg-[#F59E0B]/30 text-[#F59E0B] border border-[#F59E0B]/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Ouvir versão em Audiobook com narração"
            >
              <Headphones size={15} />
              <span className="hidden sm:inline">Ouvir Audiobook</span>
            </button>
          )}

          {/* Font Size Toggle */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5">
            <button
              onClick={() => setFontSize(prev => prev === 'lg' ? 'base' : 'sm')}
              className={`px-2 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${fontSize === 'sm' ? 'bg-[#1E40AF] text-white' : 'text-gray-400 hover:text-white'}`}
              title="Texto Menor"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-2 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${fontSize === 'base' ? 'bg-[#1E40AF] text-white' : 'text-gray-400 hover:text-white'}`}
              title="Texto Padrão"
            >
              A
            </button>
            <button
              onClick={() => setFontSize(prev => prev === 'sm' ? 'base' : 'lg')}
              className={`px-2 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${fontSize === 'lg' ? 'bg-[#1E40AF] text-white' : 'text-gray-400 hover:text-white'}`}
              title="Texto Maior"
            >
              A+
            </button>
          </div>

          {/* Theme Palette Toggle */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5">
            <button
              onClick={() => setTheme('paper')}
              className={`p-1.5 rounded-lg text-xs cursor-pointer transition-all ${theme === 'paper' ? 'bg-[#FDFBF7] text-black shadow' : 'text-gray-400 hover:text-white'}`}
              title="Tema Papel Claro"
            >
              <Sun size={14} />
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className={`p-1.5 rounded-lg text-xs cursor-pointer transition-all ${theme === 'sepia' ? 'bg-[#F4ECD8] text-amber-900 shadow' : 'text-gray-400 hover:text-white'}`}
              title="Tema Sépia (Conforto Visual)"
            >
              <span className="text-[11px] font-black">S</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-lg text-xs cursor-pointer transition-all ${theme === 'dark' ? 'bg-[#0B142B] text-blue-300 shadow' : 'text-gray-400 hover:text-white'}`}
              title="Tema Noite Escuro"
            >
              <Moon size={14} />
            </button>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer hidden md:flex"
            title={isFullscreen ? 'Sair de Tela Cheia' : 'Tela Cheia'}
          >
            {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Fechar"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Main Book Reader Workspace */}
      <div className="flex-1 relative flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden">
        
        {/* Previous Page Floating Click Target */}
        <button
          onClick={handlePrevPage}
          disabled={currentPageIndex === 0}
          className="absolute left-2 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#1E40AF] disabled:opacity-20 disabled:hover:bg-black/60 text-white flex items-center justify-center shadow-2xl transition-all cursor-pointer backdrop-blur-md hover:scale-110 active:scale-95"
          title="Página Anterior (Seta Esquerda)"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Page Floating Click Target */}
        <button
          onClick={handleNextPage}
          disabled={isDualPage ? leftPageIndex + 2 >= totalPages : currentPageIndex >= totalPages - 1}
          className="absolute right-2 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#1E40AF] disabled:opacity-20 disabled:hover:bg-black/60 text-white flex items-center justify-center shadow-2xl transition-all cursor-pointer backdrop-blur-md hover:scale-110 active:scale-95"
          title="Próxima Página (Seta Direita ou Espaço)"
        >
          <ChevronRight size={24} />
        </button>

        {/* 3D Book Container with Realistic Spine and Page Turn Animation */}
        <div 
          className={`w-full max-w-5xl h-full max-h-[75vh] md:max-h-[82vh] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border ${themeStyles.border} flex relative overflow-hidden transition-all duration-300 ${
            isFlipping === 'next' ? 'scale-[0.99] rotate-y-2' : isFlipping === 'prev' ? 'scale-[0.99] -rotate-y-2' : 'scale-100'
          }`}
          style={{ perspective: '1200px' }}
        >
          {/* --- LEFT PAGE --- */}
          <div className={`flex-1 ${themeStyles.pageBg} ${themeStyles.text} p-6 sm:p-10 md:p-12 flex flex-col justify-between relative transition-colors overflow-y-auto custom-scrollbar`}>
            {/* Top Chapter Header and Bookmark */}
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 text-xs shrink-0">
              <span className={`font-bold uppercase tracking-wider text-[11px] ${themeStyles.subtext}`}>
                {leftPage?.chapterTitle || book.title}
              </span>
              <button
                onClick={() => handleToggleBookmark(leftPageIndex)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  bookmarks.includes(leftPageIndex) ? 'text-[#F59E0B] fill-current' : 'text-gray-400 hover:text-white'
                }`}
                title="Marcar Página"
              >
                <BookMarked size={16} />
              </button>
            </div>

            {/* Page Content Text */}
            <div className="my-auto py-6">
              {leftPage ? (
                <div className={`space-y-4 font-serif text-justify select-text ${fontSizeClass}`}>
                  {leftPage.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="indent-6">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">Página em branco</div>
              )}
            </div>

            {/* Bottom Page Number Footer */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono shrink-0">
              <span className={themeStyles.subtext}>UN2D Academy • Livros Digitais</span>
              <span className="font-bold px-2 py-0.5 rounded bg-black/5 dark:bg-white/5">
                Pág. {leftPageIndex + 1}
              </span>
            </div>

            {/* Book Spine Shadow on Right Edge of Left Page */}
            {isDualPage && (
              <div className={`absolute top-0 right-0 w-8 h-full bg-gradient-to-l ${themeStyles.spine} pointer-events-none`} />
            )}
          </div>

          {/* Central Book Spine (Divider) */}
          {isDualPage && (
            <div className="w-[3px] bg-gradient-to-r from-black/40 via-black/80 to-black/40 relative z-20 shrink-0">
              <div className="absolute inset-y-0 -left-1 -right-1 bg-black/10 pointer-events-none" />
            </div>
          )}

          {/* --- RIGHT PAGE (Dual Page Desktop View) --- */}
          {isDualPage && (
            <div className={`flex-1 ${themeStyles.pageBg} ${themeStyles.text} p-6 sm:p-10 md:p-12 flex flex-col justify-between relative transition-colors overflow-y-auto custom-scrollbar`}>
              {/* Book Spine Shadow on Left Edge of Right Page */}
              <div className={`absolute top-0 left-0 w-8 h-full bg-gradient-to-r ${themeStyles.spine} pointer-events-none`} />

              {/* Top Chapter Header and Bookmark */}
              <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 text-xs shrink-0">
                <span className={`font-bold uppercase tracking-wider text-[11px] ${themeStyles.subtext}`}>
                  {rightPage?.chapterTitle || book.title}
                </span>
                {rightPage && (
                  <button
                    onClick={() => handleToggleBookmark(rightPageIndex)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      bookmarks.includes(rightPageIndex) ? 'text-[#F59E0B] fill-current' : 'text-gray-400 hover:text-white'
                    }`}
                    title="Marcar Página"
                  >
                    <BookMarked size={16} />
                  </button>
                )}
              </div>

              {/* Page Content Text */}
              <div className="my-auto py-6">
                {rightPage ? (
                  <div className={`space-y-4 font-serif text-justify select-text ${fontSizeClass}`}>
                    {rightPage.content.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="indent-6">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-16 text-gray-400 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[#10B981]">
                      <Check size={32} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white uppercase">Fim da Prévia do Livro</h4>
                      <p className="text-xs text-gray-400 mt-1 max-w-xs">
                        Você concluiu todas as páginas disponíveis deste volume digital na UN2D Academy.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Page Number Footer */}
              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono shrink-0">
                <span className="font-bold px-2 py-0.5 rounded bg-black/5 dark:bg-white/5">
                  {rightPage ? `Pág. ${rightPageIndex + 1}` : 'Fim'}
                </span>
                <span className={themeStyles.subtext}>{book.publishedYear} • Edição Oficial</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Reading Progress Scrubber */}
      <footer className={`${themeStyles.headerBg} border-t ${themeStyles.border} px-4 md:px-8 py-2.5 flex items-center justify-between gap-4 shrink-0 transition-colors`}>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="font-mono font-bold text-white">
            {isDualPage ? `${leftPageIndex + 1}-${Math.min(leftPageIndex + 2, totalPages)}` : leftPageIndex + 1}
          </span>
          <span>de</span>
          <span className="font-mono font-bold text-white">{totalPages} páginas</span>
        </div>

        {/* Progress Slider */}
        <div className="flex-1 max-w-md mx-4">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={Math.max(totalPages - 1, 0)}
              value={currentPageIndex}
              onChange={(e) => setCurrentPageIndex(parseInt(e.target.value, 10))}
              className="w-full accent-[#1E40AF] cursor-pointer h-1.5 bg-black/20 dark:bg-white/20 rounded-lg"
            />
            <span className="text-[11px] font-mono font-bold text-[#3B82F6] min-w-[38px] text-right">
              {Math.round(((currentPageIndex + 1) / totalPages) * 100)}%
            </span>
          </div>
        </div>

        {/* Quick Chapter Next/Prev Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevPage}
            disabled={currentPageIndex === 0}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-xs font-bold transition-all cursor-pointer"
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={isDualPage ? leftPageIndex + 2 >= totalPages : currentPageIndex >= totalPages - 1}
            className="px-3 py-1.5 rounded-xl bg-[#1E40AF] hover:bg-[#2563EB] disabled:opacity-30 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
          >
            Próximo
          </button>
        </div>
      </footer>

      {/* Table of Contents / Sumário Drawer */}
      {showToc && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl text-white space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-[#1E40AF]/20 text-[#60A5FA] rounded-xl border border-[#1E40AF]/30">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase tracking-tight">Sumário &amp; Marcadores</h3>
                  <p className="text-xs text-gray-400">Navegue pelas páginas e seções</p>
                </div>
              </div>
              <button
                onClick={() => setShowToc(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* List of Chapters & Pages */}
            <div className="max-h-[50vh] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {book.pages.map((p, idx) => {
                const isActive = idx === currentPageIndex || (isDualPage && idx === currentPageIndex + 1);
                const isMarked = bookmarks.includes(idx);

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentPageIndex(idx);
                      setShowToc(false);
                    }}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#1E40AF]/30 border-[#3B82F6] text-white shadow' 
                        : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="min-w-0 pr-3">
                      <p className="text-[10px] text-gray-400 uppercase font-mono font-bold">Página {p.pageNumber}</p>
                      <h4 className="text-xs font-bold truncate mt-0.5">
                        {p.chapterTitle || `Página ${p.pageNumber}`}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isMarked && (
                        <span className="text-[#F59E0B]" title="Marcada">
                          <BookMarked size={14} className="fill-current" />
                        </span>
                      )}
                      {isActive && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10B981]/20 text-emerald-400 border border-[#10B981]/30">
                          Atual
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowToc(false)}
              className="w-full py-3 bg-[#1E40AF] hover:bg-[#2563EB] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
            >
              Voltar à Leitura
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookFlipReaderModal;
