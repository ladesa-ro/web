import { ContainerModule } from 'inversify';
import { ServerEnvironmentConfigService } from './server-environment-config.service';

export const ServerEnvironmentConfigModule = new ContainerModule(config => {
  config
    .bind<ServerEnvironmentConfigService>(ServerEnvironmentConfigService)
    .to(ServerEnvironmentConfigService);
});
