import type { ResultType } from '@oph/types/dev/result-type.js';

import fs from 'node:fs/promises';
import { constants } from 'fs';
import { ResultError, resultValue, resultFail } from '@oph/types/dev/result-type.js';

export async function exists(path: string): Promise<boolean> {

	console.error('exists function deprecated')

	try {

		await fs.access(path, constants.F_OK);

		return true;

	} catch (err) {

		return false; // Retorna false se o arquivo ou diretório não existe
	}
}

//{----------------
export type CheckIfFileExistsErrorTypes = 'Exist but is not a file' | 'Unexpected error'

export class CheckIfFileExistsError extends ResultError<CheckIfFileExistsErrorTypes> { }

export async function checkIfFileExists(filePath: string): Promise<ResultType<boolean, CheckIfFileExistsError>> {

	try {

		const stats = await fs.stat(filePath);

		if (!stats.isFile()) {

			return resultFail(new CheckIfFileExistsError('Exist but is not a file'))
		}

		return resultValue(true)

	} catch (err) {

		if ((err as NodeJS.ErrnoException).code === 'ENOENT') {

			return resultValue(false)
		}
	}

	return resultFail(new CheckIfFileExistsError('Unexpected error'))

}
//----------------}