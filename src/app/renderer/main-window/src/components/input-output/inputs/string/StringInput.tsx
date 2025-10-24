import { useEffect, useLayoutEffect, useRef, useState, type ChangeEvent } from "react"
import classNames from "classnames"

import styles from './Styles.module.scss'

export interface StringInputController {

    setText: (newText: string | null) => void
    setChangeListener: (listener: (valueChange: string | null) => void) => void
}

interface Props {

    className?: string
    controllerLinker: (controller: StringInputController | null) => void
}

export function StringInput({ controllerLinker, className }: Props) {

    const [value, setValue] = useState<string>('')

    const changeListener = useRef<((valueChange: string | null) => void) | null>(null)

    const cnms_Input = classNames(styles.stringInput, className)

    function onChange(evt: ChangeEvent<HTMLInputElement>) {

        setValue(evt.target.value)
    }

    function setNewTextValue(newText: string | null) {

        setValue(newText ? newText : '')
    }

    useEffect(() => {

        if (changeListener.current) {

            changeListener.current(value)
        }

    }, [value])

    useLayoutEffect(() => {

        const controller: StringInputController = {

            setText: setNewTextValue,
            setChangeListener: (listener: (valueChange: string | null) => void) => {

                changeListener.current = listener
            }
        }

        controllerLinker(controller)

    }, [controllerLinker])

    return (

        <input
            className={cnms_Input}
            type="text"
            name=""
            id=""
            value={value}
            onChange={onChange}
        />
    )
}