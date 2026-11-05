import React from 'react';
import { ArrowLeft, Target, Award, Users, ShieldCheck, Cpu, Building2, MapPin } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const AboutPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  return (
    <div className="min-h-screen bg-[#060B18] text-white font-sans animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-50 p-4 md:p-6 flex items-center justify-between bg-[#060B18]/90 backdrop-blur-md border-b border-[#1B2F5C]">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Voltar</span>
        </button>
        <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">Quem Somos • UNDD Academy</span>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-6 md:px-14 overflow-hidden bg-gradient-to-b from-[#0C162E] to-[#060B18] border-b border-[#1B2F5C]">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1E40AF]/30 border border-[#3B82F6]/40 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-[#60A5FA]">
              União Nacional de Docentes de Direita
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight tracking-tight text-white">
            Capacitação Profissional com <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#F59E0B] to-[#10B981]">
              Excelência Técnica e Sem Viés Ideológico
            </span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A <strong>UNDD Academy</strong> é a plataforma oficial de ensino da União Nacional de Docentes de Direita, um ambiente virtual completo de capacitação profissional para jovens e adultos, acessível via mobile, tablet e desktop.
          </p>
        </div>
      </section>

      {/* Missão e Princípios */}
      <section className="py-16 md:py-24 px-6 md:px-14 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-black text-[#F59E0B] uppercase tracking-widest">
              <span>Compromisso com o Futuro</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Libertando as novas gerações de narrativas e distorções políticas.
            </h2>
            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
              <p>
                Desenvolvida para preparar o aluno para as reais exigências do mercado de trabalho, a plataforma reúne cursos online em diversas áreas, lives interativas e atividades práticas com foco no desenvolvimento contínuo e na excelência técnica.
              </p>
              <p>
                Fundamentada no compromisso com o ensino livre de viés ideológico de esquerda, a UNDD Academy busca libertar as novas gerações de narrativas e distorções políticas, oferecendo um conhecimento técnico, ético e emancipador que prioriza o mérito, o protagonismo individual e o crescimento profissional sustentável.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-[#0C162E] border border-[#1B2F5C] space-y-3">
              <ShieldCheck size={28} className="text-[#3B82F6]" />
              <h3 className="text-base font-bold text-white">Ensino Técnico &amp; Ético</h3>
              <p className="text-xs text-gray-300 leading-relaxed">Foco rigoroso nos fatos, nas competências produtivas e nos fundamentos da profissão.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0C162E] border border-[#1B2F5C] space-y-3">
              <Award size={28} className="text-[#F59E0B]" />
              <h3 className="text-base font-bold text-white">Mérito Individual</h3>
              <p className="text-xs text-gray-300 leading-relaxed">O esforço do aluno é a chave para a conquista de certificações e oportunidades reais.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0C162E] border border-[#1B2F5C] space-y-3">
              <Cpu size={28} className="text-[#10B981]" />
              <h3 className="text-base font-bold text-white">Inovação e Indústria</h3>
              <p className="text-xs text-gray-300 leading-relaxed">Formação em sintonia com a Indústria 4.0, automação e ferramentas de ponta.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0C162E] border border-[#1B2F5C] space-y-3">
              <Users size={28} className="text-[#60A5FA]" />
              <h3 className="text-base font-bold text-white">Docentes Qualificados</h3>
              <p className="text-xs text-gray-300 leading-relaxed">Professores e especialistas comprometidos com a alta qualidade da educação nacional.</p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default AboutPage;
