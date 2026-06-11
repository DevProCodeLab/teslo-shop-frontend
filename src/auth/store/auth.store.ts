import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/login.actions';
import { checkAuthAction } from '../actions/check.auth.action';
import { RegisterAction } from '../actions/register.action';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthState = {
    //properties
    user: User | null;
    token: string | null;
    authstatus: AuthStatus;
    //Getters
    isAdmin: () => boolean;
    //Actions
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;
    register: (email: string, password: string, fullname: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authstatus: 'checking',
    //Getters
    isAdmin: () => {
        const roles = get().user?.roles || [];
        return roles.includes('admin');
    },
    login: async (email: string, password: string) => {

        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token);

            set({ user: data.user, token: data.token, authstatus: 'authenticated' });
            return true;
        } catch {
            localStorage.removeItem('token');
            set({ user: null, token: null, authstatus: 'not-authenticated' });
            return false;
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authstatus: 'not-authenticated' });
    },
    checkAuthStatus: async () => {
        try {
            const { user, token } = await checkAuthAction();
            set({ user: user, token: token, authstatus: 'authenticated' });
            return true;
        } catch {
            set({ user: undefined, token: undefined, authstatus: 'not-authenticated' });
            return false;
        }
    },
    register: async (email: string, password: string, fullname: string) => {
        try {
            const data = await RegisterAction(email, password, fullname);
            localStorage.setItem('token', data.token);

            set({ user: data.user, token: data.token, authstatus: 'authenticated' });
            return true;
        } catch (error) {
            localStorage.removeItem('token');
            set({ user: null, token: null, authstatus: 'not-authenticated' });
            return false;
        }
    },
}))

