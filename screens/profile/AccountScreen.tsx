import React, { useState, useRef } from 'react';
import { UserProfile } from '../../types';
import { 
  Save, Camera, CreditCard, MapPin, Phone, Mail, User, 
  Clock, CheckCircle, Shield, KeyRound, Lock, Eye, EyeOff, 
  Briefcase, Plus, X, Download, FileText, Check, AlertCircle, RefreshCw
} from 'lucide-react';

interface AccountScreenProps {
  user: UserProfile;
  onUpdate: (u: UserProfile) => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ user, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'billing'>('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State initialized to Eduardo Martins Silveira per screenshot
  const [formData, setFormData] = useState({
    name: user.name || 'Eduardo Martins Silveira',
    email: user.email || 'eduardo.silveira@undd.academy',
    cpf: user.cpf || '458.912.308-20',
    avatar: user.avatar || '/perfil.jpg',
    level: user.level || 8,
    badges: user.badges || ['Certificado', 'Aluno Destaque'],
    plan: user.plan || 'Acesso Completo UN2D Academy',
    phone: user.phone || '(11) 98765-4321',
    title: user.title || 'Profissional de Tecnologia e Gestão',
    bio: user.bio || 'Estudante dedicado ao desenvolvimento técnico, liderança ética e aperfeiçoamento profissional contínuo.',
    address: user.address || 'Av. Paulista, 1000',
    city: user.city || 'São Paulo, SP',
    skills: user.skills || ['Indústria 4.0', 'Gestão Financeira', 'Comunicação Ética', 'Informática Aplicada']
  });

  const [newSkill, setNewSkill] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Security tab state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passwordFeedback, setPasswordFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Image upload handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('Atenção: A imagem ultrapassa o tamanho máximo de 5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        const updated = { ...formData, avatar: result };
        setFormData(updated);
        onUpdate(updated);
        try {
          localStorage.setItem('undd_user_profile', JSON.stringify(updated));
        } catch {
          // LocalStorage fallback handled
        }
        showToast('Foto de perfil atualizada com sucesso!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleResetAvatar = () => {
    const updated = { ...formData, avatar: '/perfil.jpg' };
    setFormData(updated);
    onUpdate(updated);
    try {
      localStorage.setItem('undd_user_profile', JSON.stringify(updated));
    } catch {
      // Ignored
    }
    showToast('Foto de perfil restaurada para o padrão.');
  };

  // Profile Save
  const handleSaveProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onUpdate(formData);
      try {
        localStorage.setItem('undd_user_profile', JSON.stringify(formData));
      } catch {
        // Ignored
      }
      setIsSaving(false);
      showToast('Dados cadastrais atualizados com sucesso!');
    }, 500);
  };

  // Password update handler
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setPasswordFeedback({ type: 'error', text: 'Por favor, informe a senha atual.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordFeedback({ type: 'error', text: 'A nova senha deve ter no mínimo 6 caracteres.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordFeedback({ type: 'error', text: 'A confirmação de senha não confere.' });
      return;
    }

    setPasswordFeedback({ type: 'success', text: 'Senha alterada com sucesso!' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Senha de acesso redefinida com segurança.');
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) });
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 animate-in fade-in duration-300 pb-36 text-white max-w-5xl mx-auto">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[120] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-in slide-in-from-top duration-300">
          <CheckCircle size={18} className="text-white shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        accept="image/png, image/jpeg, image/webp" 
        className="hidden" 
      />

      {/* Hero Card Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0C162E] via-[#0E1B38] to-[#14234B] border border-[#1B2F5C] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          
          {/* Avatar with hover upload trigger */}
          <div className="relative group/avatar cursor-pointer" onClick={handleTriggerUpload}>
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#1E40AF] overflow-hidden bg-black/40 shadow-xl group-hover/avatar:border-blue-400 transition-all">
              <img 
                src={formData.avatar} 
                alt={formData.name} 
                className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-300" 
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover/avatar:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-[10px] font-bold">
              <Camera size={20} className="mb-1 text-blue-300" />
              <span>Alterar</span>
            </div>
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); handleTriggerUpload(); }}
              className="absolute bottom-0 right-0 p-2 bg-[#F59E0B] text-black rounded-full shadow-lg hover:bg-amber-400 transition-transform active:scale-90 border-2 border-[#060B18]"
              title="Carregar nova foto"
            >
              <Camera size={14} />
            </button>
          </div>

          {/* User Meta Information */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                {formData.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/40 text-[10px] font-bold uppercase tracking-wider">
                {formData.plan}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 font-medium flex items-center justify-center sm:justify-start gap-2">
              <Briefcase size={14} className="text-[#3B82F6]" /> {formData.title}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-gray-400 pt-1">
              <span className="flex items-center gap-1.5"><MapPin size={13} className="text-gray-400" /> {formData.city}</span>
              <span>•</span>
              <span className="font-mono text-gray-300 text-[11px]">ID: {formData.cpf}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <button
                type="button"
                onClick={handleTriggerUpload}
                className="text-[11px] font-bold px-3 py-1 bg-white/10 hover:bg-white/15 rounded-lg text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Camera size={12} /> Alterar foto de perfil
              </button>
              <button
                type="button"
                onClick={handleResetAvatar}
                className="text-[11px] font-bold px-3 py-1 bg-transparent hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Restaurar padrão
              </button>
            </div>
          </div>

          {/* Student Status Card */}
          <div className="bg-[#060B18]/70 border border-[#1B2F5C] p-4 rounded-2xl text-center min-w-[130px] shadow-lg shrink-0">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Status do Aluno</span>
            <span className="text-lg font-black text-amber-400 block mt-0.5">Nível {formData.level}</span>
            <span className="text-[10px] text-emerald-400 font-semibold block mt-1">4 Certificados</span>
          </div>

        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1B2F5C] pb-2 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#1E40AF] text-white shadow-lg shadow-blue-900/40 border border-blue-400/40'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <User size={15} /> Informações Pessoais
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'security'
              ? 'bg-[#1E40AF] text-white shadow-lg shadow-blue-900/40 border border-blue-400/40'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <KeyRound size={15} /> Segurança &amp; Senha
        </button>

        <button
          onClick={() => setActiveTab('billing')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'billing'
              ? 'bg-[#1E40AF] text-white shadow-lg shadow-blue-900/40 border border-blue-400/40'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <CreditCard size={15} /> Assinatura &amp; Acesso
        </button>
      </div>

      {/* TAB 1: Informações Pessoais */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          
          {/* Identidade & Cargo */}
          <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2 pb-1 border-b border-white/5">
              <User size={15} /> Identidade &amp; Cargo Profissional
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase">Nome Completo</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl pl-10 pr-4 py-3 text-xs text-white outline-none focus:border-blue-500 transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase">Título Profissional / Área</label>
                <div className="relative">
                  <Briefcase size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl pl-10 pr-4 py-3 text-xs text-white outline-none focus:border-blue-500 transition-colors"
                    placeholder="Ex: Profissional de Tecnologia e Gestão"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-300 uppercase">Apresentação / Biografia Profissional</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl p-3.5 text-xs text-white outline-none focus:border-blue-500 transition-colors resize-none leading-relaxed"
                placeholder="Descreva sua trajetória profissional e metas na UN2D Academy..."
              />
            </div>
          </div>

          {/* Contato & Localização */}
          <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2 pb-1 border-b border-white/5">
              <Phone size={15} /> Contato &amp; Localização
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase">E-mail Cadastrado</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl pl-10 pr-4 py-3 text-xs text-white outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase">Telefone / WhatsApp</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl pl-10 pr-4 py-3 text-xs text-white outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase">Cidade / Estado</label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl pl-10 pr-4 py-3 text-xs text-white outline-none focus:border-blue-500 transition-colors"
                    placeholder="Ex: São Paulo, SP"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 uppercase">Endereço Residencial</label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl pl-10 pr-4 py-3 text-xs text-white outline-none focus:border-blue-500 transition-colors"
                    placeholder="Ex: Av. Paulista, 1000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Competências & Especialidades */}
          <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2 pb-1 border-b border-white/5">
              <CheckCircle size={15} /> Competências &amp; Especialidades de Estudo
            </h3>

            <div className="flex flex-wrap gap-2 pt-1">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-[#060B18] border border-[#1B2F5C] text-white text-xs font-bold rounded-xl flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                placeholder="Adicionar nova competência (ex: Redação Nota 1000, Gestão de Projetos)..."
                className="flex-1 bg-[#060B18] border border-[#1B2F5C] rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} /> Adicionar
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer transition-all disabled:opacity-50"
            >
              <Save size={15} />
              {isSaving ? 'Salvando alterações...' : 'Salvar Alterações'}
            </button>
          </div>

        </form>
      )}

      {/* TAB 2: Segurança & Senha */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <form onSubmit={handleUpdatePassword} className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2 pb-1 border-b border-white/5">
              <Lock size={15} /> Alteração de Senha
            </h3>

            {passwordFeedback && (
              <div className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                passwordFeedback.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                {passwordFeedback.type === 'success' ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
                <span>{passwordFeedback.text}</span>
              </div>
            )}

            <div className="space-y-3 max-w-md">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-300 uppercase">Senha Atual</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                  placeholder="Digite sua senha atual"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-300 uppercase">Nova Senha</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                  placeholder="Mínimo de 6 caracteres"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-300 uppercase">Confirmar Nova Senha</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                  placeholder="Repita a nova senha"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] font-bold text-gray-400 hover:text-white flex items-center gap-1.5 cursor-pointer pt-1"
              >
                {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                {showPassword ? 'Ocultar caracteres' : 'Exibir caracteres digitados'}
              </button>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-md"
              >
                Atualizar Senha
              </button>
            </div>
          </form>

          {/* Autenticação em Duas Etapas */}
          <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Autenticação em Dois Fatores (2FA)</h4>
                  <p className="text-[11px] text-gray-400">Protege o acesso à sua conta e aos seus certificados emitidos</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTwoFactorEnabled(!twoFactorEnabled);
                  showToast(twoFactorEnabled ? '2FA desativado' : '2FA ativado com sucesso');
                }}
                className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${twoFactorEnabled ? 'left-5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Assinatura & Acesso */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2 pb-1 border-b border-white/5">
              <CreditCard size={15} /> Plano e Acesso Institucional
            </h3>

            <div className="p-4 rounded-xl bg-[#060B18] border border-[#1B2F5C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                  Plano Ativo
                </span>
                <h4 className="text-sm font-bold text-white mt-1.5">Acesso Completo UN2D Academy</h4>
                <p className="text-xs text-gray-400 mt-0.5">Acesso ilimitado a todos os cursos, lives interativas e emissão de certificados oficiais.</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                Regular &amp; Ativo
              </span>
            </div>

            <div className="pt-2">
              <h4 className="text-[11px] font-bold text-gray-300 uppercase mb-3">Histórico de Matrícula</h4>
              <div className="space-y-2">
                {[
                  { date: '15/01/2026', desc: 'Matrícula Oficial UN2D Academy - Ciclo Anual', status: 'Confirmada', id: 'MAT-2026-904' },
                  { date: '10/02/2026', desc: 'Adesão ao Programa de Capacitação Técnica EJA', status: 'Concluída', id: 'MAT-2026-118' }
                ].map(item => (
                  <div key={item.id} className="p-3 bg-[#060B18] rounded-xl border border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">{item.desc}</span>
                      <span className="text-[10px] text-gray-400">{item.date} • Ref: {item.id}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AccountScreen;
