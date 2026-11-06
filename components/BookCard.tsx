import React from 'react';
import { BookOpen, Headphones, Star, CheckCircle, Sparkles, Clock, FileText } from 'lucide-react';
import { DigitalBook } from '../types';

interface BookCardProps {
  book: DigitalBook;
  onRead: (book: DigitalBook) => void;
  onListen?: (book: DigitalBook) => void;
  layout?: 'carousel' | 'grid';
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onRead,
  onListen,
  layout = 'carousel'
}) => {
  const isAudioOnly = book.type === 'audiobook';
  const hasAudio = book.type === 'audiobook' || book.type === 'both';
  const hasEbook = book.type === 'ebook' || book.type === 'both';

  return (
    <div className="group relative bg-[#0C162E] hover:bg-[#0F1D3D] border border-[#1B2F5C] hover:border-[#3B82F6] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#1E40AF]/20 flex flex-col h-full select-none">
      
      {/* Cover Image Area */}
      <div 
        onClick={() => isAudioOnly && onListen ? onListen(book) : onRead(book)}
        className="relative w-full aspect-[3/4] overflow-hidden bg-[#060B18] cursor-pointer"
      >
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C162E] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
          {/* Format Badge */}
          <div className="flex items-center gap-1">
            {book.type === 'both' ? (
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[#1E40AF]/90 text-white backdrop-blur-md border border-blue-400/30 flex items-center gap-1 shadow-md">
                <BookOpen size={10} />
                <Headphones size={10} />
                <span className="hidden sm:inline">E-Book + Áudio</span>
              </span>
            ) : book.type === 'audiobook' ? (
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[#F59E0B]/90 text-black backdrop-blur-md flex items-center gap-1 shadow-md">
                <Headphones size={10} />
                <span>Audiobook</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-blue-600/90 text-white backdrop-blur-md flex items-center gap-1 shadow-md">
                <BookOpen size={10} />
                <span>E-Book</span>
              </span>
            )}
          </div>

          {/* Pricing Status Badge */}
          {book.isFree ? (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[#10B981]/90 text-white backdrop-blur-md border border-emerald-400/30 shadow-md">
              Incluso
            </span>
          ) : book.isPurchased ? (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-amber-500/90 text-black backdrop-blur-md flex items-center gap-1 shadow-md">
              <CheckCircle size={10} />
              <span>Adquirido</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-md">
              R$ {book.price?.toFixed(2) || '49,90'}
            </span>
          )}
        </div>

        {/* Reading Progress Indicator if started */}
        {book.readingProgress !== undefined && book.readingProgress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/50">
            <div 
              className="h-full bg-gradient-to-r from-[#10B981] to-[#3B82F6]" 
              style={{ width: `${book.readingProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Book Metadata & Actions */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] text-gray-400">
            <span className="text-[#60A5FA] font-bold uppercase tracking-wider truncate max-w-[120px]">
              {book.category}
            </span>
            <div className="flex items-center gap-1 text-[#F59E0B] font-bold">
              <Star size={11} className="fill-current" />
              <span>{book.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 
            onClick={() => isAudioOnly && onListen ? onListen(book) : onRead(book)}
            className="text-xs sm:text-sm font-black text-white group-hover:text-[#60A5FA] line-clamp-2 transition-colors cursor-pointer leading-tight"
            title={book.title}
          >
            {book.title}
          </h3>

          <p className="text-[11px] text-gray-300 truncate font-medium">
            {book.author}
          </p>

          <div className="flex items-center gap-2.5 text-[10px] text-gray-400 pt-1">
            <span className="flex items-center gap-1">
              <FileText size={11} /> {book.totalPages} pág.
            </span>
            {book.audioDuration && (
              <span className="flex items-center gap-1 text-[#F59E0B]">
                <Clock size={11} /> {book.audioDuration}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-[#1B2F5C]/60 flex items-center gap-1.5">
          {hasEbook && (
            <button
              onClick={() => onRead(book)}
              className="flex-1 py-2 px-2 rounded-xl bg-[#1E40AF] hover:bg-[#2563EB] active:scale-95 text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
              title="Abrir no leitor Bookflip com virada de página"
            >
              <BookOpen size={13} />
              <span>Ler Bookflip</span>
            </button>
          )}

          {hasAudio && onListen && (
            <button
              onClick={() => onListen(book)}
              className={`py-2 px-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wider ${
                isAudioOnly 
                  ? 'flex-1 bg-[#F59E0B] hover:bg-[#FBBF24] text-black border-transparent shadow-md' 
                  : 'bg-[#060B18] hover:bg-white/10 text-[#F59E0B] border-[#F59E0B]/40'
              }`}
              title="Ouvir Audiobook com narração"
            >
              <Headphones size={13} />
              <span className={hasEbook ? 'hidden sm:inline' : ''}>Ouvir</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default BookCard;
