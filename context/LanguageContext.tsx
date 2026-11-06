import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'pt-br';

export interface Translations {
  // Navigation & General
  navHome: string;
  navSearch: string;
  navTrail: string;
  navDownloads: string;
  navProfile: string;
  navLogout: string;
  navAboutAcademy: string;
  navStartNow: string;

  // Landing Page
  heroTitle1: string;
  heroSubtitle1: string;
  heroDesc1: string;
  heroBadge1: string;
  
  heroTitle2: string;
  heroSubtitle2: string;
  heroDesc2: string;

  heroTitle3: string;
  heroSubtitle3: string;
  heroDesc3: string;

  accessAccount: string;
  fillProfessionalCredentials: string;
  emailLabel: string;
  passwordLabel: string;
  loginButton: string;
  forgotPassword: string;
  newStudentPrompt: string;
  createAccount: string;

  ecosystemTitle: string;
  ecosystemSubtitle: string;
  ecosystemDesc: string;
  
  forEnterprise: string;
  forEnterpriseDesc: string;
  forGov: string;
  forGovDesc: string;
  forCreators: string;
  forCreatorsDesc: string;

  featuredCourses: string;
  techInnovation: string;
  techInnovationSubtitle: string;
  sustainabilityClimate: string;
  sustainabilityClimateSubtitle: string;
  viewAll: string;

  devicesTitle: string;
  devicesSubtitle: string;
  devicesDesc: string;

  faqTitle: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;

  // Categories
  catTech: string;
  catSust: string;
  catGest: string;
  catEdu: string;
  catLang: string;
  catBio: string;

  exploreCategory: string;
  upcomingCategoryTitle: string;
  upcomingCategoryMessage: string;
  understoodBtn: string;

  // Course Details / Funnel
  instructorLabel: string;
  durationLabel: string;
  certificationLabel: string;
  enrollNow: string;
  startLessons: string;
  officialCertificationBadge: string;
  beginnerLevel: string;
  aiTuteurBtn: string;

  tabSummary: string;
  tabLessons: string;
  tabMaterials: string;
  tabQuiz: string;
  tabAITutor: string;

  modulesTitle: string;
  lessonsTitle: string;
  downloadMaterials: string;
  quizTitle: string;

  // Checkout Modal
  checkoutTitle: string;
  checkoutSubtitle: string;
  orderSummary: string;
  studentNameLabel: string;
  studentEmailLabel: string;
  studentPhoneLabel: string;
  paymentMethod: string;
  mobileMoneyRdc: string;
  creditCard: string;
  bankTransfer: string;
  confirmEnrollment: string;
  processing: string;
  successTitle: string;
  successMessage: string;
  startStudyingNow: string;

  // AI Tutor
  aiTutorTitle: string;
  aiTutorSubtitle: string;
  aiTutorCourseLocked: string;
  aiTutorWelcome: string;
  aiTutorInputPlaceholder: string;

  // Profile Settings
  profileTitle: string;
  settingsTitle: string;
  languageSettingTitle: string;
  languageSettingDesc: string;

  // Auth Screen Translations
  demoCredentialsPill: string;
  invalidCredentialsError: string;
  registerTitle: string;
  registerSubtitle: string;
  fullNameLabel: string;
  phoneLabel: string;
  acceptTermsPrefix: string;
  termsOfUse: string;
  andWord: string;
  privacyPolicy: string;
  finalizeRegistration: string;
  alreadyHaveAccount: string;
  resetPasswordTitle: string;
  resetPasswordSubtitle: string;
  sendResetLink: string;
  backToLogin: string;
  termsTitle: string;
  privacyTitle: string;
  closeAndReturn: string;
}

