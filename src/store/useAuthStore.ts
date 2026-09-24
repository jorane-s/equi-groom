import {AuthState} from "@/models/auth";
import { create } from 'zustand';
import {supabaseClient} from "@/lib/supabase/supabase-client";

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
        try {
            const { data, error } = await supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Erreur lors de la récupération du profil :', error.message);
            } else {
                set({ profile: data });
            }
        } catch (e) {
            console.error('Erreur inattendue :', e);
        }
    },

    signOut: async () => {
        await supabaseClient.auth.signOut();
        set({ session: null, user: null, profile: null });
    },
}));