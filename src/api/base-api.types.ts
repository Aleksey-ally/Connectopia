export type DefaultResponseType<T = {}> = {
    resultCode: 1 | 0
    messages: string[],
    data: T
}