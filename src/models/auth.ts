import {Session, User} from "@supabase/supabase-js";
import {UserProfile} from "@/lib/supabase/models/profile";

export interface AuthState {
    session: Session | null;
    user: User | null;
    profile: UserProfile | null;
    isLoading: boolean;

    // Actions
    setSession: (session: Session | null) => void;
    signIn: (userId: string) => Promise<void>;
    signOut: () => Promise<void>;
}