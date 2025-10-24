import { useEffect, useRef, useState } from 'react'

import styles from './Styles.module.scss'
import { UsersReferencesList } from './cpnts/users-references/UsersReferencesList'
import ipc from '../../../../../../../../../../ipc/listeners/ipc-client'
import type { NostrUserProfileReference } from '@oph/types/protocols-modules/nostr/nostr-types.js'
import { DefaultButton } from '../../../../../../../../../../components/default-components/buttons/default/DefaultButton'
import { ModalRoot, type ModalController } from '../../../../../../../../../../components/modal/modal-root/ModalRoot'
import { NewNostrProfileScreen } from '../../../../../../../../../../components/protocols-modules/nostr/new-profile-screen/NewNostrProfileScreen'

export function NostrWellcomeScreen() {

	const [usersReferences, setUsersReferences] = useState<NostrUserProfileReference[]>([])
	const [displayUsersReferencesList, setDisplayUsersReferencesList] = useState<boolean>(false)

	const cpntController_NewProfileModal = useRef<ModalController | null>(null)

	function ctlLinker_Modal(controller: ModalController | null) {

		cpntController_NewProfileModal.current = controller
	}

	function handleNewProfileButtonClick() {

		if (cpntController_NewProfileModal.current) {

			cpntController_NewProfileModal.current.setIsOpen(true)
		}
	}

	async function loadUsersReferences() {

		const userReferencesListResult = await ipc.appManagement.userManagement.getNostrUserProfilesReferences()

		if (userReferencesListResult.success) {

			if (userReferencesListResult.value) {

				setUsersReferences(userReferencesListResult.value)
			}

		} else {

			// TODO: Handle error. (2025-10-12) 
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

			<h1 className={styles.title}>Nostr Profiles</h1>

			{displayUsersReferencesList && <UsersReferencesList usersReferences={usersReferences} />}

			<DefaultButton
				className={styles.button}
				onClick={handleNewProfileButtonClick}
			>
				Create New Profile
			</DefaultButton>

			<DefaultButton
				className={styles.button}
				onClick={handleNewProfileButtonClick}
			>
				Load Profile
			</DefaultButton>

			<ModalRoot controllerLinker={ctlLinker_Modal} >

				<NewNostrProfileScreen close={() => {

					if (cpntController_NewProfileModal.current) {

						cpntController_NewProfileModal.current.setIsOpen(false)
					}
				}} />

			</ModalRoot>
		</div>
	)
}