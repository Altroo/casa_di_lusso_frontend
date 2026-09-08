import { act, fireEvent, render, screen } from '@testing-library/react';
import AnimatedMetricValue from './animatedMetricValue';

describe('shared metric count-up', () => {
	let intersect: (visible: boolean) => void;
	let frames: Map<number, FrameRequestCallback>;
	let frameId: number;
	let now: number;
	let reducedMotion: boolean;
	const disconnect = jest.fn();
	const originalObserver = window.IntersectionObserver;
	const originalMatchMedia = window.matchMedia;

	function advance(milliseconds: number) {
		now += milliseconds;
		const pending = [...frames.values()];
		frames.clear();
		act(() => pending.forEach((callback) => callback(now)));
	}

	beforeEach(() => {
		frames = new Map();
		frameId = 0;
		now = 0;
		reducedMotion = false;
		disconnect.mockClear();
		window.matchMedia = jest.fn().mockImplementation(() => ({ matches: reducedMotion }));
		window.IntersectionObserver = jest.fn().mockImplementation((callback) => {
			intersect = (visible) => act(() => callback([{ isIntersecting: visible }]));
			return { observe: jest.fn(), disconnect };
		});
		jest.spyOn(performance, 'now').mockImplementation(() => now);
		jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
			frames.set(++frameId, callback);
			return frameId;
		});
		jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => { frames.delete(id); });
	});

	afterEach(() => {
		jest.restoreAllMocks();
		window.IntersectionObserver = originalObserver;
		window.matchMedia = originalMatchMedia;
	});

	it('preserves the index format and starts only when visible, using the same 1.2-second easing', () => {
		render(<AnimatedMetricValue value="200+" />);
		const metric = screen.getByLabelText('200+');
		advance(16);
		expect(metric).toHaveTextContent('[ 0 +]');
		intersect(false);
		advance(1200);
		expect(metric).toHaveTextContent('[ 0 +]');
		intersect(true);
		advance(600);
		expect(metric).toHaveTextContent('[ 175 +]');
		advance(600);
		expect(metric).toHaveTextContent('[ 200 +]');
		intersect(true);
		fireEvent.scroll(window);
		advance(600);
		expect(metric).toHaveTextContent('[ 200 +]');
		expect(disconnect).toHaveBeenCalledTimes(1);
	});

	it.each(['180+', '200+', '10+'])('keeps the service design formatting for %s', (value) => {
		render(<AnimatedMetricValue value={value} bracketed={false} />);
		advance(16);
		expect(screen.getByLabelText(value)).toHaveTextContent('0+');
		intersect(true);
		advance(1200);
		expect(screen.getByLabelText(value)).toHaveTextContent(value);
	});

	it('shows the final value without counting when reduced motion is requested', () => {
		reducedMotion = true;
		render(<AnimatedMetricValue value="180+" bracketed={false} />);
		advance(16);
		expect(screen.getByLabelText('180+')).toHaveTextContent('180+');
		expect(window.IntersectionObserver).not.toHaveBeenCalled();
		expect(frames.size).toBe(0);
	});

	it('cancels animation and removes the observer when unmounted', () => {
		const { unmount } = render(<AnimatedMetricValue value="180+" bracketed={false} />);
		advance(16);
		intersect(true);
		advance(300);
		unmount();
		expect(frames.size).toBe(0);
		expect(disconnect).toHaveBeenCalledTimes(2);
	});
});
