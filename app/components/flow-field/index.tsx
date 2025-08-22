'use client';

import dynamic from 'next/dynamic';

const FlowField = dynamic(() => import('./FlowField'), { ssr: false });

export function FlowFieldNoSSR() {
  return <FlowField />;
}
