import type { UserReferenceType } from '@oph/types/app/user-reference.js'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { UsersReferencesList } from './cpnts/users-references/UsersReferencesList'
import styles from './Styles.module.scss'
import { RoutesPath } from '../../../router/util/RoutesPath'
import ipc from '../../../ipc/listeners/ipc-client'
import { DefaultButton } from '../../../components/default-components/buttons/default/DefaultButton'

import appIcon from '../../../assets/images/logos/app/app-logo.png'

export function Screen_Welcome() {

	const [usersReferences, setUsersReferences] = useState<UserReferenceType[]>([])
	const [displayUsersReferencesList, setDisplayUsersReferencesList] = useState<boolean>(false)

	const navigate = useNavigate()

	function handleNewProfileButtonClick() {

		navigate(RoutesPath.NewProfileScreen)
	}

	async function loadUsersReferences() {

		const userReferencesListResult = await ipc.appManagement.getUsersReferencesList()

		if (userReferencesListResult.ok) {

			setUsersReferences(userReferencesListResult.value)

		} else {

			switch (userReferencesListResult.error.resultErrorType) {

				case 'Unknown': console.log('Error to load Users References list.')
			}
		}
	}

	useEffect(() => {

		loadUsersReferences()

	}, [])

	useEffect(() => {

		if (usersReferences.length > 0) {

			setDisplayUsersReferencesList(true)
		}

	}, [usersReferences])

	return (

		<div className={styles.rootWrapper}>

			<img className={styles.appLogo} src={appIcon} alt="App icon." />

			<h1 className={styles.title}>Open Protocols Hub 0.1</h1>

			{displayUsersReferencesList && <UsersReferencesList usersReferences={usersReferences} />}

			<DefaultButton onClick={handleNewProfileButtonClick}>Create New Profile</DefaultButton>

		</div>
	)
}