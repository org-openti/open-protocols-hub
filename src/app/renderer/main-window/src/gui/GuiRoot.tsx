import { Outlet } from "react-router-dom";

import styles from './Styles.module.scss'

export function GuiRoot() {

	return (

		<div className={styles.rootWrapper_GuiRoot}>

			<Outlet />
			
		</div>
	)
}