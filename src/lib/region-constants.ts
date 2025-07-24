import regionPaths from './region-paths.json';

export interface Route {
	id: string;
	name: string;
	color: string;
	paths: string[];
}

// notable routes for certain regions

export const regionConstants = new Map<string, Route[]>([
	[
		'pugetsound',
		[
			{
				id: '40_100479',
				name: '1 line',
				color: '#4dad31',
				paths: regionPaths.pugetsound['1 line'],
			},
			{
				id: '40_2LINE',
				name: '2 line',
				color: '#00a2df',
				paths: regionPaths.pugetsound['2 line'],
			},
			{
				id: '40_TLINE',
				name: 'T line',
				color: '#f88900',
				paths: regionPaths.pugetsound['T line'],
			},
			{
				id: '40_SNDR_EV',
				name: 'N line',
				color: '#94b6d4',
				paths: regionPaths.pugetsound['N line'],
			},
			{
				id: '40_SNDR_TL',
				name: 'S line',
				color: '#94b6d4',
				paths: regionPaths.pugetsound['S line'],
			},
			{
				id: '23_100340',
				name: 'SLU streetcar',
				// no official color, but amazon orange
				color: '#ff6200',
				paths: regionPaths.pugetsound['SLU streetcar'],
			},
			{
				id: '23_102638',
				name: 'First Hill streetcar',
				// just use the same color
				color: '#ff6200',
				paths: regionPaths.pugetsound['First Hill streetcar'],
			},
			{
				id: '96_SCM',
				name: 'Monorail',
				// some random pink i picked up off of sound transit's website
				color: '#d6078e',
				paths: regionPaths.pugetsound.Monorail,
			},
			{
				id: '1_100512',
				name: 'A line',
				color: '#c22031',
				paths: regionPaths.pugetsound['A line'],
			},
			{
				id: '1_102548',
				name: 'B line',
				color: '#c22031',
				paths: regionPaths.pugetsound['B line'],
			},
			{
				id: '1_102576',
				name: 'C line',
				color: '#c22031',
				paths: regionPaths.pugetsound['C line'],
			},
			{
				id: '1_102581',
				name: 'D line',
				color: '#c22031',
				paths: regionPaths.pugetsound['D line'],
			},
			{
				id: '1_102615',
				name: 'E line',
				color: '#c22031',
				paths: regionPaths.pugetsound['E line'],
			},
			{
				id: '1_102619',
				name: 'F line',
				color: '#c22031',
				paths: regionPaths.pugetsound['F line'],
			},
			{
				id: '1_102745',
				name: 'G line',
				color: '#c22031',
				paths: regionPaths.pugetsound['G line'],
			},
			{
				id: '1_102736',
				name: 'H line',
				color: '#c22031',
				paths: regionPaths.pugetsound['H line'],
			},
			{
				id: '29_701',
				name: 'Blue line',
				color: '#006aff',
				paths: regionPaths.pugetsound['Blue line'],
			},
			{
				id: '29_702',
				name: 'Green line',
				color: '#00ab00',
				paths: regionPaths.pugetsound['Green line'],
			},
			{
				id: '29_703',
				name: 'Orange line',
				color: '#e7532a',
				paths: regionPaths.pugetsound['Orange line'],
			},
		].toReversed(),
	],
]);
