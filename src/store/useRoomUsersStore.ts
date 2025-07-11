import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserInfo {
  nickname: string;
  character: string;
  isLeader: boolean;
}

interface RoomUsersState {
  user: UserInfo | null;
  users: UserInfo[];
  roomKey: string;
  setRoomKey: (key: string) => void;
  addUser: (user: UserInfo) => void;
  removeUser: (nickname: string) => void;
  resetUsers: () => void;
  setUser: (user: UserInfo) => void;
}

const useRoomUsersStore = create<RoomUsersState>()(
  persist(
    (set) => ({
      users: [],
      user: null,
      roomKey: '',
      setRoomKey: (key) => set({ roomKey: key }),
      addUser: (user) =>
        set((state) => {
          const alreadyExists = state.users.some((u) => u.nickname === user.nickname);
          if (alreadyExists) return state;
          return { users: [...state.users, user] };
        }),
      removeUser: (nickname) =>
        set((state) => ({
          users: state.users.filter((u) => u.nickname !== nickname),
        })),
      resetUsers: () => {
        set({ users: [] });
        localStorage.removeItem('room-users');
      },
      setUser: (user) => set({ user }), // 단일 유저 설정
    }),
    {
      name: 'room-users',
    },
  ),
);

export default useRoomUsersStore;
