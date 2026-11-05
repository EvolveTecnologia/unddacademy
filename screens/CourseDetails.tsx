import React, { useState, useEffect } from 'react';
import { Course, Lesson, Material } from '../types';
import { Play, Star, ChevronLeft, CheckCircle, FileText, AlertCircle, RotateCcw, Check, ChevronDown, ChevronUp, BookOpen, User, Clock, Award, ShieldCheck, ShoppingCart } from 'lucide-react';
import CheckoutModal from '../components/CheckoutModal';

interface CourseDetailsProps {
  course: Course;
  downloadedIds: string[];
  myListIds?: string[];
  onBack: () => void;
  onLessonClick: (lesson: Lesson) => void;
  onMaterialClick?: (material: Material) => void;
  onRemoveDownload?: (id: string) => void;
  onToggleMyList?: (id: string) => void;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ 
  course, 
  downloadedIds, 
  myListIds = [], 
  onBack, 
  onLessonClick, 
  onMaterialClick, 
  onRemoveDownload, 
  onToggleMyList 
}) => {
  const [activeTab, setActiveTab] = useState<'sumario' | 'lecons' | 'supports' | 'activites'>('lecons');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [lessonProgress, setLessonProgress] = useState<Record<string, number>>({});
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [enrolled, setEnrolled] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  const isInList = myListIds.includes(course.id);

  useEffect(() => {
    const progress: Record<string, number> = {};
    course.modules?.forEach(m => {
      m.lessons.forEach(l => {
        const saved = localStorage.getItem(`undd_progress_${l.id}`);
        if (saved) progress[l.id] = parseFloat(saved);
      });
    });
    setLessonProgress(progress);
  }, [course]);

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const toggleModule = (index: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const confirmDelete = () => {
    if (deleteConfirmId && onRemoveDownload) {
      onRemoveDownload(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (quizFinished) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
  };

  const handleNextQuestion = () => {
    if (course.quiz && currentQuestionIndex < course.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
  };

  const calculateScore = () => {
    if (!course.quiz) return 0;
    let score = 0;
    course.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) score++;
    });
    return score;
  };

  const handleEnrollOrStart = () => {
    if (!enrolled) {
      setShowCheckout(true);
    } else if (course.modules?.[0]?.lessons?.[0]) {
      onLessonClick(course.modules[0].lessons[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#060B18] text-white animate-in slide-in-from-right duration-300 relative overflow-x-hidden">
      
      {/* Header Buttons */}
      <div className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack} 
          className="p-2.5 bg-[#060B18]/80 backdrop-blur-md border border-[#1B2F5C] rounded-full text-white hover:bg-[#0C162E] transition-colors pointer-events-auto shadow-lg cursor-pointer"
          title="Voltar"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => onToggleMyList && onToggleMyList(course.id)}
          className="p-2.5 bg-[#060B18]/80 backdrop-blur-md border border-[#1B2F5C] rounded-full text-white hover:bg-[#0C162E] transition-colors pointer-events-auto shadow-lg cursor-pointer"
          title={isInList ? 'Remover da minha lista' : 'Adicionar à minha lista'}
        >
          <Star size={24} className={isInList ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-white'} />
        </button>
      </div>

      {/* Hero Banner Area */}
      <div className="relative w-full h-[48vh] md:h-[60vh] overflow-hidden">
        <img src={course.heroImage || course.thumbnail} className="w-full h-full object-cover" alt={course.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-[#060B18]/70 to-transparent" />
      </div>

      {/* Info Area */}
      <div className="w-full -mt-28 sm:-mt-36 relative z-10 px-4 sm:px-8 md:px-12 pb-6 max-w-6xl mx-auto">
        <div className="space-y-3">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-[#1E40AF] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider">
              {course.category}
            </span>
            <span className="px-3 py-1 rounded-md bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] text-[10px] sm:text-xs font-black uppercase tracking-wider">
              Certificação UNDD Academy
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tight drop-shadow-xl break-words">
            {course.title}
          </h1>

          {course.tagline && (
            <p className="text-[#3B82F6] text-sm sm:text-base font-extrabold tracking-wide">
              {course.tagline}
            </p>
          )}

          {/* Instructor & Metadata Card */}
          <div className="p-4 rounded-2xl bg-[#0C162E] border border-[#1B2F5C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg my-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#1E40AF]/20 border border-[#3B82F6]/40 text-[#3B82F6] flex items-center justify-center shrink-0">
                <User size={24} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Docente Responsável</span>
                <h3 className="text-sm font-black text-white">{course.instructor}</h3>
                <p className="text-xs text-[#60A5FA] font-semibold">{course.instructorTitle || 'Docente Oficial UNDD'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-gray-300">
              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-[#F59E0B]" />
                <span>{course.duration || '60h'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award size={16} className="text-[#10B981]" />
                <span>Certificado Incluso</span>
              </div>
            </div>
          </div>

          <p className="text-gray-200 text-xs sm:text-sm max-w-4xl leading-relaxed">
            {course.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button 
              onClick={handleEnrollOrStart}
              className="flex-1 sm:flex-none sm:w-80 flex items-center justify-center gap-2.5 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white py-3.5 px-6 rounded-xl font-black transition-all active:scale-95 shadow-xl uppercase tracking-wider text-xs md:text-sm cursor-pointer border border-[#3B82F6]/50"
            >
              <Play size={18} className="fill-white" />
              <span>ASSISTIR AULAS AGORA</span>
            </button>
          </div>

        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-[#1B2F5C] px-4 sm:px-8 md:px-12 max-w-6xl mx-auto">
        <div className="flex gap-4 sm:gap-8 overflow-x-auto hide-scrollbar">
          {[
            { id: 'lecons', label: '🎬 Videoaulas & Módulos' },
            { id: 'supports', label: '📄 Apostilas & Materiais' },
            { id: 'activites', label: '✍️ Avaliações Práticas' },
            { id: 'sumario', label: '📋 Ementa Completa' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-xs md:text-sm font-bold whitespace-nowrap transition-all relative cursor-pointer ${
                activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#F59E0B] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="pb-28 pt-6 max-w-6xl mx-auto px-4 sm:px-8 md:px-12">
        
        {/* --- VIDEOAULAS & MÓDULOS --- */}
        {activeTab === 'lecons' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {course.modules?.map((module, mIdx) => (
              <div key={mIdx} className="space-y-1">
                <button 
                  onClick={() => toggleModule(mIdx)}
                  className="w-full py-4 px-2 flex items-center justify-between group active:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-5 bg-[#3B82F6] rounded-full" />
                    <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-200 text-left">
                      {module.title}
                    </h3>
                  </div>
                  {expandedModules[mIdx] ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                
                <div className={`space-y-3 transition-all duration-300 overflow-hidden ${expandedModules[mIdx] ? 'max-h-[2000px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {module.lessons.map((lesson) => {
                    const savedTime = lessonProgress[lesson.id] || 0;
                    const totalSecs = (parseInt(lesson.duration) || 15) * 60; 
                    const progressPercent = Math.min((savedTime / totalSecs) * 100, 100);

                    return (
                      <div 
                        key={lesson.id} 
                        onClick={() => onLessonClick(lesson)} 
                        className="flex gap-4 items-center group p-3.5 rounded-2xl bg-[#0C162E] hover:bg-[#0F1D3D] transition-all border border-[#1B2F5C] cursor-pointer"
                      >
                        <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-black shadow-lg">
                          <img src={course.thumbnail} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform" alt="" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play size={14} fill="white" className="text-white opacity-90" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-gray-100 leading-snug">
                            {lesson.title}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                              {lesson.duration}
                            </span>
                            {progressPercent > 0 && (
                              <span className="text-[10px] font-bold text-[#10B981]">
                                {Math.round(progressPercent)}%
                              </span>
                            )}
                          </div>
                          
                          {progressPercent > 0 && (
                            <div className="w-full h-1 bg-white/10 mt-2 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#10B981]" 
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* --- SUPPORTS --- */}
        {activeTab === 'supports' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {course.materials && course.materials.length > 0 ? (
              course.materials.map((material) => {
                const isDownloaded = downloadedIds.includes(material.id);
                return (
                  <div 
                    key={material.id} 
                    onClick={() => onMaterialClick && onMaterialClick(material)} 
                    className={`flex items-center gap-4 p-4 bg-[#0C162E] border rounded-2xl transition-all cursor-pointer ${isDownloaded ? 'border-emerald-500/40' : 'border-[#1B2F5C] hover:border-[#3B82F6]'}`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDownloaded ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#1E40AF]/20 text-[#3B82F6]'}`}>
                      <FileText size={22} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-xs font-bold text-white truncate">{material.title}</h4>
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">PDF Oficial • UNDD Academy</span>
                    </div>
                    {isDownloaded && <CheckCircle size={18} className="text-emerald-400" />}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-gray-400 text-xs">
                Apostilas e slides disponíveis diretamente no leitor durante as aulas.
              </div>
            )}
          </div>
        )}

        {/* --- ACTIVITÉS & QUIZ --- */}
        {activeTab === 'activites' && (
          <div className="space-y-6 animate-in fade-in duration-300 min-h-[350px]">
            {!course.quiz ? (
              <div className="p-8 bg-[#0C162E] rounded-3xl border border-[#1B2F5C] text-center">
                <CheckCircle size={32} className="text-[#10B981] mx-auto mb-3" />
                <h3 className="text-base font-bold text-white uppercase mb-1">Módulo Prático Concluído</h3>
                <p className="text-xs text-gray-300">A avaliação deste curso é contínua e baseada nas atividades e visualizações de aulas.</p>
              </div>
            ) : !quizStarted ? (
              <div className="p-8 bg-[#0C162E] rounded-3xl border border-[#1B2F5C] text-center flex flex-col items-center shadow-xl">
                <div className="w-16 h-16 bg-[#1E40AF]/20 rounded-full flex items-center justify-center mb-5 text-[#3B82F6]">
                  <RotateCcw size={30} />
                </div>
                <h3 className="text-base font-black uppercase mb-1 text-white">Avaliação Técnica de Conhecimentos</h3>
                <p className="text-xs text-gray-300 mb-6 max-w-sm">Responda às questões práticas para validar sua certificação na UNDD Academy.</p>
                <button 
                  onClick={() => setQuizStarted(true)} 
                  className="w-full md:w-80 py-3.5 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white rounded-xl font-bold text-xs tracking-wider uppercase shadow-xl transition-all cursor-pointer"
                >
                  INICIAR AVALIAÇÃO
                </button>
              </div>
            ) : quizFinished ? (
              <div className="p-8 bg-[#0C162E] rounded-3xl border border-[#1B2F5C] text-center">
                <h3 className="text-xs font-bold text-[#10B981] uppercase tracking-wider mb-2">Pontuação Final</h3>
                <div className="text-4xl font-black text-white mb-2">{calculateScore()} / {course.quiz.length}</div>
                <p className="text-xs text-gray-300">
                  {calculateScore() >= (course.quiz.length / 2) ? 'Excelente aproveitamento! Nota válida para certificação.' : 'Revise os conteúdos das aulas e tente novamente.'}
                </p>
                <button 
                  onClick={resetQuiz} 
                  className="mt-6 text-[#F59E0B] hover:text-[#D97706] font-bold uppercase text-xs tracking-wider cursor-pointer"
                >
                  Refazer Avaliação
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-6 bg-[#0C162E] rounded-3xl border border-[#1B2F5C]">
                  <h3 className="text-sm font-bold text-white leading-relaxed mb-6">
                    Questão {currentQuestionIndex + 1}/{course.quiz.length}: {course.quiz[currentQuestionIndex].question}
                  </h3>
                  <div className="space-y-3">
                    {course.quiz[currentQuestionIndex].options.map((opt, oIdx) => (
                      <button 
                        key={oIdx} 
                        onClick={() => handleAnswerSelect(oIdx)} 
                        className={`w-full p-4 rounded-2xl text-left text-xs transition-all flex justify-between items-center cursor-pointer ${
                          selectedAnswers[currentQuestionIndex] === oIdx 
                            ? 'bg-[#1E40AF] text-white font-bold' 
                            : 'bg-[#060B18] text-gray-300 border border-[#1B2F5C] hover:border-white/20'
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedAnswers[currentQuestionIndex] === oIdx && <Check size={16} />}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  disabled={selectedAnswers[currentQuestionIndex] === undefined} 
                  onClick={handleNextQuestion} 
                  className="w-full py-4 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white rounded-xl font-bold text-xs tracking-wider shadow-xl disabled:opacity-40 cursor-pointer"
                >
                  {currentQuestionIndex < course.quiz.length - 1 ? 'PRÓXIMA QUESTÃO' : 'CONCLUIR AVALIAÇÃO'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- EMENTA COMPLETA --- */}
        {activeTab === 'sumario' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-3xl p-6 sm:p-8 shadow-xl">
              <h2 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2 mb-4">
                <BookOpen size={20} className="text-[#3B82F6]" />
                Ementa e Planejamento do Curso
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                <p>O curso <strong>{course.title}</strong> é estruturado para fornecer autonomia prática, excelência técnica e competências requisitadas no mercado contemporâneo.</p>
                <div className="border-t border-[#1B2F5C] pt-4 mt-4">
                  <h4 className="font-bold text-white uppercase text-xs mb-3">Módulos Programados:</h4>
                  <ul className="space-y-2">
                    {course.modules?.map((m, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                        <span>Módulo {idx + 1}: {m.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-3xl p-8 w-full max-w-sm text-center space-y-6 shadow-2xl">
            <div className="w-14 h-14 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={28} />
            </div>
            <h3 className="text-base font-black text-white uppercase">Remover este download?</h3>
            <div className="flex flex-col gap-3">
              <button onClick={confirmDelete} className="w-full py-3.5 bg-red-600 text-white rounded-xl font-bold text-xs tracking-wider cursor-pointer">
                CONFIRMAR
              </button>
              <button onClick={() => setDeleteConfirmId(null)} className="w-full py-3.5 bg-white/10 text-white rounded-xl font-bold text-xs tracking-wider cursor-pointer">
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}

      {showCheckout && (
        <CheckoutModal 
          course={course}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            setShowCheckout(false);
            setEnrolled(true);
            setActiveTab('lecons');
          }}
        />
      )}
    </div>
  );
};

export default CourseDetails;
