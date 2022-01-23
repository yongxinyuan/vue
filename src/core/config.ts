import { no, noop, identity } from "../shared/util";

import { LIFECYCLE_HOOKS } from "../shared/constants";

export type Config = {
  // user
  optionMergeStrategies: {
    [key: string]: Function;
  };
  silent: boolean;
  productionTip: boolean;
  performance: boolean;
  devtools: boolean;
  errorHandler?: (err: Error, vm: Component, info: string) => void;
  warnHandler?: (msg: string, vm: Component, trace: string) => void;
  ignoreElements: Array<string | RegExp>;
  keyCodes: {
    [key: string]: number | number[];
  };

  // platform
  isReservedTag: (x?: string) => boolean;
  isReservedAttr: (x?: string) => boolean;
  parsePlatformTagName: (x: string) => string;
  isUnknownElement: (x?: string) => boolean;
  getTagNamespace: (x?: string) => string | void;
  mustUseProp: (tag: string, type?: string, name?: string) => boolean;

  // private
  async: boolean;

  // legacy
  _lifecycleHooks: string[];
};

const config: Config = {
  optionMergeStrategies: Object.create(null),

  silent: false,

  productionTip: true,

  devtools: true,

  performance: false,

  errorHandler: null,

  warnHandler: null,

  ignoreElements: [],

  keyCodes: Object.create(null),

  isReservedTag: no,

  isReservedAttr: no,

  parsePlatformTagName: identity,

  isUnknownElement: no,

  getTagNamespace: identity,

  mustUseProp: no,

  async: true,

  _lifecycleHooks: LIFECYCLE_HOOKS,
};

export default config;
