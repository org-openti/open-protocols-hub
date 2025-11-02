import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { appThemeStore } from './app_state/stores/app/settings/app-theme-store';
import { Root } from './root';
import { configureIpcListeners } from './ipc/listeners/root-listener';

import './reset.css'

import './styles/globals.scss';

appThemeStore.getState()

createRoot(document.getElementById('root')!).render(
	
	<StrictMode>

		<Root />

	</StrictMode>
)

configureIpcListeners()