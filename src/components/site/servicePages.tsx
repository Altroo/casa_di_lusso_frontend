import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import type { SiteSettings } from '@/types/websiteTypes';
import type { ServicePage } from '@/data/services';
import { serviceAssets } from '@/data/serviceAssets';
import SiteHeader from './siteHeader';
import SiteFooter from './siteFooter';
import AnimatedMetricValue from './animatedMetricValue';
import { ProjectCarousel, ServiceAccordion, ServiceTestimonials } from './serviceInteractions';
import siteStyles from './site.module.sass';
import styles from './servicePages.module.sass';

type Coordinates = [number, number, number, number?];
type PlaceProps = {
	at: Coordinates;
	children?: ReactNode;
	className?: string;
	as?: 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'ul';
	font?: [number, number, number?];
	family?: 'Inter' | 'Poppins';
};

function Place({ at: [x, y, width, height], children, className = '', as: Tag = 'div', font, family }: PlaceProps) {
	return (
		<Tag
			data-place
			className={`${styles.place} ${font ? styles.text : ''} ${className}`}
			style={
				{
					'--x': x,
					'--y': y,
					'--w': width,
					'--h': height,
					'--font': font?.[0],
					'--leading': font?.[1],
					'--weight': font?.[2] ?? 400,
					'--family': family ?? 'Poppins',
				} as CSSProperties
			}
		>
			{children}
		</Tag>
	);
}

function Photo({
	name,
	at,
	alt = '',
	crop,
	priority = false,
	className = '',
}: {
	name: string;
	at: Coordinates;
	alt?: string;
	crop?: [number, number, number, number];
	priority?: boolean;
	className?: string;
}) {
	const designWidth = name.startsWith('architecture-') ? 1920 : name.startsWith('bespoke-') ? 1728 : 1600;
	const imageScale = crop?.[0] ?? 100;
	return (
		<Place at={at} className={`${styles.photo} ${className}`}>
			<div style={{ '--ratio': `${at[2]} / ${at[3]}` } as CSSProperties}>
				<Image
					src={serviceAssets[name]}
					alt={alt}
					fill
					sizes={`(max-width: 1200px) ${imageScale}vw, ${(at[2] / designWidth) * imageScale}vw`}
					preload={priority}
					style={
						crop
							? ({
									'--crop-width': `${crop[0]}%`,
									'--crop-height': `${crop[1]}%`,
									'--crop-left': `${crop[2]}%`,
									'--crop-top': `${crop[3]}%`,
									objectFit: 'fill',
								} as CSSProperties)
							: undefined
					}
				/>
			</div>
		</Place>
	);
}

function Section({
	height,
	children,
	className = '',
	id,
}: {
	height: number;
	children: ReactNode;
	className?: string;
	id?: string;
}) {
	return (
		<section id={id} className={`${styles.layoutSection} ${className}`} style={{ '--height': height } as CSSProperties}>
			{children}
		</section>
	);
}

