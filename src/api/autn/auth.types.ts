export type PropertiesLogin = {
    email: string
    password: number
    rememberMe: boolean
    captcha?:string
}

export type ResponseLogin = {
    userId: number
    token:string
}

export type ResponseAuth = {
    data: {
        id: number
        login: string
        email: string
    }
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}

