import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import '../../styles/globals.css';
import { CurrentUserResponse } from '../models/user.model';
const initaluser: CurrentUserResponse = {
  email: '',
  id: '',
  normalizedEmail: '',
  normalizedUserName: '',
  userCliams: [],
  userName: '',
  userRoles: [],
};
function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-zinc-800 min-h-screen min-w-full">
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