function DesignPage() {
	return (
		<>
			<Section height={624} className={styles.designHero}>
				<Place at={[77, 56, 532]} className={styles.heroCopy}>
					<h1 className={styles.designTitle}>
						<span>Design intérieur </span>
						<span>de luxe</span>
					</h1>
					<p>
						Nous concevons des intérieurs élégants, fonctionnels et intemporels, pensés pour refléter votre style de vie
						et valoriser chaque espace.
					</p>
				</Place>
				<Photo
					name="design-hero"
					at={[664, 57, 859, 507]}
					alt="Chambre de luxe, matières naturelles et tapis"
					crop={[100.04, 119.92, -0.02, -19.92]}
					priority
				/>
			</Section>
			<Section height={756} className={`${styles.dark} ${styles.designIntro}`}>
				<Photo name="design-intro" at={[69, 29, 492, 329]} alt="Salon contemporain aux finitions raffinées" />
				<div className={styles.designIntroCopy}>
					<Place at={[654, 30, 870]} className={styles.rule} />
					<Place as="h2" at={[654, 44, 830]} font={[40, 57, 600]}>
						NOUS SAVONS TRÈS BIEN
						<br /> CE QU’IL FAUT FAIRE
					</Place>
					<Place as="p" at={[651, 186, 870]} font={[25, 27]}>
						Casa Di Lusso accompagne ses clients dans la création d’intérieurs haut de gamme, où chaque détail est
						étudié avec précision.
						<br /> Notre approche repose sur l’équilibre entre esthétique, confort et fonctionnalité. Nous analysons
						votre mode de vie, vos préférences, la lumière naturelle, les volumes et les matériaux afin de proposer une
						ambiance cohérente et raffinée.
					</Place>
				</div>
				<Place at={[75, 443, 487, 276]} className={styles.stepCard}>
					<h3>Tout étape par étape</h3>
					<p>
						Du choix des couleurs à la sélection du mobilier, des revêtements, des luminaires et des accessoires
						décoratifs, nous construisons une vision complète de votre intérieur. Chaque projet est pensé comme une
						expérience personnalisée, avec une attention particulière portée à l’harmonie, à la qualité des finitions et
						à la durabilité des choix.
					</p>
					<Link href="/#contact" aria-label="Parlons de votre projet">
						⟶
					</Link>
				</Place>
				<Photo
					name="design-living"
					at={[652, 384, 866, 334]}
					alt="Aménagement d’un salon élégant"
					crop={[101.15, 174.87, 0, -62.59]}
				/>
			</Section>
			<Section height={860} className={styles.designApproach}>
				<div className={styles.designApproachCopy}>
					<Place at={[75, 51, 659]} className={`${styles.rule} ${styles.thickRule}`} />
					<Place as="h2" at={[99, 95, 550]} font={[40, 57]}>
						NOTRE APPROCHE
					</Place>
					<Place as="ul" at={[104, 168, 660]} font={[20, 34]} className={styles.bulletList}>
						{[
							'Analyse de vos besoins',
							'Création d’une direction artistique',
							'Sélection des matériaux, couleurs et textures',
							'Proposition de mobilier et d’éléments décoratifs',
							'Suivi jusqu’à la finalisation du projet',
						].map((text) => (
							<li key={text}>{text}</li>
						))}
					</Place>
					<Place as="h2" at={[99, 371, 550]} font={[40, 57]}>
						POUR QUI ?
					</Place>
					<Place as="ul" at={[104, 444, 660]} font={[20, 34]} className={styles.bulletList}>
						{[
							'Villas et appartements haut standing',
							'Résidences principales ou secondaires',
							'Showrooms, bureaux privés et espaces professionnels',
							'Espaces de réception et salons de prestige',
						].map((text) => (
							<li key={text}>{text}</li>
						))}
					</Place>
					<Place as="h2" at={[104, 612, 620]} font={[40, 57]}>
						RÉSULTAT ATTENDU
					</Place>
					<Place as="p" at={[104, 677, 558]} font={[20, 34]}>
						Un intérieur élégant, cohérent, chaleureux
						<br /> et parfaitement adapté à votre quotidien.
					</Place>
				</div>
				<Photo
					name="design-detail"
					at={[908, 51, 620, 683]}
					alt="Détail de luminaires en verre et laiton"
					crop={[100, 131.24, 0, -0.03]}
				/>
			</Section>
			<Section height={1320} className={`${styles.dark} ${styles.designProjects}`} id="projets">
				<div className={styles.designProjectsCopy}>
					<Place at={[75, 44, 725]} className={`${styles.rule} ${styles.thickRule}`} />
					<Place as="h2" at={[79, 71, 600]} font={[32, 76, 600]}>
						NOS PROJETS
					</Place>
					<Place as="p" at={[79, 156, 473]} font={[19, 27]}>
						L’harmonie des éléments de décoration intérieure crée un ensemble cohérent. L’appartement, décoré dans un
						style moderne, offre une impression de lumière, d’espace et d’harmonie. Notre équipe est composée de
						véritables professionnels forts d’une vaste expérience.
					</Place>
					<Place at={[75, 366, 519]} className={styles.more}>
						<Link href="/#portfolio">
							VOIR PLUS <span>⟶</span>
						</Link>
					</Place>
				</div>
				<Photo name="design-project1" at={[836, 44, 689, 347]} alt="Salon lumineux et cuisine ouverte" />
				<Photo name="design-project2" at={[79, 451, 689, 382]} alt="Cuisine avec îlot et finitions en marbre" />
				<Photo name="design-project3" at={[836, 451, 689, 382]} alt="Chambre contemporaine et coin repas" />
				<Photo name="design-project4" at={[75, 893, 689, 382]} alt="Suite aux matières naturelles" />
				<Photo name="design-project5" at={[836, 893, 689, 382]} alt="Salle à manger élégante" />
			</Section>
		</>
	);
}

