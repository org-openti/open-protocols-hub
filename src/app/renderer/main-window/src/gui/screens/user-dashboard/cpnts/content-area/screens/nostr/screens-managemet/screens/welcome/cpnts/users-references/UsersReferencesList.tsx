
import type { NostrUserProfileReference } from '@oph/types/protocols-modules/nostr/nostr-types.js'
import styles from './styles.module.scss'

export function UsersReferencesList({ usersReferences }: { usersReferences: NostrUserProfileReference[] }) {

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

function UserReferenceItem({ userReference }: { userReference: NostrUserProfileReference }) {
    
    function hadleDoubleClick() {

        //TODO: 2025-09-04 - Implements a method to load the selected user.
    }

    return (

        <div className={styles.litItem} onDoubleClick={hadleDoubleClick}>

            <p>{userReference.publicIdentifier}</p>

        </div>
    )
}