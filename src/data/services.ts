export const servicePages = [
	{
		slug: 'design-interieur-de-luxe',
		title: 'Design intérieur de luxe',
		kind: 'design',
		description:
			'Nous concevons des intérieurs élégants, fonctionnels et intemporels, pensés pour refléter votre style de vie et valoriser chaque espace.',
	},
	{
		slug: 'architecture-conception',
		title: 'Architecture & conception',
		kind: 'architecture',
		description:
			'Nous transformons vos idées en projets architecturaux uniques, pensés avec précision, équilibre et exigence.',
	},
	{
		slug: 'amenagement-sur-mesure',
		title: 'Aménagement sur mesure',
		kind: 'bespoke',
		description: 'Des aménagements sur mesure adaptés aux dimensions, aux usages et à l’esthétique de votre intérieur.',
	},
] as const;

export type ServicePage = (typeof servicePages)[number];

export function serviceLink(title: string) {
	const normalized = title.toLocaleLowerCase('fr');
	const service = servicePages.find((entry) =>
		normalized.startsWith(
			entry.kind === 'design' ? 'design intérieur' : entry.kind === 'architecture' ? 'architecture' : 'aménagement',
		),
	);
	return service ? `/services/${service.slug}` : undefined;
}
