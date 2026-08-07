import type { SiteContent } from '@/types/websiteTypes';

const asset = (name: string) => `/assets/casa/${name}`;

export const fallbackContent: SiteContent = {
	settings: {
		brand_name: 'Casa di Lusso',
		hero_eyebrow: 'CASA DI LUSSO',
		hero_title: 'L’exception au quotidien',
		hero_text:
			'Entrez dans un univers où chaque détail sublime votre espace. Casa di Lusso imagine des intérieurs uniques, élégants et entièrement sur mesure, conçus pour refléter votre personnalité et votre art de vivre.',
		hero_tagline: 'ARCHITECTURE INTÉRIEURE  •  DESIGN  •  MOBILIER  •  SUR MESURE',
		hero_image_url: asset('hero.jpg'),
		about_title: 'À propos de Casa di Lusso',
		about_text:
			'Casa di Lusso est une maison d’architecture intérieure et de design basée à Tanger, où le savoir-faire italien rencontre l’élégance de l’art de vivre marocain.\n\nNous imaginons et réalisons des espaces résidentiels, commerciaux et hôteliers d’exception, en associant des marques internationales exclusives, des matériaux de haute qualité et des solutions entièrement personnalisées.\n\nDe la conception à la réalisation, Casa di Lusso accompagne chaque projet avec exigence, créativité et précision afin de créer des intérieurs raffinés, fonctionnels et intemporels.',
		about_image_url: asset('about.png'),
		services_heading: 'Des espaces pensés dans les moindres détails',
		services_intro:
			'Des solutions sur mesure, de la conception à la réalisation, pour créer des espaces élégants, fonctionnels et durables.',
		services_tagline: 'CONCEPTION  •  SÉLECTION  •  COORDINATION  •  RÉALISATION',
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
			title: 'Design intérieur d’exception',
			description:
				'Nous imaginons des intérieurs raffinés et harmonieux, conçus pour refléter votre personnalité et sublimer votre art de vivre.',
			order: 0,
		},
		{
			id: 2,
			title: 'Architecture et conception',
			description:
				'Nous créons des projets architecturaux uniques où l’esthétique, la fonctionnalité et l’innovation s’unissent avec précision.',
			order: 1,
		},
		{
			id: 3,
			title: 'Aménagement sur mesure',
			description:
				'Nous optimisons et transformons chaque espace grâce à des solutions personnalisées, parfaitement adaptées à vos besoins.',
			order: 2,
		},
		{
			id: 4,
			title: 'Conseil en décoration',
			description:
				'Nous vous accompagnons dans le choix des matières, des couleurs, du mobilier et des finitions afin de créer une ambiance élégante et cohérente.',
			order: 3,
		},
		{
			id: 5,
			title: 'Gestion et suivi de projet',
			description:
				'De la première esquisse à la livraison finale, nous coordonnons chaque étape avec rigueur pour garantir une réalisation fidèle à votre vision.',
			order: 4,
		},
	],
	portfolio: [
		{
			id: 1,
			title: 'Cuisine Kali',
			image_url: '',
			fallback_path: asset('partner-kali.jpg'),
			alt_text: 'Cuisine Kali',
			order: 0,
		},
		{
			id: 2,
			title: 'Bomma',
			image_url: '',
			fallback_path: asset('partner-bomma.jpg'),
			alt_text: 'Collection Bomma',
			order: 1,
		},
		{
			id: 3,
			title: 'Living Collection',
			image_url: '',
			fallback_path: asset('partner-images-20.png'),
			alt_text: 'Living Collection',
			order: 2,
		},
		{
			id: 4,
			title: 'Fragments Lighting',
			image_url: '',
			fallback_path: asset('partner-fragments.jpg'),
			alt_text: 'Fragments Lighting',
			order: 3,
		},
		{
			id: 5,
			title: 'Giessegi Living',
			image_url: '',
			fallback_path: asset('partner-giessegi.jpg'),
			alt_text: 'Giessegi Living',
			order: 4,
		},
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
