import type { ContactField, ContactValues, Coordinates, FittingType } from '@/types/componentTypes';

export const PAGE_COUNT = 24;
export const PDF_PATH = '/assets/casa/catalogue/catalogue-casa-di-lusso.pdf';
export const PAGE_PATHS = Array.from(
	{ length: PAGE_COUNT },
	(_, index) => `/assets/casa/catalogue/pages/page-${String(index + 1).padStart(2, '0')}.jpg`,
);
export const PAGE_PREVIEW_PATHS = PAGE_PATHS.map((path) => path.replace('/pages/', '/pages/previews/'));

export const topBrandMarks = [
	{ src: '/assets/casa/figma/brand-effe.svg', alt: 'effe' },
	{ src: '/assets/casa/figma/brand-arredo3.svg', alt: 'Arredo3 Cucine' },
	{ src: '/assets/casa/figma/brand-jacuzzi.png', alt: 'Jacuzzi' },
	{ src: '/assets/casa/figma/brand-jacuzzi.svg', alt: 'Bonaldo' },
	{ src: '/assets/casa/figma/brand-bonaldo.svg', alt: 'Poliform' },
	{ src: '/assets/casa/figma/partner-gessi.png', alt: 'Giessegi' },
	{ src: '/assets/casa/figma/partner-bomma.png', alt: 'Loommo' },
	{ src: '/assets/casa/figma/partner-flaminia.png', alt: 'Flaminia' },
	{ src: '/assets/casa/figma/group60.svg', alt: 'Gessi' },
	{ src: '/assets/casa/figma/partner-marazzi.png', alt: 'Marazzi' },
];

export const valueIcons = {
	design: '/assets/casa/figma/value-design.svg',
	bespoke: '/assets/casa/figma/value-bespoke.svg',
	quality: '/assets/casa/figma/value-quality.svg',
	support: '/assets/casa/figma/value-support.svg',
} as const;

export const heroWordmark = [
	{ src: '/assets/casa/figma/wordmark-c.svg', left: 0, width: 37.033, height: 41.737 },
	{ src: '/assets/casa/figma/wordmark-a1.svg', left: 41.9, width: 39.99, height: 40.581 },
	{ src: '/assets/casa/figma/wordmark-s1.svg', left: 86.8, width: 27.716, height: 41.764 },
	{ src: '/assets/casa/figma/wordmark-a2.svg', left: 118.4, width: 39.99, height: 40.581 },
	{ src: '/assets/casa/figma/wordmark-d.svg', left: 179, width: 37.892, height: 40.563 },
	{ src: '/assets/casa/figma/wordmark-i.svg', left: 223.7, width: 11.651, height: 40.563 },
	{ src: '/assets/casa/figma/wordmark-l.svg', left: 261.3, width: 31.341, height: 42.242 },
	{ src: '/assets/casa/figma/wordmark-u.svg', left: 298.2, width: 39.517, height: 42.242 },
	{ src: '/assets/casa/figma/wordmark-s2.svg', left: 343, width: 29.979, height: 42.242 },
	{ src: '/assets/casa/figma/wordmark-s3.svg', left: 381.4, width: 28.616, height: 42.242 },
	{ src: '/assets/casa/figma/wordmark-o.svg', left: 416.5, width: 44.968, height: 42.242 },
];

export const partnerMarks = [
	{ src: '/assets/casa/figma/brand-effe.svg', alt: 'effe' },
	{ src: '/assets/casa/figma/brand-arredo3.svg', alt: 'Arredo3 Cucine' },
	{ src: '/assets/casa/figma/brand-jacuzzi.png', alt: 'Jacuzzi' },
	{ src: '/assets/casa/figma/brand-jacuzzi.svg', alt: 'Bonaldo' },
	{ src: '/assets/casa/figma/brand-bonaldo.svg', alt: 'Poliform' },
	{ src: '/assets/casa/figma/group60.svg', alt: 'Gessi' },
	{ src: '/assets/casa/figma/partner-marazzi.png', alt: 'Marazzi' },
	{ src: '/assets/casa/figma/partner-delta-light.png', alt: 'Delta Light' },
	{ src: '/assets/casa/figma/partner-gessi.png', alt: 'Giessegi' },
	{ src: '/assets/casa/figma/partner-bomma.png', alt: 'Loommo' },
	{ src: '/assets/casa/figma/partner-flaminia.png', alt: 'Flaminia' },
];

export const portfolioImages = [
	{ src: '/assets/casa/partner-kali.jpg', alt: 'Cuisine Kali' },
	{ src: '/assets/casa/figma/portfolio-office.jpg', alt: 'Mobilier de bureau contemporain' },
	{ src: '/assets/casa/partner-fragments.jpg', alt: 'Luminaires Fragments' },
	{ src: '/assets/casa/figma/portfolio-drawer.jpg', alt: 'Détail de mobilier sur mesure' },
	{ src: '/assets/casa/partner-bomma.jpg', alt: 'Cuisine noire contemporaine' },
	{ src: '/assets/casa/figma/portfolio-living.png', alt: 'Aménagement de salon sur mesure' },
];

