import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL_PREFIX ?? 'https://casadilusso.ma';
	return [{ url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }];
}
