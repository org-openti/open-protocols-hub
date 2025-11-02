import type {MainWindowIPC} from '@oph/ipc/ipc.js'

const ipc = (window as unknown as { mainWindowIPC: MainWindowIPC }).mainWindowIPC;

export default ipc;