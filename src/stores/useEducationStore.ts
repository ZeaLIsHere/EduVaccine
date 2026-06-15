import { create } from 'zustand';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { EducationContent, QuizQuestion, WeeklyScore } from '../types';
import {
  getEducationContent,
  getFeaturedContent,
  getQuizQuestions,
} from '../services/educationService';

interface EducationState {
  articles: EducationContent[];
  videos: EducationContent[];
  infographics: EducationContent[];
  featuredContent: EducationContent | null;
  quizQuestions: QuizQuestion[];
  quizScores: WeeklyScore[];
  currentScore: number;
  activeTab: 'article' | 'infographic' | 'video';

  articlesCursor: QueryDocumentSnapshot | null;
  videosCursor: QueryDocumentSnapshot | null;
  infographicsCursor: QueryDocumentSnapshot | null;
  hasMoreArticles: boolean;
  hasMoreVideos: boolean;
  hasMoreInfographics: boolean;

  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;

  setActiveTab: (tab: 'article' | 'infographic' | 'video') => void;
  fetchArticles: () => Promise<void>;
  fetchVideos: () => Promise<void>;
  fetchInfographics: () => Promise<void>;
  fetchFeatured: () => Promise<void>;
  fetchQuizQuestions: () => Promise<void>;
  loadMoreArticles: () => Promise<void>;
  loadMoreVideos: () => Promise<void>;
  loadMoreInfographics: () => Promise<void>;
  clearError: () => void;
}

const DEMO_FEATURED: EducationContent = {
  id: '1',
  type: 'article',
  title: 'Panduan Lengkap Manfaat Vaksin',
  description: 'Pahami bagaimana vaksin membangun sistem kekebalan tubuh bayi Anda.',
  thumbnailUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400',
  category: 'Imunisasi',
  readTime: 'Baca 5 menit',
  featured: true,
  createdAt: {} as any,
};

const DEMO_ARTICLES: EducationContent[] = [
  DEMO_FEATURED,
  {
    id: '2',
    type: 'article',
    title: 'Mengelola Efek Samping',
    description: 'Apa yang diharapkan setelah suntikan dan cara menenangkan bayi Anda dengan lembut.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    category: 'Panduan',
    readTime: 'Baca 4 menit',
    featured: false,
    createdAt: {} as any,
  },
  {
    id: '3',
    type: 'article',
    title: 'Pencegahan Infeksi',
    description: 'Kebiasaan sehari-hari untuk menjaga kesehatan bayi.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
    category: 'Edukasi',
    readTime: 'Baca 3 menit',
    featured: false,
    createdAt: {} as any,
  },
];

const DEMO_VIDEOS: EducationContent[] = [
  {
    id: 'v1',
    type: 'video',
    title: 'Video Edukasi Imunisasi Bayi',
    description: 'Panduan edukasi lengkap seputar imunisasi dan kesehatan bayi untuk para orang tua.',
    videoId: 'ziKujLMGQeE',
    videoDuration: '',
    category: 'Imunisasi',
    featured: false,
    createdAt: {} as any,
  },
];

const DEMO_INFOGRAPHICS: EducationContent[] = [
  {
    id: 'i1',
    type: 'infographic',
    title: 'Jadwal Imunisasi Lengkap 0–24 Bulan',
    description: 'Infografis jadwal lengkap vaksin nasional sesuai pedoman Kemenkes RI.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    category: 'Jadwal',
    featured: false,
    createdAt: {} as any,
  },
  {
    id: 'i2',
    type: 'infographic',
    title: 'Nutrisi Penting untuk Bayi 6–12 Bulan',
    description: 'Panduan visual nutrisi MPASI yang tepat untuk tumbuh kembang optimal.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
    category: 'Nutrisi',
    featured: false,
    createdAt: {} as any,
  },
];

