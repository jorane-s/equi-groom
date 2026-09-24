import {UserProfile} from "@/lib/supabase/models/profile";

export interface Horse {
    id: string;
    name: string;
    breed: string;
    coat: string;
    height: number;
    birthDate: string;
    created_at: string;
    owner: UserProfile;
}

export interface NewHorse {
    name: string;
    breed: string;
    coat: string;
    height: number;
    birthDate: string;
    ownerId: string | null;
}
