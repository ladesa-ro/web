/* eslint-disable */
import '@auth/core/jwt';
import '@auth/core/types';
/* eslint-enable */

declare module '@auth/core/types' {
  /* Returned by `useAuth`, `getSession` and `getServerSession` */
  interface Session extends DefaultSession {
    error?: any;

    user?: any;
    accessToken?: any;
    accessTokenExpires?: number;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    accessToken: string;
  }
}
