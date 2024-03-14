import { ContainerModule } from "inversify";
import { AuthenticationService } from "./authentication.service";

export const AuthenticationModule = new ContainerModule((bind) => {
  bind<AuthenticationService>(AuthenticationService).to(AuthenticationService);
});
