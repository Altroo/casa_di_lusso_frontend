import { render, screen } from '@testing-library/react';
import NotFound from './not-found';

describe('NotFound', () => {
	it('shows a French-only link back to the public homepage', () => {
		render(<NotFound />);
		expect(screen.getByText('Page introuvable')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Retour à l’accueil' })).toHaveAttribute('href', '/');
	});
});
