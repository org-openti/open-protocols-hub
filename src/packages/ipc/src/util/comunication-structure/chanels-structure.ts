//{Communication base

export type CommunicationStructureBase<MessageDataType> = {

    exposedFunction: (listener: (message: MessageDataType) => void) => void
    messageDataType: MessageDataType
}

export type IpcCommunicationChannel<ChanelName extends string, ComunicationStructure extends CommunicationStructureBase<unknown>> = {

    channel: ChanelName
    comunicationStructure: ComunicationStructure
}

//}

//{Main to Renderer communication

export type MtrCommunicationStructure<MessageDataType> = {
    dataUpdaterFunction: (listener: (message: MessageDataType) => void) => void
    rendererOnListener: (params: MessageDataType) => void

} & CommunicationStructureBase<MessageDataType>

/**
 * Main to Renderer (mtr) IPC Chanel type
 */
export type MtrIpcChannel<ChanelName extends string, MessageDataType> = IpcCommunicationChannel<ChanelName, MtrCommunicationStructure<MessageDataType>>

//}