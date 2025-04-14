import { ContainerModule } from 'inversify';
import { ServerAuthenticationService } from './server-authentication.service';

export const ServerAuthenticationModule = new ContainerModule(config => {
  config
    .bind<ServerAuthenticationService>(ServerAuthenticationService)
    .to(ServerAuthenticationService);
});
