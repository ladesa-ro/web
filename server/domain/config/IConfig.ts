import { IConfigKeycloak } from "./IConfigKeycloack";
import { IConfigNuxtAuth } from "./IConfigNuxtAuth";
import { IConfigOpenIdClient } from "./IConfigOpenIdClient";
import { IConfigRuntime } from "./IConfigRuntime";

export interface IConfig
  extends IConfigRuntime,
    IConfigNuxtAuth,
    IConfigKeycloak,
    IConfigOpenIdClient {}
