import React from 'react';
import { ArrowLeft, ShieldCheck, Database, Eye, Server, Lock } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const PrivacyPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  return (
    <div className="min-h-screen bg-[#060B18] text-white font-sans">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-50 p-4 md:p-6 flex items-center justify-between bg-[#060B18]/90 backdrop-blur-md border-b border-[#1B2F5C]">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-4 py-2 bg-[#0C162E] hover:bg-[#14234B] rounded-full text-blue-400 font-bold text-xs uppercase tracking-wider transition-all border border-[#1B2F5C] cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Voltar</span>
        </button>
        <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">Privacidade • UNDD Academy</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/20 border border-blue-500/30 rounded-full mb-6">
            <ShieldCheck size={14} className="text-blue-400" />
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Proteção de Dados &amp; LGPD</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Sua Privacidade é <br />
            <span className="text-[#3B82F6]">Nossa Prioridade</span>
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            Na <strong>UNDD Academy</strong> e na <strong>União Nacional de Docentes de Direita</strong>, a transparência e a segurança de suas informações guiam cada decisão pedagógica e tecnológica.
          </p>
        </div>

        {/* Data Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-[#0C162E] p-6 rounded-2xl border border-[#1B2F5C] space-y-3 shadow-lg">
            <Database className="text-blue-400" size={28} />
            <h4 className="font-bold text-base text-white">Dados Coletados</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Coletamos estritamente os dados essenciais para identificação do aluno, emissão de certificados digitais oficiais e histórico de aproveitamento acadêmico.
            </p>
          </div>

          <div className="bg-[#0C162E] p-6 rounded-2xl border border-[#1B2F5C] space-y-3 shadow-lg">
            <Eye className="text-[#F59E0B]" size={28} />
            <h4 className="font-bold text-base text-white">Finalidade do Tratamento</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Suas informações são utilizadas unicamente para viabilizar o acesso aos cursos, acompanhar seu desempenho pedagógico e prestar suporte direto ao aluno.
            </p>
          </div>

          <div className="bg-[#0C162E] p-6 rounded-2xl border border-[#1B2F5C] space-y-3 shadow-lg">
            <Server className="text-emerald-400" size={28} />
            <h4 className="font-bold text-base text-white">Infraestrutura Segura</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Todos os dados trafegam por conexões com criptografia de ponta a ponta e ficam armazenados em servidores de alta disponibilidade e conformidade técnica no Brasil.
            </p>
          </div>

          <div className="bg-[#0C162E] p-6 rounded-2xl border border-[#1B2F5C] space-y-3 shadow-lg">
            <Lock className="text-blue-400" size={28} />
            <h4 className="font-bold text-base text-white">Seus Direitos Garantidos</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Em conformidade com a LGPD, você possui livre acesso para solicitar retificação, confirmação de dados ou cancelamento a qualquer momento pelo canal de privacidade.
            </p>
          </div>
        </div>

        <div className="bg-[#0C162E] p-6 rounded-2xl border border-[#1B2F5C] text-center text-xs text-gray-400 shadow-md">
          Para qualquer dúvida referente a dados pessoais e privacidade: <strong className="text-blue-400">privacidade@undd.academy</strong> • União Nacional de Docentes de Direita.
        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default PrivacyPage;
