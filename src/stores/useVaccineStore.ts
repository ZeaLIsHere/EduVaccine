import { create } from 'zustand';
import { VaccineGroup, GrowthEntry } from '../types';

interface VaccineState {
  schedule: VaccineGroup[];
  completionPercentage: number;
  growthData: GrowthEntry[];
  isLoading: boolean;
  error: string | null;
  setSchedule: (schedule: VaccineGroup[]) => void;
  setCompletionPercentage: (percentage: number) => void;
  markVaccineComplete: (ageInMonths: number, vaccineName: string) => void;
  clearError: () => void;
}

const DEMO_SCHEDULE: VaccineGroup[] = [
  {
    ageInMonths: 0,
    label: 'Lahir',
    status: 'completed',
    scheduledDate: '15/08/2023',
    vaccines: [
      { name: 'Hepatitis B (Dosis 1)', completed: true },
      { name: 'BCG', completed: true },
      { name: 'Polio (OPV 0)', completed: true },
    ],
  },
  {
    ageInMonths: 2,
    label: '2 Bulan',
    status: 'completed',
    scheduledDate: '15/10/2023',
    vaccines: [
      { name: 'Hepatitis B (Dosis 2)', completed: true },
      { name: 'Rotavirus (RV)', completed: true },
    ],
  },
  {
    ageInMonths: 4,
    label: '4 Bulan',
    status: 'upcoming',
    scheduledDate: '12 Okt 2023',
    vaccines: [
      { name: 'DTaP', completed: false },
      { name: 'Polio (IPV)', completed: false },
    ],
  },
  {
    ageInMonths: 6,
    label: '6 Bulan',
    status: 'overdue',
    scheduledDate: '15/02/2024',
    vaccines: [
      { name: 'Vaksin Flu (Tahunan)', completed: false },
    ],
  },
  {
    ageInMonths: 9,
    label: '9 Bulan',
    status: 'upcoming',
    scheduledDate: '15/05/2024',
    vaccines: [
      { name: 'Campak / MR (Dosis 1)', completed: false },
    ],
  },
  {
    ageInMonths: 12,
    label: '12 Bulan',
    status: 'upcoming',
    scheduledDate: '15/08/2024',
    vaccines: [
      { name: 'MMR', completed: false },
      { name: 'Varicella', completed: false },
      { name: 'Hep A', completed: false },
    ],
  },
  {
    ageInMonths: 15,
    label: '15 Bulan',
    status: 'upcoming',
    scheduledDate: '15/11/2024',
    vaccines: [
      { name: 'DPT (Dosis 4)', completed: false },
    ],
  },
];

const DEMO_GROWTH: GrowthEntry[] = [
  { label: 'Lahir', weight: 3.2, height: 50 },
  { label: '2 bln', weight: 4.8, height: 55 },
  { label: '4 bln', weight: 6.0, height: 60 },
  { label: 'Sekarang', weight: 7.2, height: 65.5 },
];

export const useVaccineStore = create<VaccineState>((set) => ({
  schedule: DEMO_SCHEDULE,
  completionPercentage: 75,
  growthData: DEMO_GROWTH,
  isLoading: false,
  error: null,

  setSchedule: (schedule: VaccineGroup[]): void => {
    set({ schedule });
  },

  setCompletionPercentage: (percentage: number): void => {
    set({ completionPercentage: percentage });
  },

  markVaccineComplete: (ageInMonths: number, vaccineName: string): void => {
    set((state) => ({
      schedule: state.schedule.map((group) => {
        if (group.ageInMonths !== ageInMonths) return group;
        const updatedVaccines = group.vaccines.map((v) =>
          v.name === vaccineName ? { ...v, completed: true } : v
        );
        const allDone = updatedVaccines.every((v) => v.completed);
        return {
          ...group,
          vaccines: updatedVaccines,
          status: allDone ? 'completed' as const : group.status,
        };
      }),
    }));
  },

  clearError: (): void => {
    set({ error: null });
  },
}));
