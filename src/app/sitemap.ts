import type { MetadataRoute } from 'next';
import { servicePages } from '@/data/services';
import { fetchPressArticles } from '@/utils/pressApi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL_PREFIX ?? 'https://casadilusso.ma';
	const articles = await fetchPressArticles().catch(() => []);
	return [
		{ url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
		{ url: `${baseUrl}/catalogue`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${baseUrl}/press`, changeFrequency: 'weekly', priority: 0.8 },
		...articles.map(article => ({
			url: `${baseUrl}/press/${article.slug}`, lastModified: new Date(article.updated_at),
			changeFrequency: 'monthly' as const, priority: 0.7,
		})),
		...servicePages.map(({ slug }) => ({
			url: `${baseUrl}/services/${slug}`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		})),
	];
}
