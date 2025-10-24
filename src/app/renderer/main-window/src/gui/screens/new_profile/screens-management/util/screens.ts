export const NewProfileScreens = {

    NEW_USER_PROFILE: 'NEW_USER_PROFILE',
    NOSTR_PROFILE: 'NOSTR_PROFILE'
    
} as const

export type NewProfileScreens = typeof NewProfileScreens[keyof typeof NewProfileScreens]