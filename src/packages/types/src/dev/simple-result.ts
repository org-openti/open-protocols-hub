export type SimpleResult<R, E extends string> =
    | { success: true; data: R }
    | { success: false; error: E }

export function resultSucess<R>(data: R): SimpleResult<R, never> {

    return { success: true, data: data };
}

export function resultError<E extends string>(error: E): SimpleResult<never, E> {

    return { success: false, error: error };
}