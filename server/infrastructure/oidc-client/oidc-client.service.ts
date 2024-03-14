import { OidcClientProvider } from "./providers/oidc-client.provider";

export class OidcClientService {
  constructor(
    // ...
    private oidcClientProvider: OidcClientProvider,
  ) {}

  async refreshAccessToken(token: any) {
    try {
      const client = await this.oidcClientProvider.getOpenIdClient();

      const tokenSet = await client.refresh(token.refreshToken);

      return {
        ...token,
        accessToken: tokenSet.access_token,
        refreshToken: tokenSet.refresh_token,
        accessTokenExpires: Date.now() + tokenSet.expires_in! * 1000,
      };
    } catch (error) {
      throw error;
    }
  }
}
