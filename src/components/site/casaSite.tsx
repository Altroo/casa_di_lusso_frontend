'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import Image from 'next/image';
import type { CasaSiteProps } from '@/types/componentTypes';
import { heroSlides, topBrandMarks, valueIcons, heroWordmark, partnerMarks, portfolioImages } from '@/data/rawData';
import ContactForm from './contactForm';
import SiteHeader from './siteHeader';
import SiteFooter from './siteFooter';
import AnimatedMetricValue from './animatedMetricValue';
import { serviceLink } from '@/data/services';
import styles from './site.module.sass';

const sectionImage = (apiImage: string, fallback: string) => apiImage || fallback;

export default function CasaSite({ content }: CasaSiteProps) {
	const [heroIndex, setHeroIndex] = useState(0);
	const [heroAutoplayEnabled, setHeroAutoplayEnabled] = useState(false);
	const [heroAutoplayRevision, setHeroAutoplayRevision] = useState(0);
	const [mapStarted, setMapStarted] = useState(false);
	const touchStartX = useRef<number | null>(null);
	const heroAutoplayTimer = useRef<number | null>(null);
	const heroUnlockTimer = useRef<number | null>(null);
	const heroAutomaticGuardTimer = useRef<number | null>(null);
	const heroTransitionLocked = useRef(false);
	const heroAutomaticTransitionActive = useRef(false);
	const { settings } = content;

	const stopHeroAutoplay = () => {
		if (heroAutoplayTimer.current !== null) {
			window.clearTimeout(heroAutoplayTimer.current);
			heroAutoplayTimer.current = null;
		}
	};
	const transitionHero = (nextIndex: (current: number) => number) => {
		if (heroTransitionLocked.current) return false;
		heroTransitionLocked.current = true;
		setHeroIndex(nextIndex);
		if (heroUnlockTimer.current !== null) window.clearTimeout(heroUnlockTimer.current);
		heroUnlockTimer.current = window.setTimeout(() => {
			heroTransitionLocked.current = false;
			heroUnlockTimer.current = null;
		}, 780);
		return true;
	};
	const changeHero = (direction: -1 | 1) => {
		setHeroAutoplayEnabled(true);
		stopHeroAutoplay();
		if (!heroAutomaticTransitionActive.current) {
			transitionHero((current) => (current + direction + heroSlides.length) % heroSlides.length);
		}
		setHeroAutoplayRevision((revision) => revision + 1);
	};
	const advanceHeroAutomatically = useEffectEvent(() => {
		transitionHero((current) => (current + 1) % heroSlides.length);
	});
	useEffect(() => {
		if (!heroAutoplayEnabled) return;
		if (heroAutoplayTimer.current !== null) window.clearTimeout(heroAutoplayTimer.current);
		heroAutoplayTimer.current = window.setTimeout(() => {
			heroAutoplayTimer.current = null;
			heroAutomaticTransitionActive.current = true;
			if (heroAutomaticGuardTimer.current !== null) window.clearTimeout(heroAutomaticGuardTimer.current);
			heroAutomaticGuardTimer.current = window.setTimeout(() => {
				heroAutomaticTransitionActive.current = false;
				heroAutomaticGuardTimer.current = null;
			}, 2000);
			advanceHeroAutomatically();
		}, 5000);

		return () => {
			if (heroAutoplayTimer.current !== null) window.clearTimeout(heroAutoplayTimer.current);
			heroAutoplayTimer.current = null;
		};
	}, [heroAutoplayEnabled, heroAutoplayRevision, heroIndex]);

	useEffect(
		() => () => {
			if (heroUnlockTimer.current !== null) window.clearTimeout(heroUnlockTimer.current);
			if (heroAutomaticGuardTimer.current !== null) window.clearTimeout(heroAutomaticGuardTimer.current);
		},
		[],
	);

	return (
		<main className={styles.site}>
			<SiteHeader />
			<section id="accueil" className={styles.hero} data-node-id="2379:7052">
				<div className={styles.heroSlides} style={{ transform: `translateX(-${heroIndex * 100}%)` }}>
					{heroSlides.map((slide, index) => (
						<div className={styles.heroSlide} key={slide.src} aria-hidden={index !== heroIndex}>
							<Image
								src={slide.src}
								alt={index === heroIndex ? slide.alt : ''}
								fill
								preload={index === 0}
								fetchPriority={index === 0 ? 'high' : 'auto'}
								sizes={slide.sizes}
								quality={70}
								className={styles.coverImage}
							/>
						</div>
					))}
				</div>
				<div
					className={styles.heroGestureArea}
					onTouchStart={(event) => {
						setHeroAutoplayEnabled(true);
						stopHeroAutoplay();
						touchStartX.current = event.touches[0]?.clientX ?? null;
					}}
					onTouchEnd={(event) => {
						if (touchStartX.current === null) return;
						const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
						if (Math.abs(distance) > 45) changeHero(distance > 0 ? -1 : 1);
						else setHeroAutoplayRevision((revision) => revision + 1);
						touchStartX.current = null;
					}}
				/>
				<div className={styles.heroCopy}>
					<div className={styles.wordmarkArt} role="img" aria-label={settings.hero_eyebrow}>
						{heroWordmark.map((letter) => (
							<span
								key={`${letter.src}-${letter.left}`}
								style={{ left: letter.left, width: letter.width, height: letter.height }}
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
							nos services
						</a>
					</div>
				</div>
				<div className={styles.heroArrows}>
					<button
						type="button"
						className={styles.arrowPrevious}
						onPointerDown={stopHeroAutoplay}
						onClick={() => changeHero(-1)}
						aria-label="Image précédente"
					>
						<Image src="/assets/casa/figma/arrow-left.svg" alt="" width={44} height={8} />
					</button>
					<button
						type="button"
						onPointerDown={stopHeroAutoplay}
						onClick={() => changeHero(1)}
						aria-label="Image suivante"
					>
						<Image src="/assets/casa/figma/arrow-right.svg" alt="" width={44} height={8} />
					</button>
				</div>
			</section>
			<div className={styles.heroPagination} aria-hidden="true">
				{heroSlides.map((slide, index) => (
					<span key={slide.src} className={index === heroIndex ? styles.heroDotActive : ''} />
				))}
			</div>
			<div className={styles.brandStrip} aria-label="Marques partenaires">
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
			</div>
			<section id="a-propos" className={styles.about} data-node-id="2358:444">
				<div className={styles.aboutImage}>
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
			<section className={styles.values}>
				<Image
					src={sectionImage(settings.values_background_url, '/assets/casa/values.jpg')}
					alt=""
					fill
					sizes="(max-width: 1440px) 100vw, 1440px"
					className={styles.valuesBackdrop}
				/>
				{content.values.map((value) => (
					<article key={value.id} className={styles.valueItem}>
						<span>
							<Image src={valueIcons[value.icon] ?? valueIcons.design} alt="" width={82} height={76} />
						</span>
						<h3>{value.title}</h3>
					</article>
				))}
			</section>
			<section className={styles.project}>
				<h2>{settings.project_title}</h2>
				<div className={styles.projectCollage}>
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
				{portfolioImages.map((item, index) => {
					const spansTwoColumns = index === 0 || index === 5;

					return (
						<article className={`${styles.portfolioItem} ${styles[`portfolioItem${index + 1}`] ?? ''}`} key={item.src}>
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
					<h2>NOS PARTENAIRES</h2>
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
						DOWNLOAD CATALOG
					</a>
				</div>
			</section>
			<section className={styles.video} aria-label="Présentation animée Casa di Lusso">
				<div className={styles.videoPlayer}>
					<Image
						src="/assets/casa/promo-video-cdl.gif"
						alt="Présentation animée Casa di Lusso"
						fill
						unoptimized
						sizes="100vw"
						className={styles.videoGif}
					/>
				</div>
			</section>
			<section className={styles.testimonials}>
				<header className={styles.sectionHeader}>
					<h2>témoignage des clients</h2>
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
					<h2>CONTACTEZ-NOUS</h2>
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
								/>
							</>
						)}
					</div>
				</div>
			</section>
			<SiteFooter settings={settings} />
		</main>
	);
}
