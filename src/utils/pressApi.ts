export type PressCategory = { id: number; title: string; slug: string };

export type PressArticle = {
	id: number;
	title: string;
	slug: string;
	categories: PressCategory[];
	excerpt: string;
	image_url: string;
	image_alt: string;
	published_at: string;
	updated_at: string;
	is_featured: boolean;
};

export type PressArticleDetail = PressArticle & {
	content_title: string;
	introduction: string;
	body_html: string;
	hero_image_url: string;
};

const api = `${process.env.NEXT_PUBLIC_BACKEND_API ?? 'http://localhost:8008'}/api/website/press`;

async function get<T>(path: string): Promise<T> {
	const response = await fetch(`${api}/${path}/`, {
		cache: 'no-store', headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000),
	});
	if (!response.ok) throw new Error('La rubrique Press est temporairement indisponible.');
	return response.json() as Promise<T>;
}

export const fetchPressArticles = () => get<PressArticle[]>('articles');
export const fetchPressCategories = () => get<PressCategory[]>('categories');

export async function fetchPressArticle(slug: string): Promise<PressArticleDetail | null> {
	const response = await fetch(`${api}/articles/${encodeURIComponent(slug)}/`, {
		cache: 'no-store', headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000),
	});
	if (response.status === 404) return null;
	if (!response.ok) throw new Error('Cet article est temporairement indisponible.');
	return response.json() as Promise<PressArticleDetail>;
}
