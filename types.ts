
export enum Category {
  Educacao = 'Educação',
  Idiomas = 'Idiomas',
  Sustentabilidade = 'Sustentabilidade',
  Tecnologia = 'Tecnologia',
  Alimentos = 'Alimentos',
  Gestao = 'Gestão'
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
  lastProgress?: number; // Tempo em segundos onde o usuário parou
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'link';
  url: string;
  isDownloaded?: boolean; 
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface CourseModule {
  title: string;
  lessons: Lesson[];
}

export interface SyllabusSection {
  section: string;
  title: string;
}

export interface Course {
  id: string;
  title: string;
  tagline?: string;
  category: Category;
  description: string;
  instructor: string;
  instructorTitle?: string;
  level?: string;
  certification?: string;
  thumbnail: string;
  heroImage: string;
  progress: number;
  duration: string;
  modulesCount: number;
  modules?: CourseModule[];
  materials?: Material[];
  quiz?: QuizQuestion[];
  syllabusTable?: SyllabusSection[];
}

export interface UserProfile {
  name: string;
  email: string;
  cpf: string;
  avatar: string;
  level: number;
  badges: string[];
  plan: string;
  phone?: string;
  title?: string;
  bio?: string;
  city?: string;
  address?: string;
  skills?: string[];
}

export interface Certificate {
  id: string;
  title: string;
  date: string;
  code?: string;
  category?: string;
  hours?: number;
  grade?: string;
}

export interface BookPage {
  pageNumber: number;
  chapterTitle?: string;
  content: string;
}

export interface DigitalBook {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  authorRole?: string;
  coverImage: string;
  category: string;
  type: 'ebook' | 'audiobook' | 'both';
  totalPages: number;
  audioDuration?: string;
  rating: number;
  reviewsCount?: number;
  description: string;
  isFree: boolean;
  isPurchased?: boolean;
  price?: number;
  publishedYear: string;
  readingProgress?: number; // 0 a 100
  currentPage?: number;
  narrator?: string;
  audioChapters?: {
    id: string;
    title: string;
    duration: string;
    audioUrl?: string;
  }[];
  pages: BookPage[];
}

