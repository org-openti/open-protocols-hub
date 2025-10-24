import classNames from 'classnames'
import styles from './DefaultButton.module.scss'
import { useLayoutEffect, useState } from 'react'

export type DefaltButtonController = {

    setDisable: (isDisable: boolean) => void
}

interface DefaultButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

    controllerLinker?: (controller: DefaltButtonController | null) => void
}

export function DefaultButton({ controllerLinker, ...rest }: DefaultButtonProps) {

    const [disable, setDisable] = useState<boolean>(false)

    const cnms_DefaultButton = classNames(styles.defaultButton, rest.className)

    useLayoutEffect(() => {

        if (controllerLinker) {

            const controller: DefaltButtonController = {

                setDisable: setDisable
            }

            controllerLinker(controller)

            return () => {

                controllerLinker(null)
            }
        }

    }, [controllerLinker])

    return (

        <button
            {...rest}
            className={cnms_DefaultButton}
            disabled={disable}
        >

        </button>
    )
}