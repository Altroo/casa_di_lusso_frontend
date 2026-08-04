import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import HomePage, { generateMetadata } from './page';

const mockFetchSiteContent = jest.fn();

jest.mock('@/utils/websiteApi', () => ({
	fetchSiteContent: () => mockFetchSiteContent(),
}));

jest.mock('@/components/site/casaSite', () => ({
	__esModule: true,
	default: ({ content }: { content: { settings: { brand_name: string } } }) => (
		<div data-testid="casa-site">{content.settings.brand_name}</div>
	),
}));

describe('Casa di Lusso home page', () => {
	beforeEach(() => {
		mockFetchSiteContent.mockResolvedValue({ settings: { brand_name: 'Casa di Lusso' } });
	});

	it('renders the public website content', async () => {
		render((await HomePage()) as ReactElement);
		expect(screen.getByTestId('casa-site')).toHaveTextContent('Casa di Lusso');
		expect(mockFetchSiteContent).toHaveBeenCalledTimes(1);
	});

	it('publishes public SEO metadata', async () => {
		const metadata = await generateMetadata();
		expect(metadata.title).toContain('Casa di Lusso');
		expect(metadata.description).toContain('Tanger');
	});
});
