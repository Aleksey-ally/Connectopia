export type PropertiesLogin = {
    email: string
    password: number
    rememberMe: boolean
}

export type ResponseLogin = {
    userId: number
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

