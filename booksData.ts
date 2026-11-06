import { DigitalBook } from './types';

export const DIGITAL_BOOKS: DigitalBook[] = [
  {
    id: 'livro-olavo-minimo',
    title: 'O Mínimo que Você Precisa Saber para Não Ser um Idiota',
    subtitle: 'Filosofia, Cultura e Análise Crítica da Sociedade Contemporânea',
    author: 'Profº Olavo de Carvalho',
    authorRole: 'Filósofo e Escritor',
    coverImage: '/assets/aistudio/IMG-20261105-WA0103_62381079.jpg',
    category: 'Filosofia & Cultura',
    type: 'both',
    totalPages: 194,
    audioDuration: '8h 45min',
    rating: 4.9,
    reviewsCount: 1240,
    description: 'Coletânea essencial de ensaios e reflexões que ensinam o leitor a pensar com independência, desmascarando falácias ideológicas, manipulações retóricas e o declínio intelectual do debate contemporâneo.',
    isFree: false,
    isPurchased: true,
    price: 69.90,
    publishedYear: '2023',
    readingProgress: 42,
    currentPage: 24,
    narrator: 'Carlos Alberto (Docente UN2D)',
    audioChapters: [
      { id: 'c1', title: 'Capítulo 1: O Conhecimento e a Ilusão do Saber', duration: '28 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: 'c2', title: 'Capítulo 2: Da Juventude Intelectual à Maturidade Filosófica', duration: '34 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
      { id: 'c3', title: 'Capítulo 3: As Três Camadas da Cultura', duration: '41 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Prefácio à Edição UN2D Academy',
        content: `A verdadeira vida intelectual não consiste em acumular diplomas, repetir chavões acadêmicos ou seguir a corrente dominante da opinião pública. Pelo contrário: ela exige a coragem intransigente de olhar para a realidade dos fatos e sustentar a verdade com base na própria consciência moral.\n\nNesta edição especial da UN2D Academy, reunimos textos fundamentais para quem deseja romper com as amarras das narrativas pré-fabricadas e alcançar uma autonomia intelectual genuína. O leitor encontrará aqui não apenas ideias, mas um método de discernimento perene.`
      },
      {
        pageNumber: 2,
        chapterTitle: 'Prefácio à Edição UN2D Academy (Cont.)',
        content: `O objetivo supremo do estudo nunca é a vitória retórica em discussões superficiais, mas a conquista da clareza mental e da firmeza de caráter. Quando o homem aprende a nomear as coisas pelo que elas realmente são, o nevoeiro da propaganda ideológica se dissipa instantaneamente.\n\nQue estas páginas sirvam de bússola para jovens e adultos comprometidos com o mérito, o autodesenvolvimento e a reconstrução dos alicerces culturais de nossa pátria.`
      },
      {
        pageNumber: 3,
        chapterTitle: 'Capítulo 1: O Conhecimento e a Ilusão do Saber',
        content: `A primeira condição para aprender qualquer coisa é admitir a própria ignorância. O idiota não é aquele que nada sabe, mas aquele que acredita já saber de antemão tudo o que importa, julgando o universo inteiro a partir dos preconceitos de sua própria época.\n\nNa sociedade moderna, o monopólio da informação gera uma falsa sensação de erudição. Lê-se manchetes, absorve-se slogans e repete-se formulações prontas como se fossem fruto de reflexão pessoal profunda.`
      },
      {
        pageNumber: 4,
        chapterTitle: 'Capítulo 1: A Consciência Moral e a Verdade',
        content: `A busca da verdade não é uma tarefa puramente abstrata: ela exige uma postura moral diante da vida. Aquele que mente para si mesmo a respeito de suas motivações nunca será capaz de julgar com retidão os fatos do mundo externo.\n\nO primeiro exercício filosófico é examinar as próprias crenças sob a luz da experiência concreta e da consistência lógica. Se uma ideia não resiste ao confronto com a realidade cotidiana, ela deve ser descartada sem hesitação sentimental.`
      },
      {
        pageNumber: 5,
        chapterTitle: 'Capítulo 2: Da Juventude Intelectual à Maturidade',
        content: `Crescer intelectualmente significa aprender a discernir entre a aparência e a substância. Durante a juventude, somos bombardeados por modismos efêmeros que prometem transformar o mundo da noite para o dia por meio de decretos ou protestos.\n\nA maturidade, todavia, nos ensina que as grandes transformações sociais nascem do trabalho silencioso, da competência técnica, da formação da família e da preservação dos valores que garantiram a sobrevivência da civilização ocidental.`
      },
      {
        pageNumber: 6,
        chapterTitle: 'Capítulo 2: A Responsabilidade pelo Próprio Destino',
        content: `Não terceirize sua formação. Nenhuma escola, governo ou corporação cuidará do seu desenvolvimento intelectual com mais zelo do que você mesmo. O protagonismo individual é a chave de toda emancipação real.\n\nLeia os clássicos, estude a história sem os filtros da manipulação política e pratique a virtude da perseverança diária nos estudos e no ofício profissional.`
      }
    ]
  },
  {
    id: 'livro-neomarxismo-origens',
    title: 'Desmascarando o Neo Marxismo Cultural',
    subtitle: 'Da Escola de Frankfurt à Ocupação Estratégica de Espaços',
    author: 'Corpo Docente UN2D Academy',
    authorRole: 'Pesquisadores em Filosofia Política',
    coverImage: '/assets/aistudio/IMG-20261105-WA0105_742318b3.jpg',
    category: 'Ciência Política & História',
    type: 'both',
    totalPages: 168,
    audioDuration: '6h 15min',
    rating: 4.8,
    reviewsCount: 890,
    description: 'Uma investigação rigorosa e documentada sobre a metamorfose do marxismo clássico em guerra cultural. Conheça as estratégias de Gramsci, Adorno, Horkheimer e como preservar a integridade das instituições.',
    isFree: false,
    isPurchased: true,
    price: 59.90,
    publishedYear: '2024',
    readingProgress: 18,
    currentPage: 12,
    narrator: 'Mariana Duarte (Especialista em Comunicação)',
    audioChapters: [
      { id: 'c1', title: 'Capítulo 1: O Colapso das Profecias Econômicas', duration: '25 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
      { id: 'c2', title: 'Capítulo 2: Antonio Gramsci e a Revolução Silenciosa', duration: '32 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Introdução: A Mudança de Eixo Revolucionário',
        content: `Quando as previsões catastróficas sobre o colapso econômico do livre mercado falharam sucessivamente ao longo do século XX, os teóricos marxistas perceberam que a tomada violenta do Estado já não era viável nos países desenvolvidos.\n\nFoi nesse cenário que emergiu a necessidade de transferir o foco de combate da infraestrutura econômica para a superestrutura cultural: a família, a religião, as universidades, o jornalismo e as artes.`
      },
      {
        pageNumber: 2,
        chapterTitle: 'Introdução: A Nova Engenharia Social',
        content: `O neo-marxismo não promete mais a tomada de fábricas armadas, mas a redefinição de termos da linguagem cotidiana, a culpabilização das virtudes tradicionais e a fragmentação da sociedade em grupos antagônicos de identidade.\n\nCompreender essa dinâmica não é uma questão de disputa partidária, mas de preservação da verdade, da liberdade de expressão e da coesão social fundamentada na dignidade de cada indivíduo.`
      },
      {
        pageNumber: 3,
        chapterTitle: 'Capítulo 1: A Escola de Frankfurt e a Teoria Crítica',
        content: `Ao estabelecer o Instituto de Pesquisa Social em Frankfurt, autores como Max Horkheimer e Theodor Adorno propuseram a chamada 'Teoria Crítica'. O propósito declarado não era compreender a realidade, mas criticar impiedosamente todas as instituições ocidentais existentes.\n\nSob o manto de análises psicanalíticas e sociológicas, desconstruiu-se a autoridade paterna, a racionalidade científica e a própria busca por padrões objetivos de beleza e justiça.`
      },
      {
        pageNumber: 4,
        chapterTitle: 'Capítulo 2: Gramsci e o Conceito de Hegemonia',
        content: `Antonio Gramsci sintetizou a estratégia que prevalece até hoje: para conquistar o poder político duradouro, é indispensável antes conquistar a hegemonia cultural. Isto significa fazer com que a visão revolucionária de mundo pareça o 'senso comum' natural de toda a sociedade.\n\nEssa conquista se dá pela infiltração paulatina nos centros formadores de opinião: faculdades de pedagogia, conselhos editoriais e meios de comunicação em massa.`
      }
    ]
  },
  {
    id: 'livro-seis-licoes-mises',
    title: 'As Seis Lições',
    subtitle: 'Capitalismo, Socialismo, Inflação, Intervencionismo e Liberdade',
    author: 'Ludwig von Mises',
    authorRole: 'Economista da Escola Austríaca',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
    category: 'Economia & Liberdade',
    type: 'both',
    totalPages: 112,
    audioDuration: '4h 20min',
    rating: 5.0,
    reviewsCount: 3120,
    description: 'A obra mais acessível e luminosa sobre economia política de todos os tempos. Baseada em palestras históricas proferidas em Buenos Aires, Mises explica com clareza cristalina por que o livre mercado eleva a condição de vida dos mais humildes.',
    isFree: true,
    isPurchased: false,
    publishedYear: '2022',
    readingProgress: 65,
    currentPage: 72,
    narrator: 'Eduardo M. Silveira',
    audioChapters: [
      { id: 'c1', title: '1ª Lição: O Capitalismo', duration: '35 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
      { id: 'c2', title: '2ª Lição: O Socialismo e o Cálculo Econômico', duration: '38 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
      { id: 'c3', title: '3ª Lição: O Intervencionismo', duration: '42 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Primeira Lição: O Capitalismo',
        content: `O desenvolvimento do capitalismo consiste em que cada um tem o direito de servir ao seu cliente de maneira melhor ou mais barata. E esse método, esse princípio, transformou o mundo inteiro num período de tempo relativamente curto, possibilitando um aumento sem precedentes na população mundial.\n\nNa época pré-capitalista, os ricos eram donos de terras e a grande massa da população não passava de servos sem esperança de mobilidade social.`
      },
      {
        pageNumber: 2,
        chapterTitle: 'Primeira Lição: A Soberania do Consumidor',
        content: `Nas sociedades industriais modernas, os verdadeiros 'patrões' são os consumidores. Pela decisão soberana de comprar ou abster-se de comprar, os clientes determinam quem terá sucesso nos negócios e quem sairá do mercado.\n\nAs grandes empresas só continuam grandes se continuarem a atender às necessidades reais e imediatas do cidadão comum com eficiência, inovação e preço competitivo.`
      },
      {
        pageNumber: 3,
        chapterTitle: 'Segunda Lição: O Socialismo e o Cálculo',
        content: `No mercado livre, os preços não são fruto de uma imposição burocrática, mas a síntese de milhões de escolhas e valorizações individuais. É através dos preços de mercado que produtores sabem quais matérias-primas são escassas e onde devem aplicar seus recursos com menor desperdício.\n\nAo abolir a propriedade privada e os preços livres, o socialismo destrói o cálculo econômico racional, resultando fatalmente em escassez, caos e opressão.`
      }
    ]
  },
  {
    id: 'livro-a-lei-bastiat',
    title: 'A Lei',
    subtitle: 'A Defesa Clássica da Vida, da Liberdade e da Propriedade',
    author: 'Frédéric Bastiat',
    authorRole: 'Economista e Deputado Francês',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop',
    category: 'Direito & Filosofia',
    type: 'both',
    totalPages: 98,
    audioDuration: '3h 10min',
    rating: 4.9,
    reviewsCount: 1980,
    description: 'Um manifesto imortal contra a espoliação legal. Bastiat demonstra como a lei, concebida para proteger a justiça, é frequentemente pervertida para transformar a pilhagem em virtude governamental.',
    isFree: true,
    isPurchased: false,
    publishedYear: '2021',
    readingProgress: 100,
    currentPage: 98,
    narrator: 'Voz Oficial UN2D',
    audioChapters: [
      { id: 'c1', title: 'Parte 1: A Origem dos Direitos Naturais', duration: '28 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
      { id: 'c2', title: 'Parte 2: A Espoliação Legalizada', duration: '35 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'A Lei: Definição e Fundamento',
        content: `A vida, a faculdade física e moral, o desenvolvimento pessoal e a propriedade: eis os três dons sagrados que precedem qualquer legislador humano. Não é porque os homens promulgaram leis que a vida e a propriedade existem; pelo contrário, foi porque a vida e a propriedade pré-existiam que os homens fizeram leis para protegê-las.\n\nA lei é a organização coletiva do direito individual de legítima defesa.`
      },
      {
        pageNumber: 2,
        chapterTitle: 'A Perversão da Lei',
        content: `A lei perverteu-se sob a influência de dois motivos bem diferentes: o egoísmo desmedido e a falsa filantropia. Quando a lei toma de uns o que lhes pertence para dar a outros aquilo que não produziram, ela comete um ato que a própria lei deveria punir.\n\nEssa é a definição precisa de espoliação legal: o uso do aparelho coercitivo estatal para obter vantagens que não seriam conquistadas pelo mérito ou pelas trocas voluntárias.`
      }
    ]
  },
  {
    id: 'livro-etica-nicomaco-virtudes',
    title: 'Ética a Nicômaco & As Quatro Virtudes Cardeais',
    subtitle: 'Prudência, Coragem, Temperança e Justiça no Trabalho e na Vida',
    author: 'Aristóteles (Edição Comentada UN2D)',
    authorRole: 'Filosofia Clássica e Moral',
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800&auto=format&fit=crop',
    category: 'Ética & Liderança',
    type: 'both',
    totalPages: 220,
    audioDuration: '7h 50min',
    rating: 5.0,
    reviewsCount: 1450,
    description: 'Guia clássico sobre o florescimento humano (eudaimonia), a prática do justo meio e o cultivo diário do caráter para líderes, empresários e profissionais que não negociam seus princípios.',
    isFree: true,
    isPurchased: false,
    publishedYear: '2023',
    readingProgress: 50,
    currentPage: 110,
    narrator: 'Profº Henrique Barbosa',
    audioChapters: [
      { id: 'c1', title: 'Livro I: O Bem Supremo e a Felicidade', duration: '40 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: 'c2', title: 'Livro II: A Virtude Moral e o Hábito', duration: '45 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Livro I: O Sentido das Ações Humanas',
        content: `Toda arte e toda investigação, assim como toda ação e escolha, parecem visar a algum bem; por isso os antigos definiram o bem como aquilo para o qual todas as coisas tendem.\n\nNo entanto, há uma diferença manifesta nos fins: alguns são atividades práticas imediatas, outros são produtos que subsistem além dessas atividades. A finalidade suprema da vida ética é a realização plena das melhores faculdades humanas no serviço da comunidade e da verdade.`
      },
      {
        pageNumber: 2,
        chapterTitle: 'Livro II: O Hábito como Formador do Caráter',
        content: `A virtude moral não nos é dada por mera herança biológica nem nasce espontaneamente sem esforço: nós a adquirimos pelo exercício constante. Nós nos tornamos justos praticando ações justas; nos tornamos corajosos enfrentando com retidão os perigos reais.\n\nO caráter é a escultura esculpida dia após dia pelas decisões que tomamos quando ninguém está olhando.`
      }
    ]
  },
  {
    id: 'livro-lideranca-empreendedorismo',
    title: 'Guia Prático de Liderança, Mérito e Alta Performance',
    subtitle: 'Gestão de Pessoas, Eficiência Operacional e Crescimento Sustentável',
    author: 'Dra. Cristina Brandão',
    authorRole: 'Consultora de Negócios e Docente UN2D',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
    category: 'Gestão & Negócios',
    type: 'both',
    totalPages: 180,
    audioDuration: '5h 30min',
    rating: 4.9,
    reviewsCount: 780,
    description: 'Metodologia direta e comprovada para estruturar equipes de alto rendimento, estabelecer metas baseadas em resultados concretos e liderar com integridade em mercados altamente competitivos.',
    isFree: true,
    isPurchased: false,
    publishedYear: '2024',
    readingProgress: 30,
    currentPage: 54,
    narrator: 'Dra. Cristina Brandão',
    audioChapters: [
      { id: 'c1', title: 'Módulo 1: A Cultura do Mérito em Equipes', duration: '30 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
      { id: 'c2', title: 'Módulo 2: Indicadores Chave e Prestação de Contas', duration: '35 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Princípio 1: Liderar pelo Exemplo Concreto',
        content: `A autoridade do líder moderno não deriva do cargo ou do título formal no organograma, mas da capacidade de demonstrar competência técnica, domínio emocional e integridade intransigente nas decisões mais difíceis.\n\nQuando a liderança vive os valores que prega, a equipe abraça as metas com sentimento genuíno de corresponsabilidade e orgulho no trabalho bem feito.`
      },
      {
        pageNumber: 2,
        chapterTitle: 'Princípio 2: Meritocracia e Reconhecimento Justo',
        content: `Tratar desempenhos desiguais com premiações idênticas é a forma mais rápida de desmotivar os melhores talentos de uma empresa. O mérito exige métricas transparentes, feedback contínuo e celebração de resultados palpáveis.\n\nNa UN2D Academy, ensinamos que a meritocracia não gera divisão, mas justiça: ela oferece a cada colaborador a certeza de que seu empenho e sua competência serão devidamente recompensados.`
      }
    ]
  },
  {
    id: 'livro-economia-basica-sowell',
    title: 'Fatos e Falácias da Economia Moderna',
    subtitle: 'Por que Boas Intenções Governamentais Geram Resultados Desastrosos',
    author: 'Prof. Eng. Roberto Silveira',
    authorRole: 'Docente de Métricas e Mercado UN2D',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    category: 'Economia & Sociedade',
    type: 'ebook',
    totalPages: 240,
    rating: 4.8,
    reviewsCount: 650,
    description: 'Análise econômica com dados reais sobre controle de preços, salário mínimo artificial, tributação punitiva e como as leis de incentivo econômico determinam o sucesso ou a ruína das nações.',
    isFree: false,
    isPurchased: true,
    price: 49.90,
    publishedYear: '2023',
    readingProgress: 15,
    currentPage: 36,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Capítulo 1: O Princípio da Escassez',
        content: `A primeira lição da economia é a escassez: nunca há recursos suficientes para satisfazer plenamente todos os desejos de todas as pessoas. A primeira lição da política, infelizmente, é desconsiderar a primeira lição da economia.\n\nQuando governantes prometem bens 'gratuitos', estão apenas transferindo os custos para toda a sociedade por meio de impostos inflacionários ou endividamento público.`
      },
      {
        pageNumber: 2,
        chapterTitle: 'Capítulo 1: O Efeito dos Incentivos',
        content: `As pessoas respondem a incentivos, não a discursos vazios. Toda política pública que pune a poupança, tributa pesadamente a produção ou subsidia a ineficiência acaba gerando menos empregos, menor investimento e empobrecimento generalizado.\n\nA prosperidade sustentável só é viável onde há respeito aos contratos, moeda estável e regras claras de jogo.`
      }
    ]
  },
  {
    id: 'livro-industria-automacao-futuro',
    title: 'Indústria 4.0, Robótica e Empregos do Futuro',
    subtitle: 'Como se Qualificar para as Profissões da Próxima Década',
    author: 'Eng. Carlos Mendonça',
    authorRole: 'Especialista em Automação Industrial',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
    category: 'Tecnologia & Inovação',
    type: 'audiobook',
    totalPages: 140,
    audioDuration: '4h 50min',
    rating: 4.9,
    reviewsCount: 520,
    description: 'Mapeamento estratégico da automação, inteligência artificial aplicada à logística, sensores IoT e as habilidades cognitivas e técnicas indispensáveis para profissionais de alta empregabilidade.',
    isFree: true,
    isPurchased: false,
    publishedYear: '2024',
    readingProgress: 0,
    currentPage: 1,
    narrator: 'Eng. Carlos Mendonça',
    audioChapters: [
      { id: 'c1', title: 'Capítulo 1: A Revolução Digital no Chão de Fábrica', duration: '32 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
      { id: 'c2', title: 'Capítulo 2: Habilidades que as Máquinas Não Substituem', duration: '38 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Capítulo 1: A Transformação dos Processos',
        content: `A automação moderna não veio para extinguir postos de trabalho, mas para elevar o padrão da mão de obra humana. As tarefas puramente mecânicas e repetitivas passam aos robôs, liberando homens e mulheres para atuar no controle de qualidade, na otimização de dados e na resolução criativa de problemas operacionais.`
      }
    ]
  }
];
