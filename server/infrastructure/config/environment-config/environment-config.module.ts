import { ContainerModule } from "inversify";
import { EnvironmentConfigService } from "./environment-config.service";

export const EnvironmentConfigModule = new ContainerModule((bind) => {
  bind<EnvironmentConfigService>(EnvironmentConfigService).to(EnvironmentConfigService);
});
