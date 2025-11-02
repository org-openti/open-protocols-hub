import type { AppManagement } from "./channels/main-window/app-management/app-management.js";
import type { ProtocolsModules } from "./channels/main-window/protocols-modules/protocols-modules.js";

export type MainWindowIPC = {

    appManagement: AppManagement,

    protocolsModules: ProtocolsModules
}

export type AuthenticationWindowIPC = {}