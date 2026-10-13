import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import PageMotion from '@/components/site/pageMotion';
import '@/styles/globals.sass';
import type { RootLayoutProps } from '@/types/componentTypes';

export const generateMetadata = (): Metadata => ({
	metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL_PREFIX ?? 'https://casadilusso.ma'),
	title: {
		default: 'Casa di Lusso',
		template: '%s | Casa di Lusso',
	},
	applicationName: 'Casa di Lusso',
	description: 'Mobilier, design intérieur et aménagement haut de gamme à Tanger.',
	authors: [{ name: 'Altroo' }],
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		type: 'website',
		locale: 'fr_MA',
		title: 'Casa di Lusso',
		description: 'L’exception au quotidien.',
		images: [{ url: '/assets/casa/hero.jpg', width: 1200, height: 630, alt: 'Casa di Lusso' }],
	},
	icons: {
		icon: [{ url: '/assets/casa/logo.png', type: 'image/png' }],
		apple: [{ url: '/assets/casa/logo.png', type: 'image/png' }],
	},
	other: {
		copyright: `Copyright - Casa di Lusso © ${new Date().getFullYear()}`,
		rating: 'general',
		expires: 'never',
	},
});

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#1a1a1a',
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="fr" data-scroll-behavior="smooth">
			<body>
				<a href="#main-content" className="skip-to-content">
					Aller au contenu
				</a>
				<div id="main-content">{children}</div>
				<Suspense fallback={null}><PageMotion /></Suspense>
			</body>
		</html>
	);
}
