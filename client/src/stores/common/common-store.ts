import { create } from 'zustand';

type CommonStore = {
  showLoadingGlobal: boolean;
  onSetIsShowLoadingGlobal: (showLoadingGlobal: boolean) => void;
};

export const useCommonStore = create<CommonStore>((set) => ({
  showLoadingGlobal: false,
  onSetIsShowLoadingGlobal: (showLoadingGlobal: boolean) => set({ showLoadingGlobal }),
}));
