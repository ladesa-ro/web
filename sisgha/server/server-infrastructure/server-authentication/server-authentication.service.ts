import { injectable } from 'inversify';
import { getApiClient } from '~/composables';

@injectable()
export class ServerAuthenticationService {
  async refreshAccessToken(token: any): Promise<any> {
    try {
      const refreshToken = token.refreshToken;

      const apiClient = getApiClient();

      const tokenSet = await apiClient.autenticacao.authRefresh({
        requestBody: { refreshToken },
      });

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
