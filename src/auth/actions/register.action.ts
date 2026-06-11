import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.reponse";



export const RegisterAction = async (email: string, password: string, fullName: string) => {
    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
            email,
            password,
            fullName
        });
        console.log({ data });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    };

}
