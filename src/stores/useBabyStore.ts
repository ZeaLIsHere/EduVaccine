import { create } from 'zustand';
import { Baby } from '../types';
import * as babyService from '../services/babyService';
import { Timestamp } from 'firebase/firestore';

interface BabyState {
  baby: Baby | null;
  babies: Baby[];
  isLoading: boolean;
  error: string | null;
  fetchBabies: (userId: string) => Promise<void>;
  saveBaby: (baby: Omit<Baby, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateBaby: (babyId: string, updates: Partial<Baby>) => Promise<void>;
  setActiveBaby: (baby: Baby) => void;
  clearError: () => void;
}

const DEMO_BABY: Baby = {
  id: 'demo-baby-1',
  userId: 'demo-user',
  name: 'Leo James',
  birthDate: Timestamp.fromDate(new Date('2023-08-15')),
  gender: 'male',
  weight: 7.2,
  height: 65.5,
  vaccineHistory: ['BCG (Lahir)', 'Hep B (Dosis 1)', 'DPT (2bln)'],
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
};

export const useBabyStore = create<BabyState>((set) => ({
  baby: DEMO_BABY,
  babies: [DEMO_BABY],
  isLoading: false,
  error: null,

  fetchBabies: async (userId: string): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const babies = await babyService.getBabiesByUser(userId);
      set({
        babies: babies.length > 0 ? babies : [DEMO_BABY],
        baby: babies.length > 0 ? babies[0] : DEMO_BABY,
        isLoading: false,
      });
    } catch (error) {
      set({
        babies: [DEMO_BABY],
        baby: DEMO_BABY,
        error: error instanceof Error ? error.message : 'Gagal memuat data.',
        isLoading: false,
      });
    }
  },

  saveBaby: async (babyData): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      const saved = await babyService.saveBaby(babyData);
      set((state) => ({
        baby: saved,
        babies: [...state.babies, saved],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Gagal menyimpan.',
        isLoading: false,
      });
    }
  },

  updateBaby: async (babyId: string, updates: Partial<Baby>): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      await babyService.updateBaby(babyId, updates);
      set((state) => ({
        baby: state.baby
          ? { ...state.baby, ...updates }
          : null,
        babies: state.babies.map((b) =>
          b.id === babyId ? { ...b, ...updates } : b
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Gagal memperbarui.',
        isLoading: false,
      });
    }
  },

  setActiveBaby: (baby: Baby): void => {
    set({ baby });
  },

  clearError: (): void => {
    set({ error: null });
  },
}));