const DEMO_QUIZ: QuizQuestion[] = [
  {
    id: '1',
    question: 'Apa manfaat utama dari vaksin BCG?',
    options: ['Melindungi dari Tuberkulosis (TBC)', 'Mencegah flu musiman', 'Mengobati demam tinggi'],
    correctAnswer: 0,
  },
  {
    id: '2',
    question: 'Kapan dosis pertama Hep B harus diberikan?',
    options: ['Pada usia 1 tahun', 'Dalam waktu 24 jam setelah lahir', 'Hanya saat anak sedang sakit'],
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

export const useEducationStore = create<EducationState>((set, get) => ({
  articles: DEMO_ARTICLES,
  videos: DEMO_VIDEOS,
  infographics: DEMO_INFOGRAPHICS,
  featuredContent: DEMO_FEATURED,
  quizQuestions: DEMO_QUIZ,
  quizScores: DEMO_SCORES,
  currentScore: 92,
  activeTab: 'article',

  articlesCursor: null,
  videosCursor: null,
  infographicsCursor: null,
  hasMoreArticles: false,
  hasMoreVideos: false,
  hasMoreInfographics: false,

  isLoading: false,
  isLoadingMore: false,
  error: null,

  setActiveTab: (tab): void => {
    set({ activeTab: tab });
  },

  fetchArticles: async (): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const result = await getEducationContent('article');
      if (result.items.length > 0) {
        set({
          articles: result.items,
          articlesCursor: result.lastDoc,
          hasMoreArticles: result.hasMore,
        });
      }
    } catch {
      set({ error: 'Gagal memuat artikel.' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchVideos: async (): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const result = await getEducationContent('video');
      if (result.items.length > 0) {
        set({
          videos: result.items,
          videosCursor: result.lastDoc,
          hasMoreVideos: result.hasMore,
        });
      }
    } catch {
      set({ error: 'Gagal memuat video.' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchInfographics: async (): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const result = await getEducationContent('infographic');
      if (result.items.length > 0) {
        set({
          infographics: result.items,
          infographicsCursor: result.lastDoc,
          hasMoreInfographics: result.hasMore,
        });
      }
    } catch {
      set({ error: 'Gagal memuat infografis.' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeatured: async (): Promise<void> => {
    try {
      const featured = await getFeaturedContent();
      if (featured) set({ featuredContent: featured });
    } catch {
      // Pertahankan DEMO_FEATURED jika Firebase gagal
    }
  },

  fetchQuizQuestions: async (): Promise<void> => {
    try {
      const questions = await getQuizQuestions();
      if (questions.length > 0) set({ quizQuestions: questions });
    } catch {
      // Pertahankan DEMO_QUIZ jika Firebase gagal
    }
  },

  loadMoreArticles: async (): Promise<void> => {
    const { articlesCursor, hasMoreArticles, articles } = get();
    if (!hasMoreArticles || !articlesCursor) return;
    set({ isLoadingMore: true });
    try {
      const result = await getEducationContent('article', 10, articlesCursor);
      if (result.items.length > 0) {
        set({
          articles: [...articles, ...result.items],
          articlesCursor: result.lastDoc,
          hasMoreArticles: result.hasMore,
        });
      }
    } catch {
      set({ error: 'Gagal memuat lebih banyak artikel.' });
    } finally {
      set({ isLoadingMore: false });
    }
  },

  loadMoreVideos: async (): Promise<void> => {
    const { videosCursor, hasMoreVideos, videos } = get();
    if (!hasMoreVideos || !videosCursor) return;
    set({ isLoadingMore: true });
    try {
      const result = await getEducationContent('video', 10, videosCursor);
      if (result.items.length > 0) {
        set({
          videos: [...videos, ...result.items],
          videosCursor: result.lastDoc,
          hasMoreVideos: result.hasMore,
        });
      }
    } catch {
      set({ error: 'Gagal memuat lebih banyak video.' });
    } finally {
      set({ isLoadingMore: false });
    }
  },

  loadMoreInfographics: async (): Promise<void> => {
    const { infographicsCursor, hasMoreInfographics, infographics } = get();
    if (!hasMoreInfographics || !infographicsCursor) return;
    set({ isLoadingMore: true });
    try {
      const result = await getEducationContent('infographic', 10, infographicsCursor);
      if (result.items.length > 0) {
        set({
          infographics: [...infographics, ...result.items],
          infographicsCursor: result.lastDoc,
          hasMoreInfographics: result.hasMore,
        });
      }
    } catch {
      set({ error: 'Gagal memuat lebih banyak infografis.' });
    } finally {
      set({ isLoadingMore: false });
    }
  },

  clearError: (): void => {
    set({ error: null });
  },
}));
