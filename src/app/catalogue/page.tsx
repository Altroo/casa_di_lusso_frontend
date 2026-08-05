import type { Metadata } from 'next';
import CatalogueFlipbook from '@/components/catalogue/catalogueFlipbook';

export const metadata: Metadata = {
	title: 'Catalogue Casa di Lusso',
	description: 'Découvrez le catalogue interactif Casa di Lusso et téléchargez sa version PDF.',
	alternates: { canonical: '/catalogue' },
};

export default function CataloguePage() {
	return <CatalogueFlipbook />;
}
