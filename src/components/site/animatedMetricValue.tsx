'use client';

import { useEffect, useRef, useState } from 'react';

export default function AnimatedMetricValue({ value, bracketed = true }: { value: string; bracketed?: boolean }) {
	const elementRef = useRef<HTMLElement>(null);
	const target = Number.parseInt(value.match(/\d+/)?.[0] ?? '0', 10);
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const element = elementRef.current;
		if (!element || target <= 0) return;
		let animationFrame = 0;
		let started = false;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			animationFrame = window.requestAnimationFrame(() => setCurrent(target));
			return () => window.cancelAnimationFrame(animationFrame);
		}

		const startAnimation = () => {
			if (started) return;
			started = true;
			observer.disconnect();
			window.removeEventListener('scroll', checkVisibility);
			const startedAt = performance.now();
			const duration = 1200;
			const animate = (now: number) => {
				const progress = Math.min(Math.max((now - startedAt) / duration, 0), 1);
				const eased = 1 - Math.pow(1 - progress, 3);
				setCurrent(Math.round(target * eased));
				if (progress < 1) animationFrame = window.requestAnimationFrame(animate);
			};
			animationFrame = window.requestAnimationFrame(animate);
		};
		const checkVisibility = () => {
			const rect = element.getBoundingClientRect();
			if (rect.top < window.innerHeight && rect.bottom > 0) startAnimation();
		};
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) startAnimation();
			},
			{ threshold: 0.2 },
		);

		observer.observe(element);
		window.addEventListener('scroll', checkVisibility, { passive: true });
		animationFrame = window.requestAnimationFrame(checkVisibility);
		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', checkVisibility);
			window.cancelAnimationFrame(animationFrame);
		};
	}, [target]);

	return (
		<strong ref={elementRef} aria-label={value}>
			{bracketed ? `[ ${current} +]` : value.replace(/\d+/, String(current))}
		</strong>
	);
}
