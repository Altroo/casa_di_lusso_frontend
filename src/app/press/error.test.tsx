import { fireEvent, render, screen } from '@testing-library/react';
import PressError from './error';

it('retries the failed press request and keeps a route back to the site', () => {
	const retry = jest.fn();
	render(<PressError retry={retry} />);
	fireEvent.click(screen.getByRole('button', { name: 'Réessayer' }));
	expect(retry).toHaveBeenCalledTimes(1);
	expect(screen.getByRole('link', { name: 'Retour à l’accueil' })).toHaveAttribute('href', '/');
});
