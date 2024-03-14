import { Container } from "inversify";
import "reflect-metadata";
import { ServerAuthenticationModule } from "./server-authentication";
import { ServerEnvironmentConfigModule } from "./server-config";

const serverInfrastructureContainer = new Container();

serverInfrastructureContainer.load(ServerAuthenticationModule);
serverInfrastructureContainer.load(ServerEnvironmentConfigModule);

export { serverInfrastructureContainer };

