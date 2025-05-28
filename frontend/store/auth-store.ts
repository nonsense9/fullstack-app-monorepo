import { create } from 'zustand'
import { User } from "@/hooks/useAuth";
interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthActions {
  login: (user: Partial<User>) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
  setLoading: (loading: boolean) => void
  refreshToken: () => Promise<void>
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  login: () => set((data) => ({ ...data, isAuthenticated: true })),
  logout: () => set({ isAuthenticated: false }),
}))

return {
  useAuthStore
}
