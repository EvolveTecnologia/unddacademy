import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Play, Pause, RotateCcw, RotateCw, Volume2, 
  VolumeX, Headphones, BookOpen, Clock, List, 
  Sparkles, ChevronRight, Check
} from 'lucide-react';
import { DigitalBook } from '../types';

interface AudiobookPlayerModalProps {
  book: DigitalBook;
  onClose: () => void;
  onOpenBookflip?: (book: DigitalBook) => void;
}

export const AudiobookPlayerModal: React.FC<AudiobookPlayerModalProps> = ({
  book,
  onClose,
  onOpenBookflip
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [currentTime, setCurrentTime] = useState(45);
  const [duration, setDuration] = useState(1800); // 30 min default
  const [speed, setSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showChapters, setShowChapters] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const chapters = book.audioChapters || [
    { id: 'c1', title: 'Capítulo 1: Introdução & Fundamentos', duration: '28 min' },
    { id: 'c2', title: 'Capítulo 2: Princípios e Aplicação Prática', duration: '35 min' },
    { id: 'c3', title: 'Capítulo 3: Conclusão e Diretrizes Éticas', duration: '30 min' }
  ];

  const currentChapter = chapters[currentChapterIdx] || chapters[0];

  // Simulated progress timer if audio source is placeholder
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            // Next chapter
            if (currentChapterIdx + 1 < chapters.length) {
              setCurrentChapterIdx(c => c + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return duration;
            }
          }
          return prev + 1;
        });
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, currentChapterIdx, chapters.length, speed]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime(prev => Math.max(0, Math.min(prev + seconds, duration)));
  };

  const cycleSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    setSpeed(speeds[nextIdx]);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-white space-y-6 relative overflow-hidden">
        
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#1E40AF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#F59E0B]/20 text-[#F59E0B] rounded-xl border border-[#F59E0B]/30">
              <Headphones size={18} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F59E0B]">
                AUDIOBOOK OFICIAL UN2D
              </span>
              <p className="text-xs text-gray-400">Narração em Alta Fidelidade</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenBookflip && (
              <button
                onClick={() => {
                  onClose();
                  onOpenBookflip(book);
                }}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Abrir versão em texto para ler"
              >
                <BookOpen size={14} />
                <span className="hidden sm:inline">Ler Livro</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Book Cover & Info */}
        <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
          <div className="w-28 h-40 sm:w-32 sm:h-44 rounded-2xl overflow-hidden shadow-2xl border border-[#1B2F5C] shrink-0 group relative bg-[#060B18]">
            <img 
              src={book.coverImage} 
              alt={book.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-2 right-2 flex justify-center">
              <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[9px] font-bold text-[#F59E0B]">
                {book.audioDuration || 'Audiobook'}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 text-center sm:text-left min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
              {book.category}
            </span>
            <h3 className="text-base sm:text-lg font-black text-white leading-tight">
              {book.title}
            </h3>
            <p className="text-xs font-semibold text-gray-300">{book.author}</p>
            {book.narrator && (
              <p className="text-[11px] text-gray-400 flex items-center justify-center sm:justify-start gap-1 pt-1">
                <Volume2 size={12} className="text-[#F59E0B]" />
                <span>Voz: {book.narrator}</span>
              </p>
            )}
          </div>
        </div>

        {/* Current Chapter Selector Bar */}
        <div className="bg-[#060B18] border border-[#1B2F5C] rounded-2xl p-3 flex items-center justify-between gap-3 relative z-10">
          <div className="min-w-0">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Capítulo Atual</span>
            <h4 className="text-xs font-bold text-white truncate">{currentChapter.title}</h4>
          </div>
          <button
            onClick={() => setShowChapters(prev => !prev)}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-blue-400 hover:text-white flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
          >
            <List size={14} />
            <span>Capítulos</span>
          </button>
        </div>

        {/* Chapter Drawer / Popover */}
        {showChapters && (
          <div className="bg-[#060B18] border border-[#1B2F5C] rounded-2xl p-3 space-y-1.5 max-h-40 overflow-y-auto custom-scrollbar relative z-20">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => {
                  setCurrentChapterIdx(idx);
                  setCurrentTime(0);
                  setShowChapters(false);
                }}
                className={`w-full p-2 rounded-xl text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  idx === currentChapterIdx 
                    ? 'bg-[#1E40AF]/30 text-white font-bold border border-[#3B82F6]/40' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="truncate pr-2">{ch.title}</span>
                <span className="font-mono text-[10px] text-gray-500 shrink-0">{ch.duration}</span>
              </button>
            ))}
          </div>
        )}

        {/* Progress Bar & Timestamps */}
        <div className="space-y-1.5 relative z-10">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => handleSeek(parseInt(e.target.value, 10))}
            className="w-full accent-[#F59E0B] cursor-pointer h-1.5 bg-white/10 rounded-lg"
          />
          <div className="flex justify-between text-[11px] font-mono text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>-{formatTime(duration - currentTime)}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-between pt-2 relative z-10">
          {/* Speed Selector */}
          <button
            onClick={cycleSpeed}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono font-bold text-gray-300 hover:text-white transition-all cursor-pointer min-w-[50px] text-center"
            title="Alterar Velocidade de Reprodução"
          >
            {speed}x
          </button>

          {/* Center Playback Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSkip(-15)}
              className="p-2.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-transform active:scale-90 cursor-pointer"
              title="Voltar 15 segundos"
            >
              <RotateCcw size={20} />
            </button>

            <button
              onClick={() => setIsPlaying(p => !p)}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#FBBF24] text-black font-black flex items-center justify-center shadow-lg shadow-[#F59E0B]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
              {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
            </button>

            <button
              onClick={() => handleSkip(15)}
              className="p-2.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-transform active:scale-90 cursor-pointer"
              title="Avançar 15 segundos"
            >
              <RotateCw size={20} />
            </button>
          </div>

          {/* Mute Toggle */}
          <button
            onClick={() => setIsMuted(m => !m)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Ativar Som' : 'Mudo'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AudiobookPlayerModal;
