export const RoutesPath = {

    WelcomeScreen: '/',

    LoadUserProfileScreen: '/LoadUserProfileScreen',

    USER_DASHBOARD: '/UserDashboard',

    NewProfileScreen: '/NewProfileScreen',
    
} as const

export type RoutesPath = typeof RoutesPath[keyof typeof RoutesPath]