function ArchitecturePage() {
	return (
		<>
			<Section height={2003} className={`${styles.architectureHero} ${styles.dark}`}>
				<Place at={[175, 125, 860]} className={styles.heroCopy}>
					<h1>
						Architecture
						<br /> &amp; conception
					</h1>
					<p>
						Nous transformons vos idées en projets architecturaux uniques, pensés avec précision, équilibre et exigence.
					</p>
					<div>
						<p>
							Notre service d’architecture et de conception permet de donner forme à vos ambitions à travers une vision
							claire, technique et esthétique. Nous travaillons sur l’organisation des volumes, la circulation, la
							lumière, les matériaux et l’identité globale du lieu.
						</p>
						<p>
							Chaque projet commence par une étude approfondie de l’espace existant ou du terrain, suivie d’une phase de
							conception permettant de définir les lignes directrices du projet. L’objectif est de créer des espaces
							fonctionnels, élégants et durables, tout en respectant les contraintes techniques et les attentes du
							client.
						</p>
					</div>
				</Place>
				<Photo
					name="architecture-hero"
					at={[1120, 137, 793, 742]}
					alt="Plan de coupe architecturale"
					crop={[133.97, 115.93, -33.97, -0.03]}
					priority
				/>
				<Photo
					name="architecture-showroom"
					at={[173, 998, 1747, 1005]}
					alt="Architecture extérieure du showroom Casa di Lusso"
					crop={[146.88, 170.15, -44.14, -58.36]}
					className={styles.showroom}
				/>
			</Section>
			<Section height={2765} className={styles.architectureBody}>
				<Place at={[173, 110, 659]} className={`${styles.rule} ${styles.thickRule}`} />
				<Place as="h2" at={[135, 189, 1000]} font={[60, 57, 500]}>
					CE QUE NOUS PROPOSONS
				</Place>
				<Place as="ul" at={[190, 281, 811]} font={[32, 57, 500]} className={styles.bulletList}>
					{[
						'Étude conceptuelle',
						'Plans d’aménagement',
						'Optimisation des volumes',
						'Choix des matériaux',
						'Coordination esthétique du projet',
						'Accompagnement dans',
					].map((text) => (
						<li key={text}>
							{text}
							{text === 'Accompagnement dans' && (
								<>
									<br /> la visualisation finale
								</>
							)}
						</li>
					))}
				</Place>
				<Place as="h2" at={[135, 745, 682]} font={[60, 57, 500]}>
					NOTRE VISION
				</Place>
				<Place as="p" at={[190, 835, 682]} font={[32, 43, 500]}>
					Créer des lieux qui allient beauté, confort, fluidité et valeur patrimoniale.
				</Place>
				<Place as="h2" at={[135, 979, 682]} font={[60, 60, 500]}>
					Idéal pour
				</Place>
				<Place as="ul" at={[190, 1060, 740]} font={[32, 43, 500]} className={styles.bulletList}>
					{[
						'Rénovations haut de gamme',
						'Nouveaux projets résidentiels',
						'Espaces commerciaux premium',
						'Villas, appartements et showrooms',
					].map((text) => (
						<li key={text}>{text}</li>
					))}
				</Place>
				<Photo
					name="architecture-detail"
					at={[1045, 250, 794, 1021]}
					alt="Escalier architectural du showroom Casa di Lusso"
					crop={[128.73, 100, -25.82, 0]}
				/>
				<Place at={[0, 1500, 1920, 1240]} className={styles.architectureProjects}>
					<Place as="p" at={[173, 0, 141]} font={[18, 28.5]}>
						Projets en cours
					</Place>
					<Place as="h2" at={[566, 0, 994]} font={[73, 76, 600]}>
						Découvrez certains de
						<br /> nos projets en cours
					</Place>
					<Place at={[1665, 0, 150]} className={styles.allProjects}>
						<Link href="/#portfolio">Afficher tout →</Link>
					</Place>
					<ProjectCarousel />
				</Place>
			</Section>
		</>
	);
}

