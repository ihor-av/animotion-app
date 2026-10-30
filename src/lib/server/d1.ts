import { env } from '$env/dynamic/private';

type D1QueryResult<T> = {
	results: T[];
	success: boolean;
	meta?: Record<string, unknown>;
};

type D1Response<T> = {
	success: boolean;
	errors?: { code: number; message: string }[];
	result?: D1QueryResult<T>[];
};

export class D1Error extends Error {
	constructor(
		message: string,
		readonly status?: number,
		readonly details?: unknown
	) {
		super(message);
		this.name = 'D1Error';
	}
}

function config() {
	const accountId = env.CF_ACCOUNT_ID;
	const databaseId = env.CF_D1_DATABASE_ID;
	const token = env.CF_D1_TOKEN;

	if (!accountId || !databaseId || !token) {
		throw new D1Error(
			'Missing D1 credentials. Set CF_ACCOUNT_ID, CF_D1_DATABASE_ID and CF_D1_TOKEN.'
		);
	}

	return { accountId, databaseId, token };
}

export async function queryD1<T = Record<string, unknown>>(
	sql: string,
	params: unknown[] = []
): Promise<T[]> {
	const { accountId, databaseId, token } = config();

	const response = await fetch(
		`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ sql, params })
		}
	);

	let payload: D1Response<T>;

	try {
		payload = (await response.json()) as D1Response<T>;
	} catch {
		throw new D1Error(`D1 returned a non-JSON response (${response.status})`, response.status);
	}

	if (!response.ok || !payload.success) {
		const message = payload.errors?.map((error) => error.message).join('; ') || 'D1 query failed';
		throw new D1Error(message, response.status, payload.errors);
	}

	return payload.result?.[0]?.results ?? [];
}
