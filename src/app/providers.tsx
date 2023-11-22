'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

export default function Providers({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  console.log('client Providers');
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
