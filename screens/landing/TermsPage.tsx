import React from 'react';
import { ArrowLeft, Scale, Shield, FileText } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const TermsPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
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
        <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">Atualização: Nov. 2026</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="mb-12">
          <div className="w-14 h-14 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30">
            <Scale size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Termos de Uso &amp; Diretrizes
          </h1>
          <p className="text-gray-300 text-sm">
            Plataforma oficial de ensino da <strong>União Nacional de Docentes de Direita (UN2D)</strong> • Ambiente Virtual de Capacitação Profissional.
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed bg-[#0C162E] p-8 md:p-12 rounded-3xl border border-[#1B2F5C] shadow-xl">
          <section className="space-y-2.5">
            <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              1. Objeto &amp; Natureza dos Serviços
            </h3>
            <p>
              Estes Termos regulam o acesso e o uso da plataforma educacional <strong>UN2D Academy</strong>. Ao criar uma conta ou acessar os conteúdos, o usuário concorda com as diretrizes pedagógicas e éticas da instituição.
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              2. Compromisso Pedagógico e Liberdade Ideológica
            </h3>
            <p>
              A UN2D Academy pauta todas as suas formações no conhecimento técnico, científico e ético, livre de distorções e narrativas políticas de esquerda, priorizando o mérito, o protagonismo individual e a capacitação alinhada ao mercado produtivo.
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              3. Titularidade da Conta &amp; Acesso Individual
            </h3>
            <p>
              O acesso aos cursos e videoaulas é pessoal e intransferível. Cada aluno responde pela veracidade das informações fornecidas no cadastro e pela guarda de sua senha de acesso.
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              4. Direitos Autorais &amp; Propriedade Intelectual
            </h3>
            <p>
              Todos os materiais didáticos, apostilas em PDF, videoaulas e sistemas de avaliação são protegidos pelas leis brasileiras de direitos autorais. O download offline é permitido exclusivamente para estudo individual na plataforma.
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              5. Emissão de Certificados Digitais
            </h3>
            <p>
              Os certificados emitidos atestam a conclusão dos módulos curriculares e contam com registro único e QR Code para validação pública perante empregadores e instituições acadêmicas.
            </p>
          </section>
        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default TermsPage;
