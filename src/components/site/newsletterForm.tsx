'use client';

import { useState } from 'react';
import type { ComponentProps } from 'react';
import axios from 'axios';
import { publicWebsiteApi } from '@/utils/websiteApi';
import styles from './site.module.sass';

function NewsletterSendIcon() {
	return (
		<svg viewBox="0 0 128 128" role="presentation" focusable="false">
			<path d="M29 50 110 20 83 98 61 64 29 50Z" />
			<path d="m61 64 49-44" />
			<path d="m61 64 1 31 15-18" />
			<path d="M29 77 45 61" />
			<path d="M28 96 50 74" />
			<path d="M47 101 59 89" />
		</svg>
	);
}

export default function NewsletterForm() {
	const [email, setEmail] = useState('');
	const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

	const submit: NonNullable<ComponentProps<'form'>['onSubmit']> = async (event) => {
		event.preventDefault();
		setState('loading');
		try {
			await axios.post(`${publicWebsiteApi}/newsletter/`, { email });
			setEmail('');
			setState('success');
		} catch {
			setState('error');
		}
	};

	return (
		<form className={styles.newsletterForm} onSubmit={submit}>
			<div>
				<label htmlFor="newsletter-email">Votre Email</label>
				<input
					id="newsletter-email"
					type="email"
					placeholder=" "
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					required
					aria-describedby="newsletter-status"
				/>
				<button type="submit" aria-label="S'abonner" disabled={state === 'loading'}>
					<span className={styles.sendIcon} aria-hidden="true">
						<NewsletterSendIcon />
					</span>
				</button>
			</div>
			<span id="newsletter-status" aria-live="polite">
				{state === 'success' && 'Inscription confirmée.'}
				{state === 'error' && 'Impossible de vous inscrire pour le moment.'}
			</span>
		</form>
	);
}
