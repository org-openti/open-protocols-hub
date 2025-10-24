import { useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom"; // <- necessário para createPortal

import styles from './Styles.module.scss'

export interface ModalController {

    setIsOpen: (newValue: boolean) => void
}

interface Props {

    controllerLinker: (controller: ModalController | null) => void
    children: React.ReactNode
}

export function ModalRoot({ children, controllerLinker }: Props) {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    useLayoutEffect(() => {

        const controller: ModalController = {

            setIsOpen: setIsOpen
        }

        controllerLinker(controller)

        return () => {

            controllerLinker(null)
        }

    }, [controllerLinker])

    if (!isOpen) { return null }

    return ReactDOM.createPortal(

        <div className={styles.rootWrapper_ModalRoot}>

            {children}
        </div>,

        document.getElementById("modal-root")!
    );
}