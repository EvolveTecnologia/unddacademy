import React, { useState } from 'react';
import { Award, ExternalLink, Download, Share2, Search, CheckCircle2, ShieldCheck, Clock, BookOpen, Check } from 'lucide-react';
import { Certificate } from '../../types';

interface CertificatesScreenProps {
  userName: string;
  onViewCertificate: (cert: Certificate) => void;
}

export const CertificatesScreen: React.FC<CertificatesScreenProps> = ({ userName, onViewCertificate }) => {
  const [activeTab, setActiveTab] = useState<'completed' | 'in_progress'>('completed');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const completedCertificates: Certificate[] = [
    {
      id: '1',
      title: 'Certificado em Gestão Financeira e Empreendedorismo de Mercado',
      date: '14/01/2026',
      code: 'UN2D-2026-GF-8941',
      category: 'Gestão & Negócios',
      hours: 45,
      grade: 'Distinção com Louvor'
    },
    {
      id: '2',
      title: 'Fundamentos da Indústria 4.0 & Sistemas Digitais',
      date: '20/12/2025',
      code: 'UN2D-2025-TI-5520',
      category: 'Tecnologia & Inclusão',
      hours: 60,
      grade: 'Aproveitamento Excelente'
    },
    {
      id: '3',
      title: 'Comunicação Profissional, Ética e Redação Nota 1000',
      date: '15/11/2025',
      code: 'UN2D-2025-ED-3108',
      category: 'Educação Básica & EJA',
      hours: 35,
      grade: 'Aproveitamento Excelente'
    },
    {
      id: '4',
      title: 'Inglês Instrumental e Comercial para o Mercado de Trabalho',
      date: '02/10/2025',
      code: 'UN2D-2025-ID-1204',
      category: 'Idiomas & Comunicação',
      hours: 40,
      grade: 'Aprovado com Mérito'
    }
  ];

  const inProgressCertificates = [
    {
      id: 'ip-1',
      title: 'Informática Básica e Ferramentas de Produtividade',
      category: 'Tecnologia & Inclusão',
      progress: 75,
      completedHours: 30,
      totalHours: 40,
      nextModule: 'Módulo 4: Automação de Documentos e Planilhas Avançadas'
    },
    {
      id: 'ip-2',
      title: 'Educação Ambiental e Práticas Sustentáveis',
      category: 'Meio Ambiente & Sustentabilidade',
      progress: 40,
      completedHours: 12,
      totalHours: 30,
      nextModule: 'Módulo 2: Coleta Seletiva e Gestão de Resíduos Sólidos'
    }
  ];

  const filteredCerts = completedCertificates.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.code && c.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.category && c.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleShare = (cert: Certificate) => {
    const url = `https://undd.academy/verificar/${cert.code || cert.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    showToast(`Link de verificação pública copiado: ${cert.code}`);
  };

  const handleDownload = (cert: Certificate) => {
    showToast(`Baixando certificado oficial em PDF: "${cert.title}"`);
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-6 animate-in fade-in duration-300 pb-36 text-white max-w-5xl mx-auto">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[120] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-in slide-in-from-top duration-300">
          <CheckCircle2 size={18} className="text-white shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0C162E] via-[#0E1B38] to-[#14234B] border border-[#1B2F5C] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#3B82F6] bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/30 inline-block">
              Espaço de Certificações Oficiais
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
              Meus Diplomas &amp; Certificados Digitais
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Consulte, compartilhe e baixe seus diplomas certificados pela UN2D Academy e União Nacional de Docentes de Direita. Cada documento possui chave de autenticidade pública e registro nacional.
            </p>
          </div>

          <div className="bg-[#060B18]/70 border border-[#1B2F5C] p-4 rounded-2xl flex items-center gap-4 shadow-xl shrink-0">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Award size={26} />
            </div>
            <div>
              <span className="text-2xl font-black text-white leading-none block">{completedCertificates.length}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mt-1">Certificados Obtidos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-blue-600 text-white shadow-lg border border-blue-400'
                : 'bg-[#0C162E] text-gray-300 hover:text-white border border-[#1B2F5C]'
            }`}
          >
            <Award size={14} /> Obtidos ({completedCertificates.length})
          </button>
          <button
            onClick={() => setActiveTab('in_progress')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'in_progress'
                ? 'bg-blue-600 text-white shadow-lg border border-blue-400'
                : 'bg-[#0C162E] text-gray-300 hover:text-white border border-[#1B2F5C]'
            }`}
          >
            <Clock size={14} /> Em Andamento ({inProgressCertificates.length})
          </button>
        </div>

        {activeTab === 'completed' && (
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por curso, área ou código..."
              className="w-full sm:w-64 bg-[#0C162E] border border-[#1B2F5C] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white outline-none focus:border-blue-500 placeholder-gray-500"
            />
          </div>
        )}
      </div>

      {/* Completed Certificates Tab */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {filteredCerts.length > 0 ? (
            filteredCerts.map((cert) => (
              <div 
                key={cert.id}
                className="bg-[#0C162E] border border-[#1B2F5C] hover:border-blue-500/60 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 group"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Award size={24} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-[#060B18] text-blue-400 border border-blue-500/30">
                        {cert.category}
                      </span>
                      {cert.grade && (
                        <span className="px-2.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {cert.grade}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {cert.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 pt-0.5">
                      <span>Emitido em: <strong className="text-gray-300">{cert.date}</strong></span>
                      <span>•</span>
                      <span>Carga Horária: <strong className="text-gray-300">{cert.hours} horas</strong></span>
                      <span>•</span>
                      <span className="font-mono text-gray-400 text-[11px]">Cód: {cert.code}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                  <button
                    onClick={() => onViewCertificate(cert)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <ExternalLink size={13} /> Ver Certificado
                  </button>
                  <button
                    onClick={() => handleDownload(cert)}
                    className="px-3 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                    title="Baixar PDF"
                  >
                    <Download size={13} /> PDF
                  </button>
                  <button
                    onClick={() => handleShare(cert)}
                    className="px-3 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                    title="Compartilhar Link"
                  >
                    <Share2 size={13} /> Compartilhar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-8 text-center text-gray-400">
              Nenhum certificado encontrado para o termo pesquisado.
            </div>
          )}
        </div>
      )}

      {/* In Progress Tab */}
      {activeTab === 'in_progress' && (
        <div className="space-y-4">
          {inProgressCertificates.map((cert) => (
            <div 
              key={cert.id}
              className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-5 sm:p-6 shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-[#060B18] text-amber-400 border border-amber-500/30">
                    {cert.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {cert.nextModule}
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-xl font-black text-blue-400">{cert.progress}%</span>
                  <span className="text-[11px] text-gray-400 block font-medium">
                    {cert.completedHours}h de {cert.totalHours}h cumpridas
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#060B18] rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-emerald-400 transition-all duration-500 rounded-full"
                  style={{ width: `${cert.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Validation Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0C162E] border border-[#1B2F5C] flex items-center gap-3.5 text-xs text-gray-300 shadow-md">
        <ShieldCheck size={24} className="text-emerald-400 shrink-0" />
        <p className="leading-relaxed">
          <strong className="text-white">Validação Pública &amp; Arquivamento Digital:</strong> Cada certificado emitido a {userName} é infalsificável e consultável por contratantes e instituições 24h por dia pelo portal de verificação oficial da UN2D Academy.
        </p>
      </div>

    </div>
  );
};

export default CertificatesScreen;
