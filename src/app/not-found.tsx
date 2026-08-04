import Link from 'next/link';

export default function NotFound() {
	return (
		<main
			style={{
				minHeight: '100vh',
				display: 'grid',
				placeItems: 'center',
				padding: '32px',
				textAlign: 'center',
			}}
		>
			<div>
				<p style={{ margin: 0, fontSize: '72px', fontWeight: 300 }}>404</p>
				<h1>Page introuvable</h1>
				<p>La page que vous cherchez n’existe pas ou a été déplacée.</p>
				<Link href="/" style={{ display: 'inline-block', marginTop: '20px', paddingBottom: '5px', borderBottom: '1px solid' }}>
					Retour à l’accueil
				</Link>
			</div>
		</main>
	);
}
