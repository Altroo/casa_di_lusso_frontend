'use client';

import Link from 'next/link';
import { useTransition } from 'react';
import RecoveryPage from '@/components/site/recoveryPage';
import styles from '@/components/site/site.module.sass';

export default function PressError({ retry }: { retry: () => void }) {
	const [pending, startTransition] = useTransition();
	return <RecoveryPage code="Blog & actualités" title="Une interruption temporaire"
		action={<>
			<button type="button" className={styles.filledButton} disabled={pending} onClick={() => startTransition(retry)}>
				{pending ? 'Chargement…' : 'Réessayer'}
			</button>
			<Link href="/">Retour à l’accueil</Link>
		</>}>
		<p>Les articles sont temporairement indisponibles. Vous pouvez réessayer ou poursuivre votre visite.</p>
	</RecoveryPage>;
}
