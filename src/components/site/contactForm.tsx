'use client';

import { useState } from 'react';
import type { ComponentProps } from 'react';
import { publicWebsiteApi } from '@/utils/websiteApi';
import styles from './site.module.sass';

interface ContactValues {
	full_name: string;
	email: string;
	phone: string;
	message: string;
	website: string;
}
type ContactField = keyof ContactValues;

const initialValues: ContactValues = { full_name: '', email: '', phone: '', message: '', website: '' };

const fieldDefinitions: Array<{
	name: Exclude<ContactField, 'website'>;
	label: string;
	type: string;
	autoComplete: string;
}> = [
	{ name: 'full_name', label: 'Nom complet', type: 'text', autoComplete: 'name' },
	{ name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
	{ name: 'phone', label: 'Téléphone', type: 'tel', autoComplete: 'tel' },
	{ name: 'message', label: 'Message', type: 'text', autoComplete: 'off' },
];

export default function ContactForm() {
	const [values, setValues] = useState<ContactValues>(initialValues);
	const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
	const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

	const validate = (nextValues: ContactValues) => {
		const nextErrors: Partial<Record<ContactField, string>> = {};
		if (nextValues.full_name.trim().length < 2) nextErrors.full_name = 'Saisissez votre nom complet.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextValues.email.trim()))
			nextErrors.email = 'Saisissez une adresse e-mail valide.';
		if (nextValues.phone.trim().length < 8) nextErrors.phone = 'Saisissez un numéro de téléphone valide.';
		if (nextValues.message.trim().length < 5) nextErrors.message = 'Décrivez brièvement votre demande.';
		setErrors(nextErrors);
		return Object.keys(nextErrors).length === 0;
	};

	const submit: NonNullable<ComponentProps<'form'>['onSubmit']> = async (event) => {
		event.preventDefault();
		setTouched({ full_name: true, email: true, phone: true, message: true });
		if (!validate(values)) return;
		setNotice(null);
		setIsSubmitting(true);
		try {
			const response = await fetch(`${publicWebsiteApi}/contact/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify(values),
			});
			if (!response.ok) throw new Error('Contact request failed');
			setNotice({ type: 'success', text: 'Votre demande a bien été envoyée.' });
			setValues(initialValues);
			setTouched({});
		} catch {
			setNotice({ type: 'error', text: "L'envoi a échoué. Réessayez dans quelques instants." });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form className={styles.contactForm} onSubmit={submit} noValidate>
			{fieldDefinitions.map((field) => {
				const errorId = `${field.name}-error`;
				const showError = Boolean(touched[field.name] && errors[field.name]);
				return (
					<div className={styles.contactField} key={field.name}>
						<label htmlFor={field.name}>{field.label}</label>
						<input
							id={field.name}
							name={field.name}
							type={field.type}
							autoComplete={field.autoComplete}
							placeholder=" "
							value={values[field.name]}
							onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
							onBlur={() => {
								setTouched((current) => ({ ...current, [field.name]: true }));
								validate(values);
							}}
							aria-invalid={showError}
							aria-describedby={showError ? errorId : undefined}
							required
						/>
						{showError && (
							<span id={errorId} className={styles.fieldError}>
								{errors[field.name]}
							</span>
						)}
					</div>
				);
			})}
			<input
				className={styles.honeypot}
				name="website"
				value={values.website}
				onChange={(event) => setValues((current) => ({ ...current, website: event.target.value }))}
				tabIndex={-1}
				autoComplete="off"
				aria-hidden="true"
			/>
			<button type="submit" disabled={isSubmitting} className={styles.submitButton}>
				ENVOYER LA DEMANDE
				{isSubmitting && <span className={styles.loadingSpinner} aria-hidden="true" />}
			</button>
			{notice && (
				<p
					className={`${styles.formNotice} ${notice.type === 'success' ? styles.formSuccess : styles.formError}`}
					role="status"
				>
					{notice.text}
				</p>
			)}
		</form>
	);
}
