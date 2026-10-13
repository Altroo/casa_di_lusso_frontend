'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Content stays visible without JavaScript. Only entering imagery moves, once.
export default function PageMotion() {
	const pathname = usePathname();
	useEffect(() => {
		const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (preference.matches || !('IntersectionObserver' in window)) return;
		const animations = new Set<Animation>();
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				observer.unobserve(entry.target);
				if (typeof entry.target.animate !== 'function') continue;
				const animation = entry.target.animate([
					{ opacity: .65, transform: 'translateY(16px)' },
					{ opacity: 1, transform: 'translateY(0)' },
				], { duration: 650, easing: 'cubic-bezier(.22, 1, .36, 1)' });
				animations.add(animation);
				animation.addEventListener('finish', () => animations.delete(animation), { once: true });
			}
		}, { threshold: .08 });
		document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
		const stop = () => {
			observer.disconnect();
			animations.forEach((animation) => animation.cancel());
		};
		preference.addEventListener('change', stop);
		return () => { stop(); preference.removeEventListener('change', stop); };
	}, [pathname]);
	return null;
}
