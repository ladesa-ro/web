import { ContainerModule } from "inversify";
import { ServerAuthenticationService } from "./server-authentication.service";

export const ServerAuthenticationModule = new ContainerModule((bind) => {
  bind<ServerAuthenticationService>(ServerAuthenticationService).to(ServerAuthenticationService);
});
