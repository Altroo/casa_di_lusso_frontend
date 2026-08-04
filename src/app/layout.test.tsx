import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import RootLayout from './layout';

jest.mock('@/styles/globals.sass', () => ({}));

describe('RootLayout', () => {
	it('renders the French public website shell', () => {
		const result = RootLayout({ children: <div>CASA_PUBLIC_SITE</div> });
		const html = renderToStaticMarkup(result);

		expect(html).toContain('CASA_PUBLIC_SITE');
		expect(html).toContain('lang="fr"');
	});
});
