import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PressDetail } from '@/components/site/pressPages';
import { fetchPressArticle } from '@/utils/pressApi';
import { fetchSiteContent } from '@/utils/websiteApi';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const article = await fetchPressArticle((await params).slug);
	if (!article) notFound();
	return {
		title: article.title, description: article.excerpt,
		alternates: { canonical: `/press/${article.slug}` },
		openGraph: {
			type: 'article', title: article.title, description: article.excerpt,
			publishedTime: article.published_at, modifiedTime: article.updated_at,
			...(article.image_url ? { images: [{ url: article.image_url, alt: article.image_alt || article.title }] } : {}),
		},
	};
}

export default async function PressArticlePage({ params }: Props) {
	const article = await fetchPressArticle((await params).slug);
	if (!article) notFound();
	const { settings } = await fetchSiteContent();
	return <PressDetail article={article} settings={settings} />;
}
