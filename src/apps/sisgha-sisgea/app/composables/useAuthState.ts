export interface AuthSessionData {
  user: { id: string } | null;
  accessToken: string | null;
  accessTokenExpires: number | null;
}

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export const useAuthState = () => {
  const data = useState<AuthSessionData | null>('auth:data', () => null);

  const status = useState<AuthStatus>('auth:status', () => 'loading');

  const lastRefreshedAt = useState<Date>(
    'auth:lastRefreshedAt',
    () => new Date()
  );

  const sessionGeneration = useState<number>('auth:sessionGeneration', () => 0);

  return { data, status, lastRefreshedAt, sessionGeneration };
};
