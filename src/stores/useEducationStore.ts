import { create } from 'zustand';
import { EducationContent, QuizQuestion, WeeklyScore } from '../types';

interface EducationState {
  articles: EducationContent[];
  videos: EducationContent[];
  infographics: EducationContent[];
  featuredContent: EducationContent | null;
  quizQuestions: QuizQuestion[];
  quizScores: WeeklyScore[];
  currentScore: number;
  activeTab: 'article' | 'infographic' | 'video';
  isLoading: boolean;
  error: string | null;
  setActiveTab: (tab: 'article' | 'infographic' | 'video') => void;
  clearError: () => void;
}

const DEMO_FEATURED: EducationContent = {
  id: '1',
  type: 'article',
  title: 'Panduan Lengkap Manfaat Vaksin',
  description: 'Pahami bagaimana vaksin membangun sistem kekebalan tubu...',
  imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400',
  category: 'Imunisasi',
  readTime: 'Baca 5 menit',
  featured: true,
  content: '',
  createdAt: {} as any,
};

const DEMO_ARTICLES: EducationContent[] = [
  DEMO_FEATURED,
  {
    id: '2',
    type: 'article',
    title: 'Mengelola Efek Samping',
    description: 'Apa yang diharapkan setelah suntikan dan cara menenangkan bayi Anda dengan lembut.',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    category: 'Panduan',
    readTime: 'Baca 4 menit',
    featured: false,
    content: '',
    createdAt: {} as any,
  },
  {
    id: '3',
    type: 'article',
    title: 'Pencegahan Infeksi',
    description: 'Kebiasaan sehari-hari untuk menjaga kesehatan bayi.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
    category: 'Edukasi',
    readTime: 'Baca 3 menit',
    featured: false,
    content: '',
    createdAt: {} as any,
  },
];

const DEMO_QUIZ: QuizQuestion[] = [
  {
    id: '1',
    question: 'Apa manfaat utama dari vaksin BCG?',
    options: [
      'Melindungi dari Tuberkulosis (TBC)',
      'Mencegah flu musiman',
      'Mengobati demam tinggi',
    ],
    correctAnswer: 0,
  },
  {
    id: '2',
    question: 'Kapan dosis pertama Hep B harus diberikan?',
    options: [
      'Pada usia 1 tahun',
      'Dalam waktu 24 jam setelah lahir',
      'Hanya saat anak sedang sakit',
    ],
    correctAnswer: 1,
  },
];

const DEMO_SCORES: WeeklyScore[] = [
  { week: 'Mgg 1', score: 65 },
  { week: 'Mgg 2', score: 70 },
  { week: 'Mgg 3', score: 72 },
  { week: 'Mgg 4', score: 82 },
  { week: 'Mgg 5', score: 85 },
  { week: 'Mgg 6', score: 90 },
];

export const useEducationStore = create<EducationState>((set) => ({
  articles: DEMO_ARTICLES,
  videos: [],
  infographics: [],
  featuredContent: DEMO_FEATURED,
  quizQuestions: DEMO_QUIZ,
  quizScores: DEMO_SCORES,
  currentScore: 92,
  activeTab: 'article',
  isLoading: false,
  error: null,

  setActiveTab: (tab): void => {
    set({ activeTab: tab });
  },

  clearError: (): void => {
    set({ error: null });
  },
}));
