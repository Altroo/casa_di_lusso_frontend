import { render, screen, within } from '@testing-library/react';
import ServicePageView from './servicePages';
import { servicePages } from '@/data/services';
import { fallbackContent } from '@/data/fallbackContent';

describe('Design intérieur page', () => {
	it('preserves the approved sections, French copy and all nine photographs', () => {
		render(<ServicePageView service={servicePages[0]} settings={fallbackContent.settings} />);
		const main = screen.getByRole('main');
		expect(main).toHaveClass('design');
		expect(main.querySelectorAll(':scope > section')).toHaveLength(4);
		expect(within(main).getByRole('heading', { level: 1 })).toHaveTextContent('Design intérieur de luxe');
		expect(main.querySelector('.heroCopy p')?.textContent?.replace(/\s+/g, ' ')).toBe(servicePages[0].description);
		expect(within(main).getAllByRole('img')).toHaveLength(9);
		for (const title of [
			'NOUS SAVONS TRÈS BIEN CE QU’IL FAUT FAIRE',
			'NOTRE APPROCHE',
			'POUR QUI ?',
			'RÉSULTAT ATTENDU',
			'NOS PROJETS',
		]) {
			expect(within(main).getByRole('heading', { name: title })).toBeInTheDocument();
		}
	});
	it('keeps the contact and portfolio links without inventing expandable content', () => {
		render(<ServicePageView service={servicePages[0]} settings={fallbackContent.settings} />);
		const main = within(screen.getByRole('main'));
		expect(main.getByRole('link', { name: 'Parlons de votre projet' })).toHaveAttribute('href', '/#contact');
		expect(main.getByRole('link', { name: /VOIR PLUS/ })).toHaveAttribute('href', '/#portfolio');
		expect(main.queryByRole('button')).not.toBeInTheDocument();
	});
});

describe('Architecture page', () => {
	it('keeps keyboard browsing and exposes project navigation buttons', () => {
		render(<ServicePageView service={servicePages[1]} settings={fallbackContent.settings} />);
		const main = within(screen.getByRole('main'));
		const carousel = main.getByRole('region', { name: 'Projets d’architecture' });
		expect(carousel).toHaveAttribute('tabindex', '0');
		expect(within(carousel).getAllByRole('article')).toHaveLength(3);
		expect(main.getByRole('button', { name: 'Projet suivant' })).toBeInTheDocument();
		expect(main.queryByText('Glisser')).not.toBeInTheDocument();
	});
});

describe('Aménagement page', () => {
	const originalMatchMedia = window.matchMedia;
	beforeEach(() => {
		window.matchMedia = jest.fn().mockReturnValue({ matches: true });
	});
	afterEach(() => {
		window.matchMedia = originalMatchMedia;
	});
	it('keeps the Figma option rows static and the approved contact buttons', () => {
		render(<ServicePageView service={servicePages[2]} settings={fallbackContent.settings} />);
		const main = within(screen.getByRole('main'));
		const options = main.getByRole('list', { name: 'Aménagements intérieurs' });
		expect(within(options).getAllByRole('listitem')).toHaveLength(2);
		expect(within(options).queryByRole('button')).not.toBeInTheDocument();
		expect(options.querySelector('details')).not.toBeInTheDocument();
		expect(main.getByRole('link', { name: 'Démarrer votre projet' })).toHaveAttribute('href', '/#contact');
		expect(main.getByRole('link', { name: 'Voir plus' })).toHaveAttribute('href', '/#contact');
		expect(main.getByRole('button', { name: 'Témoignage suivant' })).toBeInTheDocument();
	});
});
