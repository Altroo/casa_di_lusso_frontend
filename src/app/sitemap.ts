import type { MetadataRoute } from 'next';
import { servicePages } from '@/data/services';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL_PREFIX ?? 'https://casadilusso.ma';
	return [
		{ url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
		{ url: `${baseUrl}/catalogue`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
		...servicePages.map(({ slug }) => ({
			url: `${baseUrl}/services/${slug}`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		})),
	];
}
