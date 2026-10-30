import type {
	ChartDatum,
	ChartSeries,
	ScatterPoint,
	TableColumn,
	WaterfallDatum
} from './types';
import { formatCurrency, formatNumber, formatPercent } from './utils/format';

/* Aggregates from the Chernivtsi finance D1 database (2026 snapshots). */

export const assets = {
	landAnnualRent: 270_526_906.98,
	buildingAnnualRent: 89_158_365,
	buildingArrears: 943_541.23,
	parkingCollectionPct: 41.2,
	socialPayments2026: 57_656_668.75
};

export const roadsByContractor: ChartDatum[] = [
	{ label: 'ТЕХНО-БУД-ЦЕНТР', value: 48_613_560.79 },
	{ label: 'СЛАВДОРСТРОЙ', value: 29_840_228.97 },
	{ label: 'ГАРАНТЕЛІТ', value: 21_460_276.3 },
	{ label: 'СМЕРЕЧИНА', value: 10_073_622.02 },
	{ label: 'Без підрядника', value: 125_128 },
	{ label: 'ХХІ СТОЛІТТЯ ПЛЮС', value: 47_998 }
];

export const landTenants: ChartDatum[] = [
	{ label: 'Компанії', value: 169_221_326.66 },
	{ label: 'Інші', value: 83_830_675.85 },
	{ label: 'Приватні особи', value: 17_164_101.12 },
	{ label: 'Комунальні', value: 310_803.35 }
];

