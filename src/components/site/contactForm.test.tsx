import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './contactForm';

describe('ContactForm', () => {
	afterEach(() => {
		jest.restoreAllMocks();
		Reflect.deleteProperty(globalThis, 'fetch');
	});

	it('shows accessible validation messages before sending', async () => {
		const user = userEvent.setup();
		render(<ContactForm />);

		await user.click(screen.getByRole('button', { name: 'ENVOYER LA DEMANDE' }));

		expect(screen.getByText('Saisissez votre nom complet.')).toBeInTheDocument();
		expect(screen.getByText('Saisissez une adresse e-mail valide.')).toBeInTheDocument();
		expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
	});

	it('sends valid form data and confirms success', async () => {
		const request = jest.fn().mockResolvedValue({ ok: true });
		Object.defineProperty(globalThis, 'fetch', { configurable: true, writable: true, value: request });
		const user = userEvent.setup();
		render(<ContactForm />);

		await user.type(screen.getByLabelText('Nom complet'), 'Service IT');
		await user.type(screen.getByLabelText('Email'), 'service-it@casadilusso.ma');
		await user.type(screen.getByLabelText('Téléphone'), '+212600000000');
		await user.type(screen.getByLabelText('Message'), 'Projet de showroom');
		await user.click(screen.getByRole('button', { name: 'ENVOYER LA DEMANDE' }));

		expect(await screen.findByRole('status')).toHaveTextContent('Votre demande a bien été envoyée.');
		expect(request).toHaveBeenCalledTimes(1);
		expect(request.mock.calls[0]?.[1]).toMatchObject({ method: 'POST' });
	});
});
