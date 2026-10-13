import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import SiteHeader from './siteHeader';
import styles from './recoveryPage.module.sass';

export default function RecoveryPage({ code, title, children, action }: {
	code: string;
	title: string;
	children: ReactNode;
	action: ReactNode;
}) {
	return <>
		<SiteHeader variant="recovery" />
		<main className={styles.page}>
			<div className={styles.copy}>
				<p className={styles.eyebrow}>{code}</p>
				<h1>{title}</h1>
				<div className={styles.description}>{children}</div>
				<div className={styles.actions}>{action}</div>
			</div>
			<figure className={styles.image}>
				<Image src="/assets/casa/services/design-project1.jpg" alt="Salon lumineux et cuisine ouverte" fill preload sizes="(max-width: 768px) 100vw, 50vw" />
				<figcaption>Casa di Lusso · Design intérieur</figcaption>
			</figure>
			<nav className={styles.destinations} aria-label="Poursuivre votre visite">
				<Link href="/#services">Nos services <span aria-hidden="true">↗</span></Link>
				<Link href="/catalogue">Le catalogue <span aria-hidden="true">↗</span></Link>
				<Link href="/#contact">Parlons de votre projet <span aria-hidden="true">↗</span></Link>
			</nav>
		</main>
	</>;
}
