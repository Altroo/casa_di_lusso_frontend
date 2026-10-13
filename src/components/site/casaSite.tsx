'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { CasaSiteProps } from '@/types/componentTypes';
import { topBrandMarks, serviceIcons, heroWordmark, partnerMarks, portfolioImages } from '@/data/rawData';
import ContactForm from './contactForm';
import SiteHeader from './siteHeader';
import SiteFooter from './siteFooter';
import AnimatedMetricValue from './animatedMetricValue';
import { serviceLink, servicePages } from '@/data/services';
import styles from './site.module.sass';

const sectionImage = (apiImage: string, fallback: string) => apiImage || fallback;

export default function CasaSite({ content }: CasaSiteProps) {
	const [mapStarted, setMapStarted] = useState(false);
	const [brandsPaused, setBrandsPaused] = useState(false);
	const { settings } = content;

	return (
		<main className={styles.site}>
			<SiteHeader />
			<section id="accueil" className={styles.hero} data-node-id="2379:7052">
				<div className={styles.heroImage}>
					<Image
						src="/assets/casa/hero-showroom-main.png"
						alt="Showroom Casa di Lusso encadré par les arbres"
						fill
						preload
						fetchPriority="high"
						sizes="100vw"
						quality={70}
						className={styles.coverImage}
					/>
				</div>
				<div className={styles.heroCopy}>
					<div className={styles.wordmarkArt} role="img" aria-label={settings.hero_eyebrow}>
						{heroWordmark.map((letter) => (
							<span
								key={`${letter.src}-${letter.left}`}
								style={{
									left: `${(letter.left / 462) * 100}%`,
									width: `${(letter.width / 462) * 100}%`,
									height: `${(letter.height / 43) * 100}%`,
								}}
							>
								<Image src={letter.src} alt="" width={letter.width} height={letter.height} />
							</span>
						))}
					</div>
					<h1>{settings.hero_title}</h1>
					<div className={styles.heroBody}>
						<p className={styles.heroDescription}>{settings.hero_text}</p>
						{settings.hero_tagline && <p className={styles.heroTagline}>{settings.hero_tagline}</p>}
						<a href="#services" className={styles.textLink}>
							Découvrir nos services
						</a>
					</div>
				</div>
			</section>
			<div className={styles.brandStrip} data-paused={brandsPaused} role="region" tabIndex={0} aria-label="Marques partenaires">
				<div className={styles.brandTrack}>
					{[0, 1].map((copy) => (
						<div className={styles.brandGroup} key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
							{topBrandMarks.map((brand) => (
								<div className={styles.brandMark} key={`${copy}-${brand.src}`}>
									<div className={styles.brandArtwork}>
										<Image
											src={brand.src}
											alt={copy === 0 ? brand.alt : ''}
											fill
											sizes="220px"
											className={styles.containImage}
										/>
									</div>
								</div>
							))}
						</div>
					))}
				</div>
				<button className={styles.brandPause} type="button" aria-pressed={brandsPaused} onClick={() => setBrandsPaused((paused) => !paused)}>
					{brandsPaused ? 'Reprendre le défilement' : 'Mettre le défilement en pause'}
				</button>
			</div>
			<section id="a-propos" className={styles.about} data-node-id="2358:444">
				<div className={styles.aboutImage} data-reveal>
					<Image
						src={sectionImage(settings.about_image_url, '/assets/casa/figma/about-exact-v2.jpg')}
						alt="Showroom Casa di Lusso"
						fill
						sizes="(max-width: 700px) 100vw, (max-width: 1440px) 37.5vw, 540px"
						quality={70}
						className={styles.coverImage}
					/>
				</div>
				<div className={styles.aboutCopy}>
					<h2>{settings.about_title}</h2>
					<div className={styles.headingLine} />
					{settings.about_text
						.split('\n')
						.map((paragraph, index) => paragraph && <p key={`${paragraph}-${index}`}>{paragraph}</p>)}
				</div>
			</section>
			<section className={styles.values} aria-label="Nos trois services">
				<Image
					src={sectionImage(settings.values_background_url, '/assets/casa/values.jpg')}
					alt=""
					fill
					sizes="(max-width: 1440px) 100vw, 1440px"
					className={styles.valuesBackdrop}
				/>
				{servicePages.map((service) => (
					<Link href={`/services/${service.slug}`} key={service.slug} className={styles.valueItem}>
						<span>
							<Image src={serviceIcons[service.kind]} alt="" width={56} height={56} />
						</span>
						<h3>{service.title}</h3>
					</Link>
				))}
			</section>
			<section className={styles.project}>
				<h2>{settings.project_title}</h2>
				<div className={styles.projectCollage} data-reveal>
					<div className={styles.projectWide}>
						<Image
							src="/assets/casa/services/project-overhead.png"
							alt="Chambre et dressing sur mesure vus de dessus"
							fill
							sizes="(max-width: 700px) 100vw, (max-width: 1440px) 50vw, 720px"
							quality={70}
							className={styles.coverImage}
						/>
					</div>
					<div className={styles.projectTall}>
						<Image
							src="/assets/casa/services/project-lighting.png"
							alt="Composition de luminaires dans le showroom Casa di Lusso"
							fill
							sizes="(max-width: 700px) 100vw, 68vw"
							quality={70}
							className={styles.coverImage}
						/>
					</div>
					<div className={styles.projectMobile}>
						<Image
							src="/assets/casa/figma/project-mobile.jpg"
							alt="Salon Casa di Lusso"
							fill
							sizes="(max-width: 700px) 100vw, 1px"
							className={styles.coverImage}
						/>
					</div>
				</div>
				<a href="#contact" className={styles.filledButton}>
					CONTACTEZ-NOUS
				</a>
			</section>
			<section className={styles.metrics} aria-label="Casa di Lusso en chiffres">
				{content.metrics.map((metric) => (
					<div key={metric.id}>
						<AnimatedMetricValue value={metric.value} />
						<span>{metric.title}</span>
					</div>
				))}
			</section>
			<section id="portfolio" className={styles.portfolio} aria-label="Portfolio Casa di Lusso">
				<h2 className={styles.portfolioHeading}>Portfolio</h2>
				<div className={styles.portfolioGrid}>
				{portfolioImages.map((item, index) => {
					const spansTwoColumns = index === 0 || index === 5;

					return (
						<article className={`${styles.portfolioItem} ${spansTwoColumns ? styles.portfolioWide : ''}`} key={item.src} data-reveal>
							<Image
								src={item.src}
								alt={item.alt}
								fill
								sizes={spansTwoColumns ? '(max-width: 700px) 100vw, 50vw' : '(max-width: 700px) 100vw, 25vw'}
								quality={70}
								className={styles.coverImage}
							/>
						</article>
					);
				})}
				</div>
			</section>
			<section id="services" className={styles.services}>
				<header className={styles.sectionHeader}>
					<h2>Nos services</h2>
					<span />
				</header>
				<div className={styles.servicesLead}>
					<h3>{settings.services_heading}</h3>
					<p>{settings.services_intro}</p>
				</div>
				<div className={styles.servicesGrid}>
					{content.services.map((service) => (
						<article key={service.id}>
							<h3>
								{serviceLink(service.title) ? <a href={serviceLink(service.title)}>{service.title}</a> : service.title}
							</h3>
							<span />
							<p>{service.description}</p>
						</article>
					))}
				</div>
				<p className={styles.servicesTagline}>{settings.services_tagline}</p>
			</section>
			<section className={styles.partners}>
				<header className={styles.sectionHeader}>
					<h2>Nos partenaires</h2>
					<span />
				</header>
				<p className={styles.partnersIntro}>{settings.partners_intro}</p>
				<div className={styles.partnerBand}>
					{partnerMarks.map((partner) => (
						<div className={styles.partnerLogo} key={partner.src}>
							<Image src={partner.src} alt={partner.alt} fill sizes="220px" className={styles.containImage} />
						</div>
					))}
				</div>
				<div className={styles.partnerBottom}>
					<p>{settings.partners_outro}</p>
					<a className={styles.filledButton} href="/catalogue">
						Découvrir le catalogue
					</a>
				</div>
			</section>
			<section className={styles.video} aria-label="Présentation animée Casa di Lusso">
				<div className={styles.videoPlayer}>
					<picture>
						<source media="(prefers-reduced-motion: reduce)" srcSet="/assets/casa/video.png" />
						<Image
							src="/assets/casa/promo-video-cdl.gif"
							alt="Présentation animée Casa di Lusso"
							fill
							unoptimized
							sizes="100vw"
							className={styles.videoGif}
						/>
					</picture>
				</div>
			</section>
			<section className={styles.testimonials}>
				<header className={styles.sectionHeader}>
					<h2>Témoignages des clients</h2>
					<span />
				</header>
				<div className={styles.testimonialGrid}>
					{content.testimonials.map((testimonial) => (
						<blockquote key={testimonial.id}>
							<span aria-hidden="true">“</span>
							<p>{testimonial.quote}</p>
							{testimonial.customer_name && <cite>{testimonial.customer_name}</cite>}
						</blockquote>
					))}
				</div>
			</section>
			<section id="contact" className={styles.contact}>
				<header className={styles.sectionHeader}>
					<h2>Contactez-nous</h2>
					<span />
				</header>
				<div className={styles.contactGrid}>
					<ContactForm />
					<div className={styles.mapFrame}>
						{mapStarted ? (
							<iframe
								src={settings.map_embed_url}
								title="Localisation Casa di Lusso"
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							/>
						) : (
							<>
								<Image
									src="/assets/casa/map.png"
									alt="Carte indiquant la localisation de Casa di Lusso à Tanger"
									fill
									sizes="(max-width: 700px) 100vw, 658px"
									className={styles.mapPoster}
								/>
								<button
									type="button"
									className={styles.mapActivator}
									onClick={() => setMapStarted(true)}
									aria-label="Afficher la carte Google Maps interactive"
								>
									<span>Afficher la carte interactive</span>
								</button>
							</>
						)}
					</div>
				</div>
			</section>
			<SiteFooter settings={settings} />
		</main>
	);
}
