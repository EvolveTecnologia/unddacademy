import React, { useState } from 'react';
import { ArrowLeft, Search, User, Award, CreditCard, Video, Building2, HelpCircle } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const HelpCenterPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { icon: User, title: 'Conta & Acesso', desc: 'Login, alteração de senha, perfil e primeiro acesso.' },
    { icon: Award, title: 'Certificados & Validação', desc: 'Emissão oficial, código de verificação pública e QR Code.' },
    { icon: CreditCard, title: 'Matrícula & Planos', desc: 'Acesso completo, formas de pagamento e recibos.' },
    { icon: Video, title: 'Aulas & Downloads', desc: 'Videoaulas em 1080p, modo offline e apostilas em PDF.' },
    { icon: Building2, title: 'Soluções para Empresas', desc: 'Capacitação profissional para equipes e instituições parceiras.' },
    { icon: HelpCircle, title: 'Suporte Pedagógico', desc: 'Dúvidas com os docentes da UN2D e secretaria acadêmica.' },
  ];

  const faqs = [
    { 
      q: "Como obter meu certificado oficial de conclusão?", 
      a: "Após concluir todas as aulas do curso e obter aproveitamento mínimo de 7.0 na avaliação prática, seu certificado digital oficial emitido pela UN2D é liberado automaticamente na aba Perfil com chave pública de validação." 
    },
    { 
      q: "Posso assistir às aulas e baixar apostilas sem conexão à internet?", 
      a: "Sim. A plataforma conta com recurso de downloads offline de apostilas em PDF e materiais de apoio na aba Download para estudar quando e onde quiser." 
    },
    { 
      q: "O que diferencia a UN2D Academy de outras plataformas?", 
      a: "A UN2D Academy é a plataforma oficial da União Nacional de Docentes de Direita, fundamentada no compromisso com o ensino livre de viés ideológico de esquerda, priorizando o conhecimento técnico, o mérito e o protagonismo individual." 
    },
    { 
      q: "Como entrar em contato com a equipe pedagógica?", 
      a: "Você pode enviar dúvidas diretamente aos docentes pela aba 'Acadêmico' ou abrir um chamado técnico/administrativo na central de suporte da plataforma." 
    },
  ];

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
        <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">Central de Ajuda • UN2D Academy</span>
      </div>

      {/* Hero Search */}
      <section className="relative py-16 px-6 md:px-12 text-center bg-gradient-to-b from-[#0C162E] to-[#060B18] border-b border-[#1B2F5C]">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-[#3B82F6] bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/30 inline-block">
            Suporte ao Aluno
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Como podemos ajudar seus <span className="text-[#3B82F6]">estudos</span> hoje?
          </h1>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Digite sua dúvida sobre cursos, certificados ou acesso..."
              className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-2xl py-4 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-8">Tópicos de Ajuda</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="bg-[#0C162E] p-6 rounded-2xl border border-[#1B2F5C] hover:border-blue-500 transition-all cursor-pointer shadow-lg group">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-blue-500/30">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-base text-white mb-1">{cat.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{cat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="bg-[#0C162E] p-8 md:p-12 rounded-3xl border border-[#1B2F5C] shadow-xl">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-8">Perguntas Frequentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                <h4 className="font-bold text-base text-white mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#1E40AF] to-[#0C162E] text-white p-8 rounded-3xl border border-[#1B2F5C] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-xl font-bold mb-1">Precisa de atendimento direto?</h3>
            <p className="text-xs text-blue-200">Nossa equipe de secretaria e atendimento ao aluno está pronta para atender você.</p>
          </div>
          <button 
            onClick={() => { window.scrollTo(0, 0); onViewChange('contact'); }}
            className="bg-[#F59E0B] hover:bg-amber-400 text-black font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer shadow-lg"
          >
            Falar com a Central
          </button>
        </div>
      </section>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default HelpCenterPage;
