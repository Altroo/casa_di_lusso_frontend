import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { servicePages } from '@/data/services';
import ServicePageView from '@/components/site/servicePages';
import { fetchSiteContent } from '@/utils/websiteApi';

export const dynamicParams = false;

export function generateStaticParams() {
	return servicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const service = servicePages.find((entry) => entry.slug === slug);
	if (!service) notFound();
	return {
		title: service.title,
		description: service.description,
		alternates: { canonical: `/services/${service.slug}` },
	};
}

export default async function ServiceRoute({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const service = servicePages.find((entry) => entry.slug === slug);
	if (!service) notFound();
	const { settings } = await fetchSiteContent();
	return <ServicePageView service={service} settings={settings} />;
}
