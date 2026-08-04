import type { SiteContent } from '@/types/websiteTypes';

const asset = (name: string) => `/assets/casa/${name}`;

export const fallbackContent: SiteContent = {
	settings: {
		brand_name: 'Casa di Lusso',
		hero_eyebrow: 'CASA DI LUSSO',
		hero_title: 'L’exception au quotidien',
		hero_text:
			'Nous concevons des espaces et des expériences uniques alliant design, élégance et excellence sur mesure.',
		hero_image_url: asset('hero.jpg'),
		about_title: 'À propos',
		about_text:
			'Casa di Lusso est une marque dédiée à l’univers du luxe et du design. Nous transformons vos idées en créations uniques, élégantes et raffinées.\n\nOur showroom brings together the world’s most prestigious brands, all under one roof, delivering results that are truly unmatched.',
		about_image_url: asset('about.png'),
		project_title: 'Vous avez un projet? Donnons vie à votre vision.',
		project_image_url: asset('partner-vby.jpg'),
		values_background_url: asset('values.jpg'),
		partners_intro: 'Nous collaborons avec des partenaires de confiance pour garantir qualité et excellence.',
		partners_outro: 'Nos partenaires partagent notre vision de l’excellence et du raffinement.',
		catalog_url: '',
		video_title: 'Découvrez l’univers Casa di Lusso',
		video_url: '',
		video_cover_url: asset('video.png'),
		address: 'Route N1, Al Moustakbal Roundabout\n90000\nTangier, Morocco',
		phone: '+212 123456789',
		email: 'contact@casadilusso.ma',
		map_embed_url: 'https://www.google.com/maps?q=Casa+di+Lusso+Tangier+Morocco&output=embed',
		map_link: 'https://www.google.com/maps/search/?api=1&query=Casa+di+Lusso+Tangier+Morocco',
		instagram_url: '',
		facebook_url: '',
		linkedin_url: '',
		whatsapp_url: '',
	},
	values: [
		{ id: 1, title: 'Design haut de gamme', icon: 'design', order: 0 },
		{ id: 2, title: 'Créations sur mesure', icon: 'bespoke', order: 1 },
		{ id: 3, title: 'Qualité et finition premium', icon: 'quality', order: 2 },
		{ id: 4, title: 'Accompagnement personnalisé', icon: 'support', order: 3 },
	],
	metrics: [
		{ id: 1, title: 'Clients servis', value: '[ 180 +]', order: 0 },
		{ id: 2, title: "années d'expérience", value: '[ 10 +]', order: 1 },
		{ id: 3, title: 'projets livrés', value: '[200 +]', order: 2 },
		{ id: 4, title: 'Client satisfait', value: '[45 +]', order: 3 },
	],
	services: [
		{
			id: 1,
			title: 'Design intérieur de luxe',
			description: 'Création d’espaces élégants et modernes adaptés à votre style de vie.',
			order: 0,
		},
		{
			id: 2,
			title: 'Architecture & conception',
			description: 'Conception de projets architecturaux uniques et personnalisés',
			order: 1,
		},
		{
			id: 3,
			title: 'Aménagement sur mesure',
			description: 'Optimisation et transformation de vos espaces.',
			order: 2,
		},
		{
			id: 4,
			title: 'Conseil en décoration',
			description: 'Accompagnement dans le choix des matériaux, couleurs et styles.',
			order: 3,
		},
		{
			id: 5,
			title: 'Suivi de projet',
			description: 'Gestion complète de votre projet du début à la fin.',
			order: 4,
		},
	],
	portfolio: [
		{ id: 1, title: 'Cuisine Kali', image_url: '', fallback_path: asset('partner-kali.jpg'), alt_text: 'Cuisine Kali', order: 0 },
		{ id: 2, title: 'Bomma', image_url: '', fallback_path: asset('partner-bomma.jpg'), alt_text: 'Collection Bomma', order: 1 },
		{ id: 3, title: 'Living Collection', image_url: '', fallback_path: asset('partner-images-20.png'), alt_text: 'Living Collection', order: 2 },
		{ id: 4, title: 'Fragments Lighting', image_url: '', fallback_path: asset('partner-fragments.jpg'), alt_text: 'Fragments Lighting', order: 3 },
		{ id: 5, title: 'Giessegi Living', image_url: '', fallback_path: asset('partner-giessegi.jpg'), alt_text: 'Giessegi Living', order: 4 },
	],
	partners: ['Flaminia', 'Bomma', 'Kali', 'Giessegi', 'Vibia'].map((title, index) => ({
		id: index + 1,
		title,
		logo_url: '',
		fallback_path: '',
		website_url: '',
		order: index,
	})),
	testimonials: [
		{
			id: 1,
			title: 'Témoignage 1',
			quote:
				"Un excellent endroit pour acheter du mobilier de bureau : le personnel est compétent, efficace et serviable, et propose de grandes marques. J'y retournerai avec plaisir et je le recommande vivement à tous mes amis et à ma famille.",
			customer_name: '',
			order: 0,
		},
		{
			id: 2,
			title: 'Témoignage 2',
			quote:
				"Quel que soit le design que vous recherchez, vous trouverez assurément votre bonheur ici. N'hésitez pas à vérifier par vous-même.",
			customer_name: '',
			order: 1,
		},
		{
			id: 3,
			title: 'Témoignage 3',
			quote:
				"C'est le moment de vous procurer les meilleurs meubles à des prix attractifs dans notre magasin. Superbe collection.",
			customer_name: '',
			order: 2,
		},
	],
};
