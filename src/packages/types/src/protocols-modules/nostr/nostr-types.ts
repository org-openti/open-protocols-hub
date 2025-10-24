export type NostrUserProfile = {
    
    pubkey: string
    name?: string
    display_name?: string
    about?: string
    picture?: string
    banner?: string
    nip05?: string
    lud16?: string
    website?: string
}

export type NostrUserProfileReference = {

    publicIdentifier: string,
    nostrInitFilePath: string
}