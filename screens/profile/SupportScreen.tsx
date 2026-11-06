import React, { useState } from 'react';
import { 
  Send, User, Phone, Mail, MapPin, Plus, CheckCircle2, 
  Clock, AlertCircle, MessageSquare, ChevronDown, ChevronUp, 
  HelpCircle, Trash2, Check, ExternalLink, RefreshCw, X
} from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: 'Baixa' | 'Média' | 'Alta' | 'Urgente';
  status: 'Aberto' | 'Em andamento' | 'Resolvido';
  date: string;
  description: string;
}

interface ChatMessage {
  id: number;
  type: 'bot' | 'user';
  text: string;
  options?: string[];
  action?: 'whatsapp';
}

export const SupportScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'chat' | 'faq'>('tickets');
  
  // Tickets CRUD State
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem('undd_support_tickets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Ignored
      }
    }
    return [
      {
        id: 'TCK-2026-081',
        subject: 'Download de apostilas e videoaulas no aplicativo',
        category: 'Suporte Técnico',
        priority: 'Média',
        status: 'Resolvido',
        date: '28/01/2026',
        description: 'A sincronização dos vídeos em 1080p foi normalizada após limpeza do cache.'
      },
      {
        id: 'TCK-2026-114',
        subject: 'Declaração de Matrícula e Carga Horária para Empregador',
        category: 'Secretaria Acadêmica',
        priority: 'Alta',
        status: 'Em andamento',
        date: '02/02/2026',
        description: 'Solicitação de emissão de declaração com validação digital e assinatura institucional da UN2D.'
      }
    ];
  });

  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState('Secretaria Acadêmica');
  const [newPriority, setNewPriority] = useState<'Baixa' | 'Média' | 'Alta' | 'Urgente'>('Média');
  const [newDescription, setNewDescription] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      text: 'Olá! Bem-vindo à Central de Atendimento da UN2D Academy. Como podemos orientar sua jornada de estudos hoje?',
      options: [
        'Como emitir meu certificado?',
        'Problemas com reprodução ou downloads',
        'Falar com a Secretaria Acadêmica'
      ]
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newDescription.trim()) {
      showToast('Por favor, preencha o assunto e a descrição do chamado.');
      return;
    }

    const ticket: Ticket = {
      id: `TCK-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      subject: newSubject.trim(),
      category: newCategory,
      priority: newPriority,
      status: 'Aberto',
      date: new Date().toLocaleDateString('pt-BR'),
      description: newDescription.trim()
    };

    const updated = [ticket, ...tickets];
    setTickets(updated);
    try {
      localStorage.setItem('undd_support_tickets', JSON.stringify(updated));
    } catch {
      // Ignored
    }

    setNewSubject('');
    setNewDescription('');
    setShowNewTicketModal(false);
    showToast(`Chamado ${ticket.id} aberto com sucesso! Resposta em até 24h.`);
  };

  const handleDeleteTicket = (id: string) => {
    const updated = tickets.filter(t => t.id !== id);
    setTickets(updated);
    try {
      localStorage.setItem('undd_support_tickets', JSON.stringify(updated));
    } catch {
      // Ignored
    }
    showToast('Chamado removido do seu histórico.');
  };

  const handleToggleStatus = (id: string) => {
    const updated = tickets.map(t => {
      if (t.id === id) {
        const nextStatus: Ticket['status'] = t.status === 'Resolvido' ? 'Em andamento' : 'Resolvido';
        return { ...t, status: nextStatus };
      }
      return t;
    });
    setTickets(updated);
    try {
      localStorage.setItem('undd_support_tickets', JSON.stringify(updated));
    } catch {
      // Ignored
    }
    showToast('Status do chamado atualizado.');
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || chatInput).trim();
    if (!query) return;

    const userMsg: ChatMessage = { id: Date.now(), type: 'user', text: query };
    const newChatList = [...chatMessages, userMsg];
    setChatMessages(newChatList);
    setChatInput('');

    setTimeout(() => {
      let reply = 'Recebemos sua mensagem! Nossa equipe pedagógica está analisando e responderá em instantes.';
      let opts: string[] | undefined;
      const lower = query.toLowerCase();

      if (lower.includes('certificado') || lower.includes('diploma')) {
        reply = 'Os certificados são liberados automaticamente no seu perfil ao concluir 100% das aulas e obter nota mínima de 7.0 na avaliação do curso.';
        opts = ['Onde vejo meus certificados?', 'Como validar com QR Code?'];
      } else if (lower.includes('download') || lower.includes('vídeo') || lower.includes('offline')) {
        reply = 'Você pode baixar materiais em PDF e videoaulas no botão de download da tela de detalhes ou gerenciar arquivos na aba Download.';
        opts = ['Como limpar o cache?', 'Configurar Wi-Fi'];
      } else if (lower.includes('secretaria') || lower.includes('matrícula')) {
        reply = 'Nossa secretaria acadêmica atende de segunda a sexta, das 8h às 18h. Se desejar, abra um chamado oficial na aba "Meus Chamados".';
        opts = ['Abrir novo chamado agora'];
      }

      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        text: reply,
        options: opts
      }]);
    }, 600);
  };

  const faqs = [
    {
      q: 'Como emitir meu certificado com código de verificação?',
      a: 'Após concluir todas as aulas do curso e obter aproveitamento mínimo de 7.0 na avaliação prática, seu certificado é gerado imediatamente na aba "Meus Certificados" com chave de registro e QR Code oficial.'
    },
    {
      q: 'Como funciona o acesso às aulas no celular e no computador?',
      a: 'A UN2D Academy funciona com layout adaptativo sincronizado em tempo real. No computador os cursos são organizados em formato widescreen horizontal e no celular/tablet em formato vertical ergonômico.'
    },
    {
      q: 'Posso baixar apostilas para estudar sem internet?',
      a: 'Sim. Todas as apostilas em PDF e materiais de apoio podem ser salvos no seu dispositivo pela aba "Download" para leitura offline.'
    },
    {
      q: 'Como tirar dúvidas diretamente com os docentes da UN2D?',
      a: 'No menu "Acadêmico", acesse a aba "Mensagens com Docentes" para enviar suas dúvidas diretamente ao professor responsável pelo curso selecionado.'
    }
  ];

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-6 animate-in fade-in duration-300 pb-36 text-white max-w-5xl mx-auto">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[120] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-in slide-in-from-top duration-300">
          <CheckCircle2 size={18} className="text-white shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header Cards (3 Cards conforme Screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: E-mail */}
        <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-blue-500/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-blue-600/15 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
            <Mail size={22} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">E-mail Oficial</span>
            <p className="text-white text-xs font-bold truncate select-all">suporte@undd.academy</p>
            <span className="text-[10px] text-gray-400">Resposta em até 24h</span>
          </div>
        </div>

        {/* Card 2: WhatsApp */}
        <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-emerald-500/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <Phone size={22} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">WhatsApp Oficial</span>
            <p className="text-white text-xs font-bold truncate select-all">(11) 98765-4321</p>
            <span className="text-[10px] text-emerald-400 font-semibold">Segunda a Sexta, 8h às 18h</span>
          </div>
        </div>

        {/* Card 3: Sede Institucional */}
        <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:border-amber-500/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
            <MapPin size={22} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Sede Institucional</span>
            <p className="text-white text-xs font-bold truncate">UN2D Brasil • Brasília / SP</p>
            <span className="text-[10px] text-gray-400">União Nacional de Docentes de Direita</span>
          </div>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#1B2F5C] pb-2 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'tickets'
              ? 'bg-[#1E40AF] text-white shadow-lg border border-blue-400/40'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Clock size={15} /> Meus Chamados ({tickets.length})
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'chat'
              ? 'bg-[#1E40AF] text-white shadow-lg border border-blue-400/40'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <MessageSquare size={15} /> Atendimento ao Vivo
        </button>

        <button
          onClick={() => setActiveTab('faq')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'faq'
              ? 'bg-[#1E40AF] text-white shadow-lg border border-blue-400/40'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <HelpCircle size={15} /> Perguntas Frequentes (FAQ)
        </button>
      </div>

      {/* TAB 1: Tickets */}
      {activeTab === 'tickets' && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
                Acompanhamento de Solicitações
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Abra um chamado acadêmico ou técnico para suporte individualizado.
              </p>
            </div>
            <button
              onClick={() => setShowNewTicketModal(true)}
              className="px-5 py-3 bg-[#F59E0B] hover:bg-amber-400 text-black font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg transition-transform active:scale-95 shrink-0"
            >
              <Plus size={16} /> Novo Chamado
            </button>
          </div>

          <div className="space-y-3.5">
            {tickets.map((ticket) => (
              <div 
                key={ticket.id}
                className="bg-[#0C162E] border border-[#1B2F5C] hover:border-blue-500/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-xl space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-blue-400 bg-blue-600/20 px-2 py-0.5 rounded border border-blue-500/30">
                      {ticket.id}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                      ticket.status === 'Resolvido'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : ticket.status === 'Em andamento'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {ticket.status}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">
                      Prioridade: {ticket.priority}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">Criado em: {ticket.date}</span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">{ticket.subject}</h3>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">{ticket.description}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <span className="text-[11px] text-gray-400">
                    Categoria: <strong className="text-gray-200">{ticket.category}</strong>
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(ticket.id)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                    >
                      <Check size={13} className="text-emerald-400" />
                      {ticket.status === 'Resolvido' ? 'Reabrir' : 'Marcar como resolvido'}
                    </button>
                    <button
                      onClick={() => handleDeleteTicket(ticket.id)}
                      className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Excluir do histórico"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Chatbot */}
      {activeTab === 'chat' && (
        <div className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl overflow-hidden h-[540px] flex flex-col shadow-xl animate-in fade-in duration-300">
          <div className="p-4 border-b border-[#1B2F5C] bg-[#060B18] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/30">
                U
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Atendente Virtual UN2D Academy</h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Em Linha • Atendimento Oficial
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#060B18]/60">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  msg.type === 'user' ? 'bg-[#1E40AF] text-white' : 'bg-white/10 text-blue-400 border border-blue-500/30'
                }`}>
                  {msg.type === 'user' ? 'E' : 'U'}
                </div>
                <div className="space-y-2">
                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-[#0C162E] text-gray-200 border border-[#1B2F5C] rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.options && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(opt)}
                          className="text-[10px] font-bold bg-[#060B18] hover:bg-white/10 text-blue-300 border border-blue-500/30 rounded-full px-3 py-1 transition-all cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#060B18] border-t border-[#1B2F5C]">
            <div className="flex gap-2">
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua dúvida para a equipe pedagógica..."
                className="flex-1 bg-[#0C162E] border border-[#1B2F5C] rounded-xl px-4 text-xs text-white outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleSendMessage()}
                className="p-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-colors cursor-pointer"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FAQ */}
      {activeTab === 'faq' && (
        <div className="space-y-3.5 animate-in fade-in duration-300">
          {faqs.map((item, index) => {
            const isOpen = expandedFaq === index;
            return (
              <div 
                key={index}
                className="bg-[#0C162E] border border-[#1B2F5C] rounded-2xl overflow-hidden shadow-lg transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                    {item.q}
                  </span>
                  {isOpen ? <ChevronUp size={18} className="text-blue-400 shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-gray-300 leading-relaxed border-t border-white/5">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div 
          className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setShowNewTicketModal(false)}
        >
          <div 
            className="bg-[#0C162E] border border-[#1B2F5C] rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-5 shadow-2xl text-white animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#1B2F5C] pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Plus size={16} className="text-amber-400" /> Abrir Novo Chamado
              </h3>
              <button 
                onClick={() => setShowNewTicketModal(false)}
                className="p-1 hover:bg-white/10 rounded-full text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-300 uppercase">Assunto Principal</label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value)}
                  placeholder="Ex: Dúvida sobre emissão do certificado de Indústria 4.0"
                  className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-300 uppercase">Categoria</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                  >
                    <option value="Secretaria Acadêmica">Secretaria Acadêmica</option>
                    <option value="Suporte Técnico">Suporte Técnico</option>
                    <option value="Certificados &amp; Diplomas">Certificados &amp; Diplomas</option>
                    <option value="Orientação Pedagógica">Orientação Pedagógica</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-300 uppercase">Prioridade</label>
                  <select
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as any)}
                    className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                    <option value="Urgente">Urgente</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-300 uppercase">Descrição da Solicitação</label>
                <textarea
                  rows={4}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Descreva com detalhes sua solicitação para a equipe da UN2D Academy..."
                  className="w-full bg-[#060B18] border border-[#1B2F5C] rounded-xl p-3.5 text-xs text-white outline-none focus:border-blue-500 resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#F59E0B] hover:bg-amber-400 text-black rounded-xl text-xs font-black uppercase tracking-wider shadow-lg"
                >
                  Registrar Chamado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SupportScreen;
