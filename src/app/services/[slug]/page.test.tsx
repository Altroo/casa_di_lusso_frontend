import { render, screen } from '@testing-library/react';
import ServiceRoute, { generateMetadata, generateStaticParams } from './page';
import { servicePages, serviceLink } from '@/data/services';

jest.mock('@/utils/websiteApi', () => ({
	fetchSiteContent: jest.fn(async () => ({ settings: { brand_name: 'Casa di Lusso' } })),
}));
jest.mock('next/navigation', () => ({
	notFound: () => {
		throw new Error('NEXT_NOT_FOUND');
	},
}));
jest.mock('@/components/site/servicePages', () => ({
	__esModule: true,
	default: ({ service }: { service: { title: string } }) => <h1>{service.title}</h1>,
}));

describe('service pages', () => {
	it('prebuilds only the three requested routes', () => {
		expect(generateStaticParams()).toEqual(servicePages.map(({ slug }) => ({ slug })));
	});

	it.each(servicePages)('renders $title with its own canonical metadata', async (service) => {
		const params = Promise.resolve({ slug: service.slug });
		render(await ServiceRoute({ params }));
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(service.title);
		expect(await generateMetadata({ params })).toMatchObject({
			title: service.title,
			alternates: { canonical: `/services/${service.slug}` },
		});
		expect(serviceLink(service.title)).toBe(`/services/${service.slug}`);
	});

	it('rejects unknown services and leaves unrelated home service titles unlinked', async () => {
		await expect(ServiceRoute({ params: Promise.resolve({ slug: 'blog' }) })).rejects.toThrow('NEXT_NOT_FOUND');
		expect(serviceLink('Mobilier & luminaires')).toBeUndefined();
	});
});
