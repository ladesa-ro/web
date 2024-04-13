import { IConfigNuxtAuth } from "./IConfigNuxtAuth";
import { IConfigRuntime } from "./IConfigRuntime";

export interface IConfig extends IConfigRuntime, IConfigNuxtAuth {}
