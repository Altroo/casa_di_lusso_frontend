import Image from 'next/image';
import Link from 'next/link';
import type { PressArticle, PressArticleDetail, PressCategory } from '@/utils/pressApi';
import type { SiteSettings } from '@/types/websiteTypes';
import SiteHeader from './siteHeader';
import SiteFooter from './siteFooter';
import styles from './pressPages.module.sass';
import siteStyles from './site.module.sass';

const introduction =
	'À travers notre blog, Casa Di Lusso partage ses conseils, inspirations et actualités autour du design intérieur, de l’architecture et de l’aménagement haut de gamme. Découvrez les tendances déco, les nouveautés de nos marques partenaires et nos recommandations pour créer des espaces élégants, fonctionnels et personnalisés.';

function Excerpt({ text }: { text: string }) {
	const separator = text.indexOf(':');
	// Emphasize an editorial label when supplied; never add copy to a post.
	return separator > 0 && separator < 60 ? (
		<>
			<strong>{text.slice(0, separator + 1)}</strong>
			{text.slice(separator + 1)}
		</>
	) : (
		<>{text}</>
	);
}

function Cover({ article }: { article: PressArticle }) {
	return (
		<div className={styles.cover} data-reveal>
			{article.image_url ? (
				<Image
					src={article.image_url}
					alt={article.image_alt || article.title}
					fill
					unoptimized={process.env.NODE_ENV === 'development'}
					sizes="(max-width: 700px) 100vw, 34vw"
				/>
			) : (
				<span className={styles.noImage}>Casa di Lusso</span>
			)}
		</div>
	);
}

function PressBrands({ className = '' }: { className?: string }) {
	return (
		<section className={`${styles.brands} ${className}`} aria-label="Marques partenaires">
			{[
				['/assets/casa/figma/group60.svg', 'Gessi'],
				['/assets/casa/press/ariostea.png', 'Ariostea'],
				['/assets/casa/figma/partner-delta-light.png', 'Delta Light'],
				['/assets/casa/figma/partner-gessi.png', 'Giessegi'],
			].map(([src, alt]) => (
				<Image key={alt} src={src} alt={alt} width={210} height={90} sizes="(max-width: 700px) 35vw, 15vw" />
			))}
		</section>
	);
}

export function PressList({
	articles,
	categories,
	settings,
}: {
	articles: PressArticle[];
	categories: PressCategory[];
	settings: SiteSettings;
}) {
	return (
		<div className={siteStyles.site}>
			<SiteHeader variant="press" />
			<main className={`${styles.page} ${styles.listPage}`}>
				<section className={styles.listHero}>
					<Image
						src="/assets/casa/press/list-hero.png"
						alt="Catalogue Casa di Lusso ouvert"
						fill
						preload
						sizes="100vw"
					/>
					<div className={styles.heroCopy}>
						<h1>Blog &amp; actualités</h1>
						<p>{introduction}</p>
					</div>
				</section>
				<div className={styles.categories}>
					{articles.length === 0 ? (
						<section className={styles.empty}>
							<h2>Nos prochaines actualités</h2>
							<p>Retrouvez bientôt nos inspirations, conseils et nouveautés.</p>
						</section>
					) : (
						categories.map((category) => {
							const entries = articles.filter((article) => article.categories.some((item) => item.id === category.id));
							if (!entries.length) return null;
							return (
								<section className={styles.category} key={category.id} aria-labelledby={`category-${category.slug}`}>
									<h2 id={`category-${category.slug}`}>{category.title}</h2>
									<div className={styles.grid}>
										{entries.map((article) => (
											<article key={article.id}>
												<Link href={`/press/${article.slug}`} className={styles.cardLink}>
													<Cover article={article} />
													<h3>{article.title}</h3>
													<p>
														<Excerpt text={article.excerpt} />
													</p>
												</Link>
											</article>
										))}
									</div>
								</section>
							);
						})
					)}
				</div>
				<PressBrands />
			</main>
			<SiteFooter settings={settings} />
		</div>
	);
}

export function PressDetail({ article, settings }: { article: PressArticleDetail; settings: SiteSettings }) {
	const intro = article.introduction || article.excerpt;
	const introLabel = 'Chez Casa di Lusso';
	return (
		<div className={siteStyles.site}>
			<SiteHeader variant="press" />
			<main className={`${styles.page} ${styles.detailPage}`}>
				<article>
					<header className={`${styles.detailHero}`}>
						<Image
							src={article.hero_image_url || '/assets/casa/press/detail-hero.png'}
							alt=""
							fill
							preload
							sizes="100vw"
							unoptimized={!!article.hero_image_url && process.env.NODE_ENV === 'development'}
						/>
						{article.hero_image_url && <div className={styles.heroShade} />}
						<div className={styles.detailHeroCopy}>
							<h1>{article.title}</h1>
							<p>{article.excerpt}</p>
						</div>
					</header>
					<div className={`${styles.articlePanel}`}>
						<section className={`${styles.articleIntro}`}>
							<Cover article={article} />
							<div>
								<h2>{article.content_title || article.title}</h2>
								<p>
									{intro.startsWith(introLabel) ? (
										<>
											<strong>{introLabel}</strong>
											{intro.slice(introLabel.length)}
										</>
									) : (
										intro
									)}
								</p>
							</div>
						</section>
						<div className={`${styles.articleBody}`} dangerouslySetInnerHTML={{ __html: article.body_html }} />
						<Link href="/press" className={styles.back}>
							← Tous les articles
						</Link>
					</div>
				</article>
				<div>
					<PressBrands />
					<section className={styles.contact}>
						<h2>Donnons vie à votre projet d’intérieur</h2>
						<Link href="/#contact" className={siteStyles.filledButton}>
							Contactez-nous
						</Link>
					</section>
				</div>
			</main>
			<SiteFooter settings={settings} />
		</div>
	);
}
