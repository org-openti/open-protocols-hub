import type { UserReferenceType } from '@oph/types/app/user-reference.js'
import { useLoadUserProfileScreenLouncher } from '../../../../../router/ScreensNavigate'

import styles from './Styles.module.scss'

export function UsersReferencesList({ usersReferences }: { usersReferences: UserReferenceType[] }) {

    return (

        <div className={styles.rootWrapper_UsersReferencesList}>

            <p>Users List:</p>

            <div className={styles.listWrapper}>
                {usersReferences.map((userReference, index) => (
                    <UserReferenceItem
                        key={index}
                        userReference={userReference}
                    />
                ))}
            </div>
        </div>
    )
}

function UserReferenceItem({ userReference }: { userReference: UserReferenceType }) {

    const loadUserProfileScreen = useLoadUserProfileScreenLouncher()
    
    function hadleDoubleClick() {

        loadUserProfileScreen(userReference.userInitFilePath)
    }

    return (

        <div className={styles.litItem} onDoubleClick={hadleDoubleClick}>

            <p>{userReference.publicIdentifier}</p>

        </div>
    )
}