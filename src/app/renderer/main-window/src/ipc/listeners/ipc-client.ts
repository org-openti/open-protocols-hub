import type {IPC} from '@oph/ipc/ipc.js'

const ipc = (window as unknown as { ipc: IPC }).ipc;

export default ipc;