export const hasProto = "__proto__" in {};

const WXEnvironment = {
  platform: undefined,
};

export const inBrowser = typeof window !== "undefined";

export const inWeex =
  typeof WXEnvironment !== "undefined" && !!WXEnvironment.platform;

export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();

export const UA = inBrowser && window.navigator.userAgent.toLowerCase();

export const isIE = UA && /msie|trident/.test(UA);

export const isIE9 = UA && UA.indexOf("msie 9.0") > 0;

export const isEdge = UA && UA.indexOf("edge/") > 0;

export const isAndroid =
  (UA && UA.indexOf("android") > 0) || weexPlatform === "android";

export const isIOS =
  (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === "ios";

export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

export const isPhantomJS = UA && /phantomjs/.test(UA);

export const isFF = UA && UA.match(/firefox\/(\d+)/);

export const nativeWatch = ({} as any)?.watch;

export let supportsPassive = false;

if (inBrowser) {
  try {
    const opts = {};
    Object.defineProperty(opts, "passive", {
      get() {
        supportsPassive = true;
      },
    });
    window.addEventListener("test-passive", null, opts);
  } catch (e) {}
}

let _isServer;

export const isServerRendering = () => {
  if (_isServer === undefined) {
    if (!inBrowser && !inWeex && typeof global !== "undefined") {
      _isServer =
        global["process"] && global["process"].env.VUE_ENV === "server";
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};

export const devtools =
  inBrowser && (window as any).__VUE_DEVTOOLS_GLOBAL_HOOK__;

export function isNative(Ctor: any): boolean {
  return typeof Ctor === "function" && /native code/.test(Ctor.toString());
}

export const hasSymbol =
  typeof Symbol !== "undefined" &&
  isNative(Symbol) &&
  typeof Reflect !== "undefined" &&
  isNative(Reflect.ownKeys);

let _Set;

if (typeof Set !== "undefined" && isNative(Set)) {
  _Set = Set;
} else {
  _Set = class Set implements SimpleSet {
    set: Object;
    constructor() {
      this.set = Object.create(null);
    }
    has(key: string | number) {
      return this.set[key] === true;
    }
    add(key: string | number) {
      this.set[key] = true;
    }
    clear() {
      this.set = Object.create(null);
    }
  };
}

export interface SimpleSet {
  has(key: string | number): boolean;
  add(key: string | number): void;
  clear(): void;
}

export { _Set };
