import React, { useState } from 'react';
import { 
  Bell, Wifi, Monitor, PlayCircle, Trash2, Smartphone, 
  Globe, HardDrive, CheckCircle2
} from 'lucide-react';
import { LanguageSelector } from '../../components/LanguageSelector';

interface AppSettings {
  promoEmails: boolean;
  pushNotifs: boolean;
  lessonReminders: boolean;
  wifiOnly: boolean;
  autoplay: boolean;
  quality: string;
  audioLanguage: string;
  storageUsedMb: number;
}

export const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('undd_app_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Ignored
      }
    }
    return {
      promoEmails: true,
      pushNotifs: true,
      lessonReminders: true,
      wifiOnly: true,
      autoplay: true,
      quality: 'auto',
      audioLanguage: 'pt',
      storageUsedMb: 142
    };
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showClearCacheModal, setShowClearCacheModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const updateSetting = <K extends keyof AppSettings>(key: K, val: AppSettings[K]) => {
    const updated = { ...settings, [key]: val };
    setSettings(updated);
    try {
      localStorage.setItem('undd_app_settings', JSON.stringify(updated));
    } catch {
      // Ignored
    }
    showToast('Configuração atualizada com sucesso.');
  };

  const toggle = (key: 'promoEmails' | 'pushNotifs' | 'lessonReminders' | 'wifiOnly' | 'autoplay') => {
    updateSetting(key, !settings[key]);
  };

  const handleClearCache = () => {
    updateSetting('storageUsedMb', 0);
    setShowClearCacheModal(false);
    showToast('Memória cache e dados temporários limpos com sucesso!');
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
      <div className="space-y-1">
        <h1 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
          Configurações da Plataforma
        </h1>
        <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">
          Personalize sua experiência de streaming, reprodução de aulas, notificações e gerenciamento de armazenamento no dispositivo.
        </p>
      </div>

      {/* Section 0: Idioma da Plataforma */}
      <section className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2 pb-1 border-b border-white/5">
          <Globe size={15} /> Idioma da Interface
        </h3>
        <p className="text-[10px] text-gray-400">
          Selecione seu idioma de preferência (Português Brasileiro padrão oficial da UN2D Academy).
        </p>
        <LanguageSelector variant="settings" onLanguageChange={() => showToast('Idioma atualizado com sucesso.')} />
      </section>

      {/* Section 1: Reprodução de Vídeo */}
      <section className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2 pb-1 border-b border-white/5">
          <Monitor size={15} /> Reprodução de Vídeo &amp; Qualidade
        </h3>

        <div className="space-y-3">
          {/* Quality selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-[#060B18] rounded-xl border border-white/5">
            <div>
              <h4 className="text-xs font-bold text-white">Resolução de streaming padrão</h4>
              <p className="text-[10px] text-gray-400">Ajuste a qualidade do player de acordo com sua conexão de internet.</p>
            </div>
            <select
              value={settings.quality}
              onChange={e => updateSetting('quality', e.target.value)}
              className="bg-[#0C162E] text-white text-xs border border-[#1B2F5C] rounded-xl px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="auto">Automática (Adaptativa)</option>
              <option value="1080p">Full HD 1080p (Máxima nitidez)</option>
              <option value="720p">HD 720p (Equilibrado)</option>
              <option value="480p">480p (Economia de dados móveis)</option>
            </select>
          </div>

          {/* Wi-Fi only toggle */}
          <div 
            onClick={() => toggle('wifiOnly')}
            className="flex items-center justify-between p-3.5 bg-[#060B18] rounded-xl border border-white/5 cursor-pointer hover:border-blue-500/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <Wifi size={17} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Downloads somente via Wi-Fi</h4>
                <p className="text-[10px] text-gray-400">Evita o consumo do seu plano de dados 4G/5G ao baixar videoaulas e PDFs.</p>
              </div>
            </div>
            <div className={`w-11 h-6 rounded-full relative transition-colors ${settings.wifiOnly ? 'bg-blue-600' : 'bg-gray-700'}`}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${settings.wifiOnly ? 'left-5' : 'left-0.5'}`} />
            </div>
          </div>

          {/* Autoplay toggle */}
          <div 
            onClick={() => toggle('autoplay')}
            className="flex items-center justify-between p-3.5 bg-[#060B18] rounded-xl border border-white/5 cursor-pointer hover:border-blue-500/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                <PlayCircle size={17} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Reprodução contínua (Autoplay)</h4>
                <p className="text-[10px] text-gray-400">Inicia a próxima aula do módulo automaticamente ao término do vídeo.</p>
              </div>
            </div>
            <div className={`w-11 h-6 rounded-full relative transition-colors ${settings.autoplay ? 'bg-blue-600' : 'bg-gray-700'}`}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${settings.autoplay ? 'left-5' : 'left-0.5'}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Notifications */}
      <section className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2 pb-1 border-b border-white/5">
          <Bell size={15} /> Notificações &amp; Avisos de Aulas
        </h3>

        <div className="space-y-3">
          <div 
            onClick={() => toggle('pushNotifs')}
            className="flex items-center justify-between p-3.5 bg-[#060B18] rounded-xl border border-white/5 cursor-pointer hover:border-blue-500/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <Smartphone size={17} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Notificações Push no Dispositivo</h4>
                <p className="text-[10px] text-gray-400">Receba alertas de novas aulas, lives e novos cursos liberados na plataforma.</p>
              </div>
            </div>
            <div className={`w-11 h-6 rounded-full relative transition-colors ${settings.pushNotifs ? 'bg-blue-600' : 'bg-gray-700'}`}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${settings.pushNotifs ? 'left-5' : 'left-0.5'}`} />
            </div>
          </div>

          <div 
            onClick={() => toggle('lessonReminders')}
            className="flex items-center justify-between p-3.5 bg-[#060B18] rounded-xl border border-white/5 cursor-pointer hover:border-blue-500/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                <Bell size={17} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Lembretes de Estudo e Produtividade</h4>
                <p className="text-[10px] text-gray-400">Mantenha a consistência de estudos para concluir sua capacitação profissional.</p>
              </div>
            </div>
            <div className={`w-11 h-6 rounded-full relative transition-colors ${settings.lessonReminders ? 'bg-blue-600' : 'bg-gray-700'}`}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${settings.lessonReminders ? 'left-5' : 'left-0.5'}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Armazenamento & Cache */}
      <section className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2 pb-1 border-b border-white/5">
          <HardDrive size={15} /> Armazenamento Local e Cache
        </h3>

        <div className="p-4 bg-[#060B18] rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-white">Espaço em Cache Utilizado</h4>
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-md text-[10px] font-bold">
                {settings.storageUsedMb} MB
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              Arquivos temporários de apostilas PDF, miniaturas e dados de aulas salvas no navegador.
            </p>
          </div>

          <button
            onClick={() => setShowClearCacheModal(true)}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shrink-0"
          >
            <Trash2 size={14} />
            Limpar Cache
          </button>
        </div>
      </section>

      {/* Section 4: Versão & Institucional */}
      <div className="p-4 rounded-2xl bg-[#0C162E] border border-[#1B2F5C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-400">
        <div>
          <span className="font-bold text-white block">UN2D Academy • Versão 3.0 Oficial</span>
          <span className="text-[10px]">União Nacional de Docentes de Direita — Capacitação e Excelência Técnica.</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
          Ambiente Seguro &amp; Conectado
        </span>
      </div>

      {/* Clear Cache Modal */}
      {showClearCacheModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-3xl p-6 sm:p-8 w-full max-w-sm space-y-4 shadow-2xl text-white text-center">
            <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto">
              <Trash2 size={22} />
            </div>
            <h3 className="text-base font-bold uppercase tracking-tight">Limpar cache da plataforma?</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Esta ação removerá dados temporários para liberar espaço no seu dispositivo. Seus cursos inscritos e progresso na plataforma serão mantidos com segurança.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleClearCache}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Confirmar Limpeza ({settings.storageUsedMb} MB)
              </button>
              <button
                onClick={() => setShowClearCacheModal(false)}
                className="w-full py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SettingsScreen;
