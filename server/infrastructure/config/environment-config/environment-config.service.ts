import { withoutTrailingSlash } from "ufo";
import {
  IConfigKeycloakCredentials,
  IConfigOpenIdClientCredentials,
} from "../../../domain/config";
import { IConfig } from "../../../domain/config/IConfig";

export class EnvironmentConfigService implements IConfig {
  getNuxtAuthSecret(): string {
    const secret = process.env.AUTH_SECRET ?? null;

    if (!secret) {
      return "";
      // throw new Error("Please provide AUTH_SECRET.");
    }

    return secret;
  }

  getRuntimeUrl(): string | null {
    const runtimeURLRaw = process.env.RUNTIME_URL ?? null;

    const runtimeURL = runtimeURLRaw && withoutTrailingSlash(runtimeURLRaw);

    return runtimeURL;
  }

  getKeycloakClientId(): string | undefined {
    const clientId = process.env.KEYCLOAK_ID;
    return clientId;
  }

  getKeycloakClientSecret(): string | undefined {
    const clientSecret = process.env.KEYCLOAK_SECRET;
    return clientSecret;
  }

  getKeycloakClientIssuer(): string | undefined {
    const issuer = process.env.KEYCLOAK_ISSUER;
    return issuer;
  }

  getKeycloakCredentials(): IConfigKeycloakCredentials {
    const clientId = this.getKeycloakClientId();
    const clientSecret = this.getKeycloakClientSecret();
    const issuer = this.getKeycloakClientIssuer();

    if (!clientId || !clientSecret || !issuer) {
      throw new Error("Missing Keycloak credentials");
    }

    return { clientId, clientSecret, issuer };
  }

  getOpenIdClientClientId(): string | undefined {
    const clientId = this.getKeycloakClientId();
    return clientId;
  }

  getOpenIdClientClientSecret(): string | undefined {
    const clientSecret = this.getKeycloakClientSecret();
    return clientSecret;
  }

  getOpenIdClientClientIssuer(): string | undefined {
    const issuer = this.getKeycloakClientIssuer();
    return issuer;
  }

  getOpenIdClientCredentials(): IConfigOpenIdClientCredentials {
    const clientId = this.getOpenIdClientClientId();
    const clientSecret = this.getOpenIdClientClientSecret();
    const issuer = this.getOpenIdClientClientIssuer();

    if (!clientId || !clientSecret || !issuer) {
      throw new Error("Missing OpenIDClient credentials");
    }

    return { clientId, clientSecret, issuer };
  }
}
