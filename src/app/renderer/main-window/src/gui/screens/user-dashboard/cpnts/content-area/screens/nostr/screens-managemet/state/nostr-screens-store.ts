import { createStore, useStore } from "zustand"

export const NOSTR_SCREENS = {

    DASHBOARD: 'dashboard',
    WELLCOME: 'wellcome'
}

export type NOSTR_SCREENS = typeof NOSTR_SCREENS[keyof typeof NOSTR_SCREENS]

type NostrScreensState = {

    screenToDislay: NOSTR_SCREENS,
    setScreenToDisplay: (newScreenToDisplayValue: NOSTR_SCREENS) => void
}

const nostrScreensStore = createStore<NostrScreensState>((set) => {

    function setScreenToDisplay(newScreenToDisplayValue: NOSTR_SCREENS) {

        set({screenToDislay: newScreenToDisplayValue})
    }

    return {

        screenToDislay: NOSTR_SCREENS.WELLCOME,
        setScreenToDisplay: setScreenToDisplay
    }
})

export function useNostrScreensStore() {

    return useStore(nostrScreensStore)
}