const ptBrTranslations: Translations = {
  navHome: 'Home',
  navSearch: 'Busca',
  navTrail: 'Acadêmico',
  navDownloads: 'Download',
  navProfile: 'Perfil',
  navLogout: 'Sair da Plataforma',
  navAboutAcademy: 'SOBRE A UN2D ACADEMY',
  navStartNow: 'COMEÇAR AGORA',

  heroTitle1: 'CAPACITAÇÃO PROFISSIONAL PARA O MERCADO REAL',
  heroSubtitle1: 'Mérito, Ética & Protagonismo',
  heroDesc1: 'A UN2D Academy é a plataforma oficial de ensino da União Nacional de Docentes de Direita. Um ambiente virtual completo de capacitação profissional para jovens e adultos, fundamentada no compromisso com o ensino livre de viés ideológico de esquerda.',
  heroBadge1: 'UN2D Academy • Oficial',

  heroTitle2: 'EXCELÊNCIA TÉCNICA & DESENVOLVIMENTO CONTÍNUO',
  heroSubtitle2: 'Formação Emancipadora',
  heroDesc2: 'Preparamos o aluno para as reais exigências do mercado com cursos online em diversas áreas, lives interativas e atividades práticas com foco no mérito e no crescimento sustentável.',

  heroTitle3: 'CONHECIMENTO LIVRE DE NARRATIVAS POLÍTICAS',
  heroSubtitle3: 'Compromisso com o Futuro',
  heroDesc3: 'Libertamos as novas gerações de distorções ideológicas, oferecendo formação sólida, ética e técnica para quem busca vencer pelo próprio esforço e talento.',

  accessAccount: 'ACESSAR SUA CONTA',
  fillProfessionalCredentials: 'Preencha suas credenciais de acesso',
  emailLabel: 'E-MAIL CADASTRADO',
  passwordLabel: 'SENHA DE ACESSO',
  loginButton: 'ENTRAR NA PLATAFORMA',
  forgotPassword: 'Esqueceu sua senha?',
  newStudentPrompt: 'Ainda não é cadastrado?',
  createAccount: 'Cadastre-se na UN2D Academy',

  ecosystemTitle: 'Ecossistema Educacional',
  ecosystemSubtitle: 'Completo & Inovador',
  ecosystemDesc: 'A UN2D Academy oferece um ambiente virtual completo de aprendizagem com videoaulas em alta resolução, apostilas práticas e certificações profissionais reconhecidas.',

  forEnterprise: 'Para Empresas e Empreendedores',
  forEnterpriseDesc: 'Capacite equipes e parceiros comerciais com formação técnica rigorosa e voltada para produtividade real.',
  forGov: 'Parcerias Institucionais',
  forGovDesc: 'Programas de qualificação profissional com foco no protagonismo individual e nas necessidades econômicas regionais.',
  forCreators: 'Docentes da UN2D',
  forCreatorsDesc: 'Corpo docente altamente qualificado compartilhando conhecimento técnico com seriedade pedagógica.',

  featuredCourses: 'Cursos em Destaque',
  techInnovation: 'Tecnologia & Inclusão Digital',
  techInnovationSubtitle: 'Competências digitais e ferramentas modernas para a indústria e escritórios',
  sustainabilityClimate: 'Meio Ambiente & Sustentabilidade',
  sustainabilityClimateSubtitle: 'Manejo sustentável, gestão de resíduos e preservação consciente dos biomas',
  viewAll: 'Ver todos →',

  devicesTitle: 'Assista quando e onde quiser',
  devicesSubtitle: 'Multi-Dispositivo Sincronizado',
  devicesDesc: 'No celular, tablet, computador ou Smart TV. A UN2D Academy acompanha o seu ritmo de aprendizado com progresso salvo em tempo real.',

  faqTitle: 'Perguntas Frequentes',
  faq1Q: 'O que é a UN2D Academy?',
  faq1A: 'A UN2D Academy é a plataforma oficial de ensino da União Nacional de Docentes de Direita, um ambiente virtual completo de capacitação profissional para jovens e adultos focado nas exigências reais do mercado de trabalho.',
  faq2Q: 'Como funciona o acesso à plataforma?',
  faq2A: 'Você pode acessar de qualquer celular, tablet ou computador. Os conteúdos contam com videoaulas, materiais de apoio em PDF para download offline e avaliações práticas.',
  faq3Q: 'Os cursos emitem certificados oficiais?',
  faq3A: 'Sim. Cada curso concluído com aproveitamento mínimo confere certificado digital oficial com código verificador e QR Code de autenticidade emitido pela UN2D.',

  catTech: 'Tecnologia',
  catSust: 'Sustentabilidade',
  catGest: 'Gestão',
  catEdu: 'Educação',
  catLang: 'Idiomas',
  catBio: 'Alimentos',

  exploreCategory: 'Navegar por Categorias',
  upcomingCategoryTitle: 'Curso em Produção',
  upcomingCategoryMessage: 'Estamos finalizando novos módulos para esta categoria que serão disponibilizados em breve!',
  understoodBtn: 'Entendido',

  instructorLabel: 'Docente Especialista',
  durationLabel: 'Carga Horária',
  certificationLabel: 'Certificação Oficial',
  enrollNow: 'INICIAR CURSO AGORA',
  startLessons: 'ASSISTIR AULAS',
  officialCertificationBadge: 'Certificado Oficial UN2D Academy',
  beginnerLevel: 'Nível Profissionalizante',
  aiTuteurBtn: 'Assistente de Estudo',

  tabSummary: '📋 Ementa Completa do Curso',
  tabLessons: '🎬 Módulos e Videoaulas',
  tabMaterials: '📄 Apostilas e Roteiros (PDF)',
  tabQuiz: '✍️ Avaliações Práticas',
  tabAITutor: '📚 Dúvidas & Docentes',

  modulesTitle: 'Módulos de Formação',
  lessonsTitle: 'Aulas do Módulo',
  downloadMaterials: 'Baixar Apostilas em PDF',
  quizTitle: 'Avaliação de Conhecimento',

  checkoutTitle: 'Matricular-se no Curso',
  checkoutSubtitle: 'Acesso imediato à UN2D Academy com emissão de certificado oficial',
  orderSummary: 'Resumo da Inscrição',
  studentNameLabel: 'Nome Completo do Aluno',
  studentEmailLabel: 'E-mail de Acesso',
  studentPhoneLabel: 'Telefone / WhatsApp',
  paymentMethod: 'Forma de Matrícula',
  mobileMoneyRdc: 'Pix Instantâneo',
  creditCard: 'Cartão de Crédito',
  bankTransfer: 'Boleto Bancário',
  confirmEnrollment: 'Confirmar Acesso & Começar',
  processing: 'Processando inscrição...',
  successTitle: 'Acesso Liberado com Sucesso!',
  successMessage: 'Bem-vindo à UN2D Academy. Bons estudos em sua jornada de excelência técnica!',
  startStudyingNow: 'Começar a estudar agora',

  aiTutorTitle: 'Canal Acadêmico UN2D',
  aiTutorSubtitle: 'Coordenação e Docentes da UN2D',
  aiTutorCourseLocked: 'Módulo Exclusivo do Curso',
  aiTutorWelcome: 'Olá! Seja bem-vindo ao suporte pedagógico deste curso. Consulte as orientações técnicas e o material de estudo das aulas!',
  aiTutorInputPlaceholder: 'Tire sua dúvida pedagógica...',

  profileTitle: 'Perfil do Aluno',
  settingsTitle: 'Configurações da Plataforma',
  languageSettingTitle: 'Idioma Oficial do Sistema',
  languageSettingDesc: 'A plataforma opera exclusivamente no idioma Português Brasileiro (pt-BR)',

  demoCredentialsPill: 'Credenciais de Demonstração (clique para preencher)',
  invalidCredentialsError: 'E-mail ou senha incorretos. Utilize as credenciais fornecidas.',
  registerTitle: 'Cadastro de Aluno',
  registerSubtitle: 'Faça parte da UN2D Academy',
  fullNameLabel: 'NOME COMPLETO',
  phoneLabel: 'TELEFONE / WHATSAPP',
  acceptTermsPrefix: 'Declaro que li e aceito os',
  termsOfUse: 'Termos de Uso',
  andWord: 'e a',
  privacyPolicy: 'Política de Privacidade',
  finalizeRegistration: 'Concluir Cadastro',
  alreadyHaveAccount: 'Já possui cadastro?',
  resetPasswordTitle: 'Recuperação de Senha',
  resetPasswordSubtitle: 'Digite seu e-mail para receber as instruções de recuperação',
  sendResetLink: 'Enviar Instruções',
  backToLogin: '← Voltar para o login',
  termsTitle: 'Termos Gerais de Uso e Diretrizes Éticas',
  privacyTitle: 'Política de Privacidade e Proteção de Dados (LGPD)',
  closeAndReturn: 'Fechar e Retornar'
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'pt-br',
  setLanguage: () => {},
  t: ptBrTranslations
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('pt-br');

  useEffect(() => {
    localStorage.setItem('undd_language', 'pt-br');
  }, []);

  const setLanguage = (_code: LanguageCode) => {
    setLanguageState('pt-br');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: ptBrTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  return useContext(LanguageContext);
};
