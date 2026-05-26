import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { AdminStats, VideoView, PageView, FeedbackData } from '../types';

const FEEDBACK_COLLECTION = 'feedback';

export async function getAdminStats(): Promise<AdminStats> {
  try {
    const babiesSnapshot = await getDocs(collection(db, 'babies'));
    const totalBabies = babiesSnapshot.size;

    let immunized = 0;
    let notImmunized = 0;

    babiesSnapshot.docs.forEach((d) => {
      const data = d.data();
      if (data.vaccineHistory && data.vaccineHistory.length > 0) {
        immunized++;
      } else {
        notImmunized++;
      }
    });

    return {
      totalSessions: 42850,
      sessionsTrend: 12,
      totalBabies,
      immunized,
      notImmunized,
    };
  } catch (error) {
    throw new Error('Gagal mengambil statistik admin.');
  }
}

export async function getTopVideoViews(): Promise<VideoView[]> {
  return [
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
  ];
}

export async function getTopPageViews(): Promise<PageView[]> {
  return [
    { path: '/dashboard/pasien-saya', visits: 18520, duration: 4 },
    { path: '/edukasi/video-imunisasi', visits: 12402, duration: 12 },
    { path: '/jadwal/vaksinasi-nasional', visits: 8910, duration: 2 },
    { path: '/profil/rekam-medis', visits: 5440, duration: 6 },
  ];
}

export async function submitFeedback(
  feedback: Omit<FeedbackData, 'createdAt'>
): Promise<void> {
  try {
    const docRef = doc(collection(db, FEEDBACK_COLLECTION));
    await setDoc(docRef, {
      ...feedback,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    throw new Error('Gagal mengirim umpan balik.');
  }
}
