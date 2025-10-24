import type { AppManagement } from "./channels/app-management/app-management.js";
import type { ProtocolsModules } from "./channels/protocols-modules/protocols-modules.js";

export type IPC = {

    appManagement: AppManagement,

    protocolsModules: ProtocolsModules
}