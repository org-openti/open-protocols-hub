export type IpcHandleFunctionStructureType<Input, Output> = { params: Input, returnValue: Promise<Output> }

export type IpcHandleFunctionBaseType<T extends IpcHandleFunctionStructureType<unknown, unknown>> = (params: T['params']) => T['returnValue']

export type IpcHandleFunctionMappingStructureType<T> = {

    [K in keyof T]: T[K] extends IpcHandleFunctionStructureType<unknown, unknown> ? T[K] : IpcHandleFunctionStructureType<never, never>
}

