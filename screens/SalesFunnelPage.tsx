import React, { useState } from 'react';
import { 
  ChevronLeft, ShoppingCart, User, Clock, Award, ShieldCheck, 
  CheckCircle, BookOpen, Star, Sparkles, ChevronDown, ChevronUp, 
  Play, Lock, Check, Globe
} from 'lucide-react';
import { COURSES, FLAGSHIP_AI_COURSE, FLAGSHIP_CARBON_COURSE } from '../constants';
import { Course } from '../types';
import { Logo } from '../components/Logo';
import { LanguageSelector } from '../components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import CheckoutModal from '../components/CheckoutModal';

interface SalesFunnelPageProps {
  courseId: string;
  onBack: () => void;
  onLogin: () => void;
}

export const SalesFunnelPage: React.FC<SalesFunnelPageProps> = ({
  courseId,
  onBack,
  onLogin
}) => {
  const { t, language } = useLanguage();
  const [showCheckout, setShowCheckout] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Scroll to top on mount or courseId change
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [courseId]);

  // Find course or fallback to Flagship AI
  const course: Course = COURSES.find(c => c.id === courseId) || FLAGSHIP_AI_COURSE;

  const toggleModule = (index: number) => {
    setExpandedModules(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const priceCDF = "420.000 CDF";
  const priceUSD = "$149 USD";

  return (
    <div className="min-h-screen bg-[#12181A] text-white font-sans overflow-x-hidden animate-in fade-in duration-300">
      
      {/* --- STANDALONE HEADER (OUTSIDE PLATFORM) --- */}
      <header className="sticky top-0 z-50 bg-[#12181A]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/15 rounded-full text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">{language === 'pt-br' ? 'Voltar' : language === 'en-us' ? 'Back' : 'Retour'}</span>
          </button>
          
          <div onClick={onBack} className="cursor-pointer">
            <Logo inverted={true} size="md" className="h-8 sm:h-10" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector variant="navbar" />

          <button
            onClick={onLogin}
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-transparent hover:bg-white/10 border border-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
          >
            <Lock size={14} className="text-[#1BA9A2]" />
            <span>{t.loginButton || 'Se connecter'}</span>
          </button>
        </div>
      </header>

      {/* --- HERO BANNER & SALES OFFER --- */}
      <section className="relative pt-8 pb-16 px-4 sm:px-8 md:px-14 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Offer Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-[#1BA9A2] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider">
                {course.level || 'Niveau Débutant'}
              </span>
              <span className="px-3 py-1 rounded-md bg-[#F26A21]/20 border border-[#F26A21]/40 text-[#F26A21] text-[10px] sm:text-xs font-black uppercase tracking-wider">
                Certification Officielle AMANITECH
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
              {course.title}
            </h1>

            {course.tagline && (
              <p className="text-[#1BA9A2] text-base sm:text-lg font-extrabold tracking-wide">
                {course.tagline}
              </p>
            )}

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {course.description}
            </p>

            {/* Instructor Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#1B2224] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#1BA9A2]/20 border border-[#1BA9A2]/40 text-[#1BA9A2] flex items-center justify-center shrink-0">
                  <User size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                    {language === 'pt-br' ? 'Conteudista / Formador' : language === 'en-us' ? 'Instructor / Expert' : 'Formateur / Expert'}
                  </span>
                  <h3 className="text-sm font-black text-white">{course.instructor}</h3>
                  <p className="text-xs text-[#1BA9A2] font-semibold">{course.instructorTitle || 'Diretor Executivo da AMANITECH – Technology and Sustainability'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold text-gray-300">
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-[#F26A21]" />
                  <span>{course.duration || '24h (8 Módulos × 3h)'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award size={16} className="text-[#1BA9A2]" />
                  <span>Certifié</span>
                </div>
              </div>
            </div>

            {/* Price Tag & Main CTA */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1B2224] to-[#12181A] border border-[#1BA9A2]/40 shadow-2xl space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block">Investissement Formation</span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl sm:text-4xl font-black text-[#1BA9A2]">{priceCDF}</span>
                    <span className="text-lg font-bold text-gray-400">({priceUSD})</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold">
                  Accès Illimité + Certificat
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-4 px-6 bg-[#F26A21] hover:bg-[#D95A15] text-white rounded-2xl font-black uppercase tracking-wider text-sm sm:text-base transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#F26A21]/30 flex items-center justify-center gap-3 cursor-pointer border border-[#F26A21]/50"
                >
                  <ShoppingCart size={20} />
                  <span>{t.enrollNow || 'MATRICULE-SE AGORA / S\'INSCRIRE'}</span>
                </button>

                <button
                  onClick={onLogin}
                  className="w-full py-3 px-6 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock size={14} className="text-[#1BA9A2]" />
                  <span>{language === 'pt-br' ? 'Já possui conta? Fazer Login' : language === 'en-us' ? 'Already registered? Log in' : 'Déjà inscrit ? Se connecter'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 text-[11px] text-gray-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-400" /> Paiement Sécurisé RDC
                </span>
                <span className="flex items-center gap-1">
                  <Award size={14} className="text-[#1BA9A2]" /> Certificat Garanti
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#1BA9A2]/30 shadow-2xl group">
              <img
                src={course.heroImage}
                alt={course.title}
                className="w-full h-[380px] sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12181A] via-[#12181A]/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#1B2224]/90 backdrop-blur-md border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1BA9A2]">
                  <Sparkles size={16} />
                  <span>Programme de Formation Officiel</span>
                </div>
                <p className="text-xs text-gray-300">
                  Adaptive Learning & Adaptive Streaming conçus pour la RDC et l'Afrique.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- COURSE OBJECTIVES & BENEFICIAL FEATURES --- */}
      <section className="py-16 px-4 sm:px-8 md:px-14 bg-[#1B2224]/50 border-y border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#1BA9A2]">
              Objectifs Pédagogiques Clés
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              Ce que vous allez maîtriser
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Formations immersives alliant théorie fondamentale, études de cas concrets et mise en pratique adaptée au contexte socio-économique congolais et africain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#12181A] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#1BA9A2]/20 text-[#1BA9A2] flex items-center justify-center font-black">
                01
              </div>
              <h3 className="text-sm font-bold uppercase text-white">Fondements &amp; Maîtrise Conceptuelle</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Appréhendez la théorie rigoureuse et les architectures stratégiques fondamentales de la discipline.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#12181A] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F26A21]/20 text-[#F26A21] flex items-center justify-center font-black">
                02
              </div>
              <h3 className="text-sm font-bold uppercase text-white">Cas Pratiques en Entreprise RDC</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Résolvez des défis concrets appliqués aux secteurs de la santé, agriculture, énergie, finance et éducation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#12181A] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                03
              </div>
              <h3 className="text-sm font-bold uppercase text-white">Certification Validée AMANITECH</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Obtenez un certificat officiel vérifiable numériquement attestant de vos compétences stratégiques.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- DETAILED SYLLABUS / CURRICULUM ACCORDION --- */}
      <section className="py-16 px-4 sm:px-8 md:px-14 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase text-white flex items-center gap-2">
              <BookOpen size={22} className="text-[#1BA9A2]" />
              Programme &amp; Módulos da Formation
            </h2>
            <p className="text-xs text-gray-300 mt-1">
              Curriculum complet structuré en 8 modules de haut niveau académique.
            </p>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-[#1BA9A2]/20 border border-[#1BA9A2]/40 text-[#1BA9A2] text-xs font-bold">
            24 Heures de Formation
          </span>
        </div>

        {/* Syllabus Table / Accordion */}
        <div className="space-y-4">
          {course.modules?.map((module, mIdx) => (
            <div key={mIdx} className="bg-[#1B2224] border border-white/10 rounded-2xl overflow-hidden transition-all">
              <button
                onClick={() => toggleModule(mIdx)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#1BA9A2]/20 text-[#1BA9A2] text-xs font-black flex items-center justify-center shrink-0">
                    M{mIdx + 1}
                  </span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white uppercase">{module.title}</h3>
                    <span className="text-[10px] text-gray-400 font-medium">{module.lessons.length} leçons vidéo</span>
                  </div>
                </div>
                {expandedModules[mIdx] ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </button>

              {expandedModules[mIdx] && (
                <div className="p-5 bg-[#12181A]/60 border-t border-white/5 space-y-2">
                  {module.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 rounded-xl bg-[#1B2224]/50 border border-white/5 text-xs">
                      <div className="flex items-center gap-3">
                        <Play size={14} className="text-[#F26A21] shrink-0" />
                        <span className="text-gray-200 font-medium">{lesson.title}</span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- INSTRUCTOR BIOGRAPHY --- */}
      <section className="py-16 px-4 sm:px-8 md:px-14 bg-[#1B2224]/80 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-tr from-[#1BA9A2] to-[#F26A21] p-1 shrink-0 shadow-2xl">
            <div className="w-full h-full bg-[#12181A] rounded-[22px] flex items-center justify-center text-[#1BA9A2]">
              <User size={64} />
            </div>
          </div>

          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-black text-[#F59E0B] uppercase tracking-widest block">Docente Responsável &amp; Coordenação</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">{course.instructor}</h3>
            <p className="text-xs font-bold text-blue-400">{course.instructorTitle || 'Docente Especialista da UNDD Academy'}</p>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
              Especialista comprometido com o ensino técnico, ético e emancipador. Membro do corpo docente da União Nacional de Docentes de Direita, estruturando conteúdos focados nas reais demandas do mercado de trabalho, mérito e produtividade.
            </p>
          </div>
        </div>
      </section>

      {/* --- BOTTOM STICKY ENROLLMENT CTA BAR --- */}
      <div className="sticky bottom-0 z-40 bg-[#0C162E]/95 backdrop-blur-xl border-t border-[#1B2F5C] p-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="hidden sm:block">
            <h4 className="text-xs font-bold text-white uppercase">{course.title}</h4>
            <span className="text-xs text-emerald-400 font-black">Acesso Imediato com Certificado Oficial</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowCheckout(true)}
              className="flex-1 sm:flex-initial py-3.5 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-wider text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart size={16} />
              <span>{t.enrollNow || 'MATRICULAR-SE AGORA'}</span>
            </button>

            <button
              onClick={onLogin}
              className="py-3.5 px-5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <CheckoutModal
          course={course}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            setShowCheckout(false);
            setPurchaseSuccess(true);
          }}
        />
      )}

      {/* SUCCESS MODAL AFTER PURCHASE */}
      {purchaseSuccess && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-[#1B2224] border border-[#1BA9A2]/50 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-white uppercase">Inscription Validée !</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Félicitations ! Votre inscription au cours <strong className="text-white">{course.title}</strong> a été enregistrée avec succès.
              </p>
              <p className="text-xs text-[#1BA9A2] font-semibold pt-2">
                Connectez-vous à votre compte apprenant pour accéder aux leçons vidéo.
              </p>
            </div>

            <button
              onClick={() => {
                setPurchaseSuccess(false);
                onLogin();
              }}
              className="w-full py-4 bg-[#F26A21] hover:bg-[#D95A15] text-white rounded-xl font-black uppercase tracking-wider text-xs shadow-xl cursor-pointer transition-all"
            >
              Accéder à mon Espace (Se Connecter)
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SalesFunnelPage;
