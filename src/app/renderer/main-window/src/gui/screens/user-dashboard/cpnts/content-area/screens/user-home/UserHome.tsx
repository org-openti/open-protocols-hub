import { useEffect, useState } from "react";
import type { PublicUserProfileData } from "@oph/types/app/user/user-profile-data.js";
import ipc from "../../../../../../../ipc/listeners/ipc-client";

import styles from './Styles.module.scss'

export function UserHome() {

    const [publicUserProfileData, setPublicUserProfileData] = useState<PublicUserProfileData | null>(null)

    const [userName, setUserName] = useState<string>('')

    useEffect(() => {

        ipc.appManagement.userManagement.getUserPublicProfile().then((value) => {

            setPublicUserProfileData(value)
        })

    }, [])

    useEffect(() => {

        if(publicUserProfileData){

            setUserName(publicUserProfileData.name)
            
        } else {
            
            setUserName('')
        }

    }, [publicUserProfileData])

    return (

        <div className={styles.rootWrapper_LoadingUserProfileScreen}>

           <p>{userName}</p>

        </div>
    )
}