const fittingTypes = [
	{
		x: 220,
		y: 74,
		width: 448,
		icon: 'dressingIcon',
		iconAt: [129, 53, 67, 77] as Coordinates,
		title: 'Dressings sur mesure',
		text: 'Rangements personnalisés pour organiser vêtements et accessoires avec élégance.',
	},
	{
		x: 738,
		y: 74,
		width: 359,
		icon: 'kitchenIcon',
		iconAt: [620, 52, 89, 78] as Coordinates,
		title: 'Cuisines haut de gamme',
		text: 'Cuisines modernes, pratiques et raffinées avec matériaux de qualité.',
	},
	{
		x: 1264,
		y: 74,
		width: 359,
		icon: 'libraryIcon',
		iconAt: [1169, 47, 73, 89] as Coordinates,
		title: 'Bibliothèques intégrées',
		text: 'Bibliothèques adaptées à l’espace, à la fois décoratives et fonctionnelles.',
	},
	{
		x: 415,
		y: 306,
		width: 359,
		icon: 'storageIcon',
		iconAt: [268, 299, 116, 81] as Coordinates,
		title: (
			<>
				Rangements
				<br /> élégants
			</>
		),
		text: 'Solutions discrètes pour optimiser l’espace avec style.',
	},
	{
		x: 966,
		y: 306,
		width: 511,
		icon: 'roomIcon',
		iconAt: [801, 310, 138, 68] as Coordinates,
		title: 'Aménagements pour salons, chambres et suites',
		text: 'Solutions personnalisées pour créer des espaces confortables, élégants et harmonieux.',
	},
];

