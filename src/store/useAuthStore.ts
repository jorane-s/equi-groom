import { AuthState } from "@/models/auth";
import { create } from "zustand";
import { supabaseClient } from "@/lib/supabase/supabase-client";
import { getProfileById } from "@/lib/supabase/profiles";

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  profile: null,
  isLoading: true,

  setSession: (session) => {
    set((state) => ({
      session,
      user: session ? session.user : null,
      isLoading: false,
    }));
    if (session?.user) {
      set((state) => {
        state.signIn(session.user.id);
        return {};
      });
    } else {
      set({ profile: null });
    }
  },

  signIn: async (userId: string) => {
    const response = await getProfileById(userId);
    if (response.success) {
      set({ profile: response.data });
    }
  },

  signOut: async () => {
    await supabaseClient.auth.signOut();
    set({ session: null, user: null, profile: null });
  },
}));
