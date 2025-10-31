'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

type BackgroundProps = React.ComponentProps<'div'> & {
	size?: number;
	fillDark?: string;
	fillLight?: string;
};

const Background = ({
	size = 24,
	fillDark = '#252525',
	fillLight = '#e0e0e0',
	className,
	style,
	...props
}: BackgroundProps) => {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme } = useTheme();
	
	useEffect(() => {
		setMounted(true);
	}, []);

	const fill = mounted && resolvedTheme === 'light' ? fillLight : fillDark;
	const backgroundImage = `radial-gradient(${fill} 1px, transparent 1px)`;
	const backgroundSize = `${size}px ${size}px`;
	const maskClass = '[mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]';

	return (
		<div
			className={cn('absolute inset-0 z-[-10] size-full', maskClass, className)}
			style={{
				backgroundImage,
				backgroundSize,
				...style,
			}}
			{...props}
		/>
	);
};

Background.displayName = 'Background';
export { Background };