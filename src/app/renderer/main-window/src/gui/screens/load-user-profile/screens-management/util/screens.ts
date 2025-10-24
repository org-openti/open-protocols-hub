export const LoadUserProfileScreens = {

    LOADING: 'loading',
    REQUIRE_PASSWORD: 'require-password'
    
} as const

export type LoadUserProfileScreens = typeof LoadUserProfileScreens[keyof typeof LoadUserProfileScreens]