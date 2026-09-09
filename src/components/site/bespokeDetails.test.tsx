import { render, screen, within } from '@testing-library/react';
import { fallbackContent } from '@/data/fallbackContent';
import { servicePages } from '@/data/services';
import ServicePageView from './servicePages';

jest.mock('./animatedMetricValue', () => ({ __esModule: true, default: () => null }));

describe('Bespoke Figma details', () => {
	it('renders only the two static labels, without invented expandable copy', () => {
		const service = servicePages.find((page) => page.kind === 'bespoke')!;
		const { container } = render(<ServicePageView service={service} settings={fallbackContent.settings} />);
		const list = screen.getByRole('list', { name: 'Aménagements intérieurs' });
		expect(
			within(list)
				.getAllByRole('listitem')
				.map((item) => item.textContent),
		).toEqual(['Aménagement intérieur du salon', 'Aménagement intérieur de bureaux commerciaux']);
		expect(container.querySelector('details, summary')).toBeNull();
		expect(list.querySelector('button, [role="button"], [tabindex]')).toBeNull();
		expect(
			screen.queryByText('Des solutions personnalisées pour créer un salon confortable, élégant et harmonieux.'),
		).toBeNull();
		expect(
			screen.queryByText(
				'Des espaces de travail adaptés à vos usages, avec des rangements intégrés et une circulation fluide.',
			),
		).toBeNull();
		expect(screen.getByRole('link', { name: 'Voir plus' })).toHaveAttribute('href', '/#contact');
		expect(container.querySelectorAll('main section')).toHaveLength(7);
		const heroImage = screen.getByAltText('Dressing sur mesure et chambre vus du dessus');
		expect(heroImage).toHaveAttribute('src', '/assets/casa/services/bespoke-figma-hero.png');
		expect(heroImage.style.getPropertyValue('--crop-width')).toBe('');
	});
});
