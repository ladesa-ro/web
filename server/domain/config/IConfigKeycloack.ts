export interface IConfigKeycloakCredentials {
  clientId: string;
  clientSecret: string;
  issuer: string;
}

export interface IConfigKeycloak {
  getKeycloakClientId(): string | undefined;
  getKeycloakClientSecret(): string | undefined;
  getKeycloakClientIssuer(): string | undefined;
  getKeycloakCredentials(): IConfigKeycloakCredentials;
}
