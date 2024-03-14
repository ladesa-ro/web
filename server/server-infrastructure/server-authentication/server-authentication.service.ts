import { injectable } from "inversify";
import { AutenticacaoService } from "~/infrastructure/api/generated";

@injectable()
export class ServerAuthenticationService {
  async refreshAccessToken(token: any): Promise<any> {
    try {
      const refreshToken = token.refreshToken;

      const tokenSet = await AutenticacaoService.autenticacaoControllerRefresh(refreshToken);

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
