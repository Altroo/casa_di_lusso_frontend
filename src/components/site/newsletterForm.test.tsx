import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsletterForm from './newsletterForm';

describe('NewsletterForm', () => {
	afterEach(() => {
		jest.restoreAllMocks();
		Reflect.deleteProperty(globalThis, 'fetch');
	});

	it('submits a valid email and announces confirmation', async () => {
		const request = jest.fn().mockResolvedValue({ ok: true });
		Object.defineProperty(globalThis, 'fetch', { configurable: true, writable: true, value: request });
		const user = userEvent.setup();
		render(<NewsletterForm />);

		await user.type(screen.getByLabelText('Votre Email'), 'client@example.com');
		await user.click(screen.getByRole('button', { name: "S'abonner" }));

		expect(await screen.findByText('Inscription confirmée.')).toBeInTheDocument();
		expect(request).toHaveBeenCalledTimes(1);
	});
});
