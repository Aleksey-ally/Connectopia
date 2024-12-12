export type ResponseUsersType = {
    items: UserType[]
    totalCount: number
    error: null | number
}

export type UserType = {
    id: number
    name: string
    photos: { small: string | null, large: string | null }
    status?: string | undefined
    followed: boolean
    toggleFollowing: boolean
}

