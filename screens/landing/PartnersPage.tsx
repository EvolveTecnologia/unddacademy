import React from 'react';
import { ArrowLeft, Handshake, Building2, Landmark, GraduationCap, ArrowRight } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const PartnersPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  return (
    <div className="min-h-screen bg-[#060B18] text-white font-sans animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-50 p-4 md:p-6 flex items-center justify-between bg-[#060B18]/90 backdrop-blur-md border-b border-[#1B2F5C]">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-4 py-2 bg-[#0C162E] hover:bg-[#14234B] rounded-full text-blue-400 font-bold text-xs uppercase tracking-wider transition-all border border-[#1B2F5C] cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Voltar</span>
        </button>
        <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">Parcerias • UN2D Academy</span>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 text-center bg-gradient-to-b from-[#0C162E] to-[#060B18] border-b border-[#1B2F5C]">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-xs font-black uppercase tracking-widest">
            <Handshake size={14} />
            <span>Alianças Estratégicas &amp; Formação Corporativa</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black uppercase leading-tight tracking-tight text-white">
            Parcerias que Transformam a Educação em <br />
            <span className="text-[#3B82F6]">Alavanca de Crescimento Real</span>
          </h1>
          
          <p className="text-sm md:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A <strong>UN2D Academy</strong> colabora diretamente com empresas, indústrias, cooperativas e instituições em todo o Brasil para construir programas de capacitação técnica com foco no mérito, na produtividade e em resultados concretos.
          </p>

          <div className="pt-4">
            <button 
              onClick={() => { window.scrollTo(0, 0); onViewChange('contact'); }}
              className="px-8 py-4 bg-[#F59E0B] hover:bg-amber-400 text-black font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Tornar-se Parceiro Institucional</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Model Grid */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0C162E] p-8 rounded-3xl border border-[#1B2F5C] space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Building2 size={26} />
            </div>
            <h3 className="font-bold text-lg text-white">Empresas &amp; Indústrias</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Programas de qualificação contínua e requalificação técnica de equipes de produção, escritórios e lideranças com ênfase em eficiência e ética profissional.
            </p>
          </div>

          <div className="bg-[#0C162E] p-8 rounded-3xl border border-[#1B2F5C] space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Landmark size={26} />
            </div>
            <h3 className="font-bold text-lg text-white">Associações &amp; Cooperativas</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Capacitação para pequenos produtores, cooperativas agroindustriais e empreendedores regionais focando no desenvolvimento econômico sustentável.
            </p>
          </div>

          <div className="bg-[#0C162E] p-8 rounded-3xl border border-[#1B2F5C] space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <GraduationCap size={26} />
            </div>
            <h3 className="font-bold text-lg text-white">Docentes da UN2D</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Professores e especialistas de todo o Brasil unindo esforços para ministrar cursos técnicos e acadêmicos livres de narrativas ideológicas partidárias.
            </p>
          </div>
        </div>
      </section>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default PartnersPage;
