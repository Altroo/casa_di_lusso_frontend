'use client';

import Image from 'next/image';
import Link from 'next/link';
import HTMLFlipBook from 'react-pageflip';
import { forwardRef, type CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import styles from './catalogue.module.sass';

const PAGE_COUNT = 24;
const PDF_PATH = '/assets/casa/catalogue/catalogue-casa-di-lusso.pdf';
const PAGE_PATHS = Array.from(
	{ length: PAGE_COUNT },
	(_, index) => `/assets/casa/catalogue/pages/page-${String(index + 1).padStart(2, '0')}.jpg`,
);
const PAGE_PREVIEW_PATHS = PAGE_PATHS.map((path) => path.replace('/pages/', '/pages/previews/'));

interface PageFlipApi {
	flipNext: () => void;
	flipPrev: () => void;
	turnToPage: (page: number) => void;
}

interface FlipBookHandle {
	pageFlip: () => PageFlipApi;
}

interface FlipEvent {
	data: number;
}

interface CataloguePageProps {
	page: number;
	onReady: (page: number) => void;
}

const CataloguePage = forwardRef<HTMLDivElement, CataloguePageProps>(({ page, onReady }, ref) => {
	const [isHighResolutionReady, setIsHighResolutionReady] = useState(false);

	return (
		<div ref={ref} className={styles.page} data-density={page === 1 || page === PAGE_COUNT ? 'hard' : 'soft'}>
			<Image
				className={styles.pagePreview}
				src={PAGE_PREVIEW_PATHS[page - 1]}
				alt=""
				aria-hidden="true"
				fill
				loading="eager"
				unoptimized
				draggable={false}
				onLoad={(event) => {
					const image = event.currentTarget;
					void image
						.decode()
						.catch(() => undefined)
						.finally(() => onReady(page));
				}}
			/>
			<Image
				className={`${styles.pageImage} ${isHighResolutionReady ? styles.pageImageReady : ''}`}
				src={PAGE_PATHS[page - 1]}
				alt={`Page ${page} du catalogue Casa di Lusso`}
				fill
				sizes="(max-width: 760px) 92vw, 44vw"
				loading="eager"
				fetchPriority={page <= 3 ? 'high' : 'auto'}
				unoptimized
				draggable={false}
				onLoad={(event) => {
					const image = event.currentTarget;
					void image
						.decode()
						.catch(() => undefined)
						.finally(() => setIsHighResolutionReady(true));
				}}
			/>
		</div>
	);
});

CataloguePage.displayName = 'CataloguePage';

const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
	<svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
		<path d={direction === 'left' ? 'M15 5 8 12l7 7' : 'm9 5 7 7-7 7'} />
	</svg>
);

const EdgeArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
	<svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
		<path d={direction === 'left' ? 'M17 5 10 12l7 7M6 5v14' : 'm7 5 7 7-7 7M18 5v14'} />
	</svg>
);

const ZoomIcon = ({ operation }: { operation: 'in' | 'out' }) => (
	<svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
		<circle cx="10.75" cy="10.75" r="6.25" />
		<path d={operation === 'in' ? 'm15.5 15.5 4 4M7.75 10.75h6M10.75 7.75v6' : 'm15.5 15.5 4 4M7.75 10.75h6'} />
	</svg>
);

