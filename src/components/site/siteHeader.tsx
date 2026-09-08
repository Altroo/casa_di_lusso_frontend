'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { servicePages, type ServicePage } from '@/data/services';
import styles from './site.module.sass';
import menuStyles from './siteHeader.module.sass';

export default function SiteHeader({ variant, activeSlug }: { variant?: ServicePage['kind'] | 'press'; activeSlug?: string }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const [servicesOpen, setServicesOpen] = useState(false);
	const menuButton = useRef<HTMLButtonElement>(null);
	const serviceButton = useRef<HTMLButtonElement>(null);
	const home = variant ? '/' : '';
	const closeMenu = () => {
		setMenuOpen(false);
		setServicesOpen(false);
	};

	useEffect(() => {
		if (!menuOpen) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previous;
		};
	}, [menuOpen]);

	useEffect(() => {
		if (!menuOpen && !servicesOpen) return;
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;
			if (servicesOpen) {
				setServicesOpen(false);
				serviceButton.current?.focus();
			} else {
				setMenuOpen(false);
				menuButton.current?.focus();
			}
		};
		window.addEventListener('keydown', closeOnEscape);
		return () => window.removeEventListener('keydown', closeOnEscape);
	}, [menuOpen, servicesOpen]);

	return (
		<header className={`${styles.header} ${menuStyles.header}`} data-variant={variant}>
			<a href={`${home}#accueil`} className={styles.logoLink} aria-label="Casa di Lusso — Accueil">
				<Image src="/assets/casa/logo.png" alt="Casa di Lusso" width={112} height={100} />
			</a>
			<nav
				id="site-navigation"
				className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
				aria-label="Navigation principale"
			>
				<a href={`${home}#a-propos`} onClick={closeMenu}>
					À propos
				</a>
				<div
					className={menuStyles.services}
					onPointerEnter={(event) => {
						if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 701px)').matches) setServicesOpen(true);
					}}
					onPointerLeave={(event) => {
						if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 701px)').matches)
							setServicesOpen(false);
					}}
					onBlur={(event) => {
						if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false);
					}}
				>
					<a href={`${home}#services`} onClick={closeMenu}>
						services
					</a>
					<button
						ref={serviceButton}
						type="button"
						className={menuStyles.toggle}
						aria-label="Afficher les services"
						aria-expanded={servicesOpen}
						aria-controls="service-navigation"
						onClick={() => setServicesOpen((open) => !open)}
					>
						<span />
					</button>
					<ul id="service-navigation" className={menuStyles.submenu} hidden={!servicesOpen}>
						{servicePages.map((service) => (
							<li key={service.slug}>
								<a
									href={`/services/${service.slug}`}
									aria-current={activeSlug === service.slug ? 'page' : undefined}
									onClick={closeMenu}
								>
									{service.title}
								</a>
							</li>
						))}
					</ul>
				</div>
				<a href={`${home}#portfolio`} onClick={closeMenu}>
					portfolio
				</a>
				<Link href="/press" aria-current={variant === 'press' ? 'page' : undefined} onClick={closeMenu}>
					Press
				</Link>
				<a href={`${home}#contact`} onClick={closeMenu}>
					CONTACT
				</a>
			</nav>
			<button
				ref={menuButton}
				type="button"
				className={styles.menuButton}
				onClick={() => {
					setMenuOpen((open) => !open);
					setServicesOpen(false);
				}}
				aria-expanded={menuOpen}
				aria-controls="site-navigation"
				aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
			>
				<svg
					viewBox="0 0 24 24"
					aria-hidden="true"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				>
					<path d={menuOpen ? 'm5 5 14 14M19 5 5 19' : 'M3 6h18M3 12h18M3 18h18'} />
				</svg>
			</button>
		</header>
	);
}
