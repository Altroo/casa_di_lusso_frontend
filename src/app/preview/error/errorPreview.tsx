'use client';

import { useRouter } from 'next/navigation';
import PressError from '../../press/error';

export default function ErrorPreview() {
	const router = useRouter();
	return <PressError retry={() => router.push('/press')} />;
}
