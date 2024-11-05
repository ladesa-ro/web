import { type IConfigNuxtAuth } from './IConfigNuxtAuth';
import { type IConfigRuntime } from './IConfigRuntime';

export interface IConfig extends IConfigRuntime, IConfigNuxtAuth {}
