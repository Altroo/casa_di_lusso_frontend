'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { SiteContent } from '@/types/websiteTypes';
import ContactForm from './contactForm';
import NewsletterForm from './newsletterForm';
import styles from './site.module.sass';

interface CasaSiteProps {
	content: SiteContent;
}

function MenuIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M3 6h18M3 12h18M3 18h18" />
		</svg>
	);
}

function CloseIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="m5 5 14 14M19 5 5 19" />
		</svg>
	);
}

function PhoneIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M7.2 3.5 4.5 4.7c-.8.4-.9 1.2-.7 2.1 1.5 6.4 6 10.9 12.4 12.4.9.2 1.7.1 2.1-.7l1.2-2.7-4.2-2-1.3 2c-2.5-1.1-4.7-3.3-5.8-5.8l2-1.3-2-4.2Z" />
		</svg>
	);
}

function EmailIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<rect x="3" y="5" width="18" height="14" rx="1" />
			<path d="m4 7 8 6 8-6" />
		</svg>
	);
}

function LinkedInIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M6.4 8.4V18M6.4 5.5v.1M10.5 18v-5.3c0-2.4 4.1-2.6 4.1.2V18M10.5 9.6v1.5" />
		</svg>
	);
}

function FacebookIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M14.6 20v-7h2.6l.4-3h-3V8.1c0-.9.3-1.6 1.6-1.6H18V3.8c-.4-.1-1.4-.2-2.5-.2-2.5 0-4.1 1.5-4.1 4.2V10H9v3h2.4v7" />
		</svg>
	);
}

function InstagramIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<rect x="4" y="4" width="16" height="16" rx="4" />
			<circle cx="12" cy="12" r="3.5" />
			<circle cx="17.3" cy="6.8" r=".7" className={styles.socialFill} />
		</svg>
	);
}

function YouTubeIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<rect x="3" y="6" width="18" height="12" rx="3" />
			<path d="m10 9 5 3-5 3Z" className={styles.socialFill} />
		</svg>
	);
}

function PinterestIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M9.7 20.5c.8-2.2 1.2-3.4 1.6-5.2-.8-1.3-.1-3.9 1.2-3.9 1 0 1.3.8 1.3 1.6 0 1-.7 2.6-1 3.9-.4 1.7.9 3 2.5 3 3 0 5-3.1 5-7.2 0-3.8-3.1-6.7-7.7-6.7-5.5 0-8.8 4-8.8 8.2 0 3 1.2 5.3 3.7 6.2" />
		</svg>
	);
}

function AnimatedMetricValue({ value }: { value: string }) {
	const elementRef = useRef<HTMLElement>(null);
	const target = Number.parseInt(value.match(/\d+/)?.[0] ?? '0', 10);
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const element = elementRef.current;
		if (!element || target <= 0) return;
		let animationFrame = 0;
		let started = false;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			animationFrame = window.requestAnimationFrame(() => setCurrent(target));
			return () => window.cancelAnimationFrame(animationFrame);
		}

		const startAnimation = () => {
			if (started) return;
			started = true;
			observer.disconnect();
			window.removeEventListener('scroll', checkVisibility);
			const startedAt = performance.now();
			const duration = 1200;
			const animate = (now: number) => {
				const progress = Math.min(Math.max((now - startedAt) / duration, 0), 1);
				const eased = 1 - Math.pow(1 - progress, 3);
				setCurrent(Math.round(target * eased));
				if (progress < 1) animationFrame = window.requestAnimationFrame(animate);
			};
			animationFrame = window.requestAnimationFrame(animate);
		};
		const checkVisibility = () => {
			const rect = element.getBoundingClientRect();
			if (rect.top < window.innerHeight && rect.bottom > 0) startAnimation();
		};
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) startAnimation();
			},
			{ threshold: 0.2 },
		);

		observer.observe(element);
		window.addEventListener('scroll', checkVisibility, { passive: true });
		animationFrame = window.requestAnimationFrame(checkVisibility);
		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', checkVisibility);
			window.cancelAnimationFrame(animationFrame);
		};
	}, [target]);

	return (
		<strong ref={elementRef} aria-label={value}>
			[ {current} +]
		</strong>
	);
}

