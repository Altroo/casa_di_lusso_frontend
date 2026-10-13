import Link from 'next/link';
import RecoveryPage from '@/components/site/recoveryPage';
import styles from '@/components/site/site.module.sass';

export default function NotFound() {
	return <RecoveryPage code="Erreur 404" title="Page introuvable"
		action={<Link href="/" className={styles.filledButton}>Retour à l’accueil</Link>}>
		<p>La page que vous cherchez n’existe pas ou a été déplacée. Retrouvez nos espaces et nos collections depuis l’accueil.</p>
	</RecoveryPage>;
}
