'use client';

import { useState } from 'react';
import axios from 'axios';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { publicWebsiteApi } from '@/utils/websiteApi';
import styles from './site.module.sass';

const contactSchema = z.object({
	full_name: z.string().trim().min(2, 'Saisissez votre nom complet.'),
	email: z.email('Saisissez une adresse e-mail valide.'),
	phone: z.string().trim().min(8, 'Saisissez un numéro de téléphone valide.'),
	message: z.string().trim().min(5, 'Décrivez brièvement votre demande.'),
	website: z.string(),
});

type ContactValues = z.infer<typeof contactSchema>;

const initialValues: ContactValues = { full_name: '', email: '', phone: '', message: '', website: '' };

export default function ContactForm() {
	const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={toFormikValidationSchema(contactSchema)}
			onSubmit={async (values, { resetForm, setSubmitting }) => {
				setNotice(null);
				try {
					await axios.post(`${publicWebsiteApi}/contact/`, values);
					setNotice({ type: 'success', text: 'Votre demande a bien été envoyée.' });
					resetForm();
				} catch {
					setNotice({ type: 'error', text: "L'envoi a échoué. Réessayez dans quelques instants." });
				} finally {
					setSubmitting(false);
				}
			}}
		>
			{({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
				<Form className={styles.contactForm} noValidate>
					<TextField
						name="full_name"
						label="Nom complet"
						value={values.full_name}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.full_name && Boolean(errors.full_name)}
						helperText={touched.full_name && errors.full_name}
						fullWidth
					/>
					<TextField
						name="email"
						type="email"
						label="Email"
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.email && Boolean(errors.email)}
						helperText={touched.email && errors.email}
						fullWidth
					/>
					<TextField
						name="phone"
						type="tel"
						label="Téléphone"
						value={values.phone}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.phone && Boolean(errors.phone)}
						helperText={touched.phone && errors.phone}
						fullWidth
					/>
					<TextField
						name="message"
						label="Message"
						value={values.message}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.message && Boolean(errors.message)}
						helperText={touched.message && errors.message}
						fullWidth
					/>
					<input
						className={styles.honeypot}
						name="website"
						value={values.website}
						onChange={handleChange}
						tabIndex={-1}
						autoComplete="off"
						aria-hidden="true"
					/>
					<Button
						type="submit"
						variant="contained"
						disabled={isSubmitting}
						className={styles.submitButton}
					endIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : undefined}
				>
					ENVOYER LA DEMANDE
					</Button>
					{notice && <Alert severity={notice.type}>{notice.text}</Alert>}
				</Form>
			)}
		</Formik>
	);
}
