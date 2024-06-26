import { NuxtAuthHandler } from '#auth';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import type ICredentialsProvider from 'next-auth/providers/credentials';
import CredentialsProviderModule from 'next-auth/providers/credentials';
import { getApiClient } from '~/composables';
import {
  ServerAuthenticationService,
  ServerEnvironmentConfigService,
  serverInfrastructureContainer,
} from '../../server-infrastructure';

const CredentialsProvider: typeof ICredentialsProvider =
  /// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
  CredentialsProviderModule.default;

const ACCESS_TOKEN_EXPIRATION_TRIM = 1 * 60 * 1000;

const serverAuthenticationService = serverInfrastructureContainer.get(
  ServerAuthenticationService
);
const serverEnvironmentConfigService = serverInfrastructureContainer.get(
  ServerEnvironmentConfigService
);

export default NuxtAuthHandler({
  secret: serverEnvironmentConfigService.getNuxtAuthSecret(),

  pages: {
    signIn: '/login',
  },

  providers: [
    CredentialsProvider({
      id: 'credentials',

      name: 'Credentials',

      credentials: {
        username: { label: 'Matrícula', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },

      async authorize(credentials, _req) {
        const senha = credentials?.password;
        const matriculaSiape = credentials?.username;

        if (credentials && matriculaSiape && senha) {
          try {
            const apiClient = getApiClient();
            const token = await apiClient.autenticacao.authLogin({
              requestBody: {
                matriculaSiape: matriculaSiape,
                senha: senha,
              },
            });

            const { access_token: accessToken } = token;

            const data = <JwtPayload | null>(
              (accessToken ? jwt.decode(accessToken) : null)
            );

            const sub = data?.sub;

            if (sub) {
              return {
                id: sub,
                token,
              };
            }
          } catch (error) {}
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        if (account?.provider === 'credentials') {
          const token = (user as any).token;

          return {
            user: {
              id: user.id,
            },

            accessToken: token.access_token,
            refreshToken: token.refresh_token,

            accessTokenExpires: Date.now() + <number>token.expires_in * 1000,
          };
        }

        // OAuth login
        return {
          user,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: Date.now() + <number>account.expires_in * 1000,
        };
      }

      const msNow = Date.now();
      const msExpires = <number>token.accessTokenExpires;

      // Return previous token if the access token has not expired yet
      if (msExpires - msNow > ACCESS_TOKEN_EXPIRATION_TRIM) {
        return token;
      }

      // Access token has expired, try to update it
      return serverAuthenticationService.refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user = token.user;
      session.error = token.error;

      session.accessToken = token.accessToken;
      session.accessTokenExpires = <number>token.accessTokenExpires;

      return session;
    },
  },
});
