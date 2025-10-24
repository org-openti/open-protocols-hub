export const UserDashboardScreens = {

    USER_HOME: 'user-home',
    NOSTR: 'nostr'
    
} as const

export type UserDashboardScreens = typeof UserDashboardScreens[keyof typeof UserDashboardScreens]