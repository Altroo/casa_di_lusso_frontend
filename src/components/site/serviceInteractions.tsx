'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { serviceAssets } from '@/data/serviceAssets';
import styles from './servicePages.module.sass';

const projects = [
	{
		image: 'architecture-project1',
		name: '323 Down Lane',
		place: 'Corney',
		type: 'Résidentiel',
		details: 'Appartements, suites',
	},
	{
		image: 'architecture-project2',
		name: '88 Johnson Blvd',
		place: 'Sunset South',
		type: 'Décoration intérieure',
		details: 'Appartements, résidences, suites',
	},
	{
		image: 'architecture-project3',
		name: '130-540 Noth Road',
		place: 'Reggae',
		type: 'Décoration intérieure',
		details: 'Centre médical',
	},
];

export function ProjectCarousel() {
	const viewport = useRef<HTMLDivElement>(null);
	const gesture = useRef<{ x: number; scroll: number; moved: boolean } | null>(null);
	const move = (direction: number) => {
		const element = viewport.current;
		if (!element) return;
		const cards = element.querySelectorAll('article');
		const step = cards[1].offsetLeft - cards[0].offsetLeft;
		const end = element.scrollWidth - element.clientWidth;
		const next = direction > 0 && element.scrollLeft >= end - 2 ? 0 : element.scrollLeft + direction * step;
		element.scrollTo({
			left: next,
			behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
		});
	};
	return (
		<div className={styles.projectCarousel}>
			<div
				ref={viewport}
				className={styles.projectViewport}
				role="region"
				aria-label="Projets d’architecture"
				tabIndex={0}
				onKeyDown={(event) => {
					if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
						event.preventDefault();
						move(event.key === 'ArrowRight' ? 1 : -1);
					}
				}}
				onPointerDown={(event) => {
					if ((event.target as HTMLElement).closest('a, button')) return;
					gesture.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false };
					event.currentTarget.setPointerCapture(event.pointerId);
				}}
				onPointerMove={(event) => {
					if (!gesture.current) return;
					const distance = event.clientX - gesture.current.x;
					if (Math.abs(distance) > 5) gesture.current.moved = true;
					event.currentTarget.scrollLeft = gesture.current.scroll - distance;
				}}
				onPointerUp={() => {
					gesture.current = null;
				}}
				onPointerCancel={() => {
					gesture.current = null;
				}}
			>
				<div className={styles.projectTrack}>
					{projects.map((project) => (
						<article key={project.name}>
							<div>
								<Image
									src={serviceAssets[project.image]}
									alt={`${project.name}, ${project.place}`}
									fill
									sizes="(max-width: 1200px) 85vw, 38vw"
									draggable={false}
								/>
							</div>
							<h3>
								{project.name}
								<br />
								{project.place}
							</h3>
							<p>{project.type}</p>
							<p>{project.details}</p>
							<Link href="/#contact">Voir →</Link>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}

const testimonials = [
	{
		name: 'Sanae jamil',
		location: 'Casablanca, Maroc',
		image: 'bespoke-sanae',
		text: 'Travailler avec l’équipe de Casa Di Lusso a\nété un véritable plaisir. Leur souci du détail\net leur créativité ont dépassé mes attentes.\nMerci d’avoir embelli ma maison !',
	},
	{
		name: 'Ahmed Said',
		location: 'Tanger, Maroc',
		image: 'bespoke-ahmed',
		text: 'Service exceptionnel ! De la première\nconsultation à la présentation finale, votre\néquipe a fait preuve de professionnalisme\net d’un sens aigu du design.',
	},
];

export function ServiceTestimonials() {
	const [index, setIndex] = useState(0);
	return (
		<>
			<div className={styles.testimonialCards} aria-live="polite">
				{[0, 1].map((offset) => {
					const testimonial = testimonials[(index + offset) % testimonials.length];
					return (
						<blockquote key={testimonial.name} data-author={testimonial.image}>
							<span aria-hidden="true">
								<Image src="/assets/casa/services/bespoke-figma-quote.png" alt="" width={49} height={38} unoptimized />
							</span>
							<p>{testimonial.text}</p>
							<footer>
								<span className={styles.avatar}>
									<Image src={serviceAssets[testimonial.image]} alt="" width={176} height={117} />
								</span>
								<div>
									<strong>{testimonial.name}</strong>
									<small>{testimonial.location}</small>
								</div>
							</footer>
						</blockquote>
					);
				})}
			</div>
			<div className={styles.testimonialControls}>
				{['Left', 'Right'].map((direction) => (
					<button
						key={direction}
						type="button"
						onClick={() => setIndex((value) => (value + 1) % testimonials.length)}
						aria-label={direction === 'Left' ? 'Témoignage précédent' : 'Témoignage suivant'}
					>
						<Image src={serviceAssets[`bespoke-arrow${direction}`]} alt="" width={73} height={73} />
					</button>
				))}
			</div>
		</>
	);
}
