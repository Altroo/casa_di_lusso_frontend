import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import RootLayout from './layout';

jest.mock('@/styles/globals.sass', () => ({}));

jest.mock('@mui/material-nextjs/v15-appRouter', () => ({
	__esModule: true,
	AppRouterCacheProvider: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/providers/themeProvider', () => ({
	__esModule: true,
	default: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

describe('RootLayout', () => {
	it('renders the French public website shell', () => {
		const result = RootLayout({ children: <div>CASA_PUBLIC_SITE</div> });
		const html = renderToStaticMarkup(result);

		expect(html).toContain('CASA_PUBLIC_SITE');
		expect(html).toContain('lang="fr"');
	});
});
