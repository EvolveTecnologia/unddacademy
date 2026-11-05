import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Phone, Home, AlertCircle, Sparkles } from 'lucide-react';
import { Logo } from '../components/Logo';

interface AuthScreenProps {
  onLogin: () => void;
  onBack?: () => void;
}

type AuthMode = 'login' | 'register' | 'forgot' | 'terms' | 'privacy';

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onBack }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('aluno@undd.academy');
  const [loginPassword, setLoginPassword] = useState('@123456@');
  const [loginError, setLoginError] = useState('');

  // Register State
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'register') {
      if (!termsAccepted) return;
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1000);
      return;
    }

    if (mode === 'login') {
      if (
        (loginEmail === 'aluno@undd.academy' && loginPassword === '@123456@') ||
        (loginEmail.includes('@') && loginPassword.length >= 6)
      ) {
        setLoginError('');
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          onLogin();
        }, 1000);
      } else {
        setLoginError('E-mail ou senha inválidos. Verifique suas credenciais.');
        setIsLoading(false);
      }
    }
  };

  const fillDemoCredentials = () => {
    setLoginEmail('aluno@undd.academy');
    setLoginPassword('@123456@');
    setLoginError('');
  };

  const renderLogin = () => (
    <div className="w-full space-y-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-1">
        <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">
          Acessar Plataforma
        </h1>
        <p className="text-[11px] text-gray-300">Entre com seu e-mail e senha cadastrados</p>
      </div>

      {loginError && (
        <div className="bg-red-500/15 border border-red-500/30 rounded-xl p-3 flex items-center gap-2 animate-in fade-in">
          <AlertCircle size={16} className="text-red-400 shrink-0" />
          <p className="text-[11px] font-semibold text-red-300">{loginError}</p>
        </div>
      )}

      {/* Demo Credentials Helper */}
      <button 
        type="button"
        onClick={fillDemoCredentials}
        className="w-full py-2.5 px-3.5 bg-[#1E40AF]/20 hover:bg-[#1E40AF]/30 border border-[#3B82F6]/40 rounded-xl flex items-center justify-between text-left text-[11px] text-[#60A5FA] transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-1.5 font-bold">
          <Sparkles size={13} className="text-[#F59E0B]" />
          Acesso Demonstração
        </span>
        <span className="text-gray-300 font-mono text-[10px]">aluno@undd.academy</span>
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">E-mail</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="email" 
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Senha</label>
            <button 
              type="button" 
              onClick={() => setMode('forgot')}
              className="text-[10px] text-[#60A5FA] hover:underline cursor-pointer"
            >
              Esqueci minha senha
            </button>
          </div>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type={showPassword ? 'text' : 'password'} 
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl py-3 pl-10 pr-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6]"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-gray-400 hover:text-white cursor-pointer"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold py-3.5 rounded-xl uppercase tracking-widest text-xs transition-all shadow-md hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Entrar na Plataforma'
          )}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-[11px] text-gray-400">
          Ainda não tem cadastro?{' '}
          <button 
            type="button" 
            onClick={() => setMode('register')}
            className="text-[#60A5FA] font-bold hover:underline cursor-pointer"
          >
            Cadastre-se gratuitamente
          </button>
        </p>
      </div>
    </div>
  );

  const renderRegister = () => (
    <div className="w-full space-y-4 animate-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-1">
        <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">
          Criar Conta
        </h1>
        <p className="text-[11px] text-gray-300">Comece sua jornada profissional na UNDD Academy</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Nome Completo</label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="text" 
              required
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              placeholder="Ex : Carlos Alberto da Silva"
              className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">E-mail</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="email" 
              required
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              placeholder="seu.email@exemplo.com"
              className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Telefone / WhatsApp</label>
          <div className="relative flex items-center">
            <Phone className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="tel" 
              required
              value={registerData.phone}
              onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
              placeholder="(11) 98765-4321"
              className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Criar Senha</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type={showPassword ? 'text' : 'password'} 
              required
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl py-2.5 pl-10 pr-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6]"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-gray-400 hover:text-white cursor-pointer"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-2 pt-2">
          <input 
            type="checkbox"
            id="termsCheck"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 accent-[#1E40AF]"
          />
          <label htmlFor="termsCheck" className="text-[10px] text-gray-300 leading-tight">
            Li e aceito os{' '}
            <button type="button" onClick={() => setMode('terms')} className="text-[#60A5FA] underline cursor-pointer">
              Termos de Uso
            </button>{' '}
            e a{' '}
            <button type="button" onClick={() => setMode('privacy')} className="text-[#60A5FA] underline cursor-pointer">
              Política de Privacidade
            </button>
            .
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading || !termsAccepted}
          className="w-full bg-[#1E40AF] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-bold py-3 rounded-xl uppercase tracking-widest text-xs transition-all shadow-md cursor-pointer mt-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
          ) : (
            'Concluir Cadastro'
          )}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-[11px] text-gray-400">
          Já possui conta?{' '}
          <button 
            type="button" 
            onClick={() => setMode('login')}
            className="text-[#60A5FA] font-bold hover:underline cursor-pointer"
          >
            Fazer login
          </button>
        </p>
      </div>
    </div>
  );

  const renderForgot = () => (
    <div className="w-full space-y-4 animate-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-1">
        <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">
          Redefinir Senha
        </h1>
        <p className="text-[11px] text-gray-300">Enviaremos um link de recuperação para seu e-mail</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setMode('login'); }} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">E-mail</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="email" 
              required
              placeholder="seu.email@exemplo.com"
              className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold py-3.5 rounded-xl uppercase tracking-widest text-xs transition-all shadow-md cursor-pointer"
        >
          Enviar Link de Recuperação
        </button>
      </form>

      <div className="text-center pt-2">
        <button 
          type="button" 
          onClick={() => setMode('login')}
          className="text-[11px] text-gray-300 hover:text-white cursor-pointer"
        >
          Voltar para o Login
        </button>
      </div>
    </div>
  );

  const renderTerms = () => (
    <div className="h-full flex flex-col justify-between text-xs space-y-4 text-gray-300">
      <h2 className="text-base font-bold text-white uppercase border-b border-[#1B2F5C] pb-2">Termos de Uso</h2>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-justify">
        <p>A utilização da plataforma UNDD Academy implica na aceitação das presentes diretrizes de integridade, dedicação aos estudos e conformidade com as leis brasileiras.</p>
        <p>O acesso às videoaulas, materiais e certificados é intransferível e individual.</p>
      </div>
      <button 
        type="button" 
        onClick={() => setMode('register')} 
        className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl cursor-pointer"
      >
        Fechar e Voltar
      </button>
    </div>
  );

  const renderPrivacy = () => (
    <div className="h-full flex flex-col justify-between text-xs space-y-4 text-gray-300">
      <h2 className="text-base font-bold text-white uppercase border-b border-[#1B2F5C] pb-2">Privacidade de Dados</h2>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-justify">
        <p>A UNDD Academy preza pela segurança e confidencialidade dos dados dos alunos, em estrita observância à Lei Geral de Proteção de Dados (LGPD).</p>
        <p>Suas informações são utilizadas exclusivamente para a emissão de certificados e aperfeiçoamento da experiência de aprendizagem.</p>
      </div>
      <button 
        type="button" 
        onClick={() => setMode('register')} 
        className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl cursor-pointer"
      >
        Fechar e Voltar
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#060B18] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,64,175,0.25)_0%,transparent_60%)] pointer-events-none" />

      {/* Top Navigation */}
      <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-auto">
        {onBack ? (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 rounded-full text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <Home size={14} /> Início
          </button>
        ) : <div />}
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[400px] space-y-6 relative z-10 flex flex-col items-center px-4 pt-10">
        {mode !== 'terms' && mode !== 'privacy' && (
          <div className="flex justify-center mb-1 animate-in fade-in duration-300">
            <Logo size="lg" className="h-14 w-auto" />
          </div>
        )}

        {/* Card */}
        <div className={`w-full bg-[#0C162E] border border-[#1B2F5C] p-6 sm:p-8 rounded-3xl shadow-2xl transition-all duration-500 ${mode === 'terms' || mode === 'privacy' ? 'h-[60vh]' : ''}`}>
          {mode === 'login' && renderLogin()}
          {mode === 'register' && renderRegister()}
          {mode === 'forgot' && renderForgot()}
          {mode === 'terms' && renderTerms()}
          {mode === 'privacy' && renderPrivacy()}
        </div>

        {mode !== 'terms' && mode !== 'privacy' && (
          <div className="text-center pt-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              União Nacional de Docentes de Direita • UNDD
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
