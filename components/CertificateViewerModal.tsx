import React from 'react';
import { X, Share2, Award, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';
import { Certificate } from '../types';
import { Logo } from './Logo';

interface CertificateViewerModalProps {
  certificate: Certificate | null;
  userName: string;
  onClose: () => void;
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({
  certificate,
  userName,
  onClose,
}) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Certificado UN2D Academy - ${certificate.title}`,
          text: `Confira meu certificado oficial "${certificate.title}" emitido pela UN2D Academy e União Nacional de Docentes de Direita.`,
          url: window.location.href,
        });
      } catch (e) {
        console.log('Compartilhamento cancelado');
      }
    }
  };

  const certHash = `UN2D-BR-${certificate.id.padStart(4, '0')}-${btoa(certificate.title).substring(0, 8).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto hide-scrollbar">
      <div 
        className="w-full max-w-2xl bg-[#0C162E] border border-[#1B2F5C] rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white my-auto animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0C162E] to-[#14234B] border-b border-[#1B2F5C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Award size={20} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Certificado Digital Oficial
              </h3>
              <p className="text-[10px] text-gray-400">União Nacional de Docentes de Direita • UN2D Academy</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Certificate Printable Canvas Preview */}
        <div className="p-4 sm:p-8 bg-[#060B18] overflow-y-auto hide-scrollbar max-h-[70vh]">
          <div className="relative border-4 border-double border-[#1B2F5C] rounded-2xl p-6 sm:p-10 bg-gradient-to-b from-[#0C162E] to-[#060B18] shadow-2xl text-center space-y-4 sm:space-y-6">
            
            {/* Top Ornamental Ribbon */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10">
                  <Logo variant="icon-only" className="w-full h-full" />
                </div>
                <div className="text-left">
                  <span className="block text-[12px] font-black tracking-widest text-white uppercase">UN2D ACADEMY</span>
                  <span className="block text-[9px] text-[#3B82F6] font-semibold uppercase">União Nacional de Docentes de Direita</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  <CheckCircle2 size={10} /> Autenticidade Verificada
                </span>
              </div>
            </div>

            {/* Certificate Header */}
            <div className="space-y-1 pt-2">
              <p className="text-[10px] sm:text-xs text-[#3B82F6] uppercase tracking-[3px] font-bold">
                CERTIFICADO DE QUALIFICAÇÃO PROFISSIONAL
              </p>
              <h2 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight">
                Declaração de Conclusão &amp; Mérito
              </h2>
            </div>

            <p className="text-xs text-gray-300 italic">
              Certificamos que
            </p>

            {/* Recipient Name */}
            <div className="py-2 border-b-2 border-[#F59E0B]/50 max-w-md mx-auto">
              <span className="text-base sm:text-2xl font-black uppercase text-[#F59E0B] tracking-wide">
                {userName}
              </span>
            </div>

            <p className="text-xs text-gray-300 max-w-lg mx-auto leading-relaxed">
              concluiu com êxito todas as etapas de formação técnica, avaliações práticas e estudos aplicados da formação continuada intitulada:
            </p>

            {/* Course Title Badge */}
            <div className="bg-[#0C162E] border border-blue-500/40 rounded-xl py-3 px-4 max-w-lg mx-auto shadow-inner">
              <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wide">
                {certificate.title}
              </h3>
            </div>

            {/* Metadata Footer */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-left text-[10px] text-gray-300">
              <div>
                <span className="text-gray-400 block uppercase tracking-wider text-[9px]">Data de Emissão</span>
                <strong className="text-white font-semibold">{certificate.date}</strong>
              </div>
              <div>
                <span className="text-gray-400 block uppercase tracking-wider text-[9px]">Chave de Registro</span>
                <strong className="text-blue-400 font-mono">{certHash}</strong>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center justify-end sm:justify-center gap-2">
                <ShieldCheck size={20} className="text-[#F59E0B]" />
                <span className="text-[9px] text-gray-300">Assinatura Oficial UN2D</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-5 bg-[#0C162E] border-t border-[#1B2F5C] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Documento emitido com fé pública institucional e registro nacional</span>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {typeof navigator.share === 'function' && (
              <button
                onClick={handleShare}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Share2 size={14} /> Compartilhar
              </button>
            )}
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <Printer size={15} /> Imprimir / PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateViewerModal;
