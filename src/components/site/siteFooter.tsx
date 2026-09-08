'use client';

import type { SiteSettings } from '@/types/websiteTypes';
import NewsletterForm from './newsletterForm';
import styles from './site.module.sass';

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

export default function SiteFooter({
	settings,
}: {
	settings: SiteSettings;
}) {
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
	return (
		<footer className={styles.footer}>
			<div className={styles.footerIdentity} data-footer-identity>
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
			<div className={styles.footerNewsletter} data-footer-newsletter>
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
			<div className={styles.footerBottom} data-footer-bottom>
				<p>Copyright {new Date().getFullYear()} © casadilusso</p>
				<button type="button" className={styles.backToTop} aria-label="Retour en haut" onClick={scrollToTop}>
					↑
				</button>
			</div>
		</footer>
	);
}
