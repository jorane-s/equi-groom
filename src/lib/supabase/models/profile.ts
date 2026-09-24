import {Horse} from "@/lib/supabase/models/horse";

export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
    horses: Horse[];
}

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
}

export interface NewUser {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
}
