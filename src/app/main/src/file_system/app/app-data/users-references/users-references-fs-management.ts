import type { UserReferenceType } from '@oph/types/app/user-reference.js';

import { promises as fs } from 'fs';
import path from 'path';
import { getAppDataDirPath } from '../app-data-fs-management.mjs';
import { exists } from '../../../util/file-fs.mjs';
import { createDirectory } from '../../../util/dir-fs.mjs';

const USERS_REFERENCES_DIR_NAME = 'users-references'
const USERS_REFERENCES_DIR_PATH = path.join(getAppDataDirPath(), USERS_REFERENCES_DIR_NAME)

const USERS_REFERENCES_FILE_NAME = 'users-references.json'
const USERS_REFERENCES_FILE_PATH = path.join(USERS_REFERENCES_DIR_PATH, USERS_REFERENCES_FILE_NAME)

// Função para ler usuários do arquivo
export async function getUsersReferencesList(): Promise<UserReferenceType[]> {

	if (await isUserReferencesFileValid()) {

		try {

			const data = await fs.readFile(USERS_REFERENCES_FILE_PATH, 'utf-8');

			return JSON.parse(data) as UserReferenceType[];

		} catch (error) {

			if ((error as NodeJS.ErrnoException).code === 'ENOENT') {

				// Arquivo não existe, retorna lista vazia

				return [];

			}

			throw error; // relança erros inesperados
		}
	}

	throw new Error("Error while trying to load users references file.")
}

// Função para salvar usuários no arquivo
async function saveUsersReferences(usersReferences: UserReferenceType[]): Promise<void> {

	if (await isUserReferencesFileValid()) {

		const data = JSON.stringify(usersReferences, null, 2); // Formata JSON com indentação

		await fs.writeFile(USERS_REFERENCES_FILE_PATH, data, 'utf-8');
	}
}

// Função para adicionar um usuário
export async function addUserReference(userReference: UserReferenceType): Promise<void> {

	const users = await getUsersReferencesList();

	users.push(userReference);

	await saveUsersReferences(users);
}

// Função para deletar usuário pelo nome
export async function deleteUserReferenceByPublicIdentifier(publicIdentifier: string): Promise<boolean> {

	const usersReferences = await getUsersReferencesList();

	// Filtra os usuários removendo aquele com o nome igual ao informado
	const filteredUsersReferences = usersReferences.filter(userReference => userReference.publicIdentifier !== publicIdentifier);

	if (filteredUsersReferences.length === usersReferences.length) {
		// Nenhum usuário foi removido (usuário não encontrado)
		return false;
	}

	// Salva a lista atualizada no arquivo
	await saveUsersReferences(filteredUsersReferences);

	return true;
}


async function isUserReferencesFileValid(): Promise<boolean> {

	let usersReferencesFileExists = await exists(USERS_REFERENCES_FILE_PATH)

	if (!usersReferencesFileExists) {

		try {

			createDirectory(USERS_REFERENCES_DIR_PATH)

			await fs.access(USERS_REFERENCES_FILE_PATH);

		} catch (error) {

			if ((error as NodeJS.ErrnoException).code === 'ENOENT') {

				const data = JSON.stringify([], null, 2);

				await fs.writeFile(USERS_REFERENCES_FILE_PATH, data, 'utf-8');

			} else {

				throw error; // Qualquer outro erro deve ser tratado normalmente
			}

			usersReferencesFileExists = await exists(USERS_REFERENCES_FILE_PATH)
		}
	}

	return usersReferencesFileExists
}