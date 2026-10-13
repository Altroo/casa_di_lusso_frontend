import { notFound } from 'next/navigation';
import ErrorPreview from './errorPreview';

export const metadata = { title: 'Aperçu de la page d’erreur', robots: { index: false, follow: false } };

export default function Preview() {
	if (process.env.NODE_ENV !== 'development') notFound();
	return <ErrorPreview />;
}
