import React from 'react';
import { ArrowLeft, Target, TrendingUp, Users, Award, ShieldCheck, CheckCircle } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const ImpactPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
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
        <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">Impacto &amp; Missão • UNDD Academy</span>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16">
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full mb-4 sm:mb-6">
            <ShieldCheck size={14} className="text-blue-400" />
            <span className="text-[11px] sm:text-xs font-bold text-blue-300 uppercase tracking-wider">Compromisso com o Ensino Livre de Viés Ideológico</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase leading-tight mb-4 sm:mb-6">
            Formação Técnica, Ética &amp; <br />
            <span className="text-[#3B82F6]">Protagonismo Individual</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed max-w-3xl mx-auto">
            A <strong>UNDD Academy</strong> é a plataforma oficial de ensino da <strong>União Nacional de Docentes de Direita</strong>. Desenvolvida para preparar o aluno para as reais exigências do mercado de trabalho através de um conhecimento técnico, ético e emancipador que prioriza o mérito e o crescimento sustentável.
          </p>
        </div>

        {/* 4 Pilares de Impacto */}
        <div className="space-y-4 sm:space-y-6 mb-16 sm:mb-20 md:mb-24 max-w-4xl mx-auto">
          <div className="bg-[#0C162E] p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-[#1B2F5C] flex flex-col sm:flex-row items-start gap-4 sm:gap-6 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#1E40AF] text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md">
              1
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">Qualificação Direta para o Mercado Real</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Nossos cursos são estruturados para responder à demanda concreta de indústrias, comércios e empresas de tecnologia, capacitando o aluno com habilidades práticas imediatamente aplicáveis.
              </p>
            </div>
          </div>

          <div className="bg-[#0C162E] p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-[#1B2F5C] flex flex-col sm:flex-row items-start gap-4 sm:gap-6 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#F59E0B] text-black flex items-center justify-center font-black text-lg shrink-0 shadow-md">
              2
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">Ensino Técnico Livre de Distorções Políticas</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Buscamos libertar as novas gerações de narrativas ideológicas de esquerda, resgatando a autoridade do professor técnico e a busca sincera pelo conhecimento verdadeiro.
              </p>
            </div>
          </div>

          <div className="bg-[#0C162E] p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-[#1B2F5C] flex flex-col sm:flex-row items-start gap-4 sm:gap-6 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#10B981] text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md">
              3
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">Certificação Oficial com Registro e QR Code</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Cada módulo concluído gera certificados oficiais emitidos pela União Nacional de Docentes de Direita com validação pública digital para apresentação profissional.
              </p>
            </div>
          </div>

          <div className="bg-[#0C162E] p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-[#1B2F5C] flex flex-col sm:flex-row items-start gap-4 sm:gap-6 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md">
              4
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">Acessibilidade Total em Todos os Dispositivos</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Ambiente virtual adaptado para desktop com cards horizontais e mobile/tablet com cards verticais ergonômicos, garantindo aprendizado ininterrupto onde você estiver.
              </p>
            </div>
          </div>
        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default ImpactPage;
