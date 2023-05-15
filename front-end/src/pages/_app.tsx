import AuthProvider from '@/providers/auth/auth.provider';
import SocketProvider from '@/providers/socket/socket.provider';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { ReactElement } from 'react';

const queryClient = new QueryClient();

function ft_transcendence({ Component, pageProps }: AppProps): ReactElement {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </SocketProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default ft_transcendence;
