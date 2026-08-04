import { fallbackContent } from '@/data/fallbackContent';
import type { SiteContent } from '@/types/websiteTypes';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API ?? 'http://localhost:8008';

export async function fetchSiteContent(): Promise<SiteContent> {
	try {
		const response = await fetch(`${backendUrl}/api/website/content/`, {
			next: { revalidate: 60 },
			headers: { Accept: 'application/json' },
		});

		if (!response.ok) return fallbackContent;
		const content = (await response.json()) as SiteContent;
		return {
			...fallbackContent,
			...content,
			settings: { ...fallbackContent.settings, ...content.settings },
			values: content.values.length ? content.values : fallbackContent.values,
			metrics: content.metrics.length ? content.metrics : fallbackContent.metrics,
			services: content.services.length ? content.services : fallbackContent.services,
			portfolio: content.portfolio.length ? content.portfolio : fallbackContent.portfolio,
			partners: content.partners.length ? content.partners : fallbackContent.partners,
			testimonials: content.testimonials.length ? content.testimonials : fallbackContent.testimonials,
		};
	} catch {
		return fallbackContent;
	}
}

export const publicWebsiteApi = `${backendUrl}/api/website`;
