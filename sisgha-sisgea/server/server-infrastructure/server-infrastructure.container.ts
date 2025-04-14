import { Container } from 'inversify';
import 'reflect-metadata';
import { ServerAuthenticationModule } from './server-authentication';
import { ServerEnvironmentConfigModule } from './server-config';

const serverInfrastructureContainer = new Container({ autobind: true });

serverInfrastructureContainer.loadSync(ServerAuthenticationModule);
serverInfrastructureContainer.loadSync(ServerEnvironmentConfigModule);

export { serverInfrastructureContainer };
