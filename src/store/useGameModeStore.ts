// src/store/useGameModeStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameModeState {
  gameMode: string;
  setGameMode: (mode: string) => void;
}

const useGameModeStore = create<GameModeState>()(
  persist(
    (set) => ({
      gameMode: '',
      setGameMode: (mode) => set({ gameMode: mode }),
    }),
    {
      name: 'gameMode',
    },
  ),
);

export default useGameModeStore;
