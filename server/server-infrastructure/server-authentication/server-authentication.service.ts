import { injectable } from "inversify";

@injectable()
export class ServerAuthenticationService {
  async refreshAccessToken(token: any): Promise<any> {
    // try {
    //   const client = await this.oidcClientProvider.getOpenIdClient();

    //   const tokenSet = await client.refresh(token.refreshToken);

    //   return {
    //     ...token,
    //     accessToken: tokenSet.access_token,
    //     refreshToken: tokenSet.refresh_token,
    //     accessTokenExpires: Date.now() + tokenSet.expires_in! * 1000,
    //   };
    // } catch (error) {
    //   throw error;
    // }

    console.log("vish kk");
    throw new Error("AuthenticationService#refreshAccessToken - Not implemented.");
  }
}
