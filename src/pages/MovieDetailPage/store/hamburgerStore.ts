// src/store/reviewStore.ts
import { create } from 'zustand';

interface HamburgerStoreState {
  openHamburgerId: string | null; // 현재 열려 있는 리뷰의 ID
  setOpenHamburgerId: (id: string | null) => void; // 리뷰를 열고 닫는 함수
}

export const useHamburgerStore = create<HamburgerStoreState>((set) => ({
  openHamburgerId: null, // 기본값은 아무 리뷰도 열려 있지 않음
  setOpenHamburgerId: (id: string | null) => set(() => ({ openHamburgerId: id })),
}));
