import { MdOutlineWifiProtectedSetup } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from './Styles.module.scss'
import { ContentWrapper } from "../../../../../../components/content_wrapper/ContentWrapper";
import { isValidNostrKey } from "../../../../../../nostr/util";
import { RoutesPath } from "../../../../../../router/util/RoutesPath";

export function AddNostrProfileScreen() {

    const navigate = useNavigate()

    const [nostrKey, setNostrKey] = useState<string>('')

    const [saveButtonDisableState, setSaveButtonDisableState] = useState<boolean>(false)

    async function generateSK() {


        setNostrKey(String('newSK'))
    }

    function handleSecretKeyInputChange(event: React.ChangeEvent<HTMLInputElement>) {

        setNostrKey(event.target.value);
    };

    function handleCancelButtonClick() {

        navigate(RoutesPath.WelcomeScreen)
    }

    function handleSaveButtonClick () {

    }
    
    useEffect(() => {

        setSaveButtonDisableState(!isValidNostrKey(nostrKey))

    }, [nostrKey])

    return (

        <div className={styles.rootWrapper_NewProfileScreen}>

            <ContentWrapper className={styles.contentWrapper}>

                <h1>Create a new profile</h1>

                <div className={styles.skeyWrapper}>

                    <span>Nostr Secret or Public Key</span>

                    <div className={styles.skeyInputWrapper}>

                        <input
                            type="text"
                            id="nostrKey"
                            value={nostrKey}
                            onChange={handleSecretKeyInputChange}
                            placeholder="nsec1..."
                        />

                        <MdOutlineWifiProtectedSetup onClick={generateSK} />

                    </div>

                </div>

                <div className={styles.buttonsWrapper}>

                    <button
                        disabled={saveButtonDisableState}
                        onClick={handleSaveButtonClick}
                    >
                        Save
                    </button>

                    <button onClick={handleCancelButtonClick}>Cancel</button>

                </div>
            </ContentWrapper>
        </div>
    )
}