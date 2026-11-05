import React, { useState, useEffect, useRef } from 'react';
import { 
  CreditCard, ShieldCheck, HelpCircle, 
  LogOut, Settings, Award, ChevronLeft, 
  ChevronRight, Camera, CheckCircle2 
} from 'lucide-react';
import { UserProfile, Certificate } from '../types';

import AccountScreen from './profile/AccountScreen';
import CertificatesScreen from './profile/CertificatesScreen';
import LegalScreen from './profile/LegalScreen';
import SupportScreen from './profile/SupportScreen';
import SettingsScreen from './profile/SettingsScreen';
import { CertificateViewerModal } from '../components/CertificateViewerModal';

type SubViewType = 'account' | 'certs' | 'privacy' | 'support' | 'settings';

interface ProfileScreenProps {
  onLogout: () => void;
}

const DEFAULT_USER: UserProfile = {
  name: 'Eduardo Martins Silveira',
  email: 'eduardo.silveira@undd.academy',
  cpf: '458.912.308-20',
  avatar: '/perfil.jpg',
  level: 8,
  badges: ['Certificado UNDD', 'Membro Ativo'],
  plan: 'Acesso Completo UNDD Academy',
  phone: '(11) 98765-4321',
  title: 'Profissional de Tecnologia e Gestão',
  bio: 'Estudante dedicado ao desenvolvimento técnico, liderança ética e aperfeiçoamento profissional contínuo.',
  city: 'São Paulo, SP',
  address: 'Av. Paulista, 1000',
  skills: ['Indústria 4.0', 'Gestão Financeira', 'Comunicação Ética', 'Informática Aplicada']
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const [activeSubView, setActiveSubView] = useState<SubViewType | null>(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      return 'account';
    }
    return null;
  });

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const headerFileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('undd_user_profile');
    if (saved) {
      try {
        return { ...DEFAULT_USER, ...JSON.parse(saved) };
      } catch {
        // Fallback
      }
    }
    return DEFAULT_USER;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUserUpdate = (updated: UserProfile) => {
    setUser(updated);
    try {
      localStorage.setItem('undd_user_profile', JSON.stringify(updated));
    } catch {
      // Ignored
    }
  };

  const handleHeaderPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        const updated = { ...user, avatar: result };
        handleUserUpdate(updated);
        showToast('Foto de perfil atualizada com sucesso!');
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && activeSubView === null) {
        setActiveSubView('account');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSubView]);

  const menuItems = [
    { id: 'account' as SubViewType, label: 'Minha Conta', icon: CreditCard, subtitle: 'Dados cadastrais, segurança e acesso' },
    { id: 'certs' as SubViewType, label: 'Meus Certificados', icon: Award, subtitle: 'Certificados emitidos com validação' },
    { id: 'privacy' as SubViewType, label: 'Termos & Privacidade', icon: ShieldCheck, subtitle: 'Diretrizes, LGPD e compromisso ético' },
    { id: 'support' as SubViewType, label: 'Suporte & Ajuda', icon: HelpCircle, subtitle: 'Canais de atendimento ao aluno' },
    { id: 'settings' as SubViewType, label: 'Configurações da Plataforma', icon: Settings, subtitle: 'Qualidade de vídeo e preferências' },
  ];

  const renderActiveScreen = () => {
    const currentView = activeSubView || 'account';
    switch (currentView) {
      case 'account':
        return <AccountScreen user={user} onUpdate={handleUserUpdate} />;
      case 'certs':
        return <CertificatesScreen userName={user.name} onViewCertificate={setSelectedCert} />;
      case 'privacy':
        return <LegalScreen />;
      case 'support':
        return <SupportScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <AccountScreen user={user} onUpdate={handleUserUpdate} />;
    }
  };

  const MobileHeader = ({ title, onBack }: { title: string; onBack: () => void }) => (
    <div className="px-4 py-3.5 border-b border-[#1B2F5C] flex items-center gap-3 bg-[#060B18] sticky top-0 z-50 md:hidden shadow-md">
      <button 
        onClick={onBack} 
        className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white"
        aria-label="Voltar ao menu perfil"
      >
        <ChevronLeft size={20} />
      </button>
      <div className="min-w-0 flex-1">
        <h2 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider truncate">
          {title}
        </h2>
        <span className="text-[10px] text-[#3B82F6] font-semibold block truncate">
          Espaço do Aluno • UNDD Academy
        </span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#060B18] overflow-hidden text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[130] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-in slide-in-from-top duration-300">
          <CheckCircle2 size={18} className="text-white shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Hidden file input */}
      <input 
        type="file" 
        ref={headerFileInputRef} 
        onChange={handleHeaderPhotoChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* MOBILE SUBVIEW */}
      {activeSubView !== null && (
        <div className="md:hidden fixed inset-0 bg-[#060B18] z-[60] flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
          <MobileHeader 
            title={menuItems.find(i => i.id === activeSubView)?.label || 'Minha Conta'} 
            onBack={() => setActiveSubView(null)} 
          />
          <div className="flex-1 overflow-y-auto hide-scrollbar overscroll-contain">
            {renderActiveScreen()}
          </div>
        </div>
      )}

      {/* SIDEBAR DO PERFIL */}
      <div className="w-full md:w-[340px] lg:w-[380px] md:border-r border-[#1B2F5C] overflow-y-auto h-full bg-[#060B18] relative z-10 hide-scrollbar overscroll-contain shrink-0 flex flex-col">
        
        {/* Profile Header Card */}
        <div className="pt-16 sm:pt-20 md:pt-16 pb-6 px-6 text-center bg-gradient-to-b from-[#0C162E] to-[#060B18] border-b border-[#1B2F5C]/60 relative">
          
          <div className="relative inline-block mb-3 group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-[#1E40AF] shadow-2xl mx-auto flex items-center justify-center bg-[#0C162E]">
              <img 
                src={user.avatar} 
                className="w-full h-full rounded-full object-cover object-center aspect-square" 
                alt={user.name}
              />
            </div>

            <button
              onClick={() => headerFileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-[#F59E0B] hover:bg-[#D97706] p-1.5 rounded-full text-black shadow-md border-2 border-[#060B18] cursor-pointer transition-transform hover:scale-110 active:scale-95"
              title="Alterar foto de perfil"
            >
              <Camera size={13} />
            </button>
          </div>

          <h1 className="text-base sm:text-lg font-black tracking-tight text-white mb-0.5 uppercase truncate">
            {user.name}
          </h1>
          <p className="text-[11px] text-[#3B82F6] font-bold uppercase tracking-wider">
            {user.plan}
          </p>
          <span className="inline-block mt-1.5 px-3 py-0.5 rounded-full bg-[#1E40AF]/30 border border-[#3B82F6]/40 text-[10px] font-semibold text-gray-300">
            Nível {user.level} • Aluno Oficial UNDD
          </span>
        </div>

        {/* Navigation Menu Cards */}
        <div className="p-4 space-y-2 flex-1 pb-36 md:pb-24">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSubView === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => setActiveSubView(item.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all border text-left cursor-pointer group ${
                  isActive 
                    ? 'bg-[#1E40AF] border-[#3B82F6] text-white shadow-lg shadow-[#1E40AF]/30 scale-[1.01]' 
                    : 'bg-[#0C162E]/70 border-[#1B2F5C]/60 text-gray-200 hover:bg-[#0C162E] hover:border-[#1B2F5C] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                    isActive 
                      ? 'bg-white/20 text-white shadow-sm' 
                      : 'bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-white/10'
                  }`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold tracking-wide truncate">
                      {item.label}
                    </span>
                    <span className={`text-[10px] block truncate ${
                      isActive ? 'text-white/80' : 'text-gray-400'
                    }`}>
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                
                <ChevronRight 
                  size={15} 
                  className={`shrink-0 transition-transform ${
                    isActive ? 'text-white translate-x-0.5' : 'text-gray-500 group-hover:text-gray-300'
                  }`} 
                />
              </button>
            );
          })}

          {/* Logout Button */}
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-3.5 p-3.5 mt-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all border border-transparent hover:border-red-500/20 group cursor-pointer"
          >
            <div className="p-2.5 bg-red-500/10 rounded-xl group-hover:bg-red-500/20 text-red-400 shrink-0">
              <LogOut size={18} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">Sair da Plataforma</span>
          </button>
        </div>
      </div>

      {/* DESKTOP DETAIL CONTENT PANE */}
      <div className="hidden md:flex flex-1 flex-col bg-[#060B18] overflow-hidden relative">
        <div className="flex-1 overflow-y-auto hide-scrollbar relative z-10 overscroll-contain">
          {renderActiveScreen()}
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      <CertificateViewerModal 
        certificate={selectedCert}
        userName={user.name}
        onClose={() => setSelectedCert(null)}
      />

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0C162E] border border-[#1B2F5C] p-8 rounded-3xl w-full max-w-sm space-y-5 text-center shadow-2xl text-white">
            <div className="w-14 h-14 bg-red-500/15 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/30">
              <LogOut size={26} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold uppercase tracking-tight">Deseja sair da conta?</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Você precisará entrar novamente para acessar seus cursos e certificados.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 pt-2">
              <button 
                onClick={() => { setShowLogoutConfirm(false); onLogout(); }}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                CONFIRMAR SAÍDA
              </button>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfileScreen;
