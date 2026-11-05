import React, { useState } from 'react';
import { Shield, FileText, Lock, Database } from 'lucide-react';

const LegalScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terms' | 'ethics' | 'privacy' | 'data'>('terms');

  const tabs = [
    { id: 'terms', label: 'Termos de Uso', icon: FileText },
    { id: 'ethics', label: 'Diretrizes Éticas', icon: Shield },
    { id: 'privacy', label: 'Privacidade', icon: Lock },
    { id: 'data', label: 'Proteção de Dados (LGPD)', icon: Database },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'terms':
        return (
          <div className="space-y-5 animate-in fade-in duration-300">
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
              Termos Gerais de Uso da Plataforma
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              Bem-vindo à UNDD Academy, a plataforma oficial de ensino da União Nacional de Docentes de Direita (UNDD). Ao acessar nosso ambiente virtual de aprendizagem, você concorda integralmente com as presentes diretrizes institucionais e regulamentos pedagógicos.
            </p>
            
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                1. Acesso &amp; Titularidade do Aluno
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                O acesso à plataforma é estritamente pessoal, individual e intransferível. O compartilhamento indevido de senhas ou a redistribuição comercial de acessos constitui infração aos termos e acarreta a suspensão da matrícula.
              </p>
            </div>
            
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                2. Propriedade Intelectual dos Cursos
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                A integralidade dos materiais didáticos (videoaulas, apostilas em PDF, avaliações práticas, apresentações e matrizes de ensino) é de propriedade intelectual exclusiva da UNDD e de seus docentes associados.
              </p>
            </div>
          </div>
        );
      case 'ethics':
        return (
          <div className="space-y-5 animate-in fade-in duration-300">
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
              Compromisso com o Ensino Livre de Viés Ideológico
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              A UNDD Academy fundamenta sua prática pedagógica no compromisso inegociável com a verdade factual, o rigor técnico e o mérito individual, resguardando os alunos de narrativas político-partidárias e distorções ideológicas de esquerda.
            </p>
            
            <ul className="list-disc pl-5 space-y-2 text-xs text-gray-300">
              <li>Prioridade absoluta à qualificação técnica alinhada às demandas reais das empresas e do mercado de trabalho.</li>
              <li>Valorização do protagonismo individual, da disciplina e da ética profissional como motores da ascensão social.</li>
              <li>Transparência curricular: todas as ementas e referências bibliográficas são técnicas e acessíveis ao aluno.</li>
            </ul>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-5 animate-in fade-in duration-300">
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
              Política de Privacidade e Segurança
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              A segurança de suas informações cadastrais e do seu histórico acadêmico é tratada com os mais altos padrões de criptografia e conformidade técnica no Brasil.
            </p>
            
            <div className="bg-[#060B18] p-4 rounded-xl border border-[#1B2F5C] space-y-1.5">
              <h4 className="font-bold text-white text-xs">Dados Coletados</h4>
              <p className="text-xs text-gray-300">
                Informações cadastrais básicas (nome completo, e-mail, telefone) e métricas pedagógicas (aulas concluídas, notas nas avaliações) estritamente necessárias para a emissão dos certificados oficiais.
              </p>
            </div>
          </div>
        );
      case 'data':
        return (
          <div className="space-y-5 animate-in fade-in duration-300">
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
              Conformidade com a LGPD (Lei nº 13.709/2018)
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              Em estrito cumprimento à Lei Geral de Proteção de Dados Pessoais do Brasil (LGPD), você possui o direito de solicitar a confirmação de existência de tratamento, acesso aos dados, correção de dados incompletos e portabilidade cadastral.
            </p>
            <p className="text-xs text-gray-300 leading-relaxed">
              Para qualquer solicitação referente a privacidade e dados pessoais, entre em contato diretamente com o nosso Encarregado pelo e-mail: <span className="text-blue-400 font-bold">lgpd@undd.academy</span>.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#060B18] text-white">
      <div className="flex overflow-x-auto hide-scrollbar border-b border-[#1B2F5C] px-6 md:px-10 bg-[#060B18] sticky top-0 z-10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-4 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive 
                  ? 'border-[#F59E0B] text-white font-bold bg-[#0C162E]' 
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={15} className={isActive ? 'text-[#F59E0B]' : ''} />
              <span className="text-xs uppercase tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 text-gray-300 text-xs leading-relaxed pb-36">
        <div className="max-w-3xl mx-auto bg-[#0C162E] border border-[#1B2F5C] p-6 sm:p-8 rounded-3xl shadow-xl">
          {renderContent()}
          <p className="text-center text-[10px] text-gray-500 mt-12 pt-6 border-t border-white/5 uppercase tracking-wider">
            Última Revisão: Novembro de 2026 • Departamento Jurídico e Pedagógico da UNDD
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalScreen;
