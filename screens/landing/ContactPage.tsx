import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MapPin, Phone, Mail, Send, CheckCircle, Loader2, Building, Bot, Check } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

type Step = 'name' | 'email' | 'phone' | 'company' | 'interest' | 'message' | 'summary';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  type?: 'text' | 'options' | 'action';
  options?: string[];
}

const ContactPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o assistente de atendimento da UNDD Academy. Para direcionarmos seu contato com a equipe certa, qual é o seu nome completo?',
      sender: 'bot',
      type: 'text'
    }
  ]);
  const [currentStep, setCurrentStep] = useState<Step>('name');
  const [userInput, setUserInput] = useState('');
  const [collectedData, setCollectedData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    message: ''
  });
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userInput.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: userInput,
      sender: 'user',
      type: 'text'
    };

    setMessages(prev => [...prev, userMsg]);
    processStep(userInput);
    setUserInput('');
  };

  const processStep = (input: string) => {
    setIsTyping(true);
    let nextStep: Step = currentStep;
    let botResponse: Message = { id: '', text: '', sender: 'bot' };
    
    const newData = { ...collectedData };

    setTimeout(() => {
      switch (currentStep) {
        case 'name':
          newData.name = input;
          setCollectedData(newData);
          nextStep = 'email';
          botResponse = {
            id: Date.now().toString(),
            text: `Muito prazer em conhecê-lo, ${input.split(' ')[0]}! Qual é o seu e-mail de contato principal?`,
            sender: 'bot',
            type: 'text'
          };
          break;
        case 'email':
          newData.email = input;
          setCollectedData(newData);
          nextStep = 'phone';
          botResponse = {
            id: Date.now().toString(),
            text: 'Excelente! Qual é o seu número de telefone ou WhatsApp com DDD?',
            sender: 'bot',
            type: 'text'
          };
          break;
        case 'phone':
          newData.phone = input;
          setCollectedData(newData);
          nextStep = 'company';
          botResponse = {
            id: Date.now().toString(),
            text: 'Você representa alguma empresa, escola, associação ou órgão público? (Ou informe que é estudante individual)',
            sender: 'bot',
            type: 'text'
          };
          break;
        case 'company':
          newData.company = input;
          setCollectedData(newData);
          nextStep = 'interest';
          botResponse = {
            id: Date.now().toString(),
            text: 'Qual é o seu principal interesse com a UNDD Academy? (Selecione uma ou mais opções abaixo)',
            sender: 'bot',
            type: 'options',
            options: [
              'Capacitação Profissional para Jovens e Adultos',
              'Parceria Corporativa / Treinamento de Equipes',
              'Matrícula e Cursos Disponíveis',
              'Corpo Docente da UNDD & Aulas Práticas',
              'Educação Básica & EJA',
              'Outro Assunto'
            ]
          };
          break;
        case 'message':
          newData.message = input;
          setCollectedData(newData);
          nextStep = 'summary';
          botResponse = {
            id: Date.now().toString(),
            text: 'Agradecemos o seu contato! Seus dados foram encaminhados com sucesso para a secretaria institucional da UNDD Academy. Entraremos em contato em até 24h úteis.',
            sender: 'bot',
            type: 'action'
          };
          break;
        default:
          break;
      }

      setMessages(prev => [...prev, botResponse]);
      setCurrentStep(nextStep);
      setIsTyping(false);
    }, 600);
  };

  const toggleInterest = (option: string) => {
    setSelectedInterests(prev => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  const confirmInterests = () => {
    if (selectedInterests.length === 0) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: selectedInterests.join(', '),
      sender: 'user',
      type: 'text'
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const newData = { ...collectedData, interest: selectedInterests.join(', ') };
      setCollectedData(newData);
      setCurrentStep('message');

      const botResponse: Message = {
        id: Date.now().toString(),
        text: 'Perfeito! Para finalizarmos, gostaria de deixar uma mensagem ou dúvida específica para nossa equipe?',
        sender: 'bot',
        type: 'text'
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#060B18] text-white font-sans animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-50 p-4 md:p-6 flex items-center justify-between bg-[#060B18]/90 backdrop-blur-md border-b border-[#1B2F5C]">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-4 py-2 bg-[#0C162E] hover:bg-[#14234B] rounded-full text-blue-400 font-bold text-xs uppercase tracking-wider transition-all border border-[#1B2F5C] cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Voltar</span>
        </button>
        <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">Fale Conosco • UNDD Academy</span>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#3B82F6] bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/30 inline-block mb-4">
            Canais de Atendimento
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Entre em Contato com a <br />
            <span className="text-[#3B82F6]">UNDD Academy</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
            Tire dúvidas pedagógicas, solicite informações sobre parcerias corporativas ou converse diretamente com a nossa coordenação acadêmica.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Informações Institucionais (5 Colunas) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0C162E] p-6 rounded-2xl border border-[#1B2F5C] shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                <Mail size={20} />
              </div>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">E-mail Institucional</h3>
              <p className="text-xs text-gray-300">suporte@undd.academy</p>
              <p className="text-[11px] text-gray-400">Atendimento em até 24 horas úteis</p>
            </div>

            <div className="bg-[#0C162E] p-6 rounded-2xl border border-[#1B2F5C] shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Phone size={20} />
              </div>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">WhatsApp Oficial</h3>
              <p className="text-xs text-gray-300">(11) 98765-4321</p>
              <p className="text-[11px] text-emerald-400 font-semibold">Segunda a Sexta, das 8h às 18h</p>
            </div>

            <div className="bg-[#0C162E] p-6 rounded-2xl border border-[#1B2F5C] shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">Sede Nacional</h3>
              <p className="text-xs text-gray-300">União Nacional de Docentes de Direita</p>
              <p className="text-[11px] text-gray-400">Brasília / DF &amp; São Paulo / SP</p>
            </div>
          </div>

          {/* Chat Interativo (7 Colunas) */}
          <div className="lg:col-span-7 bg-[#0C162E] rounded-3xl border border-[#1B2F5C] overflow-hidden flex flex-col h-[560px] shadow-2xl">
            {/* Chat Header */}
            <div className="p-4 bg-[#060B18] border-b border-[#1B2F5C] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30 shadow-inner">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide text-white">Atendimento UNDD Academy</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Secretaria Acadêmica Online</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
                Oficial
              </span>
            </div>

            {/* Chat Body */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#060B18]/50">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none shadow-md' 
                      : 'bg-[#0C162E] text-gray-200 rounded-bl-none border border-[#1B2F5C] shadow-md'
                  }`}>
                    <p>{m.text}</p>
                    
                    {/* Render Multi-options */}
                    {m.type === 'options' && m.options && currentStep === 'interest' && (
                      <div className="mt-4 space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {m.options.map((opt, i) => {
                            const isSelected = selectedInterests.includes(opt);
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => toggleInterest(opt)}
                                className={`text-left p-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between cursor-pointer ${
                                  isSelected 
                                    ? 'bg-blue-600 text-white border-blue-400' 
                                    : 'bg-[#060B18] text-gray-300 border-[#1B2F5C] hover:border-blue-500'
                                }`}
                              >
                                <span>{opt}</span>
                                {isSelected && <Check size={14} />}
                              </button>
                            );
                          })}
                        </div>
                        <button
                          type="button"
                          onClick={confirmInterests}
                          disabled={selectedInterests.length === 0}
                          className={`w-full mt-3 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all cursor-pointer ${
                            selectedInterests.length > 0
                              ? 'bg-[#F59E0B] hover:bg-amber-400 text-black shadow-md'
                              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Confirmar Seleção ({selectedInterests.length})
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-gray-400 italic">
                  <Loader2 size={14} className="animate-spin text-blue-400" />
                  <span>A equipe UNDD Academy está digitando...</span>
                </div>
              )}
            </div>

            {/* Chat Footer Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-[#060B18] border-t border-[#1B2F5C] flex gap-3">
              <input 
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={currentStep === 'summary' ? 'Mensagem enviada com sucesso! Entraremos em contato.' : 'Digite sua resposta aqui...'}
                disabled={currentStep === 'summary' || currentStep === 'interest'}
                className="flex-1 bg-[#0C162E] border border-[#1B2F5C] rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!userInput.trim() || currentStep === 'summary' || currentStep === 'interest'}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default ContactPage;
