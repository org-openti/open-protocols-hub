
import { useCallback, useEffect, useRef } from "react";
import { generateSecretKey } from 'nostr-tools/pure'
import { nip19 } from "nostr-tools";
import { v4 as uuidv4 } from 'uuid';

import styles from './NewNostrProfileScreen.module.scss'
import ipc from "../../../../ipc/listeners/ipc-client";
import { ContentWrapper } from "../../../content_wrapper/ContentWrapper";
import { DefaultButton, type DefaltButtonController } from "../../../default-components/buttons/default/DefaultButton";
import { type TextOutputController, TextOutput } from "../../../default-components/text-output/TextOutput";
import { FormButtonsWrapper } from "../../../form/form-option-button/buton_wrapper/FormButtonsWrapper";
import { FormSection } from "../../../form/form-section/FormSection";
import { FormTitle } from "../../../form/form-title/FormTitle";
import { FormWrapper } from "../../../form/form-wrapper/FormWrapper";
import { type StringInputController, StringInput } from "../../../input-output/inputs/string/StringInput";
import { VerticalComponentsSpacer } from "../../../util/components-spacer/VerticalComponentsSpacer";
import { Label } from "../../../input-output/outputs/Label";

interface Props {

    close: () => void
}

export function NewNostrProfileScreen({ close }: Props) {

    const nostrkeyInputValue_Ref = useRef<string | null>(null)
    const profilePasswordVerification_Ref = useRef<string | null>(null)

    const cpntCtl_DB_ConfirmButton = useRef<DefaltButtonController | null>(null)
    const cpntCtl_SI_Nostrkey = useRef<StringInputController | null>(null)
    const cpntCtl_SI_ProfilePassword = useRef<StringInputController | null>(null)
    const cpntCtl_SI_ProfilePasswordVerification = useRef<StringInputController | null>(null)
    const cpntCtl_TO_ConfirmButtonText = useRef<TextOutputController | null>(null)
    const confirmButtonText_Ref = useRef<'Verify' | 'Save'>('Verify')

    const allRight = useRef<boolean>(false)
    const canVerify = useRef<boolean>(false)

    //{Nostr Profile Data
    const isNostrKeyValid_Ref = useRef<boolean>(false)

    const nostrPubKey_Ref = useRef<string | null>(null)
    const nostrSecKey_Ref = useRef<string | null>(null)

    function checkNostrKey() {

        if (nostrkeyInputValue_Ref.current) {

            nostrPubKey_Ref.current = nostrkeyInputValue_Ref.current
            nostrSecKey_Ref.current = nostrkeyInputValue_Ref.current

            isNostrKeyValid_Ref.current = true

        } else {

            nostrPubKey_Ref.current = null
            nostrSecKey_Ref.current = null

            isNostrKeyValid_Ref.current = false
        }
    }
    //}

    //{Nostr directory
    const isNostrDirectoryValid_Ref = useRef<boolean>(false)

    const nostrDirectory_Ref = useRef<string | null>(null)

    function checkNostrDirectory() {

        if (nostrDirectory_Ref.current) {

            isNostrDirectoryValid_Ref.current = true

        } else {

            isNostrDirectoryValid_Ref.current = false
        }
    }
    //}

    //{Security
    const isPasswordValid = useRef<boolean>(false)

    function checkPasswords() {

        if (profilePassword_Ref.current === profilePasswordVerification_Ref.current) {

            isPasswordValid.current = true

        } else {

            isPasswordValid.current = false
        }

        checkAll()
    }
    //}
    const profilePassword_Ref = useRef<string | null>(null)

    function checkAll() {

        if (canVerify.current) {

            const check: boolean = isPasswordValid.current && isNostrDirectoryValid_Ref.current

            if (cpntCtl_DB_ConfirmButton.current) {

                cpntCtl_DB_ConfirmButton.current.setDisable(!check)
            }

            allRight.current = check
        }
    }

    const getStandardDir = useCallback(() => {

        ipc.appManagement.userManagement.getTheDefaultUserDirectoryOfNostrProfiles().then((value) => {

            if (value.success) {

                nostrDirectory_Ref.current = `${value.defaultDirectoryOfNostrProfiles}/${uuidv4()}`

            } else {

                nostrDirectory_Ref.current = null
            }

            checkNostrDirectory()
        })

    }, [])



    function handleNewNkeyButtonClick() {

        const sk = generateSecretKey()

        const nsec = nip19.nsecEncode(sk)

        if (cpntCtl_SI_Nostrkey.current) {

            cpntCtl_SI_Nostrkey.current.setText(nsec)
        }
    }

    function ctlLinker_DB_ConfirmButton(controller: DefaltButtonController | null) {

        cpntCtl_DB_ConfirmButton.current = controller
    }

    function ctlLinker_SI_NostrKey(controller: StringInputController | null) {

        cpntCtl_SI_Nostrkey.current = controller

        if (cpntCtl_SI_Nostrkey.current) {

            cpntCtl_SI_Nostrkey.current.setChangeListener((changes) => {

                nostrkeyInputValue_Ref.current = changes

                checkNostrKey()
            })
        }
    }

    function ctlLinker_SI_ProfilePassword(controller: StringInputController | null) {

        cpntCtl_SI_ProfilePassword.current = controller

        if (cpntCtl_SI_ProfilePassword.current) {

            cpntCtl_SI_ProfilePassword.current.setChangeListener((changes) => {

                profilePassword_Ref.current = changes

                checkPasswords()
            })
        }
    }

    function ctlLinker_SI_ProfilePasswordVerification(controller: StringInputController | null) {

        cpntCtl_SI_ProfilePasswordVerification.current = controller

        if (cpntCtl_SI_ProfilePasswordVerification.current) {

            cpntCtl_SI_ProfilePasswordVerification.current.setChangeListener((changes) => {

                profilePasswordVerification_Ref.current = changes

                checkPasswords()
            })
        }
    }

    function ctlLinker_TO_ConfirmButtonText(controller: TextOutputController | null) {

        cpntCtl_TO_ConfirmButtonText.current = controller
    }

    function save() {

        if (canVerify.current) {

            checkAll()

            if (allRight.current) {

                if (nostrPubKey_Ref.current && nostrDirectory_Ref.current) {

                    ipc.protocolsModules.nostrManagement.createNostrProfile(
                        {
                            encrytationPassword: profilePassword_Ref.current,
                            nostrPubKey: nostrPubKey_Ref.current,
                            nostrProfileDir: nostrDirectory_Ref.current,
                            nostrSecKey: nostrSecKey_Ref.current,
                            saveReference: true
                        }
                    )
                }
            }

        } else {

            canVerify.current = true

            checkAll()

            confirmButtonText_Ref.current = 'Save'

            if (cpntCtl_TO_ConfirmButtonText.current) {

                cpntCtl_TO_ConfirmButtonText.current.setText(confirmButtonText_Ref.current)
            }
        }
    }

    useEffect(() => {

        getStandardDir()

    }, [getStandardDir])

    return (

        <ContentWrapper className={styles.rootWrapper_NewNostrProfileScreen}>

            <FormWrapper>

                <FormTitle formTitle="Create New Nostr Profile" />

                <FormSection sectionTitle="Nostr Profile Data">

                    <Label>Nostr Key</Label>

                    <div className={styles.nkeyWrapper}>

                        <StringInput
                            className={styles.nkeyInput}
                            controllerLinker={ctlLinker_SI_NostrKey}
                        />

                        <DefaultButton
                            className={styles.newKeyButton}
                            onClick={handleNewNkeyButtonClick}
                        >
                            Create new
                        </DefaultButton>

                    </div>

                </FormSection>

                <FormSection sectionTitle="Profile Security">

                    <Label>Profile Password</Label>

                    <StringInput
                        className={styles.profilePasswordInput}
                        controllerLinker={ctlLinker_SI_ProfilePassword}
                    />

                    <Label>Verify Password</Label>

                    <StringInput
                        className={styles.profilePasswordInput}
                        controllerLinker={ctlLinker_SI_ProfilePasswordVerification}
                    />

                </FormSection>

                <FormSection sectionTitle="Preferences">

                    <Label>Vinculate Nostr Profile in your Open Protocols Hub Profile</Label>

                    <input type="checkbox" />

                </FormSection>

                <VerticalComponentsSpacer />

                <FormButtonsWrapper >

                    <DefaultButton
                        className={styles.optionButton}
                        onClick={close}
                    >
                        Cancel
                    </DefaultButton>

                    <DefaultButton
                        controllerLinker={ctlLinker_DB_ConfirmButton}
                        className={styles.optionButton}
                        onClick={save}
                    >

                        <TextOutput
                            controllerLinker={ctlLinker_TO_ConfirmButtonText}
                            initialValue={confirmButtonText_Ref.current}
                        />

                    </DefaultButton>

                </FormButtonsWrapper>

            </FormWrapper>

        </ContentWrapper >
    )
}