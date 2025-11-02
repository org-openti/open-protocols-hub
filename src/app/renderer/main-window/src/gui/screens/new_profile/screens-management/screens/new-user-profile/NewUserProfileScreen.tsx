import type { ProfileCreationProgressType } from "@oph/ipc/channels/main-window/app-management/channels/create-user-profile.js";

import { useEffect, useState } from "react";
import { ContentWrapper } from "../../../../../../components/content_wrapper/ContentWrapper";
import { NameInput } from "../../../../../../components/form/form-data-inputs/NameInput";
import { FormSection } from "../../../../../../components/form/form-section/FormSection";
import { FormTitle } from "../../../../../../components/form/form-title/FormTitle";
import { FormWrapper } from "../../../../../../components/form/form-wrapper/FormWrapper";
import { useLoadUserProfileScreenLouncher, useWelcomeScreenLouncher } from "../../../../../../router/ScreensNavigate";
import ipc from "../../../../../../ipc/listeners/ipc-client";

import styles from './Styles.module.scss'

export function NewUserProfileScreen() {

    const lounchLoadUserScreen = useLoadUserProfileScreenLouncher()
    const lounchWelcomeScreen = useWelcomeScreenLouncher()

    const [openProfileButtonDisableState, setOpenProfileButtonDisableState] = useState<boolean>(true)
    const [profileCreationProgress, setProfileCreationProgress] = useState<ProfileCreationProgressType | null>(null)
    const [saveButtonDisableState, setSaveButtonDisableState] = useState<boolean>(false)
    const [userNameInputValue, setUserNameInputValue] = useState<string>('')

    function handleCloseButtonClick() {

        lounchWelcomeScreen()
    }

    function handleOpenProfileButtonClick() {

        if (profileCreationProgress && profileCreationProgress.createdInitFilePath) {

            lounchLoadUserScreen(profileCreationProgress.createdInitFilePath)

        } else {

            setOpenProfileButtonDisableState(true)
        }
    }


    async function handleSaveButtonClick() {

        const userProfileCreationResult = await ipc.appManagement.createUserProfile(
            {
                userName: userNameInputValue,
                initFileDirPath: null,
                password: '123456',
                personalizedInitFileName: null,
                addUserReference: true
            }
        )

        if (userProfileCreationResult.ok) {

            setProfileCreationProgress(userProfileCreationResult.value)
        }
    }

    function handleUserNameInputChange(event: React.ChangeEvent<HTMLInputElement>) {

        setUserNameInputValue(event.target.value);
    };

    useEffect(() => {

        if (userNameInputValue.trim().length > 0) {

            setSaveButtonDisableState(false)

        } else {

            setSaveButtonDisableState(true)
        }

    }, [userNameInputValue])

    useEffect(() => {

        if (profileCreationProgress) {

            if (profileCreationProgress.createdInitFilePath) {

                setOpenProfileButtonDisableState(false)
            }

        } else {

            setOpenProfileButtonDisableState(true)
        }

    }, [profileCreationProgress])

    return (

        <div className={styles.rootWrapper_NewProfileScreen}>

            <ContentWrapper className={styles.contentWrapper}>

                <FormWrapper>

                    <FormTitle formTitle={"Create a new profile"} />

                    <FormSection
                        children={
                            <>
                                <NameInput
                                    type="text"
                                    id="userName"
                                    value={userNameInputValue}
                                    onChange={handleUserNameInputChange}
                                    placeholder="Your Name"
                                />
                            </>
                        }

                        sectionTitle="Personal data"
                    />
                </FormWrapper>

                <div className={styles.optionsButtonsWrapper}>

                    <button onClick={handleCloseButtonClick}>Close</button>

                    <button
                        disabled={openProfileButtonDisableState}
                        onClick={handleOpenProfileButtonClick}
                    >Open Profile</button>

                    <button
                        disabled={saveButtonDisableState}
                        onClick={handleSaveButtonClick}
                    >
                        Save
                    </button>
                </div>
            </ContentWrapper>
        </div>
    )
}