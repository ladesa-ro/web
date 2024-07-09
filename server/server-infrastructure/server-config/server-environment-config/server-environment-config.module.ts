import { ContainerModule } from 'inversify';
import { ServerEnvironmentConfigService } from './server-environment-config.service';

export const ServerEnvironmentConfigModule = new ContainerModule((bind) => {
  bind<ServerEnvironmentConfigService>(ServerEnvironmentConfigService).to(
    ServerEnvironmentConfigService
  );
});
