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
