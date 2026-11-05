import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Send, Bot, User, BookOpen, RefreshCw, 
  CheckCircle2, ChevronDown, X, 
  ArrowRight, ShieldCheck, Zap
} from 'lucide-react';
import { COURSES, FLAGSHIP_AI_COURSE } from '../constants';
import { Course } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  modelUsed?: string;
  modelLabel?: string;
  isFallback?: boolean;
  timestamp: string;
}

interface GeminiStudyAssistantProps {
  initialCourse?: Course | null;
  onClose?: () => void;
  isFloating?: boolean;
}

interface ModelStatus {
  id: string;
  label: string;
  description: string;
  isAvailable: boolean;
  disabledUntil: string | null;
  failureCount: number;
  successCount: number;
}

export const GeminiStudyAssistant: React.FC<GeminiStudyAssistantProps> = ({
  initialCourse = null,
  onClose,
  isFloating = false,
}) => {
  const { t } = useLanguage();
  const activeCourse = initialCourse || FLAGSHIP_AI_COURSE;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Olá! Sou o **Tutor Acadêmico UNDD Academy**, dedicado ao apoio técnico e pedagógico para o curso **${activeCourse.title}**.\n\nEstou à sua disposição para esclarecer dúvidas sobre os módulos, aprofundar conceitos práticos para o mercado de trabalho, revisar tópicos para avaliações e orientar sua jornada de excelência e mérito profissional.\n\nComo posso ajudar você hoje com este conteúdo?`,
      modelUsed: 'gemini-3.8-flash',
      modelLabel: 'Gemini 3.8 Flash (Modelo de Alta Precisão)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modelStatusList, setModelStatusList] = useState<ModelStatus[]>([]);
  const [activeModelId, setActiveModelId] = useState<string>('gemini-3.8-flash');
  const [showModelModal, setShowModelModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch model status from backend
  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/gemini/status');
      if (res.ok) {
        const data = await res.json();
        if (data.models) setModelStatusList(data.models);
        if (data.activeModel) setActiveModelId(data.activeModel);
      }
    } catch {
      // Offline / resilience mode
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const historyPayload = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      content: m.content
    }));

    const courseContextPayload = activeCourse ? {
      id: activeCourse.id,
      title: activeCourse.title,
      category: activeCourse.category,
      description: activeCourse.description,
      modules: activeCourse.modules?.map(m => ({ title: m.title, lessons: m.lessons.map(l => l.title) }))
    } : null;

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
          courseContext: courseContextPayload
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text || "Estou à disposição para continuarmos sua capacitação.",
        modelUsed: data.modelUsed,
        modelLabel: data.modelLabel,
        isFallback: data.isFallback,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
      if (data.modelUsed) {
        setActiveModelId(data.modelUsed);
      }
      fetchStatus();
    } catch {
      // Seamless resilience message
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Sobre a sua dúvida em "${query}":\n\nNo ambiente de estudos da UNDD Academy, recomendamos consolidar a aplicação técnica com base nas diretrizes práticas da aula e na bibliografia complementar disponível na sua biblioteca.\n\n*Caso queira, detalhe um módulo ou exemplo específico para aprofundarmos juntos.*`,
        modelUsed: 'undd-tutor-offline-resilient',
        modelLabel: 'Tutor UNDD Academy (Modo Offline Resiliente)',
        isFallback: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = activeCourse ? [
    `Quais são os pontos principais de ${activeCourse.title}?`,
    `Gere um quiz com 3 questões para testar meus conhecimentos práticos.`,
    `Como aplicar esses conceitos nas reais demandas do mercado?`,
    `Explique os conceitos mais importantes do Módulo 1.`
  ] : [
    `Como organizar um cronograma de estudos focado em alta produtividade?`,
    `Quais habilidades técnicas são mais valorizadas no mercado atual?`,
    `Como funciona a emissão de certificado oficial na UNDD Academy?`,
    `Dicas práticas para retenção e fixação de conteúdos técnicos.`
  ];

  const formatMarkdown = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-sm font-bold text-[#3B82F6] mt-2 mb-1">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-base font-bold text-white mt-3 mb-1">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-base font-black text-[#F59E0B] mt-3 mb-1">{line.replace('# ', '')}</h1>;
      }
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const bulletText = line.trim().replace(/^[-*]\s+/, '');
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-[#3B82F6] text-xs font-bold leading-5">•</span>
            <p className="text-xs leading-relaxed text-slate-200">{parseBold(bulletText)}</p>
          </div>
        );
      }
      if (/^\d+\.\s+/.test(line.trim())) {
        const match = line.trim().match(/^(\d+)\.\s+(.*)/);
        if (match) {
          return (
            <div key={idx} className="flex items-start gap-2 my-1 pl-1">
              <span className="text-[#F59E0B] text-xs font-bold shrink-0">{match[1]}.</span>
              <p className="text-xs leading-relaxed text-slate-200">{parseBold(match[2])}</p>
            </div>
          );
        }
      }
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      return <p key={idx} className="text-xs leading-relaxed text-slate-200">{parseBold(line)}</p>;
    });
  };

  const parseBold = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={`flex flex-col bg-[#060B18] text-white ${isFloating ? 'h-full max-h-[85vh] rounded-2xl border border-[#1B2F5C] shadow-2xl overflow-hidden' : 'h-full'}`}>
      
      {/* Top Navigation Bar */}
      <div className="bg-[#0C162E] border-b border-[#1B2F5C] px-5 py-3.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white shadow-lg shrink-0">
            <Sparkles size={20} className="animate-pulse text-[#F59E0B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black uppercase tracking-wider text-white">Tutor Acadêmico UNDD</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1E40AF]/30 text-[#60A5FA] border border-[#1B2F5C]">
                Oficial UNDD Academy
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Apoio aos estudos, tira-dúvidas técnico e consolidação profissional
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Active Model Indicator Button */}
          <button
            onClick={() => setShowModelModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#060B18]/60 hover:bg-[#1B2F5C] border border-[#1B2F5C] text-xs transition-all cursor-pointer"
            title="Consultar modelo e status de processamento"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <div className="w-2 h-2 rounded-full bg-emerald-400 -ml-3" />
            <span className="font-bold text-[11px] text-slate-200 hidden sm:inline">
              {activeModelId === 'gemini-3.8-flash' ? 'Gemini 3.8 Flash (Alta Precisão)' : activeModelId}
            </span>
            <span className="font-bold text-[11px] text-slate-200 sm:hidden">
              Tutor Ativo
            </span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#060B18]/60 hover:bg-[#1B2F5C] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Course Context Locked Banner */}
      <div className="bg-[#090F20] px-5 py-2.5 border-b border-[#1B2F5C]/60 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <BookOpen size={15} className="text-[#F59E0B] shrink-0" />
          <span className="font-semibold text-[11px] uppercase tracking-wider text-slate-400">Contexto de Aprendizado:</span>
        </div>
        <div className="px-3 py-1 bg-[#1E40AF]/20 border border-[#1B2F5C] rounded-xl text-[#60A5FA] text-xs font-bold truncate flex items-center gap-2 max-w-xs md:max-w-md">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
          <span className="truncate">{activeCourse.title}</span>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-3 max-w-[92%] md:max-w-[78%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              
              {/* Avatar */}
              <div className="shrink-0 pt-0.5">
                {msg.role === 'user' ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#1E40AF] shadow-md bg-[#0C162E]">
                    <img src="/avatar.jpg" alt="Eduardo Martins Silveira" className="w-full h-full object-cover aspect-square rounded-full" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white shadow-md">
                    <Bot size={17} />
                  </div>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`p-4 rounded-2xl shadow-lg ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white rounded-tr-none'
                    : 'bg-[#0C162E] border border-[#1B2F5C] text-slate-200 rounded-tl-none'
                }`}
              >
                {/* Header for Bot */}
                {msg.role === 'assistant' && (
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-[#1B2F5C] text-[10px]">
                    <span className="font-bold text-[#60A5FA] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={11} className="text-[#F59E0B]" /> Tutor Pedagógico UNDD
                    </span>
                    <div className="flex items-center gap-1.5">
                      {msg.isFallback && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                          Suporte Contínuo
                        </span>
                      )}
                      <span className="text-slate-400 font-mono">
                        {msg.modelLabel || msg.modelUsed || 'Gemini 3.8 Flash'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="space-y-1">
                  {formatMarkdown(msg.content)}
                </div>

                {/* Timestamp */}
                <div className={`text-[9px] mt-2 text-right ${msg.role === 'user' ? 'text-white/70' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white shadow-md">
                <Bot size={17} />
              </div>
              <div className="bg-[#0C162E] border border-[#1B2F5C] p-4 rounded-2xl rounded-tl-none space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#60A5FA] font-bold">
                  <RefreshCw size={14} className="animate-spin text-[#F59E0B]" />
                  <span>Análise pedagógica em andamento...</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Estruturando resposta detalhada com base no currículo e nas boas práticas técnicas.
                </p>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="px-4 py-2 bg-[#060B18] border-t border-[#1B2F5C]/60 flex gap-2 overflow-x-auto custom-scrollbar shrink-0">
        {suggestions.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(sug)}
            className="px-3 py-1.5 rounded-xl bg-[#0C162E] hover:bg-[#1E40AF]/40 border border-[#1B2F5C] text-[11px] text-slate-300 hover:text-white whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>{sug}</span>
            <ArrowRight size={11} className="text-[#3B82F6]" />
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <div className="p-4 bg-[#0C162E] border-t border-[#1B2F5C] shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2.5"
        >
          <div className="flex-1 bg-[#060B18] border border-[#1B2F5C] focus-within:border-[#3B82F6] rounded-2xl px-4 py-2.5 flex items-center gap-2 shadow-inner transition-colors">
            <Bot size={18} className="text-[#3B82F6] shrink-0" />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={activeCourse ? `Tire sua dúvida técnica sobre "${activeCourse.title}"...` : "Digite sua dúvida ou solicite um resumo técnico..."}
              className="w-full bg-transparent text-white text-xs placeholder-slate-400 outline-none"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-3 bg-[#1E40AF] hover:bg-[#2563EB] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl transition-all shadow-lg cursor-pointer shrink-0"
            title="Enviar pergunta"
          >
            <Send size={18} />
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span>Ambiente virtual com suporte inteligente e continuidade técnica garantida.</span>
          <span className="font-semibold text-[#60A5FA]">UNDD Academy</span>
        </div>
      </div>

      {/* Model Cascade Architecture Modal */}
      {showModelModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-5 shadow-2xl text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#1E40AF]/20 text-[#60A5FA] rounded-2xl border border-[#1B2F5C]">
                  <Zap size={24} className="text-[#F59E0B]" />
                </div>
                <div>
                  <h3 className="text-base font-bold uppercase tracking-tight">Arquitetura de Processamento IA</h3>
                  <p className="text-xs text-slate-300">Suporte Pedagógico Ininterrupto UNDD Academy</p>
                </div>
              </div>
              <button
                onClick={() => setShowModelModal(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-[#060B18] p-4 rounded-2xl border border-[#1B2F5C] text-xs text-slate-300 leading-relaxed space-y-2">
              <p className="font-semibold text-white flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                Compromisso com o Ensino e Alta Disponibilidade:
              </p>
              <p>
                O tutor pedagógico opera com o modelo de alta performance <strong>Gemini 3.8 Flash</strong>, proporcionando explicações didáticas, exemplos práticos de mercado e revisões sem qualquer viés político ou ideológico.
              </p>
            </div>

            {/* Model Tiers List */}
            <div className="space-y-2.5">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Hierarquia de Resiliência</h4>
              
              <div className="space-y-2">
                {[
                  {
                    id: 'gemini-3.8-flash',
                    title: '1. Gemini 3.8 Flash (Modelo Principal)',
                    tag: 'Alta Performance, Raciocínio Prático e Análise Técnica',
                    isTop: true,
                  },
                  {
                    id: 'gemini-3.1-flash-lite',
                    title: '2. Gemini 3.1 Flash Lite',
                    tag: 'Alta Eficiência e Resposta Instantânea',
                  },
                  {
                    id: 'gemini-2.5-flash',
                    title: '3. Gemini 2.5 Flash',
                    tag: 'Modelo Secundário de Contingência',
                  },
                ].map((tier) => {
                  const isActive = activeModelId === tier.id;
                  return (
                    <div
                      key={tier.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-[#1E40AF]/25 border-[#3B82F6] text-white shadow-md'
                          : 'bg-[#060B18] border-[#1B2F5C] text-slate-300'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">{tier.title}</span>
                          {tier.isTop && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40">
                              Principal
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400">{tier.tag}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                            <CheckCircle2 size={12} /> Ativo
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-medium">Pronto</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setShowModelModal(false)}
              className="w-full py-3 bg-[#1E40AF] hover:bg-[#2563EB] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
            >
              Fechar e continuar estudando
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default GeminiStudyAssistant;
