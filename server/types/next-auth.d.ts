/* eslint-disable */
import "next-auth";
import "next-auth/jwt";
/* eslint-enable */

declare module "next-auth" {
  interface Session {
    error?: any;

    user?: any;

    accessToken?: any;
    accessTokenExpires?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
  }
}
