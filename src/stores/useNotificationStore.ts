import { create } from 'zustand';

interface NotificationState {
  h7Enabled: boolean;
  h1Enabled: boolean;
  toggleH7: () => void;
  toggleH1: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  h7Enabled: true,
  h1Enabled: true,

  toggleH7: (): void => {
    set((state) => ({ h7Enabled: !state.h7Enabled }));
  },

  toggleH1: (): void => {
    set((state) => ({ h1Enabled: !state.h1Enabled }));
  },
}));
