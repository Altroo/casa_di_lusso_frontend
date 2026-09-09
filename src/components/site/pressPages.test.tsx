import { render, screen } from '@testing-library/react';
import { PressList, PressDetail } from './pressPages';
import { fallbackContent } from '@/data/fallbackContent';
import type { PressArticleDetail } from '@/utils/pressApi';

const category = { id: 1, title: 'Tendances déco', slug: 'tendances-deco' };
const article: PressArticleDetail = {
	id: 1, title: 'Vita Gessi Caffè', slug: 'vita-gessi-caffe', categories: [category], excerpt: 'Le design au quotidien.',
	image_url: '/assets/casa/services/bespoke-blog1.png', image_alt: 'Robinet Gessi',
	published_at: '2026-09-08T10:00:00Z', updated_at: '2026-09-08T10:00:00Z', is_featured: false,
	content_title: 'Une expérience de design', introduction: 'Une cuisine élégante.', body_html: '<p>Le contenu de l’article.</p>', hero_image_url: '',
};

describe('Press pages', () => {
	it('links each categorized article to its detail route', () => {
		render(<PressList articles={[article]} categories={[category]} settings={fallbackContent.settings} />);
		expect(screen.getByRole('heading', { name: 'Tendances déco' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Vita Gessi Caffè/ })).toHaveAttribute('href', '/press/vita-gessi-caffe');
	});
	it('does not fabricate posts when no articles have been published', () => {
		render(<PressList articles={[]} categories={[category]} settings={fallbackContent.settings} />);
		expect(screen.getByText('Nos prochaines actualités')).toBeInTheDocument();
		expect(screen.queryByText('Vita Gessi Caffè')).not.toBeInTheDocument();
	});
	it('limits the list design to the list page', () => {
		const { unmount } = render(<PressList articles={[article]} categories={[category]} settings={fallbackContent.settings} />);
		expect(screen.getByRole('main')).toHaveClass('listPage');
		unmount();
		render(<PressDetail article={article} settings={fallbackContent.settings} />);
		expect(screen.getByRole('main')).not.toHaveClass('listPage');
	});
	it('preserves editorial excerpt labels and line breaks without adding copy', () => {
		const excerpt = 'Vita Gessi Caffè: Un geste quotidien.\nUne expérience de design.';
		render(<PressList articles={[{ ...article, excerpt }]} categories={[category]} settings={fallbackContent.settings} />);
		const link = screen.getByRole('link', { name: /Vita Gessi Caffè/ });
		expect(link.querySelector('p')?.textContent).toBe(excerpt);
		expect(link.querySelector('strong')).toHaveTextContent('Vita Gessi Caffè:');
	});
	it('does not invent an excerpt label or apply Figma crops to other managed images', () => {
		render(<PressList articles={[{ ...article, image_url: '/media/press/new-project.jpg' }]} categories={[category]} settings={fallbackContent.settings} />);
		const link = screen.getByRole('link', { name: /Vita Gessi Caffè/ });
		expect(link.querySelector('p')?.textContent).toBe(article.excerpt);
		expect(link.querySelector('strong')).toBeNull();
		expect(link.querySelector('.cover')?.className).not.toMatch(/listCover[123]/);
	});
	it('renders managed detail copy, the return link, and the existing contact CTA', () => {
		render(<PressDetail article={article} settings={fallbackContent.settings} />);
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(article.title);
		expect(screen.getByText('Le contenu de l’article.')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: '← Tous les articles' })).toHaveAttribute('href', '/press');
		expect(screen.getByRole('link', { name: 'Contactez-nous' })).toHaveAttribute('href', '/#contact');
	});
});
