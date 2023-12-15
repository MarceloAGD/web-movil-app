import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UseUserStoreT = {
  accessToken?: string;
  email?: string;
  userName?: string;
  idTeam?: number;
  idProject?: number; 
  setEmail: (email: string) => void;
  setAccessToken: (accessToken: string) => void;
  setUserName: (userName: string) => void;
  setIdTeam: (idTeam: number) => void;
  removeAccessToken: () => void;
  setIdProject: (idProject: number) => void;
};

export const useUserStore = create<UseUserStoreT>()(
  devtools(
    persist(
      (set, get) => ({
        accessToken: undefined,
        email: undefined,
        userName: undefined,
        idTeam: undefined,
        idProject: undefined,
        setEmail: (email: string) => set(() => ({ email })),
        setAccessToken: (accessToken: string) => set(() => ({ accessToken })),
        setUserName: (userName: string) => set(() => ({ userName })),
        setIdTeam: (idTeam: number) => set(() => ({ idTeam })),
        removeAccessToken: () => set(() => ({ accessToken: undefined })),
        setIdProject: (idProject: number) => set(() => ({ idProject })),
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
