import classNames from "classnames";

import styles from './Styles.module.scss'

interface Props {

    isSelected: boolean
    iconPath: string
    onClick: () => void
}

export function OptionButtonBase({ isSelected, iconPath, onClick }: Props) {

    const cnmsRootWrapper = classNames(styles.rootWrapper_OptionButtonBase, {[styles.rootWrapper_OptionButtonBase_Selected]: isSelected})

    return (

        <div
            className={cnmsRootWrapper}
            onClick={onClick}
        >
            <img src={iconPath} alt="Icon" />
        </div>
    )
}