export const socialMonths = ['Січ', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер'];

export const socialSeries: ChartSeries[] = [
	{
		label: 'Захист',
		values: [1_941_900, 4_586_600, 4_451_098.32, 3_315_100, 4_013_460.22, 2_233_900, 2_555_745.99, 2_782_000]
	},
	{
		label: 'Компенсації',
		values: [336_246.59, 1_258_724.72, 128_120, 1_216_324.55, 1_258_720.34, 1_300_911.82, 1_206_106.54, 1_210_720.07]
	},
	{
		label: 'Пільги',
		values: [2_225_000, 3_433_780.92, 1_893_695.26, 1_415_533.05, 1_195_914.4, 964_451.25, 932_557.57, 832_786.17]
	},
	{
		label: 'Інші',
		values: [336_400.0, 1_249_871.08, 1_046_222.95, 1_680_461.18, 1_609_242.29, 2_237_165.97, 1_097_452.96, 1_710_455.54]
	}
];

export const paymentMonths = [
	'2025-07',
	'2025-08',
	'2025-09',
	'2025-10',
	'2025-11',
	'2025-12',
	'2026-01',
	'2026-02',
	'2026-03',
	'2026-04',
	'2026-05',
	'2026-06'
];

export const paymentSeries: ChartSeries[] = [
	{
		label: 'Нараховано',
		values: [
			7_655.99, 1_158.13, 1_616.32, 126_322.72, 58_171.05, 34_622.92, 94_797.49, 11_475.6,
			30_607.74, 17_401.3, 127_745.29, 61_090.23
		]
	},
	{
		label: 'Сплачено',
		values: [
			11_360.67, 1_149.64, 1_678.83, 50_010.86, 54_871.61, 27_178.7, 97_062.44, 11_637.66,
			2_613.39, 7_321.07, 2_000, 52_001.16
		]
	}
];

export const enterpriseCategories = [
	'Дохід',
	'НСЗУ',
	'Платні послуги',
	'Місцевий бюджет',
	'Собівартість',
	'Медикаменти'
];

export const enterprisePlan = [31_653.7, 31_608.5, 45.2, 14_215.1, 28_262.5, 5_293.1];
export const enterpriseFact = [39_363.1, 39_336, 27.1, 12_425.8, 29_226.6, 5_659.6];

export const socialByType: ChartDatum[] = [
	{ label: 'Складні обставини', value: 18_840_500 },
	{ label: 'Пільги ЖКП', value: 12_655_130 },
	{ label: 'Компенсації', value: 5_885_214.91 },
	{ label: 'Інвалідність I', value: 5_201_200 },
	{ label: 'Інші програми', value: 5_114_557.95 },
	{ label: 'Захисники', value: 3_786_052 }
];

export const landScatter: ScatterPoint[] = [
	{ label: 'Гранд Рівер', x: 12.6855, y: 12_780_149.55 },
	{ label: 'УМЗ', x: 9.3202, y: 5_110_000 },
	{ label: 'УМЗ', x: 7.3837, y: 4_610_283.63 },
	{ label: 'ДОМОБУДІВНИЙ ДЕВЕЛОПЕР', x: 8.1185, y: 4_534_780.89 },
	{ label: 'ПРУТ СІТІ', x: 5.9102, y: 4_379_532.27 },
	{ label: 'ІНТЕРГАЛ-БУД', x: 4.1723, y: 3_395_642.58 },
	{ label: 'БОЯНІВКА', x: 2.7432, y: 3_203_385.42 },
	{ label: 'РІЕЛ-ЕСТЕЙТ ГРУП', x: 5.3341, y: 3_106_785.36 },
	{ label: 'БУКОВИНА СЕРВІС-ЦЕНТР', x: 3.1673, y: 2_994_728.6 },
	{ label: 'РОМА ІНВЕСТ', x: 3.233, y: 2_383_844.88 },
	{ label: 'ЧЗПВ', x: 3.7632, y: 2_232_402.69 },
	{ label: 'ПРЕГОРІЯ УКРАЇНА', x: 4.0164, y: 2_044_303.41 }
];

export const revenueWaterfall: WaterfallDatum[] = [
	{ label: 'План', value: 31_653.7 },
	{ label: 'НСЗУ', value: 7_727.5 },
	{ label: 'Платні послуги', value: -18.1 },
	{ label: 'Факт', value: 0, total: true }
];

export const housingDebtManagers = [
	{ manager: 'Єврокомунбуд', months: 14.69, liability: 9_138_534.4 },
	{ manager: 'Регіон-Центр', months: 6.31, liability: 4_359_692.29 },
	{ manager: 'Чернівцікомунбуд', months: 6, liability: 1_098_191.74 },
	{ manager: 'Вайт Лаіонс', months: 5.63, liability: 3_137_821.03 },
	{ manager: 'Порядок в домі 11', months: 5.22, liability: 3_580_820.85 },
	{ manager: 'Санітарія', months: 4.36, liability: 3_985_754.34 },
	{ manager: 'Порядок в домі 17', months: 3.32, liability: 4_372_840.09 },
	{ manager: 'МІСТОСЕРВІС', months: 2.92, liability: 16_367_852.73 },
	{ manager: 'ЖИТЛОСЕРВІС', months: 2.79, liability: 3_079_097.99 },
	{ manager: 'Ремжитлосервіс', months: 2.56, liability: 3_714_410.38 }
];

export const topArrears = [
	{
		tenant: 'Релігійна громада св. Пантелеїмона',
		address: 'Головна, 100',
		debt: 237_752.47,
		share_pct: 25.2
	},
	{
		tenant: 'ФОП (Бандери, 5)',
		address: 'Бандери С., 5',
		debt: 133_210.88,
		share_pct: 14.1
	},
	{
		tenant: 'Садгора-Сервіс',
		address: 'Галицького Д., 19',
		debt: 132_132.52,
		share_pct: 14
	},
	{
		tenant: 'Світ добрих справ',
		address: 'Головна, 9',
		debt: 69_248.28,
		share_pct: 7.3
	},
	{
		tenant: 'ТОВ «3І»',
		address: 'Вокзальна, 12',
		debt: 66_558.96,
		share_pct: 7.1
	},
	{
		tenant: 'Оріон',
		address: 'Сковороди Г., 1',
		debt: 61_763.68,
		share_pct: 6.5
	}
];

export const arrearsColumns: TableColumn[] = [
	{ key: 'tenant', label: 'Орендар' },
	{ key: 'address', label: 'Адреса' },
	{
		key: 'debt',
		label: 'Борг',
		align: 'right',
		format: (value) => formatCurrency(Number(value))
	},
	{
		key: 'share_pct',
		label: 'Частка',
		align: 'right',
		format: (value) => formatPercent(Number(value))
	}
];

export const housingColumns: TableColumn[] = [
	{ key: 'manager', label: 'Управитель' },
	{
		key: 'buildings',
		label: 'Будинки',
		align: 'right',
		format: (value) => formatNumber(Number(value))
	},
	{
		key: 'liability',
		label: 'Борг',
		align: 'right',
		format: (value) => formatCurrency(Number(value))
	},
	{
		key: 'months_of_debt',
		label: 'Міс. боргу',
		align: 'right',
		format: (value) => formatNumber(Number(value), { maximumFractionDigits: 2 })
	}
];

export const housingRows = [
	{ manager: 'КП «МІСТОСЕРВІС»', buildings: 448, liability: 16_367_852.73, months_of_debt: 2.92 },
	{ manager: 'ТОВ «Єврокомунбуд»', buildings: 332, liability: 9_138_534.4, months_of_debt: 14.69 },
	{ manager: 'Порядок в домі 17', buildings: 44, liability: 4_372_840.09, months_of_debt: 3.32 },
	{ manager: 'ПП «Регіон-Центр»', buildings: 365, liability: 4_359_692.29, months_of_debt: 6.31 },
	{ manager: 'ПП «Санітарія»', buildings: 26, liability: 3_985_754.34, months_of_debt: 4.36 }
];
