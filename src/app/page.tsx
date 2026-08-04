import { type Metadata } from 'next';
import CasaSite from '@/components/site/casaSite';
import { fetchSiteContent } from '@/utils/websiteApi';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Casa di Lusso | Design intérieur et mobilier de luxe à Tanger',
		description:
			'Casa di Lusso conçoit des espaces d’exception et réunit les plus grandes marques de mobilier et de design à Tanger.',
		alternates: { canonical: '/' },
	};
}

const HomePage = async () => {
	const content = await fetchSiteContent();
	return <CasaSite content={content} />;
};

export default HomePage;
