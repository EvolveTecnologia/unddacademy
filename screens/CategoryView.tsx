import React from 'react';
import { Category } from '../types';
import { COURSES, CATEGORIES_CONFIG } from '../constants';
import CourseCard from '../components/CourseCard';
import { ChevronLeft } from 'lucide-react';

interface CategoryViewProps {
  category: Category;
  onBack: () => void;
  onCourseClick: (id: string) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ category, onBack, onCourseClick }) => {
  const catConfig = CATEGORIES_CONFIG.find(c => c.id === category);
  const filteredCourses = COURSES.filter(c => c.category === category);

  return (
    <div className="min-h-screen bg-[#060B18] text-white animate-in slide-in-from-right duration-300 pb-24">
      {/* Header */}
      <div className="fixed top-0 left-0 md:left-24 right-0 z-50 p-6 flex items-center bg-[#060B18]/95 backdrop-blur-md border-b border-[#1B2F5C]/60">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all group border border-white/20 cursor-pointer"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wider hidden md:block">Voltar</span>
        </button>
        <div className="flex items-center gap-3 ml-4 md:ml-6">
          <span 
            className="w-3.5 h-3.5 rounded-full shadow-md" 
            style={{ backgroundColor: catConfig?.color || '#3B82F6' }}
          />
          <h1 className="text-lg md:text-2xl font-black uppercase tracking-tight text-white drop-shadow-md">
            {catConfig?.sectionTitle || category}
          </h1>
        </div>
      </div>

      {/* Grid Container: Responsive Cards */}
      <div className="pt-28 px-4 md:px-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-[1600px] mx-auto">
        {filteredCourses.map(course => (
          <div key={course.id} className="flex justify-center w-full">
            <CourseCard course={course} onClick={onCourseClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryView;
