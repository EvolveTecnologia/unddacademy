import React, { useState } from 'react';
import { ChevronLeft, Download, CheckCircle, FileText, Loader2 } from 'lucide-react';
import { Material } from '../types';

interface PdfViewerScreenProps {
  material: Material;
  isDownloaded: boolean;
  onDownloadToggle: () => void;
  onBack: () => void;
}

const PdfViewerScreen: React.FC<PdfViewerScreenProps> = ({ material, isDownloaded, onDownloadToggle, onBack }) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(material.url)}`;

  const handleDownload = () => {
    if (isDownloaded) return;

    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      onDownloadToggle();
      
      const link = document.createElement('a');
      link.href = material.url;
      link.download = material.title;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#060B18] flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#1B2F5C] bg-[#060B18]/95 backdrop-blur-xl">
        <div className="flex items-center gap-3.5 overflow-hidden">
          <button 
            onClick={onBack}
            className="p-2.5 bg-[#0C162E] hover:bg-[#14234B] border border-[#1B2F5C] rounded-xl text-white transition-all cursor-pointer"
            aria-label="Voltar"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col overflow-hidden">
            <h1 className="text-xs md:text-sm font-bold text-white truncate pr-4 leading-none mb-1">{material.title}</h1>
            <span className="text-[9px] text-blue-400 font-bold uppercase tracking-wider">Leitura e Estudo • UN2D Academy</span>
          </div>
        </div>
        
        <button 
          onClick={handleDownload}
          disabled={isDownloading || isDownloaded}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
            isDownloaded 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
          }`}
        >
          {isDownloading ? (
            <Loader2 size={13} className="animate-spin" />
          ) : isDownloaded ? (
            <>
              <CheckCircle size={13} /> 
              <span>Salvo Offline</span>
            </>
          ) : (
            <>
              <Download size={13} /> 
              <span>Baixar PDF</span>
            </>
          )}
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 bg-[#0C162E] relative overflow-hidden">
        {!isIframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#060B18] z-20">
            <div className="relative mb-4">
              <div className="w-14 h-14 border-2 border-blue-500/20 rounded-full" />
              <div className="absolute inset-0 w-14 h-14 border-t-2 border-blue-500 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText size={18} className="text-blue-400" />
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">
              Carregando material didático...
            </p>
          </div>
        )}
        
        <iframe 
          src={viewerUrl}
          className={`w-full h-full transition-opacity duration-500 ${isIframeLoaded ? 'opacity-100' : 'opacity-0'}`}
          title={material.title}
          frameBorder="0"
          onLoad={() => setIsIframeLoaded(true)}
        />
      </div>
      
      {isDownloaded && (
        <div className="bg-[#10B981] p-2 text-center">
          <p className="text-[10px] text-black font-extrabold uppercase tracking-wider flex items-center justify-center gap-2">
            <CheckCircle size={12} />
            Disponível offline nos seus downloads da UN2D Academy
          </p>
        </div>
      )}
    </div>
  );
};

export default PdfViewerScreen;
