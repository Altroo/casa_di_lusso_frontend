import { render } from '@testing-library/react';
import { fallbackContent } from '@/data/fallbackContent';
import { servicePages } from '@/data/services';
import type { PressArticleDetail } from '@/utils/pressApi';
import SiteHeader from './siteHeader';
import SiteFooter from './siteFooter';
import ServicePageView from './servicePages';
import { PressList, PressDetail } from './pressPages';

jest.mock('./animatedMetricValue', () => ({ __esModule: true, default: () => null }));

const settings = fallbackContent.settings;
const article: PressArticleDetail = {
	id: 1, title: 'Article de test', slug: 'article-de-test', categories: [], excerpt: 'Résumé',
	image_url: '', image_alt: '', published_at: '2026-09-08T10:00:00Z', updated_at: '2026-09-08T10:00:00Z',
	is_featured: false, content_title: '', introduction: '', body_html: '<p>Contenu</p>', hero_image_url: '',
};

describe('shared index navbar and footer', () => {
	it.each([undefined, 'design', 'architecture', 'bespoke', 'press'] as const)(
		'keeps identical header markup and a fixed-header spacer for %s', (variant) => {
			const { container, unmount } = render(<SiteHeader variant={variant} />);
			const header = container.querySelector('header')!;
			expect(header.className).toBe('header');
			expect(header).not.toHaveAttribute('data-variant');
			expect(header.parentElement?.className).toBe('headerSpace');
			expect(header.querySelector('nav')?.className.trim()).toBe('nav');
			unmount();
		},
	);

	it.each([
		...servicePages.map(service => ({ name: service.slug, page: <ServicePageView service={service} settings={settings} /> })),
		{ name: 'press-list', page: <PressList articles={[]} categories={[]} settings={settings} /> },
		{ name: 'press-detail', page: <PressDetail article={article} settings={settings} /> },
	])('matches the index footer and isolates chrome from $name content styles', ({ page }) => {
		const reference = render(<SiteFooter settings={settings} />);
		const footerHtml = reference.container.innerHTML;
		reference.unmount();
		const { container } = render(page);
		const footer = container.querySelector('[data-footer-identity]')!.closest('footer')!;
		expect(footer.outerHTML).toBe(footerHtml);
		expect(container.querySelector('main [data-site-header]')).toBeNull();
		expect(container.querySelector('main [data-footer-identity]')).toBeNull();
	});
});
