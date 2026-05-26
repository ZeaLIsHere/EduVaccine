import { create } from 'zustand';
import { AdminStats, VideoView, PageView } from '../types';

interface AdminState {
  stats: AdminStats;
  videoViews: VideoView[];
  pageViews: PageView[];
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  stats: {
    totalSessions: 42850,
    sessionsTrend: 12,
    totalBabies: 21166,
    immunized: 15240,
    notImmunized: 5926,
  },
  videoViews: [
    {
      id: '1',
      title: 'Pentingnya Imunis...',
      category: 'Edukasi',
      duration: '3m 45s',
      views: 12402,
      thumbnailUrl: '',
    },
    {
      id: '2',
      title: 'Menangani Efek Sa...',
      category: 'Panduan',
      duration: '5m 12s',
      views: 9870,
      thumbnailUrl: '',
    },
    {
      id: '3',
      title: 'Jadwal Imunisasi I...',
      category: 'Info Terbaru',
      duration: '2m 30s',
      views: 7215,
      thumbnailUrl: '',
    },
  ],
  pageViews: [
    { path: '/dashboard/pasien-saya', visits: 18520, duration: 4 },
    { path: '/edukasi/video-imunisasi', visits: 12402, duration: 12 },
    { path: '/jadwal/vaksinasi-nasional', visits: 8910, duration: 2 },
    { path: '/profil/rekam-medis', visits: 5440, duration: 6 },
  ],
  isLoading: false,
  error: null,

  clearError: (): void => {
    set({ error: null });
  },
}));
