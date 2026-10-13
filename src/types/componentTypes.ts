import type { ReactNode, Ref } from 'react';
import type { SiteContent } from '@/types/websiteTypes';

export interface PageFlipApi {
	flipNext: () => void;
	turnToNextPage: () => void;
	turnToPrevPage: () => void;
	flipPrev: () => void;
	turnToPage: (page: number) => void;
}

export interface FlipBookHandle {
	pageFlip: () => PageFlipApi;
}

export interface FlipEvent {
	data: number;
}

export interface CataloguePageProps {
	ref?: Ref<HTMLDivElement>;
	page: number;
	onReady: (page: number) => void;
}

export interface CasaSiteProps {
	content: SiteContent;
}

export type Coordinates = [number, number, number, number?];
export type PlaceProps = {
	at: Coordinates;
	children?: ReactNode;
	className?: string;
	as?: 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'ul';
	font?: [number, number, number?];
	family?: 'Inter' | 'Poppins';
};

export interface ContactValues {
	full_name: string;
	email: string;
	phone: string;
	message: string;
	website: string;
}
export type ContactField = keyof ContactValues;

export interface RootLayoutProps {
	children: ReactNode;
}

export type FittingType = {
	x: number;
	y: number;
	width: number;
	icon: string;
	iconAt: Coordinates;
	title: string;
	titleLines?: [string, string];
	text: string;
};
