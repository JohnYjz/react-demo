import { ReactNode } from 'react';
import { AuthProvider } from './use-context';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
