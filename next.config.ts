import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';
const backendApi = process.env.NEXT_PUBLIC_BACKEND_API ?? 'http://localhost:8008';
const backendOrigin = (() => {
	try {
		return new URL(backendApi).origin;
	} catch {
		return 'http://localhost:8008';
	}
})();

const contentSecurityPolicy = [
	"default-src 'self'",
	`script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}`,
	"style-src 'self' 'unsafe-inline'",
	"font-src 'self' data:",
	`img-src 'self' data: blob: https://api.casadilusso.ma ${backendOrigin}${
		isDevelopment ? ' http://localhost:8008 http://127.0.0.1:8008' : ''
	}`,
	`connect-src 'self' https://api.casadilusso.ma ${backendOrigin}${
		isDevelopment ? ' http://localhost:8008 http://127.0.0.1:8008' : ''
	}`,
	'frame-src https://www.google.com https://maps.google.com https://player.vimeo.com',
	"frame-ancestors 'self'",
	"base-uri 'self'",
	"form-action 'self'",
].join('; ');

const nextConfig: NextConfig = {
	devIndicators: false,
	reactCompiler: true,
	reactStrictMode: true,
	experimental: {
		inlineCss: true,
	},
	poweredByHeader: false,
	typedRoutes: true,
	images: {
		deviceSizes: [640, 672, 750, 828, 1080, 1200, 1350, 1440, 1600, 1920, 2048, 3840],
		imageSizes: [32, 48, 64, 96, 128, 256, 320, 384, 480, 576, 600],
		qualities: [70, 75],
		remotePatterns: [
			{ protocol: 'https', hostname: 'api.casadilusso.ma', pathname: '/media/**' },
			{ protocol: 'http', hostname: '148.251.138.48', port: '8008', pathname: '/media/**' },
			{ protocol: 'http', hostname: 'localhost', port: '8008', pathname: '/media/**' },
			{ protocol: 'http', hostname: '127.0.0.1', port: '8008', pathname: '/media/**' },
		],
	},
	async headers() {
		return [
			{
				source: '/assets/:path*',
				headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
			},
			{
				source: '/:path*',
				headers: [
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'X-Frame-Options', value: 'SAMEORIGIN' },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
					{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
					{ key: 'Content-Security-Policy', value: contentSecurityPolicy },
				],
			},
		];
	},
};

export default nextConfig;
