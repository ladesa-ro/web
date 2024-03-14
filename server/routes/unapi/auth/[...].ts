import { NuxtAuthHandler } from "#auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import type ICredentialsProvider from "next-auth/providers/credentials";
import CredentialsProviderModule from "next-auth/providers/credentials";
import { AutenticacaoService } from "../../../../infrastructure/api/generated";
import { AuthenticationService } from "../../../infrastructure/authentication";
import { EnvironmentConfigService } from "../../../infrastructure/config/environment-config";
import { infrastructureContainer } from "../../../infrastructure/infrastructure.container";

/// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
const CredentialsProvider: typeof ICredentialsProvider = CredentialsProviderModule.default;

const ACCESS_TOKEN_EXPIRATION_TRIM = 0.5 * 60 * 1000;

const authenticationService = infrastructureContainer.get(AuthenticationService);
const environmentConfigService = infrastructureContainer.get(EnvironmentConfigService);

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

export default NuxtAuthHandler({
  secret: environmentConfigService.getNuxtAuthSecret(),

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      id: "credentials",

      name: "Credentials",

      credentials: {
        username: { label: "Matrícula", type: "text" },
        password: { label: "Senha", type: "password" },
      },

      async authorize(credentials, _req) {
        const senha = credentials?.password;
        const matriculaSiape = credentials?.username;

        if (credentials && matriculaSiape && senha) {
          try {
            const token = await AutenticacaoService.autenticacaoControllerLogin({
              matriculaSiape: matriculaSiape,
              senha: senha,
            });

            const { access_token: accessToken } = token;

            const data = <JwtPayload | null>(accessToken ? jwt.decode(accessToken) : null);

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
        if (account?.provider === "credentials") {
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
      return authenticationService.refreshAccessToken(token);
    },

    async session({ session, token }) {
      console.log("aff");
      session.user = token.user;
      session.error = token.error;

      session.accessToken = token.accessToken;
      session.accessTokenExpires = <number>token.accessTokenExpires;

      return session;
    },
  },
});
