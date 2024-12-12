import {instance} from "api/base-api";
import {DefaultResponseType} from "api/base-api.types";
import {PropertiesLogin, ResponseAuth, ResponseLogin} from "./auth.types";

export const authApi = {
    async me() {
        const res = await instance.get<ResponseAuth>('auth/me')
        return res.data
    },
    async login(payload: PropertiesLogin) {
        const res = await instance.post<DefaultResponseType<ResponseLogin>>('auth/login', {...payload})
        return res.data
    },
    async logout() {
        const res = await instance.delete<DefaultResponseType>('auth/login')
        return res.data
    }
}
