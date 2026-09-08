'use client';

import Link from 'next/link';
import styles from '@/components/site/pressPages.module.sass';
import siteStyles from '@/components/site/site.module.sass';

export default function PressError({ reset }: { reset: () => void }) {
	return <main className={styles.error}>
		<h1>Press</h1>
		<p>Les articles sont temporairement indisponibles. Veuillez réessayer dans quelques instants.</p>
		<button type="button" className={siteStyles.filledButton} onClick={reset}>Réessayer</button>
		<Link href="/">Retour à l’accueil</Link>
	</main>;
}