function BespokePage() {
	return (
		<>
			<Section height={1036} className={styles.bespokeHero}>
				<Place at={[113, 28, 687]} className={styles.heroCopy}>
					<h1 className={styles.bespokeTitle}>
						<span>Aménagement </span>
						<span>sur mesure</span>
					</h1>
					<p>
						L’aménagement sur mesure permet d’exploiter pleinement le potentiel de chaque pièce. Chez{' '}
						<strong>Casa Di Lusso</strong>, nous concevons des solutions adaptées aux dimensions, aux usages et à
						l’esthétique de votre intérieur.
					</p>
					<Link className={siteStyles.filledButton} href="/#contact">
						Démarrer votre projet
					</Link>
				</Place>
				<Photo
					name="bespoke-hero"
					at={[1116, 42, 507, 438]}
					alt="Dressing sur mesure et chambre vus du dessus"
					crop={[129.62, 100, -12.84, 0]}
					priority
				/>
				<Place at={[856, 471, 206, 187]} className={styles.outlineAccent} />
				<Photo name="bespoke-bed" at={[916, 515, 608, 405]} alt="Mobilier de chambre réalisé sur mesure" />
				<Place at={[1472, 757, 151, 151]} className={styles.downArrow}>
					<Link href="#amenagements" aria-label="Découvrir les aménagements">
						<Image src={serviceAssets['bespoke-arrowDown']} alt="" fill sizes="151px" />
					</Link>
				</Place>
				<Place at={[120, 730, 740, 190]} className={styles.bespokeMetrics}>
					{[
						['180+', 'Clients servis'],
						['200+', 'Clients satisfaits'],
						['10+', 'années d’expérience'],
					].map(([value, label]) => (
						<div key={value}>
							<AnimatedMetricValue value={value} bracketed={false} />
							<span>{label}</span>
						</div>
					))}
				</Place>
			</Section>
			<Section height={742} className={styles.fittingTypes} id="amenagements">
				<Place at={[113, 40, 100]} className={`${styles.rule} ${styles.thickRule}`} />
				<Place as="h2" at={[246, 0, 1000]} font={[40, 60, 600]}>
					Types d’aménagements
				</Place>
				{fittingTypes.map((item) => (
					<div key={item.icon} className={styles.fittingType}>
						<Photo
							name={`bespoke-${item.icon}`}
							at={[item.iconAt[0], item.iconAt[1] + 77, item.iconAt[2], item.iconAt[3]]}
							className={styles.fittingIcon}
						/>
						<Place at={[item.x, item.y + 77, item.width]} className={styles.bodyCopy}>
							<h3>{item.title}</h3>
							<p>{item.text}</p>
						</Place>
					</div>
				))}
			</Section>
			<Section height={908} className={styles.bespokeDream}>
				<Photo
					name="bespoke-lighting"
					at={[105, 0, 712, 712]}
					alt="Luminaires sculpturaux en verre"
					crop={[115.88, 124.44, -0.01, 0]}
				/>
				<Place as="h2" at={[919, 0, 704]} font={[58, 70, 600]} family="Inter">
					Concevoir votre rêve avec éclat
				</Place>
				<Place as="p" at={[919, 190, 722]} font={[24, 39.648, 500]} family="Inter">
					Sublimez vos espaces grâce à des aménagements intérieurs sur mesure qui reflètent votre style et vos
					aspirations uniques, conçus avec précision et brio pour une expérience de vie inoubliable.
				</Place>
				<Place at={[919, 396, 704]} className={styles.accordionStack}>
					<div className={styles.accordion}>
						<ServiceAccordion />
					</div>
					<div className={styles.solidLink}>
						<Link className={siteStyles.filledButton} href="/#contact">
							Voir plus
						</Link>
					</div>
				</Place>
			</Section>
			<Section height={1096} className={styles.bespokeProcess}>
				<Place as="h2" at={[97, 0, 781]} font={[36, 43.56, 600]} family="Inter">
					Créer un espace pratique, esthétique et parfaitement adapté à votre style de vie.
				</Place>
				{[
					[
						'Optimisation de l’espace',
						'Utiliser chaque zone intelligemment pour gagner en confort, rangement et circulation.',
					],
					[
						'Cohérence avec le design intérieur',
						'Créer une harmonie entre les couleurs, les matériaux, le mobilier et le style général.',
					],
					['Finitions personnalisées', 'Adapter les détails, couleurs, textures et formes selon les goûts du client.'],
				].map(([title, text], index) => (
					<div className={styles.processStep} key={title}>
						<Place at={[97, 201 + 237 * index, 72, 72]} className={styles.stepIcon}>
							<Image
								src={serviceAssets[`bespoke-step${index + 1}`]}
								alt=""
								width={28}
								height={28}
								data-complete={index === 2 || undefined}
							/>
						</Place>
						<Place at={[232, 217 + 237 * index, 569]} className={styles.bodyCopy}>
							<h3>{title}</h3>
							<p>{text}</p>
						</Place>
					</div>
				))}
				<Photo
					name="bespoke-storage"
					at={[921, 1, 698, 851]}
					alt="Bibliothèque intégrée et rangements sur mesure"
					crop={[201.43, 123.62, -12.61, -22.33]}
				/>
			</Section>
			<Section height={1022} className={styles.bespokeTestimonials}>
				<Photo
					name="bespoke-testimonial"
					at={[105, 0, 711, 711]}
					alt="Intérieur lumineux et chaleureux"
					crop={[167.37, 111.53, -43.6, -6.19]}
				/>
				<Place as="h2" at={[919, 0, 704]} font={[58, 70, 600]} family="Inter">
					Ce que nos clients disent de nous
				</Place>
				<ServiceTestimonials />
			</Section>
			<Section height={947} className={styles.bespokeGallery}>
				<Place as="h2" at={[84, 11, 1535]} font={[58, 70, 600]} family="Inter">
					Des espaces inspirants, des vies inspirantes
				</Place>
				<Photo
					name="bespoke-gallery1"
					at={[84, 158, 538, 263]}
					alt="Salon sur mesure aux tons naturels"
					crop={[100.08, 136.5, -0.04, -1.52]}
				/>
				<Photo
					name="bespoke-gallery2"
					at={[649, 158, 515, 263]}
					alt="Salon avec matières et éclairages raffinés"
					crop={[101.75, 132.7, -0.39, 0]}
				/>
				<Photo
					name="bespoke-gallery3"
					at={[84, 435, 538, 340]}
					alt="Composition de luminaires décoratifs"
					crop={[112.45, 100.09, -6.32, -0.05]}
				/>
				<Photo
					name="bespoke-gallery4"
					at={[649, 437, 515, 338]}
					alt="Tapis, mobilier et textures d’une chambre"
					crop={[100.22, 101.78, -0.11, 0]}
				/>
				<Photo
					name="bespoke-gallery5"
					at={[1206, 158, 413, 617]}
					alt="Luminaires de prestige en verre"
					crop={[103.39, 100.06, 0, -0.03]}
				/>
			</Section>
			<Section height={990} className={styles.bespokeInspiration}>
				{[
					[795, 599],
					[65, 599],
					[459, 114],
					[1519, 599],
					[1132, 114],
				].map(([x, y]) => (
					<Place key={x} at={[x, y, 141, 148]} className={styles.inspirationOutline} />
				))}
				<Place as="h2" at={[97, 8, 1535]} font={[58, 70, 600]} family="Inter">
					Transformer les espaces avec élégance
				</Place>
				<Photo name="bespoke-blog1" at={[97, 138, 482, 289]} alt="Vita Gessi Caffè" crop={[100, 109.99, 0, -9.94]} />
				<Place at={[97, 427, 482, 285]} className={`${styles.inspirationCard} ${styles.coffeeCard}`}>
					<p>Gessi transforme un geste quotidien en une véritable expérience de design.</p>
					<h3>Vita Gessi Caffè</h3>
				</Place>
				<Place at={[625, 158, 482, 273]} className={`${styles.inspirationCard} ${styles.surfaceCard}`}>
					<p>
						Ariostea donne à la céramique une dimension supplémentaire. Au-delà de l’esthétique, ces surfaces sont
						conçues pour contribuer activement à l’hygiène et au bien-être des espaces intérieurs comme extérieurs.
					</p>
					<h3>Active Surfaces®</h3>
				</Place>
				<Photo
					name="bespoke-blog2"
					at={[625, 431, 482, 293]}
					alt="Surfaces céramiques Ariostea"
					crop={[100.07, 116.72, -0.03, -16.72]}
				/>
				<Photo
					name="bespoke-blog3"
					at={[1150, 158, 482, 263]}
					alt="Savoir-faire Gessi Haute Culture"
					crop={[100.01, 121.29, -0.01, -9.13]}
				/>
				<Place at={[1150, 421, 482, 291]} className={styles.inspirationCard}>
					<p>Avec Haute Culture, Gessi porte sa vision du design à son expression la plus exclusive.</p>
					<h3>Gessi Haute Culture</h3>
				</Place>
			</Section>
		</>
	);
}

export default function ServicePageView({ service, settings }: { service: ServicePage; settings: SiteSettings }) {
	return (
		<div className={siteStyles.site}>
			<SiteHeader variant={service.kind} activeSlug={service.slug} />
			<main className={`${styles.page} ${styles[service.kind]}`}>
				{service.kind === 'design' ? (
					<DesignPage />
				) : service.kind === 'architecture' ? (
					<ArchitecturePage />
				) : (
					<BespokePage />
				)}
			</main>
			<SiteFooter settings={settings} />
		</div>
	);
}
