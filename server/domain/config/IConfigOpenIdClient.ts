export interface IConfigOpenIdClientCredentials {
  clientId: string;
  clientSecret: string;
  issuer: string;
}

export interface IConfigOpenIdClient {
  getOpenIdClientClientId(): string | undefined;
  getOpenIdClientClientSecret(): string | undefined;
  getOpenIdClientClientIssuer(): string | undefined;
  getOpenIdClientCredentials(): IConfigOpenIdClientCredentials;
}
