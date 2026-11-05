import React, { useState } from 'react';
import { Download, Share2, X } from 'lucide-react';
import { usePWAInstall } from './usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';
import { Logo } from './Logo';

export const PWAInstallBanner: React.FC = () => {
  const {
    isInstallable,
    isInstalled,
    isIOS,
    isAndroid,
    install,
  } = usePWAInstall();

  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('pwa_banner_dismissed') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [isTriggering, setIsTriggering] = useState(false);

  if (isInstalled || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('pwa_banner_dismissed', 'true');
    } catch (e) {}
  };

  const handleDirectInstall = async () => {
    setIsTriggering(true);
    try {
      const result = await install(isIOS ? 'ios' : 'android');
      setIsTriggering(false);
      
      if (!result.success && result.mode !== 'already-installed') {
        setShowModal(true);
      }
    } catch (e) {
      setIsTriggering(false);
      setShowModal(true);
    }
  };

  return (
    <>
      <aside 
        aria-label="Instalação do aplicativo"
        className="fixed bottom-16 md:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-[#0C162E]/95 backdrop-blur-xl border border-[#1B2F5C] rounded-2xl p-3 sm:p-3.5 shadow-2xl animate-in slide-in-from-bottom duration-300 text-white"
      >
        <div className="flex items-center justify-between gap-3">
          
          {/* App Icon + Info */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-xl bg-[#060B18] p-1 border border-[#1B2F5C] shadow-md shrink-0 flex items-center justify-center">
              <Logo variant="icon-only" className="w-full h-full" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-black uppercase tracking-wide text-white truncate">
                  Instalar UNDD Academy
                </h4>
                <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded-full font-bold uppercase shrink-0">
                  App
                </span>
              </div>
              <p className="text-[10px] text-gray-300 truncate">
                {isIOS ? 'No seu iPhone & iPad' : 'Acesso rápido e modo offline'}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleDirectInstall}
              disabled={isTriggering}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all cursor-pointer border border-blue-400/40"
            >
              {isTriggering ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isIOS ? (
                <>
                  <Share2 size={13} />
                  <span>Instalar</span>
                </>
              ) : (
                <>
                  <Download size={13} />
                  <span>Instalar</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Fechar aviso"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </aside>

      <PWAInstallModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
        isIOS={isIOS}
        isAndroid={isAndroid}
        onInstall={install}
      />
    </>
  );
};

export default PWAInstallBanner;
