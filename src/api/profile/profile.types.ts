export type ProfileUserResponseType = {
    userId: number
    aboutMe: string
    contacts: Contacts
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: Photos
}

export type Photos = {
    large: string
    small: string
}

export type Contacts = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}