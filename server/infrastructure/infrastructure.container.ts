import { Container } from "inversify";
import "reflect-metadata";
import { AuthenticationModule } from "./authentication";
import { EnvironmentConfigModule } from "./config";

const infrastructureContainer = new Container();

infrastructureContainer.load(AuthenticationModule);
infrastructureContainer.load(EnvironmentConfigModule);

export { infrastructureContainer };
