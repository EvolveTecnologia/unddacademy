import React, { useState } from 'react';
import { X, Check, ShieldCheck, Lock, CreditCard, Sparkles, Building2, QrCode } from 'lucide-react';
import { Course } from '../types';

interface CheckoutModalProps {
  course: Course;
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ course, onClose, onSuccess }) => {
  const [fullName, setFullName] = useState('Eduardo Martins Silveira');
  const [email, setEmail] = useState('eduardo.silveira@undd.academy');
  const [phone, setPhone] = useState('(11) 98765-4321');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'boleto'>('pix');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleFinishAccess = () => {
    setIsSuccess(false);
    onSuccess();
    onClose();
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-[#0C162E] border border-emerald-500/40 rounded-3xl p-6 sm:p-10 w-full max-w-lg text-center space-y-6 shadow-2xl text-white">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/30">
            <Check size={36} />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Matrícula Confirmada
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              Acesso Liberado com Sucesso!
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
              Seu acesso ao curso <strong className="text-white">{course.title}</strong> foi ativado na UNDD Academy.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#060B18] border border-[#1B2F5C] text-left space-y-2 text-xs">
            <div className="flex justify-between items-center text-gray-300">
              <span>Aluno:</span>
              <strong className="text-white">{fullName}</strong>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Docente:</span>
              <strong className="text-blue-400">{course.instructor}</strong>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Certificação:</span>
              <strong className="text-white">União Nacional de Docentes de Direita</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={handleFinishAccess}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl cursor-pointer"
          >
            Acessar Aulas Imediatamente →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-auto">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#060B18] border-b border-[#1B2F5C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <Lock size={20} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-tight">
                Inscrição &amp; Matrícula Oficial
              </h2>
              <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-emerald-400" />
                Criptografia SSL 256 bits • UNDD Academy Brasil
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form & Summary Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Order Summary */}
          <div className="md:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-[#1B2F5C] bg-[#060B18] relative aspect-video">
              <img 
                src={course.heroImage || course.thumbnail} 
                alt={course.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <span className="text-[9px] font-black uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded">
                  {course.category}
                </span>
                <h3 className="text-xs font-bold text-white line-clamp-1 mt-1">{course.title}</h3>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#060B18] border border-[#1B2F5C] space-y-2 text-xs">
              <div className="flex justify-between items-center text-gray-400">
                <span>Carga Horária:</span>
                <span className="font-bold text-white">{course.duration}</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Certificado:</span>
                <span className="font-bold text-emerald-400">Incluso (Com registro)</span>
              </div>
              <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                <span className="font-bold text-white uppercase text-xs">Acesso:</span>
                <span className="text-xs font-black text-amber-400 uppercase">Integral</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-[11px] text-gray-300">
              <ShieldCheck size={20} className="text-blue-400 shrink-0" />
              <span>Garantia de acesso contínuo e materiais autorizados para download.</span>
            </div>
          </div>

          {/* Right Column: User Info & Payment Method */}
          <div className="md:col-span-7 space-y-5">
            
            {/* Student Info */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                1. Seus Dados de Aluno
              </h3>

              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="block text-gray-300 font-bold mb-1 text-[11px]">Nome Completo *</label>
                  <input 
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-[#1B2F5C] text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1 text-[11px]">E-mail de Acesso *</label>
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-[#1B2F5C] text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-bold mb-1 text-[11px]">Telefone (WhatsApp) *</label>
                    <input 
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-[#1B2F5C] text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-1">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                2. Forma de Matrícula
              </h3>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer ${
                    paymentMethod === 'pix'
                      ? 'bg-blue-600/30 border-blue-400 text-white shadow-md'
                      : 'bg-[#060B18] border-[#1B2F5C] text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <QrCode size={18} className="text-emerald-400" />
                  <span className="text-[10px] font-bold">Pix Instantâneo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-blue-600/30 border-blue-400 text-white shadow-md'
                      : 'bg-[#060B18] border-[#1B2F5C] text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <CreditCard size={18} className="text-blue-400" />
                  <span className="text-[10px] font-bold">Cartão de Crédito</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('boleto')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer ${
                    paymentMethod === 'boleto'
                      ? 'bg-blue-600/30 border-blue-400 text-white shadow-md'
                      : 'bg-[#060B18] border-[#1B2F5C] text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Building2 size={18} className="text-amber-400" />
                  <span className="text-[10px] font-bold">Boleto Bancário</span>
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl hover:scale-[1.01] active:scale-95 cursor-pointer border border-blue-400/40 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processando inscrição...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>CONFIRMAR E LIBERAR ACESSO AO CURSO</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-gray-400 text-center">
              Ao confirmar, você declara concordar com as diretrizes e termos de uso da UNDD Academy.
            </p>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CheckoutModal;