const topBrandMarks = [
	{ src: '/assets/casa/figma/brand-effe.svg', alt: 'effe' },
	{ src: '/assets/casa/figma/brand-arredo3.svg', alt: 'Arredo3 Cucine' },
	{ src: '/assets/casa/figma/brand-jacuzzi.png', alt: 'Jacuzzi' },
	{ src: '/assets/casa/figma/brand-jacuzzi.svg', alt: 'Bonaldo' },
	{ src: '/assets/casa/figma/brand-bonaldo.svg', alt: 'Poliform' },
	{ src: '/assets/casa/figma/partner-gessi.png', alt: 'Giessegi' },
	{ src: '/assets/casa/figma/partner-bomma.png', alt: 'Loommo' },
	{ src: '/assets/casa/figma/partner-flaminia.png', alt: 'Flaminia' },
	{ src: '/assets/casa/figma/group60.svg', alt: 'Gessi' },
	{ src: '/assets/casa/figma/partner-henry-glass.png', alt: 'HenryGlass' },
	{ src: '/assets/casa/figma/partner-marazzi.png', alt: 'Marazzi' },
];

const valueIcons = {
	design: '/assets/casa/figma/value-design.svg',
	bespoke: '/assets/casa/figma/value-bespoke.svg',
	quality: '/assets/casa/figma/value-quality.svg',
	support: '/assets/casa/figma/value-support.svg',
} as const;