const FullscreenIcon = ({ active }: { active: boolean }) => (
	<svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
		{active ? <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /> : <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" />}
	</svg>
);

const DownloadIcon = () => (
	<svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
		<path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M5 20h14" />
	</svg>
);

export default function CatalogueFlipbook() {
	const bookRef = useRef<FlipBookHandle | null>(null);
	const shellRef = useRef<HTMLElement | null>(null);
	const renderedPagesRef = useRef(new Set<number>());
	const [currentPage, setCurrentPage] = useState(0);
	const [loadedPages, setLoadedPages] = useState(0);
	const [renderedPages, setRenderedPages] = useState(0);
	const [arePagesReady, setArePagesReady] = useState(false);
	const [isBookReady, setIsBookReady] = useState(false);
	const [preloadFailed, setPreloadFailed] = useState(false);
	const [preloadAttempt, setPreloadAttempt] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [zoom, setZoom] = useState(1);
	const isReady = arePagesReady && isBookReady && renderedPages === PAGE_COUNT;

	const getBook = useCallback(() => bookRef.current?.pageFlip(), []);

	const previousPage = useCallback(() => getBook()?.flipPrev(), [getBook]);
	const nextPage = useCallback(() => getBook()?.flipNext(), [getBook]);
	const firstPage = useCallback(() => getBook()?.turnToPage(0), [getBook]);
	const lastPage = useCallback(() => getBook()?.turnToPage(PAGE_COUNT - 1), [getBook]);
	const markPageReady = useCallback((page: number) => {
		if (renderedPagesRef.current.has(page)) return;
		renderedPagesRef.current.add(page);
		setRenderedPages(renderedPagesRef.current.size);
	}, []);

	useEffect(() => {
		let cancelled = false;

		setLoadedPages(0);
		renderedPagesRef.current.clear();
		setRenderedPages(0);
		setArePagesReady(false);
		setIsBookReady(false);
		setPreloadFailed(false);

		const preloadPage = (src: string) =>
			new Promise<void>((resolve, reject) => {
				const image = new window.Image();
				image.decoding = 'async';
				image.onload = () => {
					void image
						.decode()
						.catch(() => undefined)
						.finally(resolve);
				};
				image.onerror = () => reject(new Error(`Impossible de charger ${src}`));
				image.src = src;
			});

		void Promise.allSettled(
			PAGE_PREVIEW_PATHS.map(async (src) => {
				try {
					await preloadPage(src);
				} finally {
					if (!cancelled) setLoadedPages((value) => value + 1);
				}
			}),
		).then((results) => {
			if (cancelled) return;
			if (results.every((result) => result.status === 'fulfilled')) {
				setArePagesReady(true);
			} else {
				setPreloadFailed(true);
			}
		});

		return () => {
			cancelled = true;
		};
	}, [preloadAttempt]);

	useEffect(() => {
		if (!arePagesReady) return;

		let animationFrame = 0;
		const detectBook = () => {
			if (bookRef.current?.pageFlip()) {
				setIsBookReady(true);
				return;
			}
			animationFrame = window.requestAnimationFrame(detectBook);
		};
		animationFrame = window.requestAnimationFrame(detectBook);
		return () => window.cancelAnimationFrame(animationFrame);
	}, [arePagesReady]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'ArrowLeft') previousPage();
			if (event.key === 'ArrowRight') nextPage();
			if (event.key === 'Home') firstPage();
			if (event.key === 'End') lastPage();
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [firstPage, lastPage, nextPage, previousPage]);

	useEffect(() => {
		const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
		document.addEventListener('fullscreenchange', handleFullscreenChange);
		return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
	}, []);

	const toggleFullscreen = async () => {
		if (document.fullscreenElement) {
			await document.exitFullscreen();
			return;
		}
		await shellRef.current?.requestFullscreen();
	};

	const changeZoom = (delta: number) => {
		setZoom((value) => Math.min(1.35, Math.max(0.8, Number((value + delta).toFixed(2)))));
	};

	const zoomStyle = { '--catalogue-zoom': zoom } as CSSProperties;
	const loadingProgress = Math.round((loadedPages / PAGE_COUNT) * 100);

	return (
		<main ref={shellRef} className={styles.catalogueShell}>
			<header className={styles.topBar}>
				<Link href="/" className={styles.backLink} aria-label="Retour au site Casa di Lusso">
					<Image src="/assets/casa/logo.png" alt="" width={58} height={58} priority />
					<span>Retour au site</span>
				</Link>
				<div className={styles.catalogueTitle}>
					<span>CASA DI LUSSO</span>
					<strong>CATALOGUE</strong>
				</div>
				<a className={styles.downloadButton} href={PDF_PATH} download>
					<DownloadIcon />
					<span>Télécharger le PDF</span>
				</a>
			</header>

			<section className={styles.viewer} aria-label="Catalogue interactif Casa di Lusso" aria-busy={!isReady}>
				<div className={styles.ambientGlow} aria-hidden="true" />
				{!isReady && (
					<div className={styles.loadingPanel} role="status" aria-live="polite">
						<p>{preloadFailed ? 'Le chargement a été interrompu' : 'Préparation du catalogue'}</p>
						{preloadFailed ? (
							<button type="button" onClick={() => setPreloadAttempt((value) => value + 1)}>
								Réessayer
							</button>
						) : (
							<>
								<div
									className={styles.loadingTrack}
									role="progressbar"
									aria-label="Chargement des pages"
									aria-valuemin={0}
									aria-valuemax={PAGE_COUNT}
									aria-valuenow={loadedPages}
								>
									<span style={{ width: `${loadingProgress}%` }} />
								</div>
								<span className={styles.loadingCount}>{loadingProgress}%</span>
							</>
						)}
					</div>
				)}
				{arePagesReady && (
					<div className={`${styles.bookScale} ${isBookReady ? styles.bookVisible : ''}`} style={zoomStyle}>
						<HTMLFlipBook
							ref={bookRef}
							className={styles.book}
							style={{}}
							width={600}
							height={842}
							size="stretch"
							minWidth={280}
							maxWidth={720}
							minHeight={393}
							maxHeight={1010}
							startPage={0}
							drawShadow
							flippingTime={800}
							usePortrait
							startZIndex={10}
							autoSize
							maxShadowOpacity={0.48}
							showCover
							mobileScrollSupport
							clickEventForward
							useMouseEvents
							swipeDistance={24}
							showPageCorners
							disableFlipByClick={false}
							onUpdate={() => setIsBookReady(true)}
							onFlip={(event: FlipEvent) => setCurrentPage(event.data)}
						>
							{Array.from({ length: PAGE_COUNT }, (_, index) => (
								<CataloguePage key={index + 1} page={index + 1} onReady={markPageReady} />
							))}
						</HTMLFlipBook>
					</div>
				)}
				<p className={styles.gestureHint}>Cliquez sur un coin ou faites glisser la page</p>
			</section>

			<nav className={styles.controls} aria-label="Commandes du catalogue">
				<div className={styles.controlGroup}>
					<button type="button" onClick={firstPage} disabled={currentPage === 0} aria-label="Première page">
						<EdgeArrowIcon direction="left" />
					</button>
					<button type="button" onClick={previousPage} disabled={currentPage === 0} aria-label="Page précédente">
						<ArrowIcon direction="left" />
					</button>
				</div>

				<p className={styles.pageCounter} aria-live="polite">
					<span>{currentPage + 1}</span>
					<i>/</i>
					<span>{PAGE_COUNT}</span>
				</p>

				<div className={styles.controlGroup}>
					<button type="button" onClick={nextPage} disabled={currentPage === PAGE_COUNT - 1} aria-label="Page suivante">
						<ArrowIcon direction="right" />
					</button>
					<button type="button" onClick={lastPage} disabled={currentPage === PAGE_COUNT - 1} aria-label="Dernière page">
						<EdgeArrowIcon direction="right" />
					</button>
				</div>

				<span className={styles.divider} aria-hidden="true" />

				<div className={styles.controlGroup}>
					<button type="button" onClick={() => changeZoom(-0.1)} disabled={zoom <= 0.8} aria-label="Réduire">
						<ZoomIcon operation="out" />
					</button>
					<button type="button" onClick={() => changeZoom(0.1)} disabled={zoom >= 1.35} aria-label="Agrandir">
						<ZoomIcon operation="in" />
					</button>
					<button
						type="button"
						onClick={toggleFullscreen}
						aria-label={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
					>
						<FullscreenIcon active={isFullscreen} />
					</button>
					<a href={PDF_PATH} download aria-label="Télécharger le catalogue PDF">
						<DownloadIcon />
					</a>
				</div>
			</nav>
		</main>
	);
}
