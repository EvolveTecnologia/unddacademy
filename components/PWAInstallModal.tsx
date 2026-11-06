import React, { useState } from 'react';
import { 
  X, Download, Share2, Smartphone, Tablet, 
  CheckCircle, PlusSquare, Copy, Check, Zap, WifiOff, ShieldCheck, Sparkles 
} from 'lucide-react';
import { Logo } from './Logo';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  onInstall: (targetPlatform?: 'ios' | 'android') => Promise<{ success: boolean; mode: string }>;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  isInstalled,
  isIOS,
  onInstall,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'ios'>(isIOS ? 'ios' : 'android');
  const [isInstalling, setIsInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showAndroidGuide, setShowAndroidGuide] = useState(false);
  const [showIOSShareGuide, setShowIOSShareGuide] = useState(false);

  if (!isOpen) return null;

  const handleActionClick = async () => {
    setIsInstalling(true);
    try {
      const res = await onInstall(selectedPlatform);
      setIsInstalling(false);
      
      if (res.success || res.mode === 'already-installed') {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1800);
      } else {
        if (selectedPlatform === 'ios') {
          setShowIOSShareGuide(true);
        } else {
          setShowAndroidGuide(true);
        }
      }
    } catch (e) {
      setIsInstalling(false);
      if (selectedPlatform === 'ios') {
        setShowIOSShareGuide(true);
      } else {
        setShowAndroidGuide(true);
      }
    }
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="w-full max-w-lg bg-[#0C162E] border border-[#1B2F5C] rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#060B18] border-b border-[#1B2F5C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0C162E] border border-[#1B2F5C] flex items-center justify-center p-1.5 shadow-md shrink-0">
              <Logo variant="icon-only" className="w-full h-full" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-black tracking-wide text-white uppercase flex items-center gap-2">
                Instalar Aplicativo PWA
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Mobile &amp; Tablet
                </span>
                <span className="text-[10px] text-gray-300">UN2D Academy</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto hide-scrollbar space-y-4 max-h-[75vh]">
          {isInstalled ? (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3 text-emerald-300">
              <CheckCircle size={24} className="shrink-0 text-emerald-400" />
              <div>
                <p className="text-xs font-bold">Aplicativo já instalado!</p>
                <p className="text-[11px] text-emerald-300/80 mt-0.5">
                  Você já aproveita o modo tela cheia e o acesso direto pela tela de início.
                </p>
              </div>
            </div>
          ) : installSuccess ? (
            <div className="p-5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-2 animate-in zoom-in-95">
              <CheckCircle size={32} className="mx-auto text-emerald-400" />
              <p className="text-sm font-bold text-emerald-300">Instalação concluída!</p>
              <p className="text-xs text-gray-300">O aplicativo UN2D Academy está pronto na sua tela de início.</p>
            </div>
          ) : (
            <>
              {/* Platform Selector Tabs */}
              <div className="flex bg-[#060B18] p-1 rounded-2xl border border-[#1B2F5C]">
                <button
                  type="button"
                  onClick={() => { setSelectedPlatform('android'); setShowIOSShareGuide(false); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPlatform === 'android'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Smartphone size={15} />
                  Android
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedPlatform('ios'); setShowAndroidGuide(false); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPlatform === 'ios'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Tablet size={15} />
                  iOS (iPhone / iPad)
                </button>
              </div>

              {/* Action Button */}
              <div className="pt-1">
                {selectedPlatform === 'android' ? (
                  <button
                    type="button"
                    onClick={handleActionClick}
                    disabled={isInstalling}
                    className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-95 cursor-pointer border border-blue-400/40"
                  >
                    {isInstalling ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Download size={18} className="animate-bounce" />
                        <span className="text-xs uppercase tracking-wider">
                          Instalar no Android (1 Clique)
                        </span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleActionClick}
                    disabled={isInstalling}
                    className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-95 cursor-pointer border border-blue-400/40"
                  >
                    {isInstalling ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Share2 size={18} />
                        <span className="text-xs uppercase tracking-wider">
                          Instalar no iPhone / iPad (iOS)
                        </span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Step by Step Guide */}
              {selectedPlatform === 'android' ? (
                <div className={`space-y-3 bg-[#060B18] border ${showAndroidGuide ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-[#1B2F5C]'} rounded-2xl p-4 transition-all`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Smartphone size={15} />
                      Passo a Passo no Android (Chrome)
                    </span>
                  </h3>
                  <div className="space-y-2 text-xs text-gray-200">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                      <p>Toque no botão acima ou no menu <strong>Opções (⋮)</strong> no canto superior do navegador.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                      <p>Selecione <strong className="text-white">« Instalar aplicativo »</strong> ou <strong className="text-white">« Adicionar à tela inicial »</strong>.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                      <p>Confirme para fixar o ícone da UN2D Academy na sua tela inicial com suporte offline.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`space-y-3 bg-[#060B18] border ${showIOSShareGuide ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-[#1B2F5C]'} rounded-2xl p-4 transition-all`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Tablet size={15} />
                      Passo a Passo no iPhone &amp; iPad (Safari)
                    </span>
                  </h3>
                  <div className="space-y-2 text-xs text-gray-200">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                      <p className="flex items-center gap-1.5 flex-wrap">
                        No <strong>Safari</strong>, toque no ícone de <strong>Compartilhar</strong>
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-white/15 rounded text-white"><Share2 size={12} /></span>.
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                      <p className="flex items-center gap-1.5 flex-wrap">
                        Role para baixo e toque em <strong className="text-white">« Adicionar à Tela de Início »</strong>
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-white/15 rounded text-white"><PlusSquare size={12} /></span>.
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                      <p>Toque em <strong>Adicionar</strong> no canto superior direito. Pronto!</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Copy link fallback */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#060B18] border border-[#1B2F5C] text-xs text-gray-300">
                <span className="text-[11px] truncate mr-2 text-gray-400">
                  Copiar endereço oficial para o navegador
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-lg text-white font-bold text-[10px] flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  {copiedLink ? 'Link Copiado !' : 'Copiar link'}
                </button>
              </div>

              {/* Benefits Cards */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2 rounded-xl bg-[#060B18] border border-[#1B2F5C] flex flex-col items-center">
                  <Zap size={15} className="text-blue-400 mb-1" />
                  <span className="text-[10px] font-bold text-white">Rápido</span>
                  <span className="text-[8px] text-gray-400">Sem travamento</span>
                </div>
                <div className="p-2 rounded-xl bg-[#060B18] border border-[#1B2F5C] flex flex-col items-center">
                  <WifiOff size={15} className="text-amber-400 mb-1" />
                  <span className="text-[10px] font-bold text-white">Modo Offline</span>
                  <span className="text-[8px] text-gray-400">Apostilas salvas</span>
                </div>
                <div className="p-2 rounded-xl bg-[#060B18] border border-[#1B2F5C] flex flex-col items-center">
                  <ShieldCheck size={15} className="text-emerald-400 mb-1" />
                  <span className="text-[10px] font-bold text-white">Oficial</span>
                  <span className="text-[8px] text-gray-400">UN2D</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-[#060B18] border-t border-[#1B2F5C] flex items-center justify-between">
          <span className="text-[10px] text-gray-400 flex items-center gap-1">
            <Sparkles size={12} className="text-blue-400" />
            Aplicativo Web Progressivo (PWA)
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallModal;
