export type DefaultResponseType<T = {}> = {
    resultCode: 1 | 0 | 10
    messages: string[],
    data: T
}