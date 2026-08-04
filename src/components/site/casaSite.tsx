'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import CloseIcon from '@mui/icons-material/Close';
import type { SiteContent } from '@/types/websiteTypes';
import ContactForm from './contactForm';
import NewsletterForm from './newsletterForm';
import styles from './site.module.sass';

interface CasaSiteProps {
	content: SiteContent;
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
		const observer = new IntersectionObserver(([entry]) => {
			if (entry?.isIntersecting) startAnimation();
		}, { threshold: 0.2 });

		observer.observe(element);
		window.addEventListener('scroll', checkVisibility, { passive: true });
		animationFrame = window.requestAnimationFrame(checkVisibility);
		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', checkVisibility);
			window.cancelAnimationFrame(animationFrame);
		};
	}, [target]);

	return <strong ref={elementRef} aria-label={value}>[ {current} +]</strong>;
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
	const [heroAutoplayRevision, setHeroAutoplayRevision] = useState(0);
	const [videoStarted, setVideoStarted] = useState(false);
	const touchStartX = useRef<number | null>(null);
	const videoFrameRef = useRef<HTMLIFrameElement>(null);
	const heroAutoplayTimer = useRef<number | null>(null);
	const heroUnlockTimer = useRef<number | null>(null);
	const heroAutomaticGuardTimer = useRef<number | null>(null);
	const videoReplayTimer = useRef<number | null>(null);
	const heroTransitionLocked = useRef(false);
	const heroAutomaticTransitionActive = useRef(false);
	const { settings } = content;
	const heroSlides = [
		sectionImage(settings.hero_image_url, '/assets/casa/figma/hero-exact.jpg'),
		'/assets/casa/figma/hero-slide-2.jpg',
		'/assets/casa/figma/hero-slide-3.jpg',
		'/assets/casa/figma/hero-slide-4.jpg',
		'/assets/casa/figma/hero-slide-5.jpg',
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
		stopHeroAutoplay();
		if (!heroAutomaticTransitionActive.current) {
			transitionHero((current) => (current + direction + heroSlides.length) % heroSlides.length);
		}
		setHeroAutoplayRevision((revision) => revision + 1);
	};
	const selectHero = (index: number) => {
		stopHeroAutoplay();
		if (!heroAutomaticTransitionActive.current) transitionHero(() => index);
		setHeroAutoplayRevision((revision) => revision + 1);
	};
	const scrollToTop = () => {
		const initialScroll = window.scrollY;
		const duration = 700;
		let startedAt: number | null = null;
		const animate = (timestamp: number) => {
			startedAt ??= timestamp;
			const progress = Math.min((timestamp - startedAt) / duration, 1);
			const eased = progress < 0.5
				? 4 * progress * progress * progress
				: 1 - Math.pow(-2 * progress + 2, 3) / 2;
			window.scrollTo(0, Math.round(initialScroll * (1 - eased)));
			if (progress < 1) window.requestAnimationFrame(animate);
		};
		window.requestAnimationFrame(animate);
	};
	const playVideo = () => {
		if (videoReplayTimer.current !== null) window.clearTimeout(videoReplayTimer.current);
		videoFrameRef.current?.contentWindow?.postMessage(
			JSON.stringify({ method: 'setCurrentTime', value: 0 }),
			'https://player.vimeo.com',
		);
		videoFrameRef.current?.contentWindow?.postMessage(
			JSON.stringify({ method: 'play' }),
			'https://player.vimeo.com',
		);
		setVideoStarted(true);
		videoReplayTimer.current = window.setTimeout(() => {
			setVideoStarted(false);
			videoReplayTimer.current = null;
		}, 15000);
	};

	useEffect(() => {
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
	}, [heroAutoplayRevision, heroIndex, heroSlides.length, stopHeroAutoplay, transitionHero]);

	useEffect(() => () => {
		if (heroUnlockTimer.current !== null) window.clearTimeout(heroUnlockTimer.current);
		if (heroAutomaticGuardTimer.current !== null) window.clearTimeout(heroAutomaticGuardTimer.current);
		if (videoReplayTimer.current !== null) window.clearTimeout(videoReplayTimer.current);
	}, []);

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
					<a href="#a-propos" onClick={closeMenu}>À propos</a>
					<a href="#services" onClick={closeMenu}>services</a>
					<a href="#portfolio" onClick={closeMenu}>portfolio</a>
					<a href="#contact" onClick={closeMenu}>CONTACT</a>
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
						<div className={styles.heroSlide} key={slide} aria-hidden={index !== heroIndex}>
							<Image
								src={slide}
								alt={index === heroIndex ? 'Intérieur raffiné Casa di Lusso' : ''}
								fill
								priority
								sizes="100vw"
								className={styles.coverImage}
							/>
						</div>
					))}
				</div>
				<div
					className={styles.heroGestureArea}
					onTouchStart={(event) => {
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
							<span key={`${letter.src}-${letter.left}`} style={{ left: letter.left, width: letter.width, height: letter.height }}>
								<Image src={letter.src} alt="" width={letter.width} height={letter.height} />
							</span>
						))}
					</div>
					<h1>{settings.hero_title}</h1>
					<p>{settings.hero_text}</p>
					<a href="#services" className={styles.textLink}>nos services</a>
				</div>
				<div className={styles.heroArrows}>
					<button type="button" className={styles.arrowPrevious} onPointerDown={stopHeroAutoplay} onClick={() => changeHero(-1)} aria-label="Image précédente">
						<Image src="/assets/casa/figma/arrow-left.svg" alt="" width={44} height={8} />
					</button>
					<button type="button" onPointerDown={stopHeroAutoplay} onClick={() => changeHero(1)} aria-label="Image suivante">
						<Image src="/assets/casa/figma/arrow-right.svg" alt="" width={44} height={8} />
					</button>
				</div>
			</section>
			<div className={styles.heroPagination} aria-label="Choisir une image du carrousel">
				{heroSlides.map((slide, index) => (
					<button
						type="button"
						key={slide}
						className={index === heroIndex ? styles.heroDotActive : ''}
						onPointerDown={stopHeroAutoplay}
						onClick={() => selectHero(index)}
						aria-label={`Afficher l’image ${index + 1}`}
						aria-current={index === heroIndex ? 'true' : undefined}
					/>
				))}
			</div>

			<div className={styles.brandStrip} aria-label="Marques partenaires">
				<div className={styles.brandTrack}>
					{[0, 1].map((copy) => (
						<div className={styles.brandGroup} key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
							{topBrandMarks.map((brand) => (
								<div className={styles.brandMark} key={`${copy}-${brand.src}`}>
									<div className={styles.brandArtwork}>
										<Image src={brand.src} alt={copy === 0 ? brand.alt : ''} fill sizes="220px" className={styles.containImage} />
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
						sizes="(max-width: 700px) 100vw, 536px"
						className={styles.coverImage}
					/>
				</div>
				<div className={styles.aboutCopy}>
					<h2>{settings.about_title}</h2>
					<div className={styles.headingLine} />
					{settings.about_text.split('\n').map((paragraph, index) => paragraph && <p key={`${paragraph}-${index}`}>{paragraph}</p>)}
				</div>
			</section>

			<section
				className={styles.values}
				style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.54), rgba(0,0,0,.54)), url("${sectionImage(settings.values_background_url, '/assets/casa/values.jpg')}")` }}
			>
				{content.values.map((value) => (
					<article key={value.id} className={styles.valueItem}>
						<span><Image src={valueIcons[value.icon] ?? valueIcons.design} alt="" width={82} height={76} /></span>
						<h3>{value.title}</h3>
					</article>
				))}
			</section>

			<section className={styles.project}>
				<h2>{settings.project_title}</h2>
				<div className={styles.projectCollage}>
					<div className={styles.projectWide}>
						<Image src={sectionImage(settings.project_image_url, '/assets/casa/partner-vby.jpg')} alt="Projet Casa di Lusso" fill sizes="50vw" className={styles.coverImage} />
					</div>
					<div className={styles.projectTall}>
						<Image src="/assets/casa/partner-images-19.png" alt="Salon contemporain" fill sizes="35vw" className={styles.coverImage} />
					</div>
					<div className={styles.projectMobile}>
						<Image src="/assets/casa/figma/project-mobile.jpg" alt="Salon Casa di Lusso" fill sizes="(max-width: 700px) 100vw, 1px" className={styles.coverImage} />
					</div>
				</div>
				<a href="#contact" className={styles.filledButton}>CONTACTEZ-NOUS</a>
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
				{portfolioImages.map((item, index) => (
					<article className={`${styles.portfolioItem} ${styles[`portfolioItem${index + 1}`] ?? ''}`} key={item.src}>
						<Image
							src={item.src}
							alt={item.alt}
							fill
							sizes="(max-width: 700px) 100vw, 50vw"
							className={styles.coverImage}
						/>
					</article>
				))}
			</section>

			<section id="services" className={styles.services}>
				<header className={styles.sectionHeader}><h2>Nos services</h2><span /></header>
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
				<header className={styles.sectionHeader}><h2>NOS PARTENAIRES</h2><span /></header>
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
					<a className={styles.filledButton} href={settings.catalog_url || '#contact'} download={Boolean(settings.catalog_url)}>DOWNLOAD CATALOG</a>
				</div>
			</section>

			<section className={styles.video}>
				<div className={styles.videoPlayer}>
					<iframe
						ref={videoFrameRef}
						src="https://player.vimeo.com/video/1215215902?badge=0&autopause=0&player_id=0&app_id=58479"
						title="PROMO VIDEO CDL"
						frameBorder="0"
						allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					/>
					{!videoStarted && (
						<button
							type="button"
							className={styles.videoPlayButton}
							onClick={playVideo}
							aria-label="Lire la vidéo Casa di Lusso"
						>
							<span aria-hidden="true" />
						</button>
					)}
				</div>
			</section>

			<section className={styles.testimonials}>
				<header className={styles.sectionHeader}><h2>témoignage des clients</h2><span /></header>
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
				<header className={styles.sectionHeader}><h2>CONTACTEZ-NOUS</h2><span /></header>
				<div className={styles.contactGrid}>
					<ContactForm />
					<div className={styles.mapFrame}>
						<iframe
							src={settings.map_embed_url}
							title="Localisation Casa di Lusso"
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				</div>
			</section>

			<footer className={styles.footer}>
				<div className={styles.footerIdentity}>
					<p className={styles.footerWordmark}>CASA DI LUSSO</p>
					<address>{settings.address}</address>
					<a href={`tel:${settings.phone.replace(/\s/g, '')}`}><PhoneOutlinedIcon />{settings.phone}</a>
					<a href={`mailto:${settings.email}`}><EmailOutlinedIcon />{settings.email}</a>
				</div>
				<div className={styles.footerNewsletter}>
					<h2>abonnez-vous à notre newsletter</h2>
					<NewsletterForm />
					<div className={styles.socials}>
						<a href={settings.linkedin_url || '#'} aria-label="LinkedIn"><LinkedInIcon /></a>
						<a href={settings.facebook_url || '#'} aria-label="Facebook"><FacebookOutlinedIcon /></a>
						<a href={settings.instagram_url || '#'} aria-label="Instagram"><InstagramIcon /></a>
						<a href="#" aria-label="YouTube"><YouTubeIcon /></a>
						<a href="#" aria-label="Pinterest"><PinterestIcon /></a>
					</div>
				</div>
				<div className={styles.footerBottom}>
					<p>Copyright {new Date().getFullYear()} © casadilusso</p>
					<button
						type="button"
						className={styles.backToTop}
						aria-label="Retour en haut"
						onClick={scrollToTop}
					>↑</button>
				</div>
			</footer>
		</main>
	);
}
