export interface SiteSettings {
	brand_name: string;
	hero_eyebrow: string;
	hero_title: string;
	hero_text: string;
	hero_tagline: string;
	hero_image_url: string;
	about_title: string;
	about_text: string;
	about_image_url: string;
	services_heading: string;
	services_intro: string;
	services_tagline: string;
	project_title: string;
	project_image_url: string;
	values_background_url: string;
	partners_intro: string;
	partners_outro: string;
	catalog_url: string;
	video_title: string;
	video_url: string;
	video_cover_url: string;
	address: string;
	phone: string;
	email: string;
	map_embed_url: string;
	map_link: string;
	instagram_url: string;
	facebook_url: string;
	linkedin_url: string;
	whatsapp_url: string;
}

export interface OrderedContent {
	id: number;
	title: string;
	order: number;
}

export interface ValueItem extends OrderedContent {
	icon: 'design' | 'bespoke' | 'quality' | 'support';
}

export interface Metric extends OrderedContent {
	value: string;
}

export interface Service extends OrderedContent {
	description: string;
}

export interface PortfolioItem extends OrderedContent {
	image_url: string;
	fallback_path: string;
	alt_text: string;
}

export interface Partner extends OrderedContent {
	logo_url: string;
	fallback_path: string;
	website_url: string;
}

export interface Testimonial extends OrderedContent {
	quote: string;
	customer_name: string;
}

export interface SiteContent {
	settings: SiteSettings;
	values: ValueItem[];
	metrics: Metric[];
	services: Service[];
	portfolio: PortfolioItem[];
	partners: Partner[];
	testimonials: Testimonial[];
}
