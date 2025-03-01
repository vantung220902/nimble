import { create } from 'zustand';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type AuthUser = {
  id: string;
  email: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  status: UserStatus;
};

type AuthStore = {
  isAuthenticated?: boolean;
  user: AuthUser;

  onSetIsAuthenticated: (isAuthenticated: boolean) => void;
  onSetUserProfile: ({ user }: { user: AuthUser }) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: null,
  onSetIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  user: null,
  onSetUserProfile: ({ user }) => set({ user }),
}));
