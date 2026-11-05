import React, { useState, useEffect } from 'react';
import { 
  Download, Settings, Trash2, FileText, CheckCircle, AlertCircle, Loader2, 
  X, Wifi, HardDrive, ShieldCheck, Check, Sparkles, FolderDown, Smartphone
} from 'lucide-react';
import { COURSES } from '../constants';
import { Material } from '../types';

interface DownloadsScreenProps {
  downloadedIds: string[];
  onRemoveDownload: (id: string) => void;
  onMaterialClick: (material: Material) => void;
}

interface DownloadSettings {
  quality: '1080p' | '720p' | '480p';
  wifiOnly: boolean;
  autoDownloadNext: boolean;
  storageTarget: 'internal' | 'sdcard' | 'browser';
  storageLimitGb: number;
}

const DEFAULT_SETTINGS: DownloadSettings = {
  quality: '1080p',
  wifiOnly: true,
  autoDownloadNext: false,
  storageTarget: 'internal',
  storageLimitGb: 32
};

const DownloadsScreen: React.FC<DownloadsScreenProps> = ({ 
  downloadedIds, 
  onRemoveDownload, 
  onMaterialClick 
}) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [settings, setSettings] = useState<DownloadSettings>(() => {
    try {
      const saved = localStorage.getItem('undd_download_settings');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignored
    }
    return DEFAULT_SETTINGS;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const updateSetting = <K extends keyof DownloadSettings>(key: K, value: DownloadSettings[K]) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    try {
      localStorage.setItem('undd_download_settings', JSON.stringify(updated));
    } catch {
      // Ignored
    }
    showToast('Preferência de download salva com sucesso.');
  };

  const downloadedMaterials = COURSES.reduce((acc: { material: Material; courseTitle: string }[], course) => {
    course.materials?.forEach(m => {
      if (downloadedIds.includes(m.id)) {
        acc.push({ material: m, courseTitle: course.title });
      }
    });
    return acc;
  }, []);

  const confirmDelete = () => {
    if (deleteId) {
      setIsDeleting(true);
      setTimeout(() => {
        onRemoveDownload(deleteId);
        setIsDeleting(false);
        setDeleteId(null);
        showToast('Documento removido dos downloads locais.');
      }, 350);
    }
  };

  const handleClearAllDownloads = () => {
    downloadedIds.forEach(id => onRemoveDownload(id));
    setShowClearAllModal(false);
    showToast('Todos os downloads offline foram removidos do dispositivo.');
  };

  return (
    <div className="min-h-screen bg-[#060B18] text-white px-4 sm:px-8 md:px-16 pt-12 md:pt-16 pb-28 flex flex-col animate-in fade-in duration-500">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[120] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-in slide-in-from-top duration-300">
          <CheckCircle size={18} className="text-white shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-end mb-10 border-b border-[#1B2F5C] pb-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-2">
            Aulas Salvas &amp; Downloads Offline
          </h1>
          <p className="text-xs md:text-sm text-gray-300">
            Acesse seus materiais de estudo e apostilas técnicas sem precisar de conexão com a internet.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-2">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Armazenamento</div>
            <div className="flex items-center gap-2">
              <div className="w-28 h-1.5 bg-[#0C162E] border border-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#1E40AF] w-[24%]" />
              </div>
              <span className="text-xs font-bold text-white">420 MB / {settings.storageLimitGb} GB</span>
            </div>
          </div>
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="p-3 bg-[#0C162E] hover:bg-[#0F1D3D] rounded-full text-white transition-all border border-[#1B2F5C] hover:border-blue-500 cursor-pointer shadow-md hover:scale-105 active:scale-95"
            title="Configurações de Downloads e Armazenamento"
            aria-label="Abrir configurações de download"
          >
            <Settings size={18} className="text-blue-400" />
          </button>
        </div>
      </div>

      <div className="flex-1">
        {downloadedMaterials.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Materiais Prontos para Uso Offline ({downloadedMaterials.length})
              </h3>
              <button 
                onClick={() => setShowClearAllModal(true)}
                className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider transition-colors"
              >
                <Trash2 size={14} />
                Limpar todos
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {downloadedMaterials.map(({ material, courseTitle }) => (
                <div 
                  key={material.id}
                  className="group relative bg-[#0C162E] border border-[#1B2F5C] hover:border-[#3B82F6] rounded-2xl p-5 flex flex-col justify-between hover:bg-[#0F1D3D] transition-all cursor-pointer h-52 shadow-lg"
                  onClick={() => onMaterialClick(material)}
                >
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-[#1E40AF]/20 text-[#3B82F6] rounded-xl flex items-center justify-center">
                      <FileText size={22} />
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(material.id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-full hover:bg-red-500/10 cursor-pointer"
                      title="Excluir arquivo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-2 mb-1">{material.title}</h4>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider line-clamp-1">{courseTitle}</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-[#10B981] font-bold uppercase tracking-wider pt-3 border-t border-white/10">
                    <CheckCircle size={14} /> Disponível Offline
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-[#0C162E] border border-[#1B2F5C] rounded-3xl flex items-center justify-center mb-5 text-[#3B82F6]">
              <Download size={36} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
              Nenhum material baixado ainda
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-6">
              Você pode baixar as apostilas e roteiros práticos dentro dos cursos para estudar quando e onde quiser, inclusive sem conexão de dados.
            </p>
          </div>
        )}
      </div>

      {/* Delete Single Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-3xl p-8 w-full max-w-sm text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-red-500/15 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
              <AlertCircle size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white uppercase">Remover este documento?</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                O arquivo será excluído do seu armazenamento local offline.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 pt-2">
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                {isDeleting ? <Loader2 size={16} className="animate-spin" /> : 'CONFIRMAR EXCLUSÃO'}
              </button>
              <button 
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="w-full py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Modal */}
      {showClearAllModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-3xl p-8 w-full max-w-sm text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-red-500/15 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
              <Trash2 size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white uppercase">Excluir todos os downloads?</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Todos os materiais e apostilas baixados offline serão removidos deste dispositivo.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 pt-2">
              <button 
                onClick={handleClearAllDownloads}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
              >
                LIMPAR TODOS OS ARQUIVOS
              </button>
              <button 
                onClick={() => setShowClearAllModal(false)}
                className="w-full py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Settings Modal (Totalmente Funcional) */}
      {showSettingsModal && (
        <div 
          className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setShowSettingsModal(false)}
        >
          <div 
            className="bg-[#0C162E] border border-[#1B2F5C] rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#1B2F5C] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <Settings size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold uppercase tracking-tight text-white">
                    Configurações de Downloads
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Gerencie a qualidade dos arquivos offline e o armazenamento do dispositivo
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Config 1: Qualidade de Download */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <FolderDown size={15} className="text-blue-400" /> Qualidade dos Downloads
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '1080p', label: '1080p Full HD', desc: 'Máxima nitidez' },
                  { id: '720p', label: '720p HD', desc: 'Recomendado' },
                  { id: '480p', label: '480p Econômico', desc: 'Menor espaço' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateSetting('quality', item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      settings.quality === item.id 
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md' 
                        : 'bg-[#060B18] border-[#1B2F5C] text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="block text-xs font-bold">{item.label}</span>
                    <span className="block text-[10px] text-gray-400 mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Config 2: Toggles Wi-Fi e Próximas Aulas */}
            <div className="space-y-3">
              {/* Wi-Fi Only */}
              <div 
                onClick={() => updateSetting('wifiOnly', !settings.wifiOnly)}
                className="flex items-center justify-between p-3.5 bg-[#060B18] rounded-xl border border-[#1B2F5C] cursor-pointer hover:border-blue-500/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                    <Wifi size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Baixar somente via Wi-Fi</h4>
                    <p className="text-[10px] text-gray-400">Evita consumo do seu plano de dados 4G/5G</p>
                  </div>
                </div>
                <div className={`w-11 h-6 rounded-full relative transition-colors ${settings.wifiOnly ? 'bg-blue-600' : 'bg-gray-700'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${settings.wifiOnly ? 'left-5' : 'left-0.5'}`} />
                </div>
              </div>

              {/* Auto Download Next */}
              <div 
                onClick={() => updateSetting('autoDownloadNext', !settings.autoDownloadNext)}
                className="flex items-center justify-between p-3.5 bg-[#060B18] rounded-xl border border-[#1B2F5C] cursor-pointer hover:border-blue-500/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Download automático do próximo módulo</h4>
                    <p className="text-[10px] text-gray-400">Baixa a próxima aula ao concluir a anterior</p>
                  </div>
                </div>
                <div className={`w-11 h-6 rounded-full relative transition-colors ${settings.autoDownloadNext ? 'bg-blue-600' : 'bg-gray-700'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${settings.autoDownloadNext ? 'left-5' : 'left-0.5'}`} />
                </div>
              </div>
            </div>

            {/* Config 3: Destino de Armazenamento */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <HardDrive size={15} className="text-blue-400" /> Local de Armazenamento
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateSetting('storageTarget', 'internal')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    settings.storageTarget === 'internal'
                      ? 'bg-blue-600/20 border-blue-500 text-white'
                      : 'bg-[#060B18] border-[#1B2F5C] text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <Smartphone size={16} className="text-blue-400 shrink-0" />
                  <div>
                    <span className="block text-xs font-bold">Memória Interna</span>
                    <span className="block text-[9px] text-gray-400">Padrão do dispositivo</span>
                  </div>
                </button>

                <button
                  onClick={() => updateSetting('storageTarget', 'browser')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    settings.storageTarget === 'browser'
                      ? 'bg-blue-600/20 border-blue-500 text-white'
                      : 'bg-[#060B18] border-[#1B2F5C] text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <HardDrive size={16} className="text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-xs font-bold">Cache Local PWA</span>
                    <span className="block text-[9px] text-gray-400">Armazenamento web</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Config 4: Limite Reservado */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Limite de Armazenamento Reservado
                </label>
                <span className="text-xs font-black text-blue-400">{settings.storageLimitGb} GB</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[2, 5, 10, 32].map((gb) => (
                  <button
                    key={gb}
                    onClick={() => updateSetting('storageLimitGb', gb)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      settings.storageLimitGb === gb
                        ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                        : 'bg-[#060B18] border-[#1B2F5C] text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {gb} GB
                  </button>
                ))}
              </div>
            </div>

            {/* Rodapé e Ações */}
            <div className="pt-3 border-t border-[#1B2F5C] flex flex-col gap-2.5">
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
              >
                Concluir &amp; Salvar Configurações
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DownloadsScreen;
