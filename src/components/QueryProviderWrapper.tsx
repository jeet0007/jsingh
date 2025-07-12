'use client';

import QueryProvider from './QueryProvider';

interface QueryProviderWrapperProps {
  children: React.ReactNode;
}

export default function QueryProviderWrapper({ children }: QueryProviderWrapperProps) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}