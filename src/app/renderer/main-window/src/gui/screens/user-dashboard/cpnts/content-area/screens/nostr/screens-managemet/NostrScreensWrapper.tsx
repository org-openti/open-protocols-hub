import { NostrWellcomeScreen } from "./screens/welcome/NostrWellcomeScreen"
import { NOSTR_SCREENS, useNostrScreensStore } from "./state/nostr-screens-store"

export function NostrScreensWrapper() {

    const { screenToDislay } = useNostrScreensStore()

    return (

        screenToDislay === NOSTR_SCREENS.WELLCOME && <NostrWellcomeScreen />
    )
}