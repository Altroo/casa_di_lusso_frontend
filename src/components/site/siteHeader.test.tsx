import { fireEvent, render, screen } from '@testing-library/react';
import SiteHeader from './siteHeader';
import { servicePages } from '@/data/services';

describe('service navigation', () => {
	it('exposes the three service routes and identifies the current page', () => {
		render(<SiteHeader variant="design" activeSlug="design-interieur-de-luxe" />);
		const toggle = screen.getByRole('button', { name: 'Afficher les services' });
		expect(toggle).toHaveAttribute('aria-expanded', 'false');
		fireEvent.click(toggle);
		for (const service of servicePages) {
			expect(screen.getByRole('link', { name: service.title })).toHaveAttribute('href', `/services/${service.slug}`);
		}
		expect(screen.getByRole('link', { name: servicePages[0].title })).toHaveAttribute('aria-current', 'page');
		fireEvent.keyDown(window, { key: 'Escape' });
		expect(toggle).toHaveAttribute('aria-expanded', 'false');
		expect(toggle).toHaveFocus();
	});

	it('closes both mobile menu levels with Escape and restores scrolling', () => {
		render(<SiteHeader />);
		fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));
		expect(document.body.style.overflow).toBe('hidden');
		fireEvent.click(screen.getByRole('button', { name: 'Afficher les services' }));
		fireEvent.keyDown(window, { key: 'Escape' });
		expect(screen.getByRole('button', { name: 'Fermer le menu' })).toHaveAttribute('aria-expanded', 'true');
		fireEvent.keyDown(window, { key: 'Escape' });
		expect(screen.getByRole('button', { name: 'Ouvrir le menu' })).toHaveAttribute('aria-expanded', 'false');
		expect(document.body.style.overflow).toBe('');
	});
});
