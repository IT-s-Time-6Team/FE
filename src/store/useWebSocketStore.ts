// src/store/useWebSocketStore.ts
import { create } from 'zustand';
import { Client } from '@stomp/stompjs';

interface WebSocketState {
  client: Client | null;
  setClient: (client: Client) => void;
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
  client: null,
  setClient: (client: Client) => set({ client }),
}));
