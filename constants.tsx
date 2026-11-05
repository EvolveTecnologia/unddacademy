import { Category, Course } from './types';

// URLs de vídeos para demonstração pedagógica
const GENERIC_VIDEO = 'https://www.youtube.com/watch?v=p3Qec3Rl_s4';
const TECH_VIDEO = 'https://youtu.be/gHO2AvpyScI';
const ENV_VIDEO = 'https://youtu.be/zKYqE-Zg_78';
const LANG_VIDEO = 'https://www.youtube.com/watch?v=juK8O_IuIcI';
const EDU_PDF_URL = 'https://educapes.capes.gov.br/bitstream/capes/583371/2/produto-caderno-de-alfabetizacao.pdf';

// Configuração visual das categorias com cores exatas das capturas de tela
export interface CategoryConfig {
  id: Category;
  label: string;
  sectionTitle: string;
  color: string;
  bgClass: string;
  hoverClass: string;
  borderClass: string;
  textClass: string;
}

export const CATEGORIES_CONFIG: CategoryConfig[] = [
  {
    id: Category.Educacao,
    label: 'EDUCAÇÃO',
    sectionTitle: 'EDUCAÇÃO',
    color: '#1E40AF',
    bgClass: 'bg-[#1E40AF]',
    hoverClass: 'hover:bg-[#1D4ED8]',
    borderClass: 'border-[#3B82F6]/50',
    textClass: 'text-[#60A5FA]'
  },
  {
    id: Category.Idiomas,
    label: 'IDIOMAS',
    sectionTitle: 'IDIOMAS & CULTURA',
    color: '#312E81',
    bgClass: 'bg-[#312E81]',
    hoverClass: 'hover:bg-[#3730A3]',
    borderClass: 'border-[#6366F1]/50',
    textClass: 'text-[#818CF8]'
  },
  {
    id: Category.Sustentabilidade,
    label: 'SUSTENTABILIDADE',
    sectionTitle: 'MEIO AMBIENTE & SUSTENTABILIDADE',
    color: '#14532D',
    bgClass: 'bg-[#14532D]',
    hoverClass: 'hover:bg-[#15803D]',
    borderClass: 'border-[#22C55E]/50',
    textClass: 'text-[#4ADE80]'
  },
  {
    id: Category.Tecnologia,
    label: 'TECNOLOGIA',
    sectionTitle: 'TECNOLOGIA & INCLUSÃO',
    color: '#581C87',
    bgClass: 'bg-[#581C87]',
    hoverClass: 'hover:bg-[#6B21A8]',
    borderClass: 'border-[#A855F7]/50',
    textClass: 'text-[#C084FC]'
  },
  {
    id: Category.Alimentos,
    label: 'ALIMENTOS',
    sectionTitle: 'ALIMENTOS & PRODUÇÃO',
    color: '#9A3412',
    bgClass: 'bg-[#9A3412]',
    hoverClass: 'hover:bg-[#C2410C]',
    borderClass: 'border-[#F97316]/50',
    textClass: 'text-[#FB923C]'
  },
  {
    id: Category.Gestao,
    label: 'GESTÃO',
    sectionTitle: 'GESTÃO & EMPREENDEDORISMO',
    color: '#78350F',
    bgClass: 'bg-[#78350F]',
    hoverClass: 'hover:bg-[#92400E]',
    borderClass: 'border-[#EAB308]/50',
    textClass: 'text-[#FACC15]'
  }
];

