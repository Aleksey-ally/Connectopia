import {instance} from "api/base-api";
import {ResponseGetCaptchaUrl} from "api/security/security.types";

export const securityApi = {

    async getCaptchaUrl() {
        const res = await instance.get<ResponseGetCaptchaUrl>('/security/get-captcha-url')
        return res.data
    }
}
