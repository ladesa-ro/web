import { injectable } from 'inversify';
import { withoutTrailingSlash } from 'ufo';
import type { IConfig } from '../../../domain/config/IConfig';

@injectable()
export class ServerEnvironmentConfigService implements IConfig {
  getRuntimeEnv() {
    const env = process.env.NODE_ENV ?? null;
    return env ?? 'development';
  }

  getRuntimeURL(): string | null {
    const runtimeURLRaw = process.env.RUNTIME_URL ?? null;
    const runtimeURL = runtimeURLRaw && withoutTrailingSlash(runtimeURLRaw);
    return runtimeURL;
  }

  getNuxtAuthSecret(): string {
    const secret = process.env.AUTH_SECRET ?? null;

    if (!secret && this.getRuntimeEnv() === 'production') {
      throw new Error('Please provide AUTH_SECRET.');
    }

    return secret ?? '00d7597864954ddea0ae7823736b2772';
  }
}
