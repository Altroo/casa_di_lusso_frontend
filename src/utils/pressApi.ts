import type { PressArticle, PressArticleDetail, PressCategory } from '@/types/pressTypes';
export type { PressArticle, PressArticleDetail, PressCategory } from '@/types/pressTypes';

const api = `${process.env.NEXT_PUBLIC_BACKEND_API ?? 'http://localhost:8008'}/api/website/press`;

async function get<T>(path: string): Promise<T> {
	const response = await fetch(`${api}/${path}/`, {
		cache: 'no-store', headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000),
	});
	if (!response.ok) throw new Error('La rubrique Press est temporairement indisponible.');
	return await response.json() as Promise<T>;
}

export const fetchPressArticles = () => get<PressArticle[]>('articles');
export const fetchPressCategories = () => get<PressCategory[]>('categories');

export async function fetchPressArticle(slug: string): Promise<PressArticleDetail | null> {
	const response = await fetch(`${api}/articles/${encodeURIComponent(slug)}/`, {
		cache: 'no-store', headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000),
	});
	if (response.status === 404) return null;
	if (!response.ok) throw new Error('Cet article est temporairement indisponible.');
	return await response.json() as Promise<PressArticleDetail>;
}