// --- 📘 EDUCAÇÃO ---
export const EDUCACAO_COURSES: Course[] = [
  {
    id: 'eja-fundamental',
    title: 'EDUCAÇÃO DE JOVENS E ADULTO - EJA FUNDAMENTAL',
    tagline: 'Alfabetização e Fortalecimento dos Conhecimentos Básicos',
    category: Category.Educacao,
    description: 'Curso completo de reforço em leitura, escrita, raciocínio lógico e noções fundamentais para jovens e adultos em busca de autonomia e qualificação.',
    instructor: 'Corpo Docente UNDD Academy',
    instructorTitle: 'Especialistas em Educação Básica e EJA',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop',
    progress: 35,
    duration: '120h',
    modulesCount: 4,
    materials: [
      { id: 'mat-eja-1', title: 'Caderno Pedagógico de Alfabetização e Português Prático', type: 'pdf', url: EDU_PDF_URL, isDownloaded: true },
      { id: 'mat-eja-2', title: 'Guia de Operações e Matemática Básica', type: 'pdf', url: EDU_PDF_URL, isDownloaded: false }
    ],
    modules: [
      {
        title: 'Módulo 1: Leitura e Escrita Funcional',
        lessons: [
          { id: 'eja-1', title: 'Interpretação Textual no Cotidiano', duration: '25 min', completed: true, videoUrl: GENERIC_VIDEO },
          { id: 'eja-2', title: 'Redação de Documentos Pessoais e Comerciais', duration: '30 min', completed: true, videoUrl: GENERIC_VIDEO }
        ]
      },
      {
        title: 'Módulo 2: Matemática do Dia a Dia',
        lessons: [
          { id: 'eja-3', title: 'Cálculo de Porcentagens e Orçamento Familiar', duration: '35 min', completed: false, videoUrl: GENERIC_VIDEO },
          { id: 'eja-4', title: 'Medidas, Pesos e Frações Práticas', duration: '40 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'matematica-industria',
    title: 'MATEMÁTICA APLICADA À INDÚSTRIA E LOGÍSTICA',
    tagline: 'Cálculo Técnico, Conversões e Resolução Prática',
    category: Category.Educacao,
    description: 'Aprenda métrica industrial, cálculo de volumes, proporções, regras de três para controle de estoque, pesagem e linhas de produção.',
    instructor: 'Prof. Eng. Roberto Silveira',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop',
    progress: 10,
    duration: '60h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Metrologia e Unidades',
        lessons: [
          { id: 'mat-ind-1', title: 'Conversão de Unidades Métricas e Imperiais', duration: '30 min', completed: false, videoUrl: GENERIC_VIDEO },
          { id: 'mat-ind-2', title: 'Tolerâncias e Margens em Peças Técnicas', duration: '35 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'comunicacao-etica',
    title: 'COMUNICAÇÃO PROFISSIONAL E ÉTICA NO AMBIENTE DE TRABALHO',
    tagline: 'Postura, Clareza e Relacionamento Corporativo',
    category: Category.Educacao,
    description: 'Domine a oratória profissional, escrita assertiva de e-mails, relatórios, postura ética, resolução pacífica de conflitos e meritocracia.',
    instructor: 'Dra. Helena Vasconcelos',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      {
        title: 'Módulo 1: Ética e Relações Profissionais',
        lessons: [
          { id: 'com-1', title: 'Princípios Éticos e Respeito no Trabalho', duration: '25 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'leitura-documentos',
    title: 'LEITURA E INTERPRETAÇÃO DE DOCUMENTOS TÉCNICOS',
    tagline: 'Plantas, Diagramas e Normas Padronizadas',
    category: Category.Educacao,
    description: 'Capacitação na leitura de diagramas, especificações técnicas, manuais de operação e procedimentos padrão da indústria moderna.',
    instructor: 'Eng. Carlos Mendonça',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '50h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Desenho Técnico Básico',
        lessons: [
          { id: 'leit-1', title: 'Projeções Ortogonais e Escalas', duration: '30 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'redacao-nota-1000',
    title: 'REDAÇÃO NOTA 1000',
    tagline: 'Estrutura Dissertativa, Argumentação e Clareza',
    category: Category.Educacao,
    description: 'Curso prático focado na construção de textos nota máxima: introdução convincente, desenvolvimento coeso, argumentos fortes e proposta de intervenção sem vieses ideológicos.',
    instructor: 'Prof. Marcos Vinícius Andrade',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop',
    progress: 20,
    duration: '45h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Arquitetura da Dissertação',
        lessons: [
          { id: 'red-1', title: 'Tese Clara e Planejamento Textual', duration: '30 min', completed: true, videoUrl: 'https://www.youtube.com/watch?v=bL_ZInyK0bg' },
          { id: 'red-2', title: 'Repertório Legítimo e Argumentação Firme', duration: '35 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=IWSpgkX79oE' }
        ]
      }
    ]
  },
  {
    id: 'revisao-vestibulares',
    title: 'REVISÃO INTENSIVA PARA CONCURSOS E VESTIBULARES',
    tagline: 'Foco nos Conteúdos Decisivos para Aprovação',
    category: Category.Educacao,
    description: 'Simulados comentados, exercícios das principais bancas do país e resolução passo a passo em matérias essenciais para o sucesso acadêmico.',
    instructor: 'Corpo Docente UNDD Academy',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '90h',
    modulesCount: 5,
    modules: [
      {
        title: 'Módulo 1: Raciocínio Lógico e Matemática',
        lessons: [
          { id: 'rev-1', title: 'Resolução de Questões Estratégicas', duration: '40 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  }
];

// --- 💻 TECNOLOGIA & INCLUSÃO ---
export const TECNOLOGIA_COURSES: Course[] = [
  {
    id: 'informatica-basica',
    title: 'INFORMÁTICA BÁSICA E FERRAMENTAS DE ESCRITÓRIO',
    tagline: 'Windows, Pacote Office, E-mail e Nuvem',
    category: Category.Tecnologia,
    description: 'Formação prática essencial para dominar o computador no ambiente profissional: digitação, edição de textos, planilhas eletrônicas e navegação segura.',
    instructor: 'Prof. Lucas Guimarães',
    thumbnail: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop',
    progress: 40,
    duration: '60h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Fundamentos Operacionais',
        lessons: [
          { id: 'inf-1', title: 'Organização de Pastas e Atalhos Rápidos', duration: '20 min', completed: true, videoUrl: TECH_VIDEO },
          { id: 'inf-2', title: 'Criação de Planilhas e Fórmulas de Cálculo', duration: '35 min', completed: false, videoUrl: TECH_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'industria-40',
    title: 'INTRODUÇÃO À INDÚSTRIA 4.0',
    tagline: 'Automação, Robótica e Manufatura Inteligente',
    category: Category.Tecnologia,
    description: 'Compreenda a convergência de tecnologias cibernéticas, sensores industriais, manutenção preditiva e internet das coisas nas fábricas do presente e do futuro.',
    instructor: 'Eng. Rafael Barreto',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    progress: 15,
    duration: '70h',
    modulesCount: 4,
    modules: [
      {
        title: 'Módulo 1: Pilares da Indústria 4.0',
        lessons: [
          { id: 'ind4-1', title: 'Integração de Sensores e Redes Industriais', duration: '30 min', completed: false, videoUrl: TECH_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'operador-sistemas',
    title: 'OPERADOR DE SISTEMAS DIGITAIS INDUSTRIAIS',
    tagline: 'Supervisão SCADA e Controle em Tempo Real',
    category: Category.Tecnologia,
    description: 'Treinamento para operação de telas de supervisão, controle de alarmes em plantas industriais, telemetria e registros operacionais seguros.',
    instructor: 'Técnico Especialista Marcelo Costa',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '80h',
    modulesCount: 4,
    modules: [
      {
        title: 'Módulo 1: Interfaces Homem-Máquina (IHM)',
        lessons: [
          { id: 'op-1', title: 'Interpretação de Gráficos e Telemetria', duration: '25 min', completed: false, videoUrl: TECH_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'seguranca-informacao',
    title: 'SEGURANÇA DA INFORMAÇÃO NO AMBIENTE CORPORATIVO',
    tagline: 'Proteção de Dados, Senhas e Prevenção de Golpes',
    category: Category.Tecnologia,
    description: 'Diretrizes cruciais para proteger computadores e redes corporativas: phishing, boas práticas de senhas, conformidade LGPD e higiene digital.',
    instructor: 'Especialista em Cibersegurança Fernando Dias',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      {
        title: 'Módulo 1: Engenharia Social e Ataques Comuns',
        lessons: [
          { id: 'seg-1', title: 'Identificação de E-mails Maliciosos e Links Suspeitos', duration: '20 min', completed: false, videoUrl: TECH_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'programacao-basica',
    title: 'PROGRAMAÇÃO BÁSICA E LÓGICA COMPUTACIONAL',
    tagline: 'Algoritmos, Estruturas e Criação de Soluções',
    category: Category.Tecnologia,
    description: 'Desenvolva o pensamento algorítmico, lógica de controle, variáveis, funções e dê os primeiros passos na criação de softwares com linguagens modernas.',
    instructor: 'Prof. Daniel Rezende',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '80h',
    modulesCount: 4,
    modules: [
      {
        title: 'Módulo 1: Primeiros Passos em Lógica',
        lessons: [
          { id: 'prog-1', title: 'Variáveis, Condicionais e Laços de Repetição', duration: '30 min', completed: false, videoUrl: TECH_VIDEO }
        ]
      }
    ]
  }
];

// --- 🌎 IDIOMAS & CULTURA ---
export const IDIOMAS_COURSES: Course[] = [
  {
    id: 'ingles-industria',
    title: 'INGLÊS INSTRUMENTAL PARA INDÚSTRIA E COMÉRCIO',
    tagline: 'Vocabulário Técnico, Operações e Logística',
    category: Category.Idiomas,
    description: 'Comunique-se em inglês com fornecedores internacionais, leia manuais técnicos e conduza tratativas de compras e suprimentos sem barreiras.',
    instructor: 'Profa. Sarah Jenkins',
    thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Inglês Técnico para Fábrica',
        lessons: [
          { id: 'ing-1', title: 'Equipamentos, Peças e Normas de Segurança', duration: '25 min', completed: false, videoUrl: LANG_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'ingles-atendimento',
    title: 'INGLÊS PARA ATENDIMENTO, SERVIÇOS E PROTOCOLO',
    tagline: 'Recepção, Negócios e Comunicação Fluente',
    category: Category.Idiomas,
    description: 'Diálogos práticos para atendimento ao cliente estrangeiro, hotelaria, recepção corporativa e apresentações comerciais formais.',
    instructor: 'Prof. Michael O\'Connor',
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '50h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Protocolos de Atendimento',
        lessons: [
          { id: 'ing-at-1', title: 'Boas-Vindas e Resolução de Dúvidas em Inglês', duration: '20 min', completed: false, videoUrl: LANG_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'espanhol-negocios',
    title: 'ESPANHOL BÁSICO PARA NEGÓCIOS',
    tagline: 'Comunicação e Relações Comerciais na América Latina',
    category: Category.Idiomas,
    description: 'Vocabulário financeiro, reuniões, troca de mensagens e negociação em espanhol com clientes e parceiros do Mercosul.',
    instructor: 'Prof. Javier Morales',
    thumbnail: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '50h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Apresentação Corporativa em Espanhol',
        lessons: [
          { id: 'esp-1', title: 'Termos de Contratos e Propostas Comerciais', duration: '25 min', completed: false, videoUrl: LANG_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'cultura-organizacional',
    title: 'CULTURA ORGANIZACIONAL E LIDERANÇA ÉTICA',
    tagline: 'Valores, Meritocracia e Alta Performance',
    category: Category.Idiomas,
    description: 'Como liderar equipes com foco em resultados, respeito mútuo, integridade moral e valorização do mérito individual.',
    instructor: 'Conselheira Patricia Lemos',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      {
        title: 'Módulo 1: Fundamentos da Liderança por Exemplo',
        lessons: [
          { id: 'cul-1', title: 'Cultura de Excelência e Metas Claras', duration: '25 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'comunicacao-intercultural',
    title: 'COMUNICAÇÃO INTERCULTURAL E GLOBAL',
    tagline: 'Negociação e Relações no Comércio Internacional',
    category: Category.Idiomas,
    description: 'Entenda como costumes, diplomacia comercial e etiqueta internacional influenciam acordos e exportações.',
    instructor: 'Dr. Leonardo Brant',
    thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      {
        title: 'Módulo 1: Diplomacia Comercial',
        lessons: [
          { id: 'com-int-1', title: 'Negociação Internacional sem Atritos', duration: '30 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  }
];

// --- 🌱 MEIO AMBIENTE & SUSTENTABILIDADE ---
export const SUSTENTABILIDADE_COURSES: Course[] = [
  {
    id: 'aluminio-ambiente',
    title: 'ALUMÍNIO & AMBIENTE: CICLO COMPLETO E SUSTENTABILIDADE',
    tagline: 'Da Bauxita à Reciclagem Infinita com Alta Eficiência',
    category: Category.Sustentabilidade,
    description: 'Entenda o ciclo completo, a tecnologia de extração responsável, mitigação de impactos e a alta circularidade do alumínio na economia moderna.',
    instructor: 'Equipe de Engenharia Ambiental UNDD',
    thumbnail: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop',
    progress: 50,
    duration: '40h',
    modulesCount: 2,
    modules: [
      {
        title: 'Módulo 1: O Ciclo de Produção e Reciclagem',
        lessons: [
          { id: 'alu-1', title: 'Eficiência Energética e Circularidade', duration: '25 min', completed: true, videoUrl: ENV_VIDEO },
          { id: 'alu-2', title: 'Gestão de Resíduos e Certificações', duration: '30 min', completed: false, videoUrl: ENV_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'amazonia-vr',
    title: 'AMAZÔNIA 360º EM REALIDADE VIRTUAL',
    tagline: 'Imersão nos Biomas Nacionais e Conservação Prática',
    category: Category.Sustentabilidade,
    description: 'Uma jornada visual em 360 graus pelos ecossistemas brasileiros, demonstrando o equilíbrio entre conservação, pesquisa e manejo sustentável.',
    instructor: 'Expedições UNDD Academy',
    thumbnail: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '30 min',
    modulesCount: 1,
    modules: [
      {
        title: 'Módulo 1: Visão Imersiva 360º',
        lessons: [
          { id: 'amz-1', title: 'Biodiversidade e Recursos Naturais', duration: '20 min', completed: false, videoUrl: 'https://youtu.be/nBu7XuYqg78' }
        ]
      }
    ]
  },
  {
    id: 'educacao-ambiental-industria',
    title: 'EDUCAÇÃO AMBIENTAL APLICADA À INDÚSTRIA',
    tagline: 'Conformidade Legal, Normas ISO e Gestão Racional',
    category: Category.Sustentabilidade,
    description: 'Práticas reais de prevenção contra poluição hídrica e atmosférica, licenciamento ambiental e redução de perdas nas fábricas.',
    instructor: 'Dra. Camila Toledo',
    thumbnail: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Legislação e Práticas Industriais',
        lessons: [
          { id: 'ea-1', title: 'Norma ISO 14001 e Auditoria Ambiental', duration: '30 min', completed: false, videoUrl: ENV_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'gestao-residuos-solidos',
    title: 'GESTÃO DE RESÍDUOS SÓLIDOS URBANOS E INDUSTRIAIS',
    tagline: 'Coleta Seletiva, Logística Reversa e Valorização',
    category: Category.Sustentabilidade,
    description: 'Classificação de resíduos, destinação correta, compostagem industrial, coprocessamento e oportunidades econômicas em reciclagem.',
    instructor: 'Eng. Sanitarista Paulo Menezes',
    thumbnail: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Plano de Gerenciamento de Resíduos',
        lessons: [
          { id: 'grs-1', title: 'Separação na Fonte e Destinação Final', duration: '25 min', completed: false, videoUrl: ENV_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'monitoramento-ambiental',
    title: 'MONITORAMENTO AMBIENTAL E RECURSOS HÍDRICOS',
    tagline: 'Qualidade da Água, Bacias Hidrográficas e Sensores',
    category: Category.Sustentabilidade,
    description: 'Coleta de amostras, análise de parâmetros físico-químicos, telemetria hidrológica e conservação de nascentes.',
    instructor: 'Profa. Bióloga Mariana Rios',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '50h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Indicadores da Bacia Hidrográfica',
        lessons: [
          { id: 'mon-1', title: 'Medição de Vazão e Oxigênio Dissolvido', duration: '20 min', completed: false, videoUrl: ENV_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'introducao-esg',
    title: 'INTRODUÇÃO AO ESG E PRÁTICAS SUSTENTÁVEIS',
    tagline: 'Governança, Responsabilidade e Finanças Sustentáveis',
    category: Category.Sustentabilidade,
    description: 'Os pilares de governança corporativa, responsabilidade socioambiental e compliance que investidores sérios exigem no mercado atual.',
    instructor: 'Consultor Financeiro Rodrigo Maia',
    thumbnail: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      {
        title: 'Módulo 1: Pilares Estratégicos do ESG',
        lessons: [
          { id: 'esg-1', title: 'Governança e Transparência nos Negócios', duration: '30 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'recuperacao-areas',
    title: 'RECUPERAÇÃO DE ÁREAS DEGRADADAS E REFLORESTAMENTO',
    tagline: 'Mudas Nativas, Solo e Manejo Sustentável',
    category: Category.Sustentabilidade,
    description: 'Técnicas modernas de adubação verde, controle de erosão, viveiros de mudas e enriquecimento de vegetação nativa.',
    instructor: 'Eng. Agrônomo Gabriel Sampaio',
    thumbnail: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Recomposição de Solos',
        lessons: [
          { id: 'rec-1', title: 'Plantio de Pioneiras e Cobertura Viva', duration: '25 min', completed: false, videoUrl: ENV_VIDEO }
        ]
      }
    ]
  }
];

// --- 🌾 ALIMENTOS & PRODUÇÃO ---
export const ALIMENTOS_COURSES: Course[] = [
  {
    id: 'boas-praticas-manipulacao',
    title: 'BOAS PRÁTICAS DE MANIPULAÇÃO DE ALIMENTOS',
    tagline: 'Higiene, Segurança Sanitária e Vigilância',
    category: Category.Alimentos,
    description: 'Regras da ANVISA para restaurantes, cozinhas industriais e processamento de carnes, laticínios e vegetais sem riscos de contaminação.',
    instructor: 'Nutricionista Dra. Luciana Prado',
    thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
    progress: 15,
    duration: '40h',
    modulesCount: 2,
    modules: [
      {
        title: 'Módulo 1: Controle Sanitário e Temperatura',
        lessons: [
          { id: 'bpm-1', title: 'Higienização de Mãos, Utensílios e Ambientes', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'agricultura-familiar',
    title: 'AGRICULTURA FAMILIAR SUSTENTÁVEL',
    tagline: 'Cultivo Produtivo, Irrigação e Venda Direta',
    category: Category.Alimentos,
    description: 'Como potencializar a colheita em pequenas e médias propriedades: rotação de culturas, manejo biológico de pragas e cooperativismo.',
    instructor: 'Eng. Agrônomo José Carlos Duarte',
    thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '70h',
    modulesCount: 4,
    modules: [
      {
        title: 'Módulo 1: Preparo do Solo e Compostagem',
        lessons: [
          { id: 'agf-1', title: 'Sistemas de Irrigação por Gotejamento', duration: '30 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'piscicultura-aquicola',
    title: 'PISCICULTURA E PRODUÇÃO AQUÍCOLA',
    tagline: 'Criação de Tilápias, Tambaquis e Tanques-Rede',
    category: Category.Alimentos,
    description: 'Alimentação balanceada de alevinos, controle de pH da água, oxigenação, despesca e agregação de valor com filetagem profissional.',
    instructor: 'Dr. Fábio Alencar',
    thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Estrutura dos Tanques de Criação',
        lessons: [
          { id: 'pis-1', title: 'Qualidade da Água e Densidade de Povoamento', duration: '25 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'agroindustria-caseira',
    title: 'AGROINDÚSTRIA CASEIRA E BENEFICIAMENTO',
    tagline: 'Geleias, Conservas, Polpas e Embalagens',
    category: Category.Alimentos,
    description: 'Transformação de excedentes de safra em produtos de alto valor agregado: pasteurização caseira, selagem a vácuo e rotulagem legal.',
    instructor: 'Tecnóloga de Alimentos Beatriz Fontes',
    thumbnail: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '50h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Técnicas de Envase e Conservação',
        lessons: [
          { id: 'agro-1', title: 'Esterilização de Vidros e Padrões de Qualidade', duration: '25 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'seguranca-alimentar-nutricao',
    title: 'SEGURANÇA ALIMENTAR E NUTRIÇÃO COMUNITÁRIA',
    tagline: 'Aproveitamento Integral e Nutrição Eficiente',
    category: Category.Alimentos,
    description: 'Receitas nutritivas de baixo custo, uso de cascas e talos, conservação de nutrientes e promoção da saúde nas comunidades locais.',
    instructor: 'Nutricionista Paula Medeiros',
    thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      {
        title: 'Módulo 1: Pirâmide Alimentar e Cardápios Saudáveis',
        lessons: [
          { id: 'san-1', title: 'Preparo com Menor Desperdício de Nutrientes', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  }
];

// --- 📊 GESTÃO & EMPREENDEDORISMO ---
export const GESTAO_COURSES: Course[] = [
  {
    id: 'empreendedorismo-local',
    title: 'EMPREENDEDORISMO LOCAL E ECONOMIA CRIATIVA',
    tagline: 'Iniciativa Privada, Modelos de Negócio e Lucratividade',
    category: Category.Gestao,
    description: 'Como transformar ideias em negócios lucrativos: validação com clientes reais, precificação justa, mérito individual e superação de burocracias.',
    instructor: 'Consultor de Negócios Thiago Nogueira',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop',
    progress: 25,
    duration: '60h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Modelo de Negócio e Proposta de Valor',
        lessons: [
          { id: 'emp-1', title: 'Construção do Canvas e Identificação de Clientes', duration: '30 min', completed: true, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'gestao-financeira-pequenos',
    title: 'GESTÃO FINANCEIRA PARA PEQUENOS NEGÓCIOS',
    tagline: 'Fluxo de Caixa, Margem de Lucro e Capital de Giro',
    category: Category.Gestao,
    description: 'Domine a separação entre contas pessoais e jurídicas, controle diário de caixa, formação de reservas e planejamento tributário legal.',
    instructor: 'Contador Especialista Renato Bezerra',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Fluxo de Caixa e Controle Diário',
        lessons: [
          { id: 'gf-1', title: 'Apuração do Ponto de Equilíbrio (Break-Even)', duration: '25 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'cooperativismo-associativismo',
    title: 'COOPERATIVISMO E ASSOCIATIVISMO',
    tagline: 'União Estratégica para Compras e Vendas em Escala',
    category: Category.Gestao,
    description: 'A força da cooperação voluntária para reduzir custos de maquinário, fertilizantes ou tecnologia e acessar grandes compradores juntos.',
    instructor: 'Dra. Cristina Brandão',
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      {
        title: 'Módulo 1: Governança em Cooperativas',
        lessons: [
          { id: 'coop-1', title: 'Estatuto Social e Transparência Financeira', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'fornecimento-grandes-empresas',
    title: 'FORNECIMENTO PARA GRANDES EMPRESAS E LICITAÇÕES',
    tagline: 'Requisitos de Qualidade, Prazos e Compliance',
    category: Category.Gestao,
    description: 'Como preparar sua empresa para atender contratos com indústrias, construtoras e licitações públicas com documentação e idoneidade.',
    instructor: 'Adv. Especialista em Licitações André Peixoto',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '50h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Habilitação Jurídica e Fiscal',
        lessons: [
          { id: 'forn-1', title: 'Montagem de Propostas Técnicas Vencedoras', duration: '30 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'marketing-digital-pequenos',
    title: 'MARKETING DIGITAL PARA PEQUENOS NEGÓCIOS',
    tagline: 'Vendas pelo WhatsApp, Instagram e Google Meu Negócio',
    category: Category.Gestao,
    description: 'Estratégias práticas sem desperdício de dinheiro: criação de catálogo de produtos, anúncios locais segmentados e atendimento rápido ao cliente.',
    instructor: 'Especialista em Vendas Online Juliana Prado',
    thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '50h',
    modulesCount: 3,
    modules: [
      {
        title: 'Módulo 1: Presença Digital e Captação de Leads',
        lessons: [
          { id: 'mkt-1', title: 'WhatsApp Business e Fechamento de Vendas', duration: '30 min', completed: false, videoUrl: GENERIC_VIDEO }
        ]
      }
    ]
  }
];

// Destaques para Hero Banner da Home
export const FLAGSHIP_AI_COURSE: Course = TECNOLOGIA_COURSES[0];
export const FLAGSHIP_CARBON_COURSE: Course = SUSTENTABILIDADE_COURSES[0];

// Array consolidado de todos os cursos da plataforma
export const COURSES: Course[] = [
  ...EDUCACAO_COURSES,
  ...TECNOLOGIA_COURSES,
  ...IDIOMAS_COURSES,
  ...SUSTENTABILIDADE_COURSES,
  ...ALIMENTOS_COURSES,
  ...GESTAO_COURSES
];
