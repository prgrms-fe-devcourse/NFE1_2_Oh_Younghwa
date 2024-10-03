// src/store/reviewStore.ts
import { create } from 'zustand';

interface openedReviewStoreState {
  openedReviewId: string | null; // 현재 열려 있는 리뷰의 ID
  setOpenedReviewId: (id: string | null) => void; // 리뷰를 열고 닫는 함수
}

export const useOpenedReviewStore = create<openedReviewStoreState>((set) => ({
  openedReviewId: null, // 기본값은 아무 리뷰도 열려 있지 않음
  setOpenedReviewId: (id: string | null) => set(() => ({ openedReviewId: id })),
}));