export const heroSlides = [
	{
		src: '/assets/casa/hero-showroom-main.png',
		alt: 'Showroom Casa di Lusso encadré par les arbres',
		sizes: '(max-width: 1536px) 100vw, 1536px',
	},
	{
		src: '/assets/casa/hero-lighting-pendants.png',
		alt: 'Luminaires suspendus en laiton',
		sizes: '(max-width: 1920px) 100vw, 1920px',
	},
	{
		src: '/assets/casa/hero-delta-light.png',
		alt: 'Éclairage architectural Delta Light au crépuscule',
		sizes: '(max-width: 1920px) 100vw, 1920px',
	},
	{
		src: '/assets/casa/hero-dark-interior.png',
		alt: 'Salle à manger contemporaine illuminée',
		sizes: '(max-width: 1920px) 100vw, 1920px',
	},
	{
		src: '/assets/casa/hero-kitchen.png',
		alt: 'Cuisine contemporaine verte',
		sizes: '(max-width: 1920px) 100vw, 1920px',
	},
	{
		src: '/assets/casa/hero-gessi-shower.jpg',
		alt: 'Salle de douche Gessi',
		sizes: '(max-width: 1920px) 100vw, 1920px',
	},
	];

export const projects = [
	{
		image: 'architecture-project1',
		name: '323 Down Lane',
		place: 'Corney',
		type: 'Résidentiel',
		details: 'Appartements, suites',
	},
	{
		image: 'architecture-project2',
		name: '88 Johnson Blvd',
		place: 'Sunset South',
		type: 'Décoration intérieure',
		details: 'Appartements, résidences, suites',
	},
	{
		image: 'architecture-project3',
		name: '130-540 Noth Road',
		place: 'Reggae',
		type: 'Décoration intérieure',
		details: 'Centre médical',
	},
];

export const testimonials = [
	{
		name: 'Sanae jamil',
		location: 'Casablanca, Maroc',
		image: 'bespoke-sanae',
		text: 'Travailler avec l’équipe de Casa Di Lusso a\nété un véritable plaisir. Leur souci du détail\net leur créativité ont dépassé mes attentes.\nMerci d’avoir embelli ma maison !',
	},
	{
		name: 'Ahmed Said',
		location: 'Tanger, Maroc',
		image: 'bespoke-ahmed',
		text: 'Service exceptionnel ! De la première\nconsultation à la présentation finale, votre\néquipe a fait preuve de professionnalisme\net d’un sens aigu du design.',
	},
];

export const fittingTypes: FittingType[] = [
	{
		x: 220,
		y: 74,
		width: 448,
		icon: 'dressingIcon',
		iconAt: [129, 53, 67, 77] as Coordinates,
		title: 'Dressings sur mesure',
		text: 'Rangements personnalisés\npour organiser vêtements\net accessoires avec élégance.',
	},
	{
		x: 738,
		y: 74,
		width: 359,
		icon: 'kitchenIcon',
		iconAt: [620, 52, 89, 78] as Coordinates,
		title: 'Cuisines haut de gamme',
		text: 'Cuisines modernes, pratiques\net raffinées avec matériaux de\nqualité.',
	},
	{
		x: 1264,
		y: 74,
		width: 359,
		icon: 'libraryIcon',
		iconAt: [1169, 47, 73, 89] as Coordinates,
		title: 'Bibliothèques intégrées',
		text: 'Bibliothèques adaptées à\nl’espace, à la fois décoratives\net fonctionnelles.',
	},
	{
		x: 415,
		y: 306,
		width: 359,
		icon: 'storageIcon',
		iconAt: [268, 299, 116, 81] as Coordinates,
		title: 'Rangements élégants',
		titleLines: ['Rangements', 'élégants'],
		text: 'Solutions discrètes pour\noptimiser l’espace avec style.',
	},
	{
		x: 966,
		y: 306,
		width: 511,
		icon: 'roomIcon',
		iconAt: [801, 310, 138, 68] as Coordinates,
		title: 'Aménagements pour salons, chambres et suites',
		text: 'Solutions personnalisées pour\ncréer des espaces confortables,\nélégants et harmonieux.',
	},
];

export const initialValues: ContactValues = { full_name: '', email: '', phone: '', message: '', website: '' };

export const fieldDefinitions: Array<{
	name: Exclude<ContactField, 'website'>;
	label: string;
	type: string;
	autoComplete: string;
}> = [
	{ name: 'full_name', label: 'Nom complet', type: 'text', autoComplete: 'name' },
	{ name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
	{ name: 'phone', label: 'Téléphone', type: 'tel', autoComplete: 'tel' },
	{ name: 'message', label: 'Message', type: 'text', autoComplete: 'off' },
];
