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
		expect(screen.getByRole('main')).not.toHaveClass('detailPage');
		unmount();
		render(<PressDetail article={article} settings={fallbackContent.settings} />);
		expect(screen.getByRole('main')).not.toHaveClass('listPage');
		expect(screen.getByRole('main')).toHaveClass('detailPage');
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
		expect(screen.getByRole('link', { name: 'Contactez-nous' })).toHaveClass('filledButton');
	});
	it('preserves managed detail text, line breaks, and rich HTML without inserting copy', () => {
		const introduction = 'Chez Casa di Lusso, un projet unique.\nDes matières authentiques.';
		const body_html = '<h3>Matériaux</h3><p>Une <strong>sélection</strong> sur mesure.</p><ul><li>Marbre</li></ul>';
		const { container } = render(<PressDetail article={{ ...article, introduction, body_html }} settings={fallbackContent.settings} />);
		expect(container.querySelector('.articleIntro p')?.textContent).toBe(introduction);
		expect(container.querySelector('.articleIntro strong')).toHaveTextContent('Chez Casa di Lusso');
		expect(container.querySelector('.articleBody')?.innerHTML).toBe(body_html);
		expect(screen.queryByText(/Tips choice|Lorem ipsum|Homco|Logo Ipsum/i)).not.toBeInTheDocument();
	});
	it('keeps optional-copy fallbacks and never invents an introductory label', () => {
		const { container } = render(<PressDetail article={{ ...article, content_title: '', introduction: '' }} settings={fallbackContent.settings} />);
		expect(screen.getByRole('heading', { level: 2, name: article.title })).toBeInTheDocument();
		expect(container.querySelector('.articleIntro p')?.textContent).toBe(article.excerpt);
		expect(container.querySelector('.articleIntro strong')).toBeNull();
	});
	it('preserves managed cover and hero images in the detail layout', () => {
		const { container, rerender } = render(<PressDetail article={article} settings={fallbackContent.settings} />);
		expect(screen.getByRole('img', { name: 'Robinet Gessi' }).parentElement).toHaveClass('cover');
		expect(container.querySelector('.heroShade')).toBeNull();
		rerender(<PressDetail article={{ ...article, image_url: '/media/press/new-project.jpg', hero_image_url: '/media/press/hero.jpg' }} settings={fallbackContent.settings} />);
		const coverSrc = screen.getByRole('img', { name: 'Robinet Gessi' }).getAttribute('src') ?? '';
		expect(new URL(coverSrc, 'http://localhost').searchParams.get('url')).toBe('/media/press/new-project.jpg');
		const heroSrc = container.querySelector('.detailHero img')?.getAttribute('src') ?? '';
		expect(new URL(heroSrc, 'http://localhost').searchParams.get('url')).toBe('/media/press/hero.jpg');
		expect(container.querySelector('.heroShade')).toBeInTheDocument();
	});
});
