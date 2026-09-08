import type { Metadata } from 'next';
import { PressList } from '@/components/site/pressPages';
import { fetchPressArticles, fetchPressCategories } from '@/utils/pressApi';
import { fetchSiteContent } from '@/utils/websiteApi';

export const metadata: Metadata = {
	title: 'Press',
	description: 'Conseils, inspirations et actualités du design intérieur, de l’architecture et de l’aménagement haut de gamme.',
	alternates: { canonical: '/press' },
};

export default async function PressPage() {
	const [articles, categories, { settings }] = await Promise.all([
		fetchPressArticles(), fetchPressCategories(), fetchSiteContent(),
	]);
	return <PressList articles={articles} categories={categories} settings={settings} />;
}