const heroWordmark = [
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

const partnerMarks = [
	{ src: '/assets/casa/figma/brand-effe.svg', alt: 'effe' },
	{ src: '/assets/casa/figma/brand-arredo3.svg', alt: 'Arredo3 Cucine' },
	{ src: '/assets/casa/figma/brand-jacuzzi.png', alt: 'Jacuzzi' },
	{ src: '/assets/casa/figma/brand-jacuzzi.svg', alt: 'Bonaldo' },
	{ src: '/assets/casa/figma/brand-bonaldo.svg', alt: 'Poliform' },
	{ src: '/assets/casa/figma/group60.svg', alt: 'Gessi' },
	{ src: '/assets/casa/figma/partner-henry-glass.png', alt: 'HenryGlass' },
	{ src: '/assets/casa/figma/partner-marazzi.png', alt: 'Marazzi' },
	{ src: '/assets/casa/figma/partner-delta-light.png', alt: 'Delta Light' },
	{ src: '/assets/casa/figma/partner-gessi.png', alt: 'Giessegi' },
	{ src: '/assets/casa/figma/partner-bomma.png', alt: 'Loommo' },
	{ src: '/assets/casa/figma/partner-flaminia.png', alt: 'Flaminia' },
];

const portfolioImages = [
	{ src: '/assets/casa/partner-kali.jpg', alt: 'Cuisine Kali' },
	{ src: '/assets/casa/figma/portfolio-office.jpg', alt: 'Mobilier de bureau contemporain' },
	{ src: '/assets/casa/partner-fragments.jpg', alt: 'Luminaires Fragments' },
	{ src: '/assets/casa/figma/portfolio-drawer.jpg', alt: 'Détail de mobilier sur mesure' },
	{ src: '/assets/casa/partner-bomma.jpg', alt: 'Cuisine noire contemporaine' },
	{ src: '/assets/casa/figma/portfolio-living.png', alt: 'Aménagement de salon sur mesure' },
];

const sectionImage = (apiImage: string, fallback: string) => apiImage || fallback;

export default function CasaSite({ content }: CasaSiteProps) {
	const [menuOpen, setMenuOpen] = useState(false);
	const [heroIndex, setHeroIndex] = useState(0);
	const [heroAutoplayEnabled, setHeroAutoplayEnabled] = useState(false);
	const [heroAutoplayRevision, setHeroAutoplayRevision] = useState(0);
	const [videoStarted, setVideoStarted] = useState(false);
	const [mapStarted, setMapStarted] = useState(false);
	const touchStartX = useRef<number | null>(null);
	const heroAutoplayTimer = useRef<number | null>(null);
	const heroUnlockTimer = useRef<number | null>(null);
	const heroAutomaticGuardTimer = useRef<number | null>(null);
	const heroTransitionLocked = useRef(false);
	const heroAutomaticTransitionActive = useRef(false);
	const { settings } = content;
	const heroSlides = [
		{
			src: '/assets/casa/hero-showroom-main.jpg',
			alt: 'Showroom Casa di Lusso encadré par les arbres',
		},
		{
			src: '/assets/casa/hero-lighting-pendants.jpg',
			alt: 'Luminaires suspendus en laiton',
		},
		{
			src: '/assets/casa/hero-delta-light.jpg',
			alt: 'Éclairage architectural Delta Light au crépuscule',
		},
		{
			src: '/assets/casa/hero-dark-interior.jpg',
			alt: 'Salle à manger contemporaine illuminée',
		},
		{
			src: '/assets/casa/hero-kitchen.jpg',
			alt: 'Cuisine contemporaine verte',
		},
		{
			src: '/assets/casa/hero-gessi-shower.jpg',
			alt: 'Salle de douche Gessi',
		},
	];

	const closeMenu = () => setMenuOpen(false);
	const stopHeroAutoplay = useCallback(() => {
		if (heroAutoplayTimer.current !== null) {
			window.clearTimeout(heroAutoplayTimer.current);
			heroAutoplayTimer.current = null;
		}
	}, []);
	const transitionHero = useCallback((nextIndex: (current: number) => number) => {
		if (heroTransitionLocked.current) return false;
		heroTransitionLocked.current = true;
		setHeroIndex(nextIndex);
		if (heroUnlockTimer.current !== null) window.clearTimeout(heroUnlockTimer.current);
		heroUnlockTimer.current = window.setTimeout(() => {
			heroTransitionLocked.current = false;
			heroUnlockTimer.current = null;
		}, 780);
		return true;
	}, []);
	const changeHero = (direction: -1 | 1) => {
		setHeroAutoplayEnabled(true);
		stopHeroAutoplay();
		if (!heroAutomaticTransitionActive.current) {
			transitionHero((current) => (current + direction + heroSlides.length) % heroSlides.length);
		}
		setHeroAutoplayRevision((revision) => revision + 1);
	};
	const scrollToTop = () => {
		const initialScroll = window.scrollY;
		const duration = 700;
		let startedAt: number | null = null;
		const animate = (timestamp: number) => {
			startedAt ??= timestamp;
			const progress = Math.min((timestamp - startedAt) / duration, 1);
			const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
			window.scrollTo(0, Math.round(initialScroll * (1 - eased)));
			if (progress < 1) window.requestAnimationFrame(animate);
		};
		window.requestAnimationFrame(animate);
	};
	const playVideo = () => {
		setVideoStarted(true);
	};

	useEffect(() => {
		if (!heroAutoplayEnabled) return;
		stopHeroAutoplay();
		heroAutoplayTimer.current = window.setTimeout(() => {
			heroAutoplayTimer.current = null;
			heroAutomaticTransitionActive.current = true;
			if (heroAutomaticGuardTimer.current !== null) window.clearTimeout(heroAutomaticGuardTimer.current);
			heroAutomaticGuardTimer.current = window.setTimeout(() => {
				heroAutomaticTransitionActive.current = false;
				heroAutomaticGuardTimer.current = null;
			}, 2000);
			transitionHero((current) => (current + 1) % heroSlides.length);
		}, 5000);

		return stopHeroAutoplay;
	}, [heroAutoplayEnabled, heroAutoplayRevision, heroIndex, heroSlides.length, stopHeroAutoplay, transitionHero]);

	useEffect(
		() => () => {
			if (heroUnlockTimer.current !== null) window.clearTimeout(heroUnlockTimer.current);
			if (heroAutomaticGuardTimer.current !== null) window.clearTimeout(heroAutomaticGuardTimer.current);
		},
		[],
	);

	useEffect(() => {
		if (!menuOpen) return;
		const previousOverflow = document.body.style.overflow;
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setMenuOpen(false);
		};
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', closeOnEscape);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', closeOnEscape);
		};
	}, [menuOpen]);

	return (
		<main className={styles.site}>
			<header className={styles.header}>
				<a href="#accueil" className={styles.logoLink} aria-label="Casa di Lusso — Accueil">
					<Image src="/assets/casa/logo.png" alt="Casa di Lusso" width={112} height={100} />
				</a>
				<nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Navigation principale">
					<a href="#a-propos" onClick={closeMenu}>
						À propos
					</a>
					<a href="#services" onClick={closeMenu}>
						services
					</a>
					<a href="#portfolio" onClick={closeMenu}>
						portfolio
					</a>
					<a href="#contact" onClick={closeMenu}>
						CONTACT
					</a>
				</nav>
				<button
					type="button"
					className={styles.menuButton}
					onClick={() => setMenuOpen((open) => !open)}
					aria-expanded={menuOpen}
					aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
				>
					{menuOpen ? <CloseIcon /> : <MenuIcon />}
				</button>
			</header>

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
								sizes="100vw"
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
					<p>{settings.hero_text}</p>
					<a href="#services" className={styles.textLink}>
						nos services
					</a>
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
							src={sectionImage(settings.project_image_url, '/assets/casa/partner-vby.jpg')}
							alt="Projet Casa di Lusso"
							fill
							sizes="(max-width: 700px) 100vw, (max-width: 1440px) 44vw, 590px"
							quality={70}
							className={styles.coverImage}
						/>
					</div>
					<div className={styles.projectTall}>
						<Image
							src="/assets/casa/partner-images-19.png"
							alt="Salon contemporain"
							fill
							sizes="(max-width: 700px) 100vw, 30vw"
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
						<article
							className={`${styles.portfolioItem} ${styles[`portfolioItem${index + 1}`] ?? ''}`}
							key={item.src}
						>
							<Image
								src={item.src}
								alt={item.alt}
								fill
								sizes={
									spansTwoColumns
										? '(max-width: 700px) 100vw, 50vw'
										: '(max-width: 700px) 100vw, 25vw'
								}
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
				<div className={styles.servicesGrid}>
					{content.services.map((service) => (
						<article key={service.id}>
							<h3>{service.title}</h3>
							<span />
							<p>{service.description}</p>
						</article>
					))}
				</div>
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
					<a
						className={styles.filledButton}
						href={settings.catalog_url || '#contact'}
						download={Boolean(settings.catalog_url)}
					>
						DOWNLOAD CATALOG
					</a>
				</div>
			</section>

			<section className={styles.video}>
				<div className={styles.videoPlayer}>
					{videoStarted ? (
						<iframe
							src="https://player.vimeo.com/video/1215215902?autoplay=1&badge=0&autopause=0&dnt=1&player_id=0&app_id=58479"
							title="PROMO VIDEO CDL"
							frameBorder="0"
							allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						/>
					) : (
						<>
							<Image
								src="/assets/casa/video.png"
								alt="Aperçu de la vidéo Casa di Lusso"
								fill
								sizes="100vw"
								className={styles.coverImage}
							/>
							<button
								type="button"
								className={styles.videoPlayButton}
								onClick={playVideo}
								aria-label="Lire la vidéo Casa di Lusso"
							>
								<span aria-hidden="true" />
							</button>
						</>
					)}
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

			<footer className={styles.footer}>
				<div className={styles.footerIdentity}>
					<p className={styles.footerWordmark}>CASA DI LUSSO</p>
					<address>{settings.address}</address>
					<a href={`tel:${settings.phone.replace(/\s/g, '')}`}>
						<PhoneIcon />
						{settings.phone}
					</a>
					<a href={`mailto:${settings.email}`}>
						<EmailIcon />
						{settings.email}
					</a>
				</div>
				<div className={styles.footerNewsletter}>
					<h2>abonnez-vous à notre newsletter</h2>
					<NewsletterForm />
					<div className={styles.socials}>
						<a href={settings.linkedin_url || '#'} aria-label="LinkedIn">
							<LinkedInIcon />
						</a>
						<a href={settings.facebook_url || '#'} aria-label="Facebook">
							<FacebookIcon />
						</a>
						<a href={settings.instagram_url || '#'} aria-label="Instagram">
							<InstagramIcon />
						</a>
						<a href="#" aria-label="YouTube">
							<YouTubeIcon />
						</a>
						<a href="#" aria-label="Pinterest">
							<PinterestIcon />
						</a>
					</div>
				</div>
				<div className={styles.footerBottom}>
					<p>Copyright {new Date().getFullYear()} © casadilusso</p>
					<button type="button" className={styles.backToTop} aria-label="Retour en haut" onClick={scrollToTop}>
						↑
					</button>
				</div>
			</footer>
		</main>
	);
}
