import { HomeButton } from './cpnts/option-buttons/home/HomeButton'
import { LogoutButton } from './cpnts/option-buttons/logout/Logout'
import { NostrButton } from './cpnts/option-buttons/nostr/NostrButton'

import styles from './Styles.module.scss'
import { ThemeButton } from './cpnts/option-buttons/theme/ThemeButton'
import { HorizontalLine } from '../../../../../components/default-components/line/horizontal/HorizontalLine'

export function UserDashboardSidebar() {

    return (

        <div className={styles.rootWrapper_UserDashboardSidebar}>

            <HomeButton />

            <HorizontalLine/>

            <NostrButton />

            <div className={styles.verticalSpacer} />

            <ThemeButton/>

            <HorizontalLine/>

            <LogoutButton />

        </div>
    )
}