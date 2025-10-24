export class ResultError<Error extends string> extends Error {

	resultErrorType: Error

	constructor(resultErrorType: Error, cause?: Error, message?: string, ) {

		super(message, { cause });

		this.resultErrorType = resultErrorType
	}
}

export type ResultType<T, E extends ResultError<string>> = | { ok: true; value: T } | { ok: false; error: E }

export function resultValue<T>(value: T): ResultType<T, never> {

	return { ok: true, value };
}

export function resultFail<E extends ResultError<string>>(error: E): ResultType<never, E> {

	return { ok: false, error };
}