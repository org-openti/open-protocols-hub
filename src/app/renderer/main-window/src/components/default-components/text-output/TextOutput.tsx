import classNames from "classnames"
import { useLayoutEffect, useState } from "react"

export type TextOutputController = {

    setText: (textToDisplay: string) => void
}

interface TextOutputProps {

    className?: string
    controllerLinker: (controller: TextOutputController | null) => void
    initialValue?: string
}

export function TextOutput({ controllerLinker, className, initialValue }: TextOutputProps) {

    const [textToDisplay, setTextToDisplay] = useState<string>(initialValue ? initialValue : '')

    const cnmsP = classNames(className)

    useLayoutEffect(() => {

        const controller: TextOutputController = {

            setText: setTextToDisplay
        }

        controllerLinker(controller)

        return () => {

            controllerLinker(null)
        }

    }, [controllerLinker])

    return (

        <p className={cnmsP}>
            {textToDisplay}
        </p>
    )
}