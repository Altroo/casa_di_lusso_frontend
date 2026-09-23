import { fieldDefinitions, fittingTypes, heroSlides, PAGE_COUNT, PAGE_PATHS, PAGE_PREVIEW_PATHS, projects, testimonials } from './rawData';

describe('site raw data', () => {
	it('keeps catalogue pages and previews aligned', () => {
		expect(PAGE_PATHS).toHaveLength(PAGE_COUNT);
		expect(PAGE_PREVIEW_PATHS).toHaveLength(PAGE_COUNT);
		PAGE_PATHS.forEach((path, index) => {
			expect(PAGE_PREVIEW_PATHS[index]).toBe(path.replace('/pages/', '/pages/previews/'));
		});
	});

	it('keeps UI datasets complete and uniquely keyed', () => {
		expect(heroSlides.length).toBeGreaterThan(0);
		expect(new Set(heroSlides.map(({ src }) => src)).size).toBe(heroSlides.length);
		expect(new Set(projects.map(({ name }) => name)).size).toBe(projects.length);
		expect(new Set(testimonials.map(({ name }) => name)).size).toBe(testimonials.length);
		expect(new Set(fittingTypes.map(({ icon }) => icon)).size).toBe(fittingTypes.length);
		expect(fieldDefinitions.map(({ name }) => name)).toEqual(['full_name', 'email', 'phone', 'message']);
	});
});
