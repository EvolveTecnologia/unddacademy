import React from 'react';
import { Course } from '../types';
import { Play } from 'lucide-react';
import { CATEGORIES_CONFIG } from '../constants';

interface CourseCardProps {
  course: Course;
  onClick: (id: string) => void;
  orientation?: 'auto' | 'horizontal' | 'vertical';
  className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onClick, 
  orientation = 'auto',
  className = '' 
}) => {
  const categoryConfig = CATEGORIES_CONFIG.find(c => c.id === course.category);
  const categoryColor = categoryConfig?.color || '#3B82F6';

  return (
    <div 
      className={`flex-shrink-0 w-full cursor-pointer group/card relative outline-none focus:outline-none z-0 hover:z-30 select-none ${className}`}
      onClick={() => onClick(course.id)}
      tabIndex={0}
      role="button"
      aria-label={`Abrir curso ${course.title}`}
    >
      {/* 
        Responsive Card Geometry:
        - Desktop (lg: and above): Horizontal 16:9 landscape aspect ratio
        - Mobile & Tablet (< lg): Vertical 3:4 portrait poster aspect ratio
        This directly fulfills: "para acesso em desktop os cards de cursos são na horizontal e para modo mobile e tablet os cards de cursos são na vertical"
      */}
      <div className={`relative overflow-hidden rounded-xl md:rounded-2xl bg-[#0C162E] border border-[#1B2F5C]/60 transition-all duration-300 ease-out transform group-hover/card:scale-[1.03] group-hover/card:border-[#3B82F6] shadow-lg group-hover/card:shadow-[0_8px_30px_rgba(30,64,175,0.35)] ${
        orientation === 'horizontal' 
          ? 'aspect-video' 
          : orientation === 'vertical'
            ? 'aspect-[3/4]'
            : 'aspect-[3/4] lg:aspect-video'
      }`}>
        
        {/* Background Thumbnail Image */}
        <img 
          src={course.heroImage || course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105 opacity-90 group-hover/card:opacity-100"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        
        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060B18]/95 via-[#060B18]/30 to-transparent opacity-80 group-hover/card:opacity-60 transition-opacity duration-300" />

        {/* 3D Gloss Play Button Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300">
          <div className="w-12 h-12 bg-[#1E40AF] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(30,64,175,0.6)] transform scale-75 group-hover/card:scale-100 transition-transform duration-300 ease-out border border-white/40">
            <Play size={20} className="text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Category Badge on Thumbnail (Mobile/Tablet vertical cards benefit from top badge) */}
        <div className="lg:hidden absolute top-2.5 left-2.5 z-10">
          <span 
            className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider text-white shadow-md backdrop-blur-sm"
            style={{ backgroundColor: `${categoryColor}E6` }}
          >
            {course.category}
          </span>
        </div>
        
        {/* Progress Bar */}
        {course.progress > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
            <div 
              className="h-full bg-gradient-to-r from-[#10B981] via-[#F59E0B] to-[#3B82F6]" 
              style={{ width: `${course.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Meta Data */}
      <div className="mt-2.5 px-1 transition-all duration-300">
        <h3 className="text-xs sm:text-sm font-bold leading-snug text-gray-100 group-hover/card:text-white transition-colors line-clamp-2">
          {course.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span 
            className="w-2 h-2 rounded-full shrink-0 shadow-sm"
            style={{ backgroundColor: categoryColor }}
          />
          <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400 group-hover/card:text-gray-300 transition-colors line-clamp-1">
            {course.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
