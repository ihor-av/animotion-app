export type RubricNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type RubricSection = {
	number: RubricNumber;
	id:
		| 'problem'
		| 'open-data'
		| 'creativity'
		| 'market'
		| 'social-impact'
		| 'technical-viability'
		| 'cost'
		| 'business-model';
	title: string;
	short: string;
};

/**
 * The scored sections, in the required order from docs/judging-criteria.md.
 * Title and closing slides are not scored and are not part of this list.
 */
export const rubricSections = [
	{ number: 1, id: 'problem', title: 'Актуальність проблеми', short: 'Проблема' },
	{
		number: 2,
		id: 'open-data',
		title: 'Якість використання відкритих даних',
		short: 'Відкриті дані'
	},
	{
		number: 3,
		id: 'creativity',
		title: 'Креативність та інноваційність',
		short: 'Інновації'
	},
	{ number: 4, id: 'market', title: 'Потенціал на ринку', short: 'Ринок' },
	{ number: 5, id: 'social-impact', title: 'Суспільний потенціал', short: 'Вплив' },
	{
		number: 6,
		id: 'technical-viability',
		title: 'Технічна життєздатність',
		short: 'Техніка'
	},
	{
		number: 7,
		id: 'cost',
		title: 'Затратність на створення/підтримку проєкту',
		short: 'Витрати'
	},
	{
		number: 8,
		id: 'business-model',
		title: 'Бізнес-модель та фінансова життєздатність',
		short: 'Бізнес-модель'
	}
] as const satisfies readonly RubricSection[];

export function rubricSection(number: RubricNumber): RubricSection {
	return rubricSections[number - 1];
}

export function formatCriterionNumber(number: RubricNumber): string {
	return String(number).padStart(2, '0');
}
