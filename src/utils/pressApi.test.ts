import { fetchPressArticle, fetchPressArticles } from './pressApi';

describe('Press API', () => {
	const originalFetch = global.fetch;
	afterEach(() => { global.fetch = originalFetch; });
	it('always reads current publication state', async () => {
		global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [] });
		expect(await fetchPressArticles()).toEqual([]);
		expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/press/articles/'), expect.objectContaining({ cache: 'no-store' }));
	});
	it('distinguishes missing/unpublished articles from backend errors', async () => {
		global.fetch = jest.fn().mockResolvedValueOnce({ status: 404 }).mockResolvedValueOnce({ status: 503, ok: false });
		expect(await fetchPressArticle('brouillon')).toBeNull();
		await expect(fetchPressArticle('article')).rejects.toThrow('temporairement indisponible');
	